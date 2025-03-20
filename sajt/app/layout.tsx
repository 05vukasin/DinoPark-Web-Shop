"use client";

import type { Metadata } from "next";
import { createContext, useState } from "react";
import "./globals.css";
import Navbar from "./Navbar";


// Kreiramo globalni kontekst jezika
export const LanguageContext = createContext<{ language: string; setLanguage: (lang: string) => void }>({
  language: "sr",
  setLanguage: () => {},
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("sr"); // Po defaultu je srpski

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <html lang={language}>
        <body suppressHydrationWarning={true} className="bg-gray-100 text-gray-900">
          <Navbar />
          {children} {/* Sve komponente sada mogu koristiti `LanguageContext` */}
        </body>
      </html>
    </LanguageContext.Provider>
  );
}
