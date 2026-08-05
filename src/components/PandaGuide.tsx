"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type GuideState = "idle" | "waving" | "sleeping" | "yawning" | "laughing" | "dizzy" | "fallen" | "pointing" | "surprised";

interface BambooPiece {
  id: number;
  x: number;
  y: number;
  found: boolean;
}

const BAMBOO_POSITIONS = [
  { x: 5, y: 15 },
  { x: 92, y: 25 },
  { x: 8, y: 55 },
  { x: 88, y: 70 },
  { x: 50, y: 90 },
  { x: 15, y: 85 },
  { x: 85, y: 45 },
  { x: 45, y: 10 },
];

export default function PandaGuide() {
  const [state, setState] = useState<GuideState>("idle");
  const [clickCount, setClickCount] = useState(0);
  const [bambooPieces, setBambooPieces] = useState<BambooPiece[]>(() =>
    BAMBOO_POSITIONS.map((pos, i) => ({ id: i, x: pos.x, y: pos.y, found: false }))
  );
  const [showSecretRoom, setShowSecretRoom] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ── IDLE DETECTION ──
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (state === "sleeping" || state === "yawning") {
        setState("idle");
      }
      idleTimerRef.current = setTimeout(() => {
        setState("yawning");
        setTimeout(() => setState("sleeping"), 1500);
      }, 15000);
    };

    resetIdle();
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("scroll", resetIdle);
    window.addEventListener("touchstart", resetIdle);
    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("touchstart", resetIdle);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [state]);

  // ── CLICK HANDLER ──
  const handleClick = useCallback(() => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

      if (newCount >= 10) {
        setState("dizzy");
        setTimeout(() => setState("fallen"), 1000);
        setTimeout(() => {
          setState("laughing");
          setTimeout(() => setState("idle"), 2000);
        }, 2500);
        return 0;
      }

      if (newCount >= 5) {
        setState("laughing");
        setTimeout(() => setState("idle"), 2000);
      } else {
        setState("waving");
        setTimeout(() => setState("idle"), 1500);
      }

      clickTimerRef.current = setTimeout(() => setClickCount(0), 3000);
      return newCount;
    });
  }, []);

  // ── BAMBOO CLICK ──
  const handleBambooClick = useCallback((id: number) => {
    setBambooPieces((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, found: true } : b));
      const allFound = updated.every((b) => b.found);
      if (allFound) {
        setTimeout(() => setShowSecretRoom(true), 1000);
      }
      return updated;
    });
  }, []);

  // ── MOUTH ANIMATION ──
  useEffect(() => {
    if (state === "waving" || state === "laughing") {
      const id = setInterval(() => setMouthOpen((p) => !p), 200);
      return () => clearInterval(id);
    }
    setMouthOpen(false);
  }, [state]);

  const allBambooFound = bambooPieces.every((b) => b.found);

  return (
    <>
      {/* Bamboo Easter Eggs */}
      {bambooPieces.map((piece) => (
        !piece.found && (
          <button
            key={piece.id}
            onClick={() => handleBambooClick(piece.id)}
            className="fixed z-[60] w-6 h-8 cursor-pointer hover:scale-125 transition-transform opacity-20 hover:opacity-60"
            style={{ left: `${piece.x}%`, top: `${piece.y}%` }}
            title="Bamboo!"
          >
            <svg viewBox="0 0 24 32" fill="none">
              <rect x="9" y="0" width="6" height="32" rx="3" fill="#4a7a2a" />
              <rect x="9" y="6" width="6" height="2" fill="#5a8a3a" />
              <rect x="9" y="16" width="6" height="2" fill="#5a8a3a" />
              <rect x="9" y="26" width="6" height="2" fill="#5a8a3a" />
              <ellipse cx="6" cy="8" rx="5" ry="3" fill="#3a6a1a" transform="rotate(-30 6 8)" />
              <ellipse cx="18" cy="20" rx="4" ry="2.5" fill="#3a6a1a" transform="rotate(25 18 20)" />
            </svg>
          </button>
        )
      ))}

      {/* Bamboo counter */}
      <div className="fixed bottom-4 right-4 z-[60] text-[0.65rem] text-white/20 font-[family-name:var(--font-mono)]">
        🎋 {bambooPieces.filter((b) => b.found).length}/{bambooPieces.length}
      </div>

      {/* Panda Guide (fixed bottom-left) */}
      <div
        className="fixed bottom-6 left-6 z-[60] cursor-pointer select-none"
        onClick={handleClick}
      >
        <div className={`transition-transform duration-300 ${
          state === "fallen" ? "rotate-90 translate-y-4" :
          state === "dizzy" ? "animate-spin" :
          state === "waving" ? "animate-bounce" :
          ""
        }`}>
          <svg viewBox="0 0 80 100" width={60} height={75}>
            {/* Body - rounder like Kung Fu Panda */}
            <ellipse cx="40" cy="65" rx="25" ry="20" fill="#f5f5f0" />
            {/* Belly patch */}
            <ellipse cx="40" cy="67" rx="16" ry="13" fill="#f8f4e8" />

            {/* Head - bigger and rounder */}
            <circle cx="40" cy="36" r="22" fill="#f5f5f0" />

            {/* Ears - round like Po */}
            <circle cx="22" cy="18" r="8" fill="#1a1a1a" />
            <circle cx="58" cy="18" r="8" fill="#1a1a1a" />
            <circle cx="22" cy="18" r="4.5" fill="#333" />
            <circle cx="58" cy="18" r="4.5" fill="#333" />

            {/* Eye patches - angled like Po */}
            <ellipse cx="31" cy="34" rx="8" ry="7" fill="#1a1a1a" transform="rotate(-8 31 34)" />
            <ellipse cx="49" cy="34" rx="8" ry="7" fill="#1a1a1a" transform="rotate(8 49 34)" />

            {/* Eyes - big and expressive like Po */}
            {state === "sleeping" ? (
              <>
                <path d="M26 34 Q31 30 36 34" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <path d="M44 34 Q49 30 54 34" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : state === "dizzy" ? (
              <>
                <text x="31" y="36" textAnchor="middle" fontSize="9" fill="#fff">×</text>
                <text x="49" y="36" textAnchor="middle" fontSize="9" fill="#fff">×</text>
              </>
            ) : (
              <>
                <circle cx="31" cy="34" r="4" fill="#fff" />
                <circle cx="49" cy="34" r="4" fill="#fff" />
                <circle cx="32" cy="34.5" r="2" fill="#111" />
                <circle cx="50" cy="34.5" r="2" fill="#111" />
                <circle cx="33" cy="33.5" r="0.8" fill="#fff" />
                <circle cx="51" cy="33.5" r="0.8" fill="#fff" />
              </>
            )}

            {/* Nose - triangle like Po */}
            <path d="M38 41 L42 41 L40 44 Z" fill="#222" />

            {/* Mouth */}
            {state === "laughing" && mouthOpen ? (
              <ellipse cx="40" cy="47" rx="5" ry="3.5" fill="#222" />
            ) : state === "yawning" ? (
              <ellipse cx="40" cy="47" rx="3.5" ry="4.5" fill="#222" />
            ) : state === "surprised" ? (
              <ellipse cx="40" cy="47" rx="2.5" ry="3.5" fill="#222" />
            ) : (
              <path d="M35 46 Q40 51 45 46" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
            )}

            {/* Blush - rosy cheeks like Po */}
            <circle cx="22" cy="40" r="4" fill="#e8a0a0" opacity="0.3" />
            <circle cx="58" cy="40" r="4" fill="#e8a0a0" opacity="0.3" />

            {/* Headband - like Kung Fu Panda */}
            <path d="M18 24 Q40 20 62 24" fill="none" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="40" cy="21" r="2" fill="#e74c3c" />

            {/* Arms */}
            {state === "waving" ? (
              <>
                <ellipse cx="16" cy="58" rx="6" ry="12" fill="#1a1a1a" transform="rotate(10 16 58)" />
                <ellipse cx="64" cy="50" rx="6" ry="12" fill="#1a1a1a" transform="rotate(-55 64 50)" />
                <circle cx="59" cy="41" r="5" fill="#f5f5f0" />
              </>
            ) : state === "sleeping" ? (
              <>
                <ellipse cx="16" cy="63" rx="6" ry="12" fill="#1a1a1a" transform="rotate(20 16 63)" />
                <ellipse cx="64" cy="63" rx="6" ry="12" fill="#1a1a1a" transform="rotate(-20 64 63)" />
              </>
            ) : (
              <>
                <ellipse cx="16" cy="58" rx="6" ry="12" fill="#1a1a1a" transform="rotate(10 16 58)" />
                <ellipse cx="64" cy="58" rx="6" ry="12" fill="#1a1a1a" transform="rotate(-10 64 58)" />
              </>
            )}

            {/* Feet - bigger like Po */}
            <ellipse cx="30" cy="82" rx="8" ry="5" fill="#1a1a1a" />
            <ellipse cx="50" cy="82" rx="8" ry="5" fill="#1a1a1a" />

            {/* ZZZ for sleeping */}
            {state === "sleeping" && (
              <g opacity="0.4">
                <text x="62" y="28" fontSize="11" fill="#fff" fontWeight="bold">Z</text>
                <text x="70" y="20" fontSize="8" fill="#fff" fontWeight="bold">z</text>
                <text x="76" y="14" fontSize="6" fill="#fff" fontWeight="bold">z</text>
              </g>
            )}

            {/* Stars for dizzy */}
            {state === "dizzy" && (
              <g opacity="0.5">
                <text x="18" y="18" fontSize="9" fill="#eab308">★</text>
                <text x="56" y="16" fontSize="7" fill="#eab308">★</text>
                <text x="35" y="12" fontSize="8" fill="#eab308">★</text>
              </g>
            )}
          </svg>
        </div>

        {/* Speech bubble */}
        {(state === "waving" || state === "laughing" || state === "yawning") && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <div className="bg-white/90 text-[#1a1a1a] text-[0.65rem] px-3 py-1.5 rounded-full font-medium shadow-lg">
              {state === "waving" && "Hey! I'm Po! 👋"}
              {state === "laughing" && "Haha! 😄"}
              {state === "yawning" && "So sleepy... 😴"}
            </div>
            <div className="w-2 h-2 bg-white/90 rotate-45 mx-auto -mt-1" />
          </div>
        )}
      </div>

      {/* Secret Room Modal */}
      {showSecretRoom && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowSecretRoom(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white text-xl"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-[#f5f5f0] mb-2 font-[family-name:var(--font-display)]">
              🎋 Po&apos;s Secret Room
            </h3>
            <p className="text-white/40 text-sm mb-6">
              You found all of Po&apos;s bamboo! Welcome to the panda&apos;s secret hideout.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Experimental Design", icon: "🎨", desc: "Visual experiments never published" },
                { title: "Hidden Projects", icon: "📦", desc: "Projects currently in development" },
                { title: "Funny Sketches", icon: "✏️", desc: "Silly and funny doodles" },
                { title: "Concept Art", icon: "🖼️", desc: "Design concepts for future projects" },
                { title: "Behind The Scenes", icon: "🎬", desc: "The process behind the scenes" },
                { title: "Personal Playground", icon: "🎮", desc: "Area for experimenting with new ideas" },
              ].map((item) => (
                <div key={item.title} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4 hover:border-white/10 transition-colors">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-[#f5f5f0] text-sm font-semibold mb-1">{item.title}</div>
                  <div className="text-white/30 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="text-4xl mb-2">🐼</div>
              <p className="text-white/30 text-xs">Thanks for finding all of Po&apos;s bamboo!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
