import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Deni Trio Saputra — Creative Technologist",
    template: "%s | Deni Trio Saputra",
  },
  description:
    "Portfolio of Deni Trio Saputra — Multidisciplinary Creative Technologist specializing in web, mobile, and interactive experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} ${syne.variable}`}
    >
      <body className="bg-[#0a0a0b] text-[#f5f5f7] antialiased">
        {children}
      </body>
    </html>
  );
}
