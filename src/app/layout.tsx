import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-outfit",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Ресторан Старый Пловдив | Красносельский район СПб",
  description: "Самый большой ресторан Красносельского района Санкт-Петербурга. Идеальное место для отдыха, свадеб, банкетов и концертов.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="ru"
        className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
