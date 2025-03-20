import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar"; // Import Navbar

export const metadata: Metadata = {
  title: "DinoPark",
  description: "Najveći zabavno-edukativni park na Balkanu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body
        suppressHydrationWarning={true}
        className="bg-gray-100 text-gray-900"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
