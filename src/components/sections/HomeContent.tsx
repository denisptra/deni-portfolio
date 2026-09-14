"use client";

import Image from "next/image";
import Link from "next/link";

function SkillBar({ label, color, width }: { label: string; color: string; width: string }) {
  return (
    <div className="flex items-center gap-3 mb-[6px]">
      <span className="text-[11px] md:text-[12px] text-[#555] w-[75px] md:w-[90px] font-[family-name:var(--font-jakarta)]">{label}</span>
      <div className="flex-1 h-[5px] bg-[#e8e4de] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] font-[family-name:var(--font-jakarta)]">
      {/* Hero Fixed Background */}
      <section className="fixed inset-0 w-full h-screen z-0">
        <Image
          src="/hero.png"
          alt="Portfolio Illustration"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 h-[150px] md:h-[200px] bg-gradient-to-t from-[#f5f0e8] to-transparent" />

        {/* PORTFOLIO Text with Gradient Card */}
        <div className="absolute top-0 left-0 right-0 px-5 md:px-[8%] pt-[4vh] md:pt-[5vh]">
          <div
            className="inline-block rounded-xl md:rounded-2xl px-5 py-4 md:px-8 md:py-5 shadow-lg"
            style={{
              background: "linear-gradient(135deg, rgba(26,58,110,0.9) 0%, rgba(26,26,46,0.95) 50%, rgba(124,58,237,0.85) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h1 className="font-[family-name:var(--font-sora)] font-extrabold text-[clamp(2.2rem,9vw,6rem)] leading-[0.88] text-white tracking-tight">
              PORT<br />
              <span className="text-[#a5b4fc]">FOLIO</span>
            </h1>
            <div className="flex items-center gap-3 mt-2 md:mt-3">
              <span className="font-[family-name:var(--font-sora)] font-semibold text-[11px] md:text-[13px] text-white/80 bg-white/15 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full">2026</span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[75vh] md:h-[85vh]" />

      {/* Content Card */}
      <section className="relative z-10 w-full px-4 md:px-20">
        <div className="bg-white rounded-t-[24px] md:rounded-t-[32px] shadow-[0_-4px_30px_rgba(0,0,0,0.04)] px-5 md:px-[8%] pt-8 md:pt-12 pb-10 md:pb-16">

          {/* About Me */}
          <h2 className="font-[family-name:var(--font-playfair)] italic text-[18px] md:text-[20px] text-[#999] mb-5 md:mb-6">About Me!</h2>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="flex-1">
              <h1 className="font-[family-name:var(--font-sora)] font-extrabold text-[24px] md:text-[30px] leading-[1.05] text-[#1a1a2e] tracking-tight uppercase">
                Deni Trio<br />Saputra
              </h1>
              <p className="text-[11px] md:text-[12px] text-[#888] mt-1 mb-4 md:mb-5 font-[family-name:var(--font-jakarta)]">A.K.A Deni</p>
              <p className="text-[12px] md:text-[13px] leading-[1.8] text-[#555] font-[family-name:var(--font-jakarta)]">
                Hi, I&apos;m Deni. I&apos;m a Computer Science student who enjoys working at the intersection of design and technology. I love turning messy ideas into simple, useful and visually engaging digital experiences. From researching user problems and creating interfaces in Figma to building functional products with code, I enjoy being involved throughout the process.
              </p>
            </div>

            <div className="shrink-0 flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 w-full md:w-auto">
              <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <Image src="/images.jpg" alt="Deni" width={180} height={180} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2 md:mt-5 text-[11px] md:text-[12px] text-[#444]">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  <span>denisptra_69</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13 2 4" />
                  </svg>
                  <span className="break-all md:break-normal">denitri0609@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#e8e4de] my-8 md:my-10" />

          {/* Bottom: Education + Softwares */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left */}
            <div>
              <div className="mb-8 md:mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-[family-name:var(--font-sora)] font-bold text-[20px] md:text-[24px] text-[#1a1a2e]">Education</h3>
                  <svg className="w-5 h-5 text-[#e85d3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <p className="text-[12px] md:text-[13px] leading-[1.7] text-[#555] ml-7">
                  Currently studying at<br />Cakrawala University.
                </p>
              </div>

              <div className="mb-8 md:mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-[family-name:var(--font-sora)] font-bold text-[20px] md:text-[24px] text-[#1a1a2e]">Skills</h3>
                  <svg className="w-4 h-4 text-[#e85d3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <ul className="text-[12px] md:text-[13px] leading-[2.2] text-[#555] ml-7 list-disc list-inside">
                  <li>UI UX Design</li>
                  <li>Web Development</li>
                  <li>Mobile Apps</li>
                </ul>
              </div>

              <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a2e] text-white text-[12px] font-semibold rounded-full hover:bg-[#1a3a6e] transition-colors">
                View Projects
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right: Softwares */}
            <div>
              <h3 className="font-[family-name:var(--font-sora)] font-bold text-[20px] md:text-[24px] text-[#1a1a2e] mb-5">Softwares</h3>

              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-6">
                {/* Figma */}
                <div className="flex flex-col items-center gap-1 md:gap-1.5">
                  <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-[12px] md:rounded-[14px] flex items-center justify-center shadow-md bg-white border border-[#eee] overflow-hidden p-1.5 md:p-2">
                    <Image src="/Figma-logo.svg.webp" alt="Figma" width={40} height={40} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-[#777] font-medium">Figma</span>
                </div>

                {/* Illustrator */}
                <div className="flex flex-col items-center gap-1 md:gap-1.5">
                  <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-[12px] md:rounded-[14px] flex items-center justify-center shadow-md bg-white border border-[#eee] overflow-hidden p-1 md:p-1.5">
                    <Image src="/Adobe_Illustrator_CC_icon.svg.webp" alt="Illustrator" width={40} height={40} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-[#777] font-medium">Illustrator</span>
                </div>

                {/* Premiere */}
                <div className="flex flex-col items-center gap-1 md:gap-1.5">
                  <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-[12px] md:rounded-[14px] flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg, #0a0040 0%, #2a0080 100%)" }}>
                    <span className="text-[18px] md:text-[22px] font-black italic text-[#9999ff]" style={{ fontFamily: "'Myriad Pro', 'Segoe UI', sans-serif", fontWeight: 900 }}>Pr</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] text-[#777] font-medium">Premiere</span>
                </div>

                {/* Photoshop */}
                <div className="flex flex-col items-center gap-1 md:gap-1.5">
                  <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-[12px] md:rounded-[14px] flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg, #001a33 0%, #003366 100%)" }}>
                    <span className="text-[18px] md:text-[22px] font-black italic text-[#31a8ff]" style={{ fontFamily: "'Myriad Pro', 'Segoe UI', sans-serif", fontWeight: 900 }}>Ps</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] text-[#777] font-medium">Photoshop</span>
                </div>

                {/* Capcut */}
                <div className="flex flex-col items-center gap-1 md:gap-1.5">
                  <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-[12px] md:rounded-[14px] flex items-center justify-center shadow-md bg-white border border-[#eee] overflow-hidden p-1 md:p-1.5">
                    <Image src="/Capcut-icon.svg.webp" alt="Capcut" width={40} height={40} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-[#777] font-medium">Capcut</span>
                </div>

                {/* Antigravity */}
                <div className="flex flex-col items-center gap-1 md:gap-1.5">
                  <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-[12px] md:rounded-[14px] flex items-center justify-center shadow-md bg-white border border-[#eee] overflow-hidden p-1 md:p-1.5">
                    <Image src="/Google-Antigravity-Icon-Full-Color.png" alt="Antigravity" width={40} height={40} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-[#777] font-medium">Antigravity</span>
                </div>
              </div>

              <div className="space-y-0.5 md:space-y-1">
                <SkillBar label="Figma" color="#a259ff" width="92%" />
                <SkillBar label="Illustrator" color="#ff9a00" width="85%" />
                <SkillBar label="Capcut" color="#1a1a2e" width="75%" />
                <SkillBar label="Antigravity" color="#a855f7" width="65%" />
                <SkillBar label="Photoshop" color="#31a8ff" width="70%" />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
