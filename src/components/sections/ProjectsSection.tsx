"use client";

import { useState } from "react";
import PandaMascot from "@/components/PandaMascot";
import { useLang } from "@/components/LangProvider";

const PROJECTS = [
  { id: 1, category: "web", title: "Oryza Lokabasa", desc: { en: "Community website for Nusantara art, language, and culture. Bilingual content, news articles, gallery, and contact system.", id: "Situs komunitas untuk seni, bahasa, dan budaya Nusantara. Konten dwibahasa, artikel berita, galeri, dan sistem kontak." }, tags: ["Next.js", "PostgreSQL", "Express.js", "Tailwind CSS", "TypeScript"], year: "2024", color: "#1a2a3a", status: "DONE" },
  { id: 2, category: "web", title: "Pencak Silat Padjajaran", desc: { en: "Official portal of Padepokan Pencak Silat Padjadjaran Pusat. Preserving martial arts heritage since 1970.", id: "Portal resmi Padepokan Pencak Silat Padjadjaran Pusat. Melestarikan warisan bela diri nusantara sejak 1970." }, tags: ["React", "Vite", "Tailwind CSS", "JavaScript"], year: "2024", color: "#2a1a3a", status: "WIP" },
  { id: 3, category: "web", title: "Agrowisata Darangdan", desc: { en: "Modern agrotourism promotional site showcasing the beauty and activities of Darangdan agricultural tourism.", id: "Situs promosi agrowisata modern yang menampilkan keindahan dan aktivitas wisata pertanian Darangdan." }, tags: ["Vite", "JavaScript", "Tailwind CSS", "UI/UX Design"], year: "2024", color: "#1a3a2a", status: "DONE" },
  { id: 4, category: "web", title: "Artics Digital Strategy", desc: { en: "Company digital strategy page with clean modern aesthetics for a professional frontend experience.", id: "Laman strategi digital perusahaan dengan estetika modern yang bersih untuk pengalaman frontend profesional." }, tags: ["React.js", "JavaScript", "CSS"], year: "2024", color: "#3a2a1a", status: "DONE" },
  { id: 5, category: "mobile", title: "Oryza Lokabasa Mobile", desc: { en: "Cross-platform companion mobile app for the Oryza Lokabasa cultural community.", id: "Aplikasi mobile pendamping lintas platform untuk komunitas budaya Oryza Lokabasa." }, tags: ["Flutter", "Dart", "Firebase"], year: "2024", color: "#0a2a3a", status: "DONE" },
  { id: 6, category: "mobile", title: "Agrowisata Mobile Guide", desc: { en: "Mobile-first PWA for agrotourism visitors with interactive map and activity booking.", id: "PWA mobile-first untuk pengunjung agrowisata dengan peta interaktif dan pemesanan aktivitas." }, tags: ["React Native", "JavaScript", "Tailwind CSS"], year: "2024", color: "#1a3a1a", status: "DONE" },
  { id: 7, category: "ui-ux", title: "Oryza Lokabasa Redesign", desc: { en: "Complete UI/UX redesign with modern brutalist aesthetics, better navigation flow, and accessibility standards.", id: "Redesain UI/UX lengkap dengan estetika brutalis modern, alur navigasi yang lebih baik, dan standar aksesibilitas." }, tags: ["Figma", "Prototyping", "User Research"], year: "2024", color: "#2a1a2a", status: "DONE" },
  { id: 8, category: "ui-ux", title: "Agrowisata Darangdan UX", desc: { en: "User experience design for agrotourism platform, focusing on intuitive booking and information architecture.", id: "Desain pengalaman pengguna untuk platform agrowisata, fokus pada pemesanan intuitif dan arsitektur informasi." }, tags: ["Figma", "Wireframing", "Usability Testing"], year: "2024", color: "#1a2a2a", status: "DONE" },
  { id: 9, category: "graphic", title: "Oryza Brand Identity", desc: { en: "Complete brand identity design including logo, color system, typography, and brand guidelines.", id: "Desain identitas merek lengkap termasuk logo, sistem warna, tipografi, dan panduan merek." }, tags: ["Illustrator", "Photoshop", "Branding"], year: "2023", color: "#3a1a2a", status: "DONE" },
  { id: 10, category: "graphic", title: "Pencak Silat Event Poster", desc: { en: "Promotional poster design and social media graphics for martial arts events and tournaments.", id: "Serius poster promosi dan grafis media sosial untuk acara dan turnamen bela diri." }, tags: ["Illustrator", "Photoshop", "Print Design"], year: "2023", color: "#2a3a1a", status: "DONE" },
  { id: 11, category: "robotic", title: "Arduino Line Follower", desc: { en: "Autonomous line-following robot built with Arduino, featuring PID control and obstacle avoidance.", id: "Robot pengikut garis otonom yang dibangun dengan Arduino, dilengkapi kontrol PID dan penghindaran rintangan." }, tags: ["Arduino", "C++", "Sensors", "Robotics"], year: "2023", color: "#1a1a3a", status: "DONE" },
  { id: 12, category: "robotic", title: "Smart Home IoT System", desc: { en: "IoT-based home automation system with sensor integration, remote control dashboard, and voice commands.", id: "Sistem otomasi rumah berbasis IoT dengan integrasi sensor, dasbor kontrol jarak jauh, dan perintah suara." }, tags: ["Arduino", "Raspberry Pi", "MQTT", "React"], year: "2023", color: "#0a1a2a", status: "DONE" },
  { id: 13, category: "editing", title: "Agrowisata Promo Video", desc: { en: "Cinematic promotional video for Agrowisata Darangdan with drone footage and motion graphics.", id: "Video promosi sinematik untuk Agrowisata Darangdan dengan rekaman drone dan grafis gerak." }, tags: ["Premiere Pro", "After Effects", "DaVinci Resolve"], year: "2024", color: "#2a2a1a", status: "DONE" },
  { id: 14, category: "editing", title: "Product Showcase Reel", desc: { en: "Dynamic product showcase video with smooth transitions, color correction, and sound design.", id: "Video showcase produk dinamis dengan transisi halus, koreksi warna, dan desain suara." }, tags: ["Premiere Pro", "After Effects", "Color Grading"], year: "2023", color: "#1a2a1a", status: "DONE" },
  { id: 15, category: "game", title: "Panda's Bamboo Quest", desc: { en: "Indie platformer game featuring a panda collecting bamboo while navigating procedurally generated levels.", id: "Game platformer indie yang menampilkan panda mengumpulkan bambu sambil menavigasi level yang dibuat secara prosedural." }, tags: ["Unity", "C#", "Pixel Art"], year: "2024", color: "#2a1a1a", status: "DONE" },
  { id: 16, category: "game", title: "Silat Battle Arena", desc: { en: "Fighting game inspired by Pencak Silat martial arts with combo system and local multiplayer.", id: "Game pertarungan terinspirasi dari seni bela diri Pencak Silat dengan sistem kombo dan multipemain lokal." }, tags: ["Unity", "C#", "Game Design"], year: "2023", color: "#1a1a2a", status: "DONE" },
];

const FILTERS = [
  { key: "all", labelKey: "projects.filter.all" },
  { key: "web", labelKey: "projects.filter.web" },
  { key: "mobile", labelKey: "projects.filter.mobile" },
  { key: "design", labelKey: "projects.filter.design" },
  { key: "robotic", labelKey: "projects.filter.robotic" },
  { key: "editing", labelKey: "projects.filter.editing" },
  { key: "game", labelKey: "projects.filter.game" },
];

const DESIGN_SUB = [
  { key: "ui-ux", labelKey: "projects.sub.uiux" },
  { key: "graphic", labelKey: "projects.sub.graphic" },
];

const STATUS_STYLE: Record<string, string> = {
  DONE: "bg-green-500/10 text-green-400/60",
  WIP: "bg-yellow-500/10 text-yellow-400/60",
};

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");
  const [designSub, setDesignSub] = useState<string | null>(null);
  const { t } = useLang();

  const showDesign = filter === "design";

  const filtered = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (showDesign && designSub) return p.category === designSub;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-[100px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <div data-animate className="font-[family-name:var(--font-mono)] text-[0.75rem] text-white/30 tracking-[0.15em] uppercase mb-5">
          {t("projects.label")}
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <h2 data-animate className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] text-[#f5f5f0]">
              {t("projects.title")}
            </h2>
            <PandaMascot pose="pointing-project" size={80} />
          </div>

          <div data-animate className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => {
                    setFilter(f.key);
                    if (f.key !== "design") setDesignSub(null);
                  }}
                  className={`px-3.5 py-1.5 text-[0.75rem] font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                    filter === f.key && !showDesign
                      ? "bg-[#f5f5f0] border-transparent text-[#1a1a1a]"
                      : showDesign && f.key === "design"
                        ? "bg-[#f5f5f0] border-transparent text-[#1a1a1a]"
                        : "border-white/[0.08] text-white/40 hover:border-white/15 hover:text-white bg-transparent"
                  }`}
                >
                  {t(f.labelKey)}
                </button>
              ))}
            </div>

            {showDesign && (
              <div className="flex flex-wrap gap-2 animate-fade-in">
                {DESIGN_SUB.map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => setDesignSub(designSub === sub.key ? null : sub.key)}
                    className={`px-3 py-1 text-[0.7rem] font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                      designSub === sub.key
                        ? "bg-white/10 border-white/20 text-white"
                        : "border-white/[0.06] text-white/30 hover:border-white/12 hover:text-white/60 bg-transparent"
                    }`}
                  >
                    {t(sub.labelKey)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              data-scroll="up"
              className="group"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="relative h-[350px] md:h-[400px] rounded-[20px] overflow-hidden border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 cursor-pointer">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-[20%] left-[15%] w-[120px] h-[120px] rounded-full border border-white/20" />
                    <div className="absolute top-[40%] right-[20%] w-[80px] h-[80px] rounded-full border border-white/15" />
                    <div className="absolute bottom-[25%] left-[30%] w-[60px] h-[60px] rounded-full border border-white/10" />
                  </div>

                  <div className="absolute top-6 left-6 font-[family-name:var(--font-display)] text-[5rem] font-bold text-white/[0.06] leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-[24px] bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <span className="font-[family-name:var(--font-display)] text-[2.5rem] font-bold text-white/20">
                        {String(project.id).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.65rem] text-white/30 tracking-[0.1em] uppercase font-[family-name:var(--font-mono)]">
                      {project.category}
                    </span>
                    <span className="text-[0.65rem] text-white/15">/</span>
                    <span className="text-[0.65rem] text-white/20 font-[family-name:var(--font-mono)]">
                      {project.year}
                    </span>
                    <span className={`text-[0.6rem] px-1.5 py-0.5 rounded-full font-[family-name:var(--font-mono)] ${STATUS_STYLE[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-[1.1rem] md:text-[1.2rem] font-semibold text-[#f5f5f0] mb-1.5 group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[0.8rem] text-white/40 leading-relaxed mb-3 max-w-[350px]">
                    {typeof project.desc === "string" ? project.desc : project.desc.en}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[0.6rem] text-white/30 bg-white/[0.06] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.1] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/[0.08]">
                  <svg className="w-4 h-4 text-white/50 -rotate-45 group-hover:rotate-0 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/20 text-[0.9rem]">
            {t("projects.empty")}
          </div>
        )}
      </div>
    </section>
  );
}
