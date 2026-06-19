"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const { lang, t } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-12 bg-white border-t border-[#eef0f2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* Brand Introduction */}
          <div className="col-span-1 lg:col-span-1 space-y-7">
            <div>
              <Link href={`/${lang}`} className="flex items-center mb-6 font-bold tracking-tight text-[#37352f] text-sm">
                <div className="w-7 h-7 bg-black rounded flex items-center justify-center text-white mr-2.5 font-black text-xs leading-none">
                  D
                </div>
                Deni Trio Saputra
              </Link>
              <p className="text-xs text-[#37352f]/50 leading-relaxed font-medium">
                {t.footer.description}
              </p>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#37352f]/30 mb-6">
              {t.footer.sitemap}
            </h4>
            <ul className="space-y-3.5 text-[12px] font-semibold text-[#37352f]/60">
              <li>
                <Link href={`/${lang}/about`} className="hover:text-black transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/experience`} className="hover:text-black transition-colors">
                  {t.nav.experience}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/study`} className="hover:text-black transition-colors">
                  {t.nav.education}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/projects`} className="hover:text-black transition-colors">
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/achievements`} className="hover:text-black transition-colors">
                  {t.nav.achievements}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-black transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#37352f]/30 mb-6">
              {t.footer.socials}
            </h4>
            <ul className="space-y-3.5 text-[12px] font-semibold text-[#37352f]/60">
              <li>
                <a
                  href="https://github.com/denisptra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/deni-trio-saputra-451075276/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/denisptra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:denitri0609@gmail.com" className="hover:text-black transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#37352f]/30 mb-6">
              {t.footer.legal}
            </h4>
            <ul className="space-y-3.5 text-[12px] font-semibold text-[#37352f]/60">
              <li>
                <Link href={`/${lang}/privacy`} className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright information */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-[#eef0f2] pt-8">
          <p className="text-[12px] text-[#37352f]/40 font-medium">
            &copy; {currentYear} Deni Trio Saputra. {t.footer.rights}
          </p>
          <div className="text-[#37352f]/20 text-[10px] font-black uppercase tracking-[0.25em] italic">
            {t.footer.credit}
          </div>
        </div>
      </div>
    </footer>
  );
}
