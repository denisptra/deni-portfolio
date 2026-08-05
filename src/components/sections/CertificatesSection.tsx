"use client";

import PandaMascot from "@/components/PandaMascot";
import { useLang } from "@/components/LangProvider";

function CertIcon({ type, color }: { type: string; color: string }) {
  const icons: Record<string, React.JSX.Element> = {
    "csharp": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-8h2v8zm-4-10h2v2h-2V7z"/>
      </svg>
    ),
    "python": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M12 2c-1.65 0-3.15.5-4.45 1.35l1.55 1.55c.75-.45 1.65-.7 2.6-.7 2.5 0 4.5 2 4.5 4.5 0 .95-.25 1.85-.7 2.6l1.55 1.55c.85-1.3 1.35-2.8 1.35-4.45C18.5 5.15 15.85 2 12 2zm0 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.55 8.45l-1.55-1.55C4.35 8 3.5 9.5 3.5 11.2c0 2.5 2 4.5 4.5 4.5.95 0 1.85-.25 2.6-.7l1.55 1.55c-1.3.85-2.8 1.35-4.45 1.35C4.15 17.9 1 14.75 1 11.2c0-2.15 1.1-4.05 2.8-5.2l1.55 1.55c.75.45 1.65.7 2.6.7 1.1 0 2-.9 2-2s-.9-2-2-2c-.95 0-1.85.25-2.6.7L7.55 8.45z"/>
      </svg>
    ),
    "react": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <circle cx="12" cy="12" r="2.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(120 12 12)"/>
      </svg>
    ),
    "uiux": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <circle cx="17.5" cy="17.5" r="3.5"/>
      </svg>
    ),
    "unity": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M10.5 2L4 13h5l-1.5 9L20 11h-5l1.5-9z"/>
      </svg>
    ),
    "flutter": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M14.3 3.5L7 11l3.5 3.5L21 3.5h-6.7zM7 14.5l3.5 3.5L7 21.5l-3.5-3.5L7 14.5z"/>
      </svg>
    ),
    "laravel": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M21.8 5.3c-.1-.2-.4-.3-.6-.2l-6.2 2.7c-.3.1-.5.4-.5.7v5.4c0 .3-.2.5-.4.6l-2.5 1.1c-.2.1-.4.4-.4.6v3.6c0 .2.1.4.3.5l5.6 3.2c.2.1.4 0 .5-.2l6.3-11.2c.2-.2.1-.5-.1-.6zm-8.8 9.7v-3.4l4.2-1.8-4.2-1.8v3.4l-4.2 1.8 4.2 1.8z"/>
      </svg>
    ),
    "nodejs": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M12 2l-8 4.5v7l8 4.5 8-4.5v-7L12 2zm0 2.2L18 7.5v5l-6 3.4L6 12.5v-5l6-3.3z"/>
      </svg>
    ),
    "algo": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="6" cy="6" r="3"/>
        <circle cx="18" cy="6" r="3"/>
        <circle cx="12" cy="18" r="3"/>
        <line x1="8" y1="7.5" x2="11" y2="16"/>
        <line x1="16" y1="7.5" x2="13" y2="16"/>
      </svg>
    ),
    "db": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.5">
        <ellipse cx="12" cy="6" rx="8" ry="3"/>
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
      </svg>
    ),
  };

  return icons[type] || (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

export default function CertificatesSection() {
  const { t } = useLang();
  const certificates = [
    { title: "Fundamental C# & Object-Oriented Programming", issuer: "MySkill", date: "2025", color: "#68a063", icon: "csharp" },
    { title: "Machine Learning with Python", issuer: "MySkill", date: "2025", color: "#3776ab", icon: "python" },
    { title: "React JS Essentials", issuer: "MySkill", date: "2024", color: "#61dafb", icon: "react" },
    { title: "UI/UX Design Fundamentals", issuer: "MySkill", date: "2024", color: "#ff7262", icon: "uiux" },
    { title: "Game Development with Unity", issuer: "Dicoding", date: "2024", color: "#ffffff", icon: "unity" },
    { title: "Mobile Development with Flutter", issuer: "Dicoding", date: "2024", color: "#02569b", icon: "flutter" },
    { title: "Web Development with Laravel", issuer: "MySkill", date: "2023", color: "#ff2d20", icon: "laravel" },
    { title: "Backend Node.js Fundamentals", issuer: "MySkill", date: "2023", color: "#68a063", icon: "nodejs" },
    { title: "Data Structures & Algorithms", issuer: "HackerRank", date: "2023", color: "#2ec866", icon: "algo" },
    { title: "PostgreSQL Database Design", issuer: "MySkill", date: "2023", color: "#336791", icon: "db" },
  ];

  return (
    <section className="py-[80px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <div data-animate className="font-[family-name:var(--font-mono)] text-[0.75rem] text-white/30 tracking-[0.15em] uppercase mb-5">
          {t("cert.label")}
        </div>
        <div className="flex items-center gap-4 mb-10">
          <h2 data-animate className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.2] text-[#f5f5f0]">
            {t("cert.title")}
          </h2>
          <PandaMascot pose="thumbs-up" size={80} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <div
              key={cert.title}
              data-scroll="up"
              className="p-5 bg-white/[0.02] border border-white/[0.04] rounded-[14px] hover:border-white/[0.08] transition-all duration-300 group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${cert.color}12` }}
                >
                  <CertIcon type={cert.icon} color={cert.color} />
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[0.7rem] text-white/20">{cert.date}</span>
              </div>
              <h3 className="text-[0.9rem] font-semibold text-white/70 mb-2 leading-snug">{cert.title}</h3>
              <p className="font-[family-name:var(--font-mono)] text-[0.7rem] text-white/25 tracking-wide">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
