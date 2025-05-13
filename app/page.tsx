"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [model, setModel] = useState<string>("meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo");
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [length, setLength] = useState<string>("Medium");
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedLanguage, setCopiedLanguage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const languageOptions = [
    "English", "Spanish", "French", "German", "Italian", 
    "Japanese", "Korean", "Chinese", "Portuguese"
  ];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  
  const handleModelSelect = (modelName: string) => {
    setModel(modelName);
  };
  
  const handleLanguageToggle = (language: string) => {
    setLanguages(prev => 
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };
  
  const handleLengthSelect = (lengthOption: string) => {
    setLength(lengthOption);
  };
  
  const handleClearImage = () => {
    setImage(null);
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleCopyDescription = (language: string, description: string) => {
    navigator.clipboard.writeText(description.trim()).then(() => {
      setCopiedLanguage(language);
      setTimeout(() => setCopiedLanguage(null), 2000);
    });
  };
  
  const handleSubmit = async () => {
    if (!image) return;
    
    setIsGenerating(true);
    setDescriptions({});
    
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("languages", languages.join(','));
      formData.append("model", model);
      formData.append("length", length);
      
      const response = await fetch("/api/generate-descriptions", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.error) {
        console.error("Error:", data.error);
      } else {
        setDescriptions(data.descriptions);
      }
    } catch (error) {
      console.error("Error generating descriptions:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="container mx-auto py-6 px-4 flex flex-col md:flex-row gap-8">
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Product Description Generator</h1>
        <p className="text-gray-600 mb-6">Upload an image of your product to generate descriptions in multiple languages.</p>
        
        <div className="mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer relative">
            {imageUrl ? (
              <>
        <Image
                  src={imageUrl} 
                  alt="Product" 
                  width={300} 
                  height={300} 
                  className="max-h-64 object-contain" 
                />
                <button 
                  onClick={handleClearImage}
                  className="absolute top-2 right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  &times;
                </button>
              </>
            ) : (
              <div 
                className="h-64 w-full flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-gray-500 mb-2">Upload an image of your product</p>
                <p className="text-gray-400 text-sm">Click to browse or drag and drop</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Model</h2>
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 rounded-full ${model === "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo" ? "bg-black text-white" : "bg-gray-100"}`}
              onClick={() => handleModelSelect("meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo")}
            >
              Llama 3.2 11B
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${model === "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo" ? "bg-black text-white" : "bg-gray-100"}`}
              onClick={() => handleModelSelect("meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo")}
            >
              Llama 3.2 90B
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Languages</h2>
          <p className="text-sm text-gray-500 mb-3">Choose up to 3 languages for the product descriptions.</p>
          <div className="flex flex-wrap gap-2">
            {languageOptions.map(language => (
              <button 
                key={language}
                className={`px-4 py-2 rounded-full ${languages.includes(language) ? "bg-black text-white" : "bg-gray-100"}`}
                onClick={() => handleLanguageToggle(language)}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Length</h2>
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 rounded-full ${length === "Short" ? "bg-black text-white" : "bg-gray-100"}`}
              onClick={() => handleLengthSelect("Short")}
            >
              Short
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${length === "Medium" ? "bg-black text-white" : "bg-gray-100"}`}
              onClick={() => handleLengthSelect("Medium")}
            >
              Medium
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${length === "Long" ? "bg-black text-white" : "bg-gray-100"}`}
              onClick={() => handleLengthSelect("Long")}
            >
              Long
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={!image || isGenerating || languages.length === 0}
          className={`w-full py-3 rounded-lg ${!image || isGenerating || languages.length === 0 ? "bg-gray-200 text-gray-500" : "bg-black text-white"}`}
        >
          {isGenerating ? "Generating descriptions..." : "Generate descriptions"}
        </button>
      </div>
      
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Generated Descriptions</h2>
        
        {Object.keys(descriptions).length === 0 && !isGenerating && (
          <div className="text-center text-gray-500 py-12">
            No descriptions generated yet. Upload a product image and click "Generate descriptions".
          </div>
        )}
        
        {isGenerating && (
          <div className="text-center text-gray-500 py-12">
            <p className="mb-2">Generating descriptions for {languages.length} language{languages.length > 1 ? 's' : ''}...</p>
            <p className="text-sm text-gray-400">This may take a moment, especially for multiple languages.</p>
          </div>
        )}
        
        {Object.entries(descriptions).map(([language, description]) => (
          <div key={language} className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">{language}</h3>
              <button 
                onClick={() => handleCopyDescription(language, description)}
                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {copiedLanguage === language ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 leading-relaxed">{description.trim()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
