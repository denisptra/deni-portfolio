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
    <header className="bg-paper border-b-thick border-ink brutal-shadow sticky top-0 z-50 min-h-[60px] md:min-h-[70px]">
      <div className="flex flex-col md:flex-row justify-between items-stretch w-full px-4 md:px-margin-desktop max-w-full mx-auto h-full">
        <div className="flex justify-between items-center py-3 md:py-0 md:self-center">
          <Link
            href="/"
            className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-ink hover:text-archive-orange transition-colors"
          >
            ARSIP<span className="text-stempel-red">.</span>DIGITAL
          </Link>
          <button
            className="p-2 border-2 border-ink bg-surface text-ink md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-1 self-stretch overflow-x-auto" aria-label="Main navigation">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex items-center px-3 xl:px-4 text-label-mono font-bold uppercase tracking-wider transition-colors border-b-thick whitespace-nowrap ${
                isActive(item.path)
                  ? "text-ink border-stempel-red bg-surface-container-low"
                  : "text-on-surface-variant border-transparent hover:text-ink hover:border-outline hover:bg-surface-container-low"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 py-4 md:py-0">
          <div className="hidden lg:block text-data-technical text-ink border-2 border-ink px-3 py-1 bg-surface brutal-shadow-sm whitespace-nowrap">
            No: 001/DTS/VII/2026
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-paper border-t-2 border-ink px-4 pb-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 border-2 border-ink text-label-mono font-bold uppercase text-sm ${
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
