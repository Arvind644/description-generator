# Product Description Generator

A Next.js application that uses Together AI's Llama 3.2 Vision model to generate detailed product descriptions in multiple languages based on uploaded product images.

## Features

- Upload product images
- Generate descriptions in multiple languages (English, Spanish, French, German, Italian, Japanese, Korean, Chinese, Portuguese)
- Choose description length (Short, Medium, Long)
- Select Llama 3.2 Vision model size (11B or 90B)
- Modern and clean UI

## Tech Stack

- Next.js 14 with App Router
- React
- TypeScript
- Tailwind CSS
- Together AI API (Llama 3.2 Vision model)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Together AI API key

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Together AI API key:

```
TOGETHER_API_KEY=your_together_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Upload a product image by clicking on the upload area or dragging and dropping an image
2. Select the Llama 3.2 Vision model size (11B for faster results, 90B for higher quality)
3. Choose up to 3 languages for the product descriptions
4. Select the description length (Short, Medium, Long)
5. Click "Generate descriptions" to get AI-generated product descriptions
6. View and copy the generated descriptions from the right panel

## License

MIT

## Acknowledgements

- [Together AI](https://together.ai) for providing the Llama 3.2 Vision model API
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
