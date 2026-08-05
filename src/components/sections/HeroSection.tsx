"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import PandaMascot from "@/components/PandaMascot";
import { useLang } from "@/components/LangProvider";

function AnimatedNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const duration = 2000;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <span ref={ref}>0</span>;
}

function ParallaxOrbs() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const container = document.querySelector(".overflow-y-auto");
    if (!container) return;
    const onScroll = () => setScrollY(container.scrollTop);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          top: "10%", left: "-10%",
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          top: "30%", right: "-5%",
          transform: `translateY(${scrollY * -0.1}px)`,
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-[0.05] blur-[90px]"
        style={{
          background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
          bottom: "15%", left: "20%",
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      {[
        { x: 15, y: 20, size: 3, speed: 0.12, opacity: 0.15 },
        { x: 80, y: 35, size: 2, speed: -0.08, opacity: 0.1 },
        { x: 45, y: 60, size: 4, speed: 0.15, opacity: 0.08 },
        { x: 70, y: 75, size: 2.5, speed: -0.1, opacity: 0.12 },
        { x: 25, y: 85, size: 3, speed: 0.06, opacity: 0.1 },
        { x: 90, y: 15, size: 2, speed: -0.14, opacity: 0.08 },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: dot.size, height: dot.size,
            left: `${dot.x}%`, top: `${dot.y}%`,
            opacity: dot.opacity,
            transform: `translateY(${scrollY * dot.speed}px)`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLang();
  const [pandaHover, setPandaHover] = useState(false);
  const [pandaClicks, setPandaClicks] = useState(0);
  const [pandaExpression, setPandaExpression] = useState<"happy" | "excited" | "surprised">("happy");

  const handlePandaClick = useCallback(() => {
    setPandaClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setPandaExpression("excited");
        setTimeout(() => setPandaExpression("happy"), 2000);
        return 0;
      }
      if (next >= 3) setPandaExpression("surprised");
      else setPandaExpression("excited");
      setTimeout(() => setPandaExpression("happy"), 1500);
      return next;
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-[5%] relative overflow-hidden">
      <ParallaxOrbs />

      <div className="relative z-10 text-center mt-12">
        <div
          className="mb-4 animate-fade-in-up cursor-pointer select-none"
          style={{ animationDelay: "0.1s" }}
          onMouseEnter={() => { setPandaHover(true); setPandaExpression("excited"); }}
          onMouseLeave={() => { setPandaHover(false); setPandaExpression("happy"); }}
          onClick={handlePandaClick}
        >
          <PandaMascot pose={pandaHover ? "jumping-happy" : "waving"} size={200} expression={pandaExpression} />
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,5rem)] font-extrabold leading-[1.05] mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <span className="block text-[#f5f5f0]">Deni Trio</span>
          <span className="block text-[#f5f5f0]">Saputra</span>
        </h1>

        <p className="text-[0.8rem] text-white/30 tracking-[0.15em] uppercase mb-4 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          {t("hero.role1")} — {t("hero.role2")}
        </p>

        <p className="text-[0.95rem] leading-[1.7] text-white/40 max-w-[480px] mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {t("hero.desc")}
        </p>

        <div className="flex gap-10 flex-wrap justify-center mb-10 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          {[
            { target: 4, suffix: "+", key: "hero.stat.projects" },
            { target: 3, suffix: "+", key: "hero.stat.years" },
            { target: 10, suffix: "+", key: "hero.stat.skills" },
          ].map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="font-[family-name:var(--font-display)] text-[2rem] font-bold text-[#f5f5f0] leading-none">
                <AnimatedNumber target={stat.target} />
                <span className="text-[1rem] text-white/25">{stat.suffix}</span>
              </div>
              <div className="text-[0.7rem] text-white/25 mt-1 tracking-[0.05em]">{t(stat.key)}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-[0.85rem] font-semibold text-[#1a1a1a] bg-[#f5f5f0] rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
          >
            {t("hero.cta.works")}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-[0.85rem] font-medium text-white/50 border border-white/[0.08] rounded-full hover:border-white/15 hover:text-white transition-all duration-300"
          >
            {t("hero.cta.contact")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.5s" }}>
        <span className="text-[0.65rem] text-white/20 tracking-[0.15em] uppercase">{t("hero.scroll")}</span>
        <div className="w-[1px] h-[25px] bg-gradient-to-b from-white/15 to-transparent animate-scroll-pulse" />
      </div>
    </section>
  );
}
