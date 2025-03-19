"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";
import logo from "@/public/logo.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"sr" | "en">("sr");

  const toggleLanguage = (lang: "sr" | "en") => {
    setLanguage(lang);
  };

  const navLinks = [
    { id: "about", sr: "O nama", en: "About Us" },
    { id: "hours", sr: "Radno Vreme", en: "Working Hours" },
    { id: "gallery", sr: "Galerija Slika", en: "Gallery" },
    { id: "contact", sr: "Kontakt", en: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* HEADER */}
      <header className="bg-white shadow-lg fixed w-full z-50 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src={logo}
                alt="DinoPark Logo"
                width={120}
                height={60}
                className="hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-8 text-lg font-semibold">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-green-600 transition-colors duration-300"
                  >
                    {language === "sr" ? link.sr : link.en}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Switcher */}
          <div className="flex space-x-4">
            <button
              onClick={() => toggleLanguage("sr")}
              className={`p-2 rounded-full shadow-md transition-all duration-300 ${
                language === "sr" ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
            >
              🇷🇸
            </button>
            <button
              onClick={() => toggleLanguage("en")}
              className={`p-2 rounded-full shadow-md transition-all duration-300 ${
                language === "en" ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
            >
              🇬🇧
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mt-24 container mx-auto px-6 py-10 bg-white shadow-lg rounded-lg">
        {children}
      </main>
    </div>
  );
}
