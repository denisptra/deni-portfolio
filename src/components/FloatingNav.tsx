"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLang } from "./LangProvider";

export default function FloatingNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: "/home", key: "nav.home" },
    { href: "/projects", key: "nav.projects" },
    { href: "/experience", key: "nav.experience" },
    { href: "/certificates", key: "nav.certificates" },
    { href: "/contact", key: "nav.contact" },
  ];

  return (
    <>
      <nav className="fixed top-5 left-1/2 z-[100] -translate-x-1/2 flex items-center gap-2 px-3 py-2 pl-5 glass border border-white/[0.06] rounded-full">
        <Link href="/home" className="mr-3 flex items-center gap-2">
          <svg viewBox="0 0 32 32" width="28" height="28">
            <circle cx="16" cy="16" r="12" fill="#f5f5f0" />
            <circle cx="8" cy="8" r="4" fill="#1a1a1a" />
            <circle cx="24" cy="8" r="4" fill="#1a1a1a" />
            <ellipse cx="11" cy="15" rx="4" ry="3.5" fill="#1a1a1a" />
            <ellipse cx="21" cy="15" rx="4" ry="3.5" fill="#1a1a1a" />
            <circle cx="11" cy="15" r="2" fill="white" />
            <circle cx="21" cy="15" r="2" fill="white" />
            <circle cx="11.5" cy="14.5" r="1" fill="#111" />
            <circle cx="21.5" cy="14.5" r="1" fill="#111" />
            <ellipse cx="16" cy="19" rx="1.5" ry="1" fill="#222" />
            <path d="M13 22 Q16 25 19 22" fill="none" stroke="#222" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </Link>

        <div className="hidden md:flex gap-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 text-[0.8rem] font-medium rounded-full transition-all duration-300 ${
                pathname === link.href
                  ? "text-white bg-white/[0.08]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === "en" ? "id" : "en")}
          className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-[0.7rem] font-medium text-white/50 border border-white/[0.08] rounded-full hover:border-white/15 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {lang === "en" ? "ID" : "EN"}
        </button>

        <button
          className="md:hidden ml-1 w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`w-4 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
          <span className={`w-4 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-4 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[99] bg-black/90 backdrop-blur-lg transition-all duration-500 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[1.5rem] font-[family-name:var(--font-display)] font-semibold transition-all duration-300 ${
                pathname === link.href ? "text-white" : "text-white/40 hover:text-white"
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {t(link.key)}
            </Link>
          ))}
          {/* Mobile language toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); setLang(lang === "en" ? "id" : "en"); }}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-[0.85rem] text-white/50 border border-white/[0.08] rounded-full hover:border-white/15 hover:text-white transition-all duration-300 cursor-pointer"
            style={{ opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transitionDelay: mobileOpen ? `${links.length * 60}ms` : "0ms" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {lang === "en" ? "Bahasa Indonesia" : "English"}
          </button>
        </div>
      </div>
    </>
  );
}
