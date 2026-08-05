"use client";

import { useEffect, useState } from "react";

interface Props {
  active: boolean;
  onComplete: () => void;
}

export default function IntroPhase({ active, onComplete }: Props) {
  const [line1, setLine1] = useState(false);
  const [line2, setLine2] = useState(false);
  const [hint, setHint] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setLine1(true), 800);
    const t2 = setTimeout(() => setLine2(true), 2800);
    const t3 = setTimeout(() => setHint(true), 4000);
    const t4 = setTimeout(() => setFadeOut(true), 5500);
    const t5 = setTimeout(() => onComplete(), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-none select-none">
      <div className="text-center z-10">
        <p
          className={`font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[0.02em] text-white/85 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            line1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          } ${fadeOut ? "opacity-0 -translate-y-2.5" : ""}`}
        >
          Mati lampu.
        </p>
        <p
          className={`font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[0.02em] text-white/85 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] mt-4 ${
            line2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          } ${fadeOut ? "opacity-0 -translate-y-2.5" : ""}`}
        >
          Bisakah kamu menemukanku?
        </p>
      </div>

      <div
        className={`absolute bottom-[15%] transition-opacity duration-1000 delay-500 z-10 ${
          hint && !fadeOut ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[0.85rem] text-white/30 tracking-[0.12em] uppercase animate-pulse-hint">
          Gerakkan mouse untuk menjelajah
        </span>
      </div>
    </div>
  );
}
