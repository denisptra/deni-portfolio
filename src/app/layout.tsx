import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "ARSIP DIGITAL | Deni Trio Saputra",
  description:
    "Arsip Digital Portfolio — Deni Trio Saputra. Web & Mobile Developer, UI/UX Designer. Berkas resmi keahlian, proyek, dan pengalaman profesional.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "Deni Trio Saputra",
    "Arsip Digital",
    "Portfolio",
    "Web Developer",
    "UI/UX Designer",
    "Mobile Developer",
    "Next.js",
    "React",
    "Frontend Developer",
  ],
  authors: [{ name: "Deni Trio Saputra" }],
  creator: "Deni Trio Saputra",
  openGraph: {
    title: "ARSIP DIGITAL | Deni Trio Saputra",
    description:
      "Arsip Digital Portfolio — Deni Trio Saputra. Web & Mobile Developer, UI/UX Designer.",
    type: "website",
    locale: "id_ID",
    siteName: "Arsip Digital — DTS Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARSIP DIGITAL | Deni Trio Saputra",
    description:
      "Arsip Digital Portfolio — Deni Trio Saputra. Web & Mobile Developer, UI/UX Designer.",
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
    <html lang="en">
      <head>
        {/* Space Mono loaded via link since next/font/google doesn't support it */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />
      </head>
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
