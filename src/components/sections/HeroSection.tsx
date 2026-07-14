"use client";

import Link from "next/link";

export default function HeroSection() {

  return (
    <section className="relative w-full max-w-container-max mx-auto">
      {/* Category Tab (Archival Signature) */}
      <div className="inline-block bg-archive-yellow border-t-thick border-x-thick border-ink px-3 md:px-4 py-1.5 md:py-2 text-label-mono text-[10px] md:text-[12px] font-bold text-ink uppercase relative top-[3px] ml-4 md:ml-8 z-10 shadow-[4px_0_0_0_#141311]">
        FILE: INDEX_01
      </div>

      {/* Hero Container */}
      <div className="border-thick border-ink bg-paper p-4 md:p-12 brutal-shadow relative">
        {/* Decorative dashed top line */}
        <div className="absolute top-0 left-0 w-full h-2 border-t-4 border-dashed border-ink opacity-30 mt-1"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-gutter mt-2 md:mt-4">

          {/* Left: 3x4 Photo Box */}
          <div className="md:col-span-4 relative group">
            {/* Decorative colored blocks behind */}
            <div className="hidden md:block absolute -top-4 -left-4 w-12 h-12 bg-archive-orange border-2 border-ink z-0"></div>
            <div className="hidden md:block absolute -bottom-4 -right-4 w-16 h-16 bg-carbon-blue border-2 border-ink z-0"></div>

            {/* Photo Container */}
            <div className="aspect-[3/4] max-h-[320px] md:max-h-none border-thick border-ink bg-surface brutal-shadow relative z-10 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover filter grayscale contrast-125 border-2 border-ink z-10 transition-transform duration-500 group-hover:scale-105"
                alt="Deni Trio Saputra"
                src="/Deni.png"
              />

              {/* Red 'ASLI' Stamp */}
              <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 transform rotate-[15deg]">
                <div className="border-4 border-stempel-red px-2 py-0.5 md:px-3 md:py-1 text-stempel-red font-display text-base md:text-2xl font-bold uppercase tracking-widest bg-paper/80 backdrop-blur-sm shadow-[2px_2px_0_0_rgba(232,67,44,1)]">
                  ASLI
                </div>
              </div>

              {/* Initial Overlay (subtle) */}
              <div className="hidden md:block absolute bottom-4 left-4 z-20 opacity-20 font-display text-7xl font-bold pointer-events-none">
                DTS
              </div>
            </div>

            {/* Photo Metadata */}
            <div className="mt-2 md:mt-4 text-data-technical text-[12px] md:text-[14px] text-ink border-l-2 border-ink pl-2 flex justify-between">
              <span>ID: DTS-1995-X</span>
              <span className="text-on-surface-variant">DIM: 3x4</span>
            </div>
          </div>

          {/* Right: Info Area */}
          <div className="md:col-span-8 flex flex-col justify-center gap-3 md:gap-6 relative">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <div className="bg-stempel-red text-paper text-label-mono text-[10px] md:text-[12px] font-bold uppercase px-2 py-1 md:px-3 md:py-1.5 border-2 border-ink flex items-center gap-2 brutal-shadow-sm">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-paper animate-pulse"></span>
                STATUS: AKTIF MENCARI PELUANG
              </div>
              <div className="hidden md:block w-12 h-0.5 bg-ink"></div>
            </div>

            {/* Name */}
            <h1 className="text-display-hero-mobile text-ink leading-[1.1]">
              DENI TRIO<br />
              <span className="text-archive-orange">SAPUTRA</span>
            </h1>

            {/* Title / Role Tag */}
            <div className="inline-block border-2 border-ink p-3 md:p-4 bg-surface brutal-shadow-blue relative transform -rotate-1 self-start max-w-full">
              {/* Pin graphic */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-stempel-red border-2 border-ink brutal-shadow-sm"></div>
              <h2 className="text-headline-card md:text-headline-section text-carbon-blue m-0 text-lg md:text-[32px]">
                Web &amp; Mobile Developer
              </h2>
              <p className="text-label-mono text-[10px] md:text-[12px] text-ink mt-1 md:mt-2 border-t-2 border-dashed border-ink pt-1 md:pt-2">
                — UI/UX Designer
              </p>
            </div>

            {/* Description */}
            <p className="text-body-main text-[14px] md:text-[16px] text-ink">
              Saya adalah seorang pengembang produk digital yang berfokus menyelaraskan kode bersih, performa andal, serta estetika desain visual brutalist yang unik dan premium.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap gap-2 md:gap-4 mt-1 md:mt-2">
              <Link
                href="/projects"
                className="bg-archive-yellow text-ink border-2 md:border-thick border-ink px-4 py-2.5 md:px-8 md:py-4 text-label-mono text-[11px] md:text-[12px] font-bold uppercase brutal-shadow brutal-shadow-hover transition-all flex items-center gap-1.5 md:gap-2 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
              >
                <span className="material-symbols-outlined text-[16px] md:text-[20px]">folder_open</span>
                Lihat Proyek
              </Link>
              <Link
                href="/contact"
                className="bg-surface text-ink border-2 md:border-thick border-ink px-4 py-2.5 md:px-8 md:py-4 text-label-mono text-[11px] md:text-[12px] font-bold uppercase brutal-shadow brutal-shadow-hover transition-all flex items-center gap-1.5 md:gap-2 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
              >
                <span className="material-symbols-outlined text-[16px] md:text-[20px]">mail</span>
                Hubungi Saya
              </Link>
            </div>

            {/* Quick Info */}
            <div className="mt-2 md:mt-4 pt-3 md:pt-4 border-t-2 border-ink flex flex-wrap gap-1.5 md:gap-2">
              <span className="border-2 border-ink px-1.5 py-0.5 md:px-2 md:py-1 bg-surface text-ink text-data-technical text-[11px] md:text-[14px] brutal-shadow-sm">Jakarta Selatan</span>
              <span className="border-2 border-ink px-1.5 py-0.5 md:px-2 md:py-1 bg-surface text-ink text-data-technical text-[11px] md:text-[14px] brutal-shadow-sm">denitri0609@gmail.com</span>
              <span className="border-2 border-ink px-1.5 py-0.5 md:px-2 md:py-1 bg-surface text-ink text-data-technical text-[11px] md:text-[14px] brutal-shadow-sm">github.com/denisptra</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
