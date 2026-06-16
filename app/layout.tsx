import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "SoilSense - AI-Calibrated Soil Intelligence",
  description: "AI-powered soil diagnostics using colorimetric intelligence and smartphone scanning for smarter farming.",
  keywords: ["Soil Health", "AI Agriculture", "pH Testing", "Smart Farming", "AgriTech"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-brand-lime selection:text-black`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
