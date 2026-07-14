"use client";

import React from "react";

export default function ToolsSection() {
  const skillCategories = [
    {
      title: "FRONTEND",
      skills: ["React JS / Next JS", "Vite", "Flutter / Dart", "UI/UX Design"],
    },
    {
      title: "BACKEND & DATA",
      skills: ["Laravel", "Express JS", "PostgreSQL / MySQL", "API & Integrasi"],
    },
    {
      title: "LAINNYA",
      skills: ["Unity (Game Dev)", "Arduino / Robotics", "Desain Grafis"],
    },
    {
      title: "SOFT SKILL",
      skills: ["Problem Solving", "Analytical Thinking", "Team Collaboration", "Communication", "Adaptability"],
    },
  ];

  return (
    <section className="relative w-full max-w-container-max mx-auto" id="keahlian">
      <div className="inline-block bg-archive-yellow border-t-thick border-x-thick border-ink px-3 md:px-4 py-1.5 md:py-2 text-label-mono text-[10px] md:text-[12px] font-bold uppercase relative z-10 -mb-[3px]">
        MATRIKS KEAHLIAN
      </div>

      <div className="border-thick border-ink bg-paper p-4 md:p-8 brutal-shadow relative">
        <h2 className="text-headline-section text-ink mb-6 md:mb-8 uppercase border-b-2 border-dashed border-ink pb-3 md:pb-4">
          Keahlian Teknis &amp; Soft Skill
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="border-2 border-ink bg-surface brutal-shadow-sm flex flex-col h-full">
              <div className="bg-archive-yellow border-b-2 border-ink p-2 md:p-3 text-label-mono text-[10px] md:text-[12px] font-bold uppercase flex justify-between items-center">
                <span>{cat.title}</span>
                <span className="text-stempel-red font-bold">[x]</span>
              </div>
              <div className="p-3 md:p-4 flex-1">
                <ul className="text-data-technical text-[13px] md:text-[14px] space-y-2 md:space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 before:content-['>'] before:text-stempel-red before:font-bold before:text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
