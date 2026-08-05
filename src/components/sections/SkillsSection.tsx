"use client";

import { useLang } from "@/components/LangProvider";

export default function SkillsSection() {
  const { t } = useLang();
  const categories = [
    {
      id: "frontend",
      title: "FRONTEND",
      skills: [
        { name: "React JS / Next JS", icon: "React" },
        { name: "Vite", icon: "Vite" },
        { name: "Flutter / Dart", icon: "Flutter" },
        { name: "UI/UX Design", icon: "Design" },
      ],
    },
    {
      id: "backend",
      title: "BACKEND & DATA",
      skills: [
        { name: "Laravel", icon: "Laravel" },
        { name: "Express JS", icon: "Express" },
        { name: "PostgreSQL / MySQL", icon: "DB" },
        { name: "API & Integration", icon: "API" },
      ],
    },
    {
      id: "other",
      title: "OTHERS",
      skills: [
        { name: "Unity (Game Dev)", icon: "Unity" },
        { name: "Arduino / Robotics", icon: "IoT" },
        { name: "Graphic Design", icon: "Design" },
      ],
    },
    {
      id: "soft",
      title: "SOFT SKILLS",
      skills: [
        { name: "Problem Solving", icon: "Solve" },
        { name: "Analytical Thinking", icon: "Think" },
        { name: "Teamwork", icon: "Team" },
        { name: "Communication", icon: "Talk" },
        { name: "Adaptability", icon: "Flex" },
      ],
    },
  ];

  return (
    <section className="py-[80px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <div data-animate className="font-[family-name:var(--font-mono)] text-[0.75rem] text-white/30 tracking-[0.15em] uppercase mb-5">
          {t("skills.label")}
        </div>
        <h2 data-animate className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.2] mb-10 text-[#f5f5f0]">
          {t("skills.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, catIdx) => (
            <div
              key={cat.id}
              data-scroll="up"
              className="p-5 bg-white/[0.02] border border-white/[0.04] rounded-[14px]"
              style={{ transitionDelay: `${catIdx * 80}ms` }}
            >
              <h3 className="font-[family-name:var(--font-mono)] text-[0.7rem] text-white/30 tracking-[0.15em] uppercase mb-4">
                {cat.title}[x]
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors duration-300"
                  >
                    <span className="text-[0.6rem] font-[family-name:var(--font-mono)] text-white/25 w-[36px] shrink-0">{skill.icon}</span>
                    <span className="text-[0.8rem] text-white/50">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
