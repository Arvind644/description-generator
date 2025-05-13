import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Product Description Generator",
  description: "Generate product descriptions using Llama 3.2 Vision with Together AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="p-4 border-b">
          <div className="container mx-auto">
            <Image 
              src="/buildclub-long.png" 
              alt="BuildClub Logo" 
              width={180} 
              height={40} 
              className="h-10 w-auto"
            />
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="border-t py-4 bg-gray-50">
          <div className="container mx-auto text-center text-sm text-gray-600">
            <p>Powered by Together AI & Next.js</p>
            <p className="mt-1">© 2025 <a href="https://buildclub.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Build Club</a>. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
