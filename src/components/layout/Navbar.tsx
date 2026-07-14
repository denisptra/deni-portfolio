"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { lang, setLang, t } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t.nav.about || "Profil", path: `/${lang}/about` },
    { name: "Keahlian", path: `/${lang}#keahlian` },
    { name: t.nav.experience || "Riwayat", path: `/${lang}/experience` },
    { name: t.nav.portfolio || "Proyek", path: `/${lang}/projects` },
    { name: t.nav.achievements || "Sertifikat", path: `/${lang}/achievements` },
    { name: t.nav.contact || "Kontak", path: `/${lang}/contact` },
  ];

  const isActive = (path: string) => {
    if (path.includes("#")) return false;
    return pathname === path;
  };

  return (
    <header className="bg-paper border-b-thick border-ink brutal-shadow sticky top-0 z-50 h-[70px] md:h-[70px]">
      <div className="flex flex-col md:flex-row justify-between items-stretch w-full px-margin-mobile md:px-margin-desktop max-w-full mx-auto h-full">
        {/* Brand + mobile controls */}
        <div className="flex justify-between items-center py-4 md:py-0 md:self-center">
          <Link
            href={`/${lang}`}
            className="font-display text-2xl font-bold uppercase tracking-tight text-ink hover:text-archive-orange transition-colors"
          >
            ARSIP<span className="text-stempel-red">.</span>DIGITAL
          </Link>
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setLang(lang === "en" ? "id" : "en")}
              className="px-3 py-1.5 border-2 border-ink bg-surface text-ink text-label-mono font-bold"
              aria-label="Switch language"
            >
              {lang.toUpperCase()}
            </button>
            <button
              className="p-2 border-2 border-ink bg-surface text-ink"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 self-stretch" aria-label="Main navigation">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex items-center px-4 text-label-mono font-bold uppercase tracking-wider transition-colors border-b-thick ${
                isActive(item.path)
                  ? "text-ink border-stempel-red bg-surface-container-low"
                  : "text-on-surface-variant border-transparent hover:text-ink hover:border-outline hover:bg-surface-container-low"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="hidden md:flex items-center gap-4 py-4 md:py-0">
          <button
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            className="px-3 py-1.5 border-2 border-ink bg-surface text-ink text-label-mono font-bold hover:bg-archive-yellow transition-colors"
            aria-label="Switch language"
          >
            {lang.toUpperCase()}
          </button>
          <div className="hidden lg:block text-data-technical text-ink border-2 border-ink px-3 py-1 bg-surface brutal-shadow-sm">
            No: 001/DTS/VII/2026
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper border-t-2 border-ink px-margin-mobile pb-4 flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 border-2 border-ink text-label-mono font-bold uppercase ${
                isActive(item.path) ? "bg-archive-yellow text-ink" : "bg-surface text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
