import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "entre-brokers | Red privada de oportunidades inmobiliarias",
  description:
    "No listamos propiedades. Conectamos oportunidades reales entre brokers. La plataforma exclusiva para profesionales inmobiliarios.",
  keywords: [
    "brokers inmobiliarios",
    "red inmobiliaria",
    "oportunidades inmobiliarias",
    "B2B inmobiliario",
    "México",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
