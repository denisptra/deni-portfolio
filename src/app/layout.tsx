import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Deni Trio Saputra | Portfolio",
  description:
    "Portfolio Deni Trio Saputra, Junior Web Developer, UI/UX Designer, and Graphic Designer. Building modern websites, admin dashboards, and digital designs.",
  icons: {
    icon: "/Deni.png",
    shortcut: "/Deni.png",
    apple: "/Deni.png",
  },
  keywords: [
    "Deni Trio Saputra",
    "Portfolio",
    "Web Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "Next.js",
    "React",
    "Frontend Developer",
  ],
  authors: [{ name: "Deni Trio Saputra" }],
  creator: "Deni Trio Saputra",
  openGraph: {
    title: "Deni Trio Saputra | Portfolio",
    description:
      "Portfolio Deni Trio Saputra, Junior Web Developer, UI/UX Designer, and Graphic Designer.",
    type: "website",
    locale: "id_ID",
    siteName: "Deni Trio Saputra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deni Trio Saputra | Portfolio",
    description:
      "Portfolio Deni Trio Saputra, Junior Web Developer, UI/UX Designer, and Graphic Designer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
