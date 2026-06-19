"use client";

import { useApp } from "@/context/AppContext";
import { frameworks, tools } from "@/data/portfolio";

export default function ToolsSection() {
  const { t } = useApp();

  // Duplicate items to ensure smooth infinite loop
  const frameworksList = [...frameworks, ...frameworks, ...frameworks];
  const toolsList = [...tools, ...tools, ...tools];

  return (
    <section className="py-20 bg-white border-b border-[#eef0f2]">
      <div className="max-w-7xl mx-auto text-center space-y-16 overflow-hidden">
        {/* 1. Frameworks Section */}
        <div className="space-y-6">
          <p className="text-[#37352f]/40 font-bold uppercase tracking-[0.2em] text-[11px] px-6">
            {t.tools.frameworksTitle}
          </p>
          
          {/* Marquee Wrapper */}
          <div className="marquee-container w-full overflow-hidden relative py-4 mask-gradient">
            <div className="marquee-content gap-6 flex">
              {frameworksList.map((fw, idx) => (
                <div
                  key={`${fw.name}-${idx}`}
                  className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 group cursor-pointer transition-all hover:-translate-y-1 hover:border-[#1F9CF0] hover:shadow-lg hover:shadow-blue-50 border border-[#eef0f2] bg-white rounded-2xl p-4"
                  title={fw.name}
                >
                  <div className="w-full h-full flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={fw.icon}
                      alt={fw.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Tools Section */}
        <div className="space-y-6">
          <p className="text-[#37352f]/40 font-bold uppercase tracking-[0.2em] text-[11px] px-6">
            {t.tools.toolsTitle}
          </p>

          {/* Marquee Wrapper (Reverse Scroll) */}
          <div className="marquee-container w-full overflow-hidden relative py-4 mask-gradient">
            <div className="marquee-content-reverse gap-6 flex">
              {toolsList.map((tool, idx) => (
                <div
                  key={`${tool.name}-${idx}`}
                  className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 group cursor-pointer transition-all hover:-translate-y-1 hover:border-[#1F9CF0] hover:shadow-lg hover:shadow-blue-50 border border-[#eef0f2] bg-white rounded-2xl p-4"
                  title={tool.name}
                >
                  <div className="w-full h-full flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
