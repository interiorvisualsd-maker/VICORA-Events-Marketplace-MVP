import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VICORA — Encuentra el lugar perfecto para tu evento",
  description: "El marketplace premium para venues de eventos en Latinoamérica. Bodas, eventos corporativos y celebraciones únicas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
