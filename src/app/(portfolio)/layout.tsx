"use client";

import FloatingNav from "@/components/FloatingNav";
import AnimateOnMount from "@/components/AnimateOnMount";
import PandaGuide from "@/components/PandaGuide";
import BambooHint from "@/components/BambooHint";
import StarField from "@/components/StarField";
import PageTransition from "@/components/PageTransition";
import { LangProvider } from "@/components/LangProvider";

function BackgroundPatterns() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      {/* Floating orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.025]"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          bottom: "10%",
          right: "-5%",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
          top: "40%",
          left: "30%",
        }}
      />
      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.008]">
        <defs>
          <pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>
    </div>
  );
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LangProvider>
      <div className="fixed inset-0 z-30 bg-[#0a0a0b]">
        <StarField />
        <BackgroundPatterns />
        <FloatingNav />
        <div className="w-full h-full overflow-y-auto overflow-x-hidden relative z-10">
          <AnimateOnMount>
            <PageTransition>{children}</PageTransition>
          </AnimateOnMount>
        </div>
        <PandaGuide />
        <BambooHint />
      </div>
    </LangProvider>
  );
}
