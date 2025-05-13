import { NextRequest, NextResponse } from 'next/server';
import Together from 'together-ai';

// Use environment variable for API key
const together = new Together(process.env.TOGETHER_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File;
    const languagesStr = formData.get('languages') as string;
    const model = formData.get('model') as string;
    const length = formData.get('length') as string;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert image to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    // Parse selected languages
    const languages = languagesStr.split(',');
    
    let descriptions;
    let rawResponse;

    try {
      const res = await together.chat.completions.create({
        model: model || "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: "You are a helpful product description generator that ONLY responds with JSON.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Given this product image, return JSON of a ${length === 'Short' ? 'concise' : length === 'Medium' ? 'moderately detailed' : 'detailed'} product description in each of these languages: ${languages.map((language) => `"${language}"`).join(", ")}
                
                Each description should be in natural paragraph format without bullet points or headers. Focus on key features, benefits, and appeal to customers.
                
                Return a JSON array in the following shape exactly: 
                [
                  {"language": "language name", "description": "description text"},
                  ...
                ]
                
                IMPORTANT: You MUST include descriptions for ALL ${languages.length} languages I specified.
                PLEASE ONLY RETURN JSON, NOTHING ELSE.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      });

      rawResponse = res.choices[0].message?.content;
      descriptions = JSON.parse(rawResponse || "[]");
    } catch {
      // If first attempt fails, try to extract JSON
      try {
        const extract = await together.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Parse out the valid JSON from this text. Only answer in JSON.",
            },
            {
              role: "user",
              content: rawResponse || "",
            },
          ],
          model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        });

        descriptions = JSON.parse(extract?.choices?.[0]?.message?.content || "[]");
      } catch (extractError) {
        console.error('Failed to parse JSON:', extractError);
        return NextResponse.json({ error: 'Failed to generate descriptions' }, { status: 500 });
      }
    }

    // Convert array format to object format expected by frontend
    const descriptionsByLanguage: Record<string, string> = {};
    descriptions.forEach((item: { language: string; description: string }) => {
      descriptionsByLanguage[item.language] = item.description;
    });

    return NextResponse.json({ descriptions: descriptionsByLanguage });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 