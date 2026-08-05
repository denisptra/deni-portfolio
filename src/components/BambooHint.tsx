"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LangProvider";

interface BambooPiece {
  id: number;
  x: number;
  y: number;
  found: boolean;
}

const BAMBOO_POSITIONS = [
  { x: 8, y: 20 },
  { x: 92, y: 30 },
  { x: 5, y: 60 },
  { x: 88, y: 75 },
  { x: 50, y: 92 },
  { x: 12, y: 88 },
  { x: 90, y: 50 },
  { x: 48, y: 8 },
];

export default function BambooHint() {
  const { t } = useLang();
  const [bambooPieces, setBambooPieces] = useState<BambooPiece[]>(() =>
    BAMBOO_POSITIONS.map((pos, i) => ({ id: i, x: pos.x, y: pos.y, found: false }))
  );
  const [showMessage, setShowMessage] = useState(false);
  const [allFound, setAllFound] = useState(false);

  const foundCount = bambooPieces.filter((b) => b.found).length;

  useEffect(() => {
    if (foundCount > 0 && foundCount < 8) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
    if (foundCount === 8) {
      setAllFound(true);
      setShowMessage(true);
    }
  }, [foundCount]);

  const handleBambooClick = (id: number) => {
    setBambooPieces((prev) =>
      prev.map((b) => (b.id === id ? { ...b, found: true } : b))
    );
  };

  return (
    <>
      {/* Bamboo pieces scattered across the page */}
      {bambooPieces.map((piece) =>
        !piece.found ? (
          <button
            key={piece.id}
            onClick={() => handleBambooClick(piece.id)}
            className="fixed z-[60] cursor-pointer group transition-all duration-300 hover:scale-125"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            title="Find Po's bamboo!"
          >
            <svg
              viewBox="0 0 16 32"
              className="w-3 h-6 opacity-20 group-hover:opacity-50 transition-opacity duration-300"
              fill="#4ade80"
            >
              <rect x="6" y="0" width="4" height="32" rx="2" />
              <rect x="4" y="8" width="8" height="1.5" rx="0.5" />
              <rect x="4" y="18" width="8" height="1.5" rx="0.5" />
              <path d="M10 8 Q14 4 12 0" fill="none" stroke="#4ade80" strokeWidth="1" />
              <path d="M10 18 Q15 14 13 10" fill="none" stroke="#4ade80" strokeWidth="0.8" />
            </svg>
          </button>
        ) : null
      )}

      {/* Found bamboo pieces counter */}
      <div className="fixed bottom-20 right-5 z-[60] flex items-center gap-2 px-3 py-2 bg-[rgba(14,14,16,0.85)] backdrop-blur-[12px] border border-white/[0.05] rounded-full">
        <svg viewBox="0 0 16 32" className="w-3 h-5" fill="#4ade80">
          <rect x="6" y="0" width="4" height="32" rx="2" />
          <rect x="4" y="8" width="8" height="1.5" rx="0.5" />
          <rect x="4" y="18" width="8" height="1.5" rx="0.5" />
        </svg>
        <span className="text-[0.7rem] text-white/40 font-[family-name:var(--font-mono)]">
          {foundCount}/8
        </span>
      </div>

      {/* Hint message */}
      {showMessage && !allFound && foundCount > 0 && (
        <div className="fixed bottom-32 right-5 z-[60] px-4 py-2 bg-[rgba(14,14,16,0.9)] backdrop-blur-[12px] border border-green-500/20 rounded-xl text-[0.75rem] text-green-400/70 animate-fade-in">
          {t("bamboo.found")} ({foundCount}/8)
        </div>
      )}

      {/* All found message */}
      {allFound && (
        <div className="fixed bottom-32 right-5 z-[60] px-4 py-3 bg-[rgba(14,14,16,0.9)] backdrop-blur-[12px] border border-green-500/30 rounded-xl text-[0.8rem] text-green-400/80 animate-fade-in-scale">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐼</span>
            <span>{t("bamboo.allFound")}</span>
          </div>
        </div>
      )}
    </>
  );
}
