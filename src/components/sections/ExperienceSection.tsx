"use client";

import PandaMascot from "@/components/PandaMascot";
import { useLang } from "@/components/LangProvider";

export default function ExperienceSection() {
  const { t } = useLang();
  const experiences = [
    {
      role: "Senior Creative Technologist",
      date: "2023 — Present",
      company: "Digital Innovation Studio",
      desc: { en: "Leading creative technology initiatives, building interactive digital experiences, and mentoring junior developers on cutting-edge projects.", id: "Memimpin inisiatif teknologi kreatif, membangun pengalaman digital interaktif, dan membimbing pengembang junior pada proyek-proyek terkini." },
      tags: ["React", "Three.js", "WebGL", "Node.js"],
    },
    {
      role: "UI/UX Designer & Developer",
      date: "2022 — 2023",
      company: "Tech Startup Inc.",
      desc: { en: "Designed and developed user interfaces for mobile and web applications, focusing on accessibility and user satisfaction.", id: "Merancang dan mengembangkan antarmuka pengguna untuk aplikasi mobile dan web, fokus pada aksesibilitas dan kepuasan pengguna." },
      tags: ["Figma", "React Native", "Tailwind"],
    },
    {
      role: "Freelance Designer",
      date: "2021 — 2022",
      company: "Self-Employed",
      desc: { en: "Provided complete design and development services for clients from various industries, from branding to web applications.", id: "Menyediakan layanan desain dan pengembangan lengkap untuk klien dari berbagai industri, mulai dari branding hingga aplikasi web." },
      tags: ["WordPress", "Adobe CC", "Video Editing"],
    },
    {
      role: "Game Development Intern",
      date: "2020 — 2021",
      company: "Game Studio XYZ",
      desc: { en: "Contributed to indie game development projects, creating game mechanics, level design, and UI systems.", id: "Berkontribusi pada proyek pengembangan game indie, membuat mekanisme game, desain level, dan sistem UI." },
      tags: ["Unity", "C#", "Blender"],
    },
  ];

  return (
    <section id="experience" className="py-[100px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <div data-animate className="font-[family-name:var(--font-mono)] text-[0.75rem] text-white/30 tracking-[0.15em] uppercase mb-5">
          {t("exp.label")}
        </div>
        <div className="flex items-center gap-4 mb-12">
          <h2 data-animate className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] text-[#f5f5f0]">
            {t("exp.title")}
          </h2>
          <PandaMascot pose="holding-certificate" size={80} />
        </div>

        <div className="relative" style={{ paddingBottom: "45vh" }}>
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="sticky"
              style={{
                top: `${100 + i * 20}px`,
                zIndex: i + 1,
                marginBottom: i < experiences.length - 1 ? "20px" : "0",
              }}
            >
              <div
                data-animate
                className="relative p-8 md:p-10 bg-[rgba(14,14,16,0.96)] backdrop-blur-[24px] border border-white/[0.05] rounded-[20px] hover:border-white/[0.08] transition-all duration-500 overflow-hidden group"
                style={{
                  boxShadow: `0 ${8 + i * 4}px ${32 + i * 8}px rgba(0,0,0,${0.3 + i * 0.05})`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-[1.15rem] md:text-[1.25rem] font-semibold text-[#f5f5f0] group-hover:text-white transition-colors duration-300">
                      {exp.role}
                    </div>
                    <div className="text-[0.8rem] text-white/35 mt-1">{exp.company}</div>
                  </div>
                  <div className="text-[0.7rem] text-white/25 font-[family-name:var(--font-mono)] shrink-0 mt-1">
                    {exp.date}
                  </div>
                </div>

                <p className="text-[0.88rem] text-white/45 leading-[1.7] mb-5 max-w-[600px]">
                  {exp.desc.en}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[0.65rem] text-white/25 bg-white/[0.03] rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
