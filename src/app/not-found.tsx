"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const funnyMessages = [
  "Halaman ini kayak semangat hari Senin... nggak ada.",
  "404: Page not found. Kayak duit di akhir bulan.",
  "Ups! Halaman ini pindah ke dimensi lain.",
  "Error 404: Kamu tersesat, tapi aku bisa bantu.",
  "Halaman ini diculik alien. Sabar ya.",
];

const stickerEmojis = ["😵", "🥴", "🤯", "🫠", "💀", "🤡", "👻", "🚀"];

export default function NotFound() {
  const [msg] = useState(() => funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setBounce(b => !b), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-5 md:px-6 overflow-hidden relative">
      {/* Floating stickers - hidden on very small screens */}
      {stickerEmojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-[1.5rem] md:text-[2rem] opacity-20 animate-float hidden sm:block"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      <div className="text-center relative z-10">
        <div className="relative inline-block">
          <h1 className="font-[family-name:var(--font-sora)] font-extrabold text-[100px] md:text-[140px] leading-none text-[#1a1a2e] select-none">
            404
          </h1>
          <span
            className="absolute -top-2 -right-2 md:-top-4 md:-right-4 text-[2rem] md:text-[3rem] transition-transform duration-500"
            style={{ transform: bounce ? "rotate(15deg) scale(1.1)" : "rotate(-10deg) scale(1)" }}
          >
            🤣
          </span>
        </div>

        <p className="font-[family-name:var(--font-sora)] font-semibold text-[14px] md:text-[16px] text-[#1a1a2e] mt-3 md:mt-4 max-w-[340px] md:max-w-[380px]">
          {msg}
        </p>

        <div className="mt-3 md:mt-4 flex items-center justify-center gap-2">
          <span className="text-[1.2rem] md:text-[1.5rem]">🫣</span>
          <span className="text-[11px] md:text-[12px] text-[#888]">kayaknya kamu nyasar deh</span>
          <span className="text-[1.2rem] md:text-[1.5rem]">🫣</span>
        </div>

        <div className="flex justify-center gap-2 md:gap-3 mt-5 md:mt-6">
          {["🥴", "😵‍💫", "🫠", "💀", "🤡"].map((s, i) => (
            <span key={i} className="text-[1.2rem] md:text-[1.5rem] hover:scale-125 transition-transform cursor-default">
              {s}
            </span>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-6 md:mt-8 px-5 md:px-6 py-2.5 md:py-3 bg-[#1a1a2e] text-white text-[12px] md:text-[13px] font-semibold rounded-full hover:bg-[#1a3a6e] transition-all hover:scale-105"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Balik ke Rumah
        </Link>

        <p className="text-[9px] md:text-[10px] text-[#bbb] mt-5 md:mt-6 italic">
          *rumornya halaman ini ada di parallel universe*
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.35; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
