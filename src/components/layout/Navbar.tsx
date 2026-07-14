"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Tentang", path: "/about" },
    { name: "Keahlian", path: "/#keahlian" },
    { name: "Pengalaman", path: "/experience" },
    { name: "Proyek", path: "/projects" },
    { name: "Sertifikat", path: "/achievements" },
    { name: "Kontak", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path.includes("#")) return false;
    return pathname === path;
  };

  return (
    <header className="bg-paper border-b-thick border-ink brutal-shadow sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-margin-desktop max-w-container-max mx-auto min-h-[60px] md:min-h-[70px]">
        <Link
          href="/"
          className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-ink hover:text-archive-orange transition-colors"
        >
          ARSIP<span className="text-stempel-red">.</span>DIGITAL
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex items-center h-[70px] px-3 xl:px-4 text-label-mono font-bold uppercase tracking-wider transition-colors border-b-thick whitespace-nowrap ${
                isActive(item.path)
                  ? "text-ink border-stempel-red bg-surface-container-low"
                  : "text-on-surface-variant border-transparent hover:text-ink hover:border-outline"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="ml-4 text-data-technical text-ink border-2 border-ink px-3 py-1 bg-surface brutal-shadow-sm whitespace-nowrap">
            No: 001/DTS/VII/2026
          </div>
        </nav>

        <button
          className="md:hidden p-2 border-2 border-ink bg-surface text-ink"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-ink bg-paper px-4 py-4 flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 border-2 border-ink text-label-mono font-bold uppercase text-sm ${
                isActive(item.path) ? "bg-archive-yellow text-ink" : "bg-surface text-on-surface-variant"
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
