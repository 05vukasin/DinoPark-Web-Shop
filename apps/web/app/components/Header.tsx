"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("SRB");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Pokreće funkciju odmah pri učitavanju
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const toggleLanguage = () => {
    setLanguage(language === "SRB" ? "ENG" : "SRB");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#333",
        color: "white",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <h1 style={{ fontSize: "24px" }}>DinoPark</h1>

      {/* Desktop navigacija */}
      {!isMobile && (
        <nav style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <a href="#hero" style={{ color: "white", textDecoration: "none" }}>
            {language === "SRB" ? "Početna" : "Home"}
          </a>
          <a href="#about" style={{ color: "white", textDecoration: "none" }}>
            {language === "SRB" ? "O nama" : "About"}
          </a>
          <a href="#contact" style={{ color: "white", textDecoration: "none" }}>
            {language === "SRB" ? "Kontakt" : "Contact"}
          </a>
          <button
            onClick={toggleLanguage}
            style={{
              background: "transparent",
              border: "1px solid white",
              color: "white",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {language}
          </button>
        </nav>
      )}

      {/* Burger meni */}
      {isMobile && (
        <div
          style={{
            cursor: "pointer",
            fontSize: "24px",
          }}
          onClick={toggleMenu}
        >
          ☰
        </div>
      )}

      {/* Mobilni meni */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "#222",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 0",
            }}
          >
            <a href="#hero" style={{ color: "white", textDecoration: "none", padding: "10px" }} onClick={toggleMenu}>
              {language === "SRB" ? "Početna" : "Home"}
            </a>
            <a href="#about" style={{ color: "white", textDecoration: "none", padding: "10px" }} onClick={toggleMenu}>
              {language === "SRB" ? "O nama" : "About"}
            </a>
            <a href="#contact" style={{ color: "white", textDecoration: "none", padding: "10px" }} onClick={toggleMenu}>
              {language === "SRB" ? "Kontakt" : "Contact"}
            </a>
            <button
              onClick={() => {
                toggleLanguage();
                toggleMenu();
              }}
              style={{
                background: "transparent",
                border: "1px solid white",
                color: "white",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              {language}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
