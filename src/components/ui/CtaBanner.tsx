"use client";

import Link from "next/link";

interface CtaBannerProps {
  variant?: "light" | "dark";
  emoji?: string;
  title: string;
  subtitle: string;
  buttonText: string;
  href?: string;
  download?: boolean | string;
}

export default function CtaBanner({
  variant = "light",
  emoji = "👀",
  title,
  subtitle,
  buttonText,
  href,
  download,
}: CtaBannerProps) {
  const isDark = variant === "dark";

  return (
    <section className="py-24 px-6 bg-white">
      <div className={`max-w-6xl mx-auto rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl ${
        isDark ? "bg-black text-white" : "bg-[#1F9CF0] text-white"
      }`}>
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Emoji Box */}
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center text-3xl mb-10 border border-white/10 animate-bounce">
            {emoji}
          </div>
          
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight max-w-4xl leading-tight">
            {title}
          </h2>
          
          {/* Description */}
          <p className={`text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed ${
            isDark ? "text-gray-400" : "text-white/80"
          }`}>
            {subtitle}
          </p>
          
          {/* Button Link */}
          {download ? (
            <a
              href={href || "/CV.pdf"}
              download={download === true ? "" : download}
              className="bg-white hover:bg-gray-100 text-black px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95 text-lg text-center"
            >
              {buttonText}
            </a>
          ) : (
            <Link
              href={href || "/contact"}
              className="bg-white hover:bg-gray-100 text-black px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95 text-lg text-center"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
