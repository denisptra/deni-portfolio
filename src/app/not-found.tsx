"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Panda404SVG() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="110" cy="135" rx="62" ry="58" fill="#f5f5f0" />
      {/* Belly patch */}
      <ellipse cx="110" cy="140" rx="35" ry="30" fill="#e8e8e3" />
      {/* Head */}
      <circle cx="110" cy="75" r="48" fill="#f5f5f0" />
      {/* Ears */}
      <circle cx="72" cy="42" r="16" fill="#1a1a1a" />
      <circle cx="148" cy="42" r="16" fill="#1a1a1a" />
      <circle cx="72" cy="42" r="8" fill="#444" />
      <circle cx="148" cy="42" r="8" fill="#444" />
      {/* Eye patches */}
      <ellipse cx="90" cy="72" rx="16" ry="14" fill="#1a1a1a" transform="rotate(-10 90 72)" />
      <ellipse cx="130" cy="72" rx="16" ry="14" fill="#1a1a1a" transform="rotate(10 130 72)" />
      {/* Eyes */}
      <circle cx="90" cy="72" r="7" fill="#fff" />
      <circle cx="130" cy="72" r="7" fill="#fff" />
      <circle cx="92" cy="73" r="3.5" fill="#111" />
      <circle cx="132" cy="73" r="3.5" fill="#111" />
      <circle cx="93.5" cy="71.5" r="1.2" fill="#fff" />
      <circle cx="133.5" cy="71.5" r="1.2" fill="#fff" />
      {/* Nose */}
      <path d="M105 84 Q110 90 115 84" fill="#1a1a1a" />
      {/* Mouth — sad */}
      <path d="M98 96 Q110 90 122 96" stroke="#1a1a1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="78" cy="88" r="7" fill="#f5a0a0" opacity="0.35" />
      <circle cx="142" cy="88" r="7" fill="#f5a0a0" opacity="0.35" />
      {/* Paws holding sign */}
      <ellipse cx="78" cy="145" rx="12" ry="10" fill="#1a1a1a" />
      <ellipse cx="142" cy="145" rx="12" ry="10" fill="#1a1a1a" />
      {/* 404 sign */}
      <rect x="68" y="110" width="84" height="36" rx="8" fill="#1a1a1a" />
      <text x="110" y="134" textAnchor="middle" fill="#f5f5f0" fontSize="20" fontWeight="700" fontFamily="var(--font-display), system-ui">404</text>
      {/* Tear */}
      <path d="M92 80 Q90 88 92 86" stroke="#88c8f8" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0b] flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.04] bg-blue-500" />
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.03] bg-purple-500 translate-x-[-20%] translate-y-[10%]" />

      {/* Stars (same as portfolio) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `pulseHint ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="relative z-10 flex flex-col items-center gap-6 text-center px-6"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Panda404SVG />

        <h1
          className="text-[7rem] font-bold leading-none tracking-tighter"
          style={{
            fontFamily: "var(--font-display), system-ui",
            background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.3))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>

        <p
          className="text-white/40 text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-syne), system-ui" }}
        >
          This page wandered off into the bamboo forest
        </p>

        <div className="flex gap-3 mt-4">
          <Link
            href="/home"
            className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm tracking-wide hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
            style={{ fontFamily: "var(--font-display), system-ui" }}
          >
            Go Home
          </Link>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400/80 text-sm tracking-wide hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/30 transition-all duration-300"
            style={{ fontFamily: "var(--font-display), system-ui" }}
          >
            Play Puzzle
          </Link>
        </div>
      </div>
    </div>
  );
}
