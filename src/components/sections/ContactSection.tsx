"use client";

import PandaMascot from "@/components/PandaMascot";
import { useLang } from "@/components/LangProvider";

export default function ContactSection() {
  const { t } = useLang();
  return (
    <section className="py-[100px] px-[5%]">
      <div className="max-w-[800px] mx-auto text-center">
        <div data-animate className="font-[family-name:var(--font-mono)] text-[0.75rem] text-white/30 tracking-[0.15em] uppercase mb-5">
          {t("contact.label")}
        </div>
        <div className="flex items-center justify-center gap-4 mb-6">
          <h2 data-animate className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] text-[#f5f5f0]">
            {t("contact.title")}
          </h2>
          <PandaMascot pose="goodbye-wave" size={80} />
        </div>
        <p data-scroll="up" className="text-[1rem] leading-[1.8] text-white/40 mb-10 max-w-[500px] mx-auto">
          {t("contact.desc")}
        </p>

        <div data-scroll="up" className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a
            href="mailto:denitri0609@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.85rem] font-semibold text-[#1a1a1a] bg-[#f5f5f0] rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            denitri0609@gmail.com
          </a>
          <a
            href="https://github.com/denisptra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.85rem] font-medium text-white/50 border border-white/[0.08] rounded-full hover:border-white/15 hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>

        <div data-scroll="up" className="pt-8 border-t border-white/[0.04]">
          <p className="text-[0.75rem] text-white/20">
            &copy; {t("contact.copyright")}
          </p>
        </div>
      </div>
    </section>
  );
}
