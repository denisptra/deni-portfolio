"use client";

import { useEffect, useState } from "react";

interface Props {
  active: boolean;
  onComplete: () => void;
}

export default function UnlockPhase({ active, onComplete }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setShow(true), 300);
    const t2 = setTimeout(() => onComplete(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,245,240,0.03),#000_70%)]" />

      <div
        className={`text-center z-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Paw print SVG */}
        <div className="mx-auto mb-6" style={{ width: 110, height: 110 }}>
          <svg viewBox="0 0 120 120" width="110" height="110">
            <ellipse cx="60" cy="75" rx="25" ry="20" fill="#f5f5f0" />
            <circle cx="38" cy="48" r="10" fill="#f5f5f0" />
            <circle cx="54" cy="38" r="10" fill="#f5f5f0" />
            <circle cx="72" cy="38" r="10" fill="#f5f5f0" />
            <circle cx="85" cy="50" r="10" fill="#f5f5f0" />
            <ellipse cx="60" cy="75" rx="18" ry="14" fill="#e8e8e3" />
            <circle cx="38" cy="48" r="6" fill="#e8e8e3" />
            <circle cx="54" cy="38" r="6" fill="#e8e8e3" />
            <circle cx="72" cy="38" r="6" fill="#e8e8e3" />
            <circle cx="85" cy="50" r="6" fill="#e8e8e3" />
          </svg>
        </div>

        <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-[#f5f5f0] mb-3">
          Kita akan tetap ditemukan dengan cara lain
        </div>
        <div className="text-base text-white/40 font-light tracking-wide">
          Selamat datang di dunia Deni
        </div>
        <div className="mt-8 text-xs text-white/30 tracking-[0.25em] uppercase animate-pulse-hint">
          Membuka portofolio...
        </div>
      </div>
    </div>
  );
}
