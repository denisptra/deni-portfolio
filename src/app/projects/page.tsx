"use client";

import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Sidomulyobatu.id",
    category: "UI/UX & Web Dev",
    description: "Website resmi Desa Sidomulyo Batu dengan fitur profil desa, berita, galeri, dan layanan administrasi online.",
    tags: ["WordPress", "PHP", "Responsive"],
    color: "#059669",
    icon: "🏘️",
    url: "https://sidomulyobatu.id",
  },
  {
    id: 2,
    title: "Padjadjaran Pusat",
    category: "UI/UX & Web Dev",
    description: "Website organisasi Padjadjaran Pusat dengan sistem manajemen konten dan informasi kegiatan.",
    tags: ["Laravel", "MySQL", "Bootstrap"],
    color: "#1a3a6e",
    icon: "🏛️",
    url: "https://padjadjaranpusat.org",
  },
  {
    id: 3,
    title: "Oryza Loka Basa",
    category: "UI/UX & Web Dev",
    description: "Website company profile PT Oryza Loka Basa dengan showcase produk beras premium dan sistem ordering.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    color: "#7c3aed",
    icon: "🌾",
    url: "https://oryzalokabasa.com",
  },
  {
    id: 4,
    title: "Agrowisata Darangdan",
    category: "UI/UX & Web Dev",
    description: "Website agrowisata untuk Oryza Loka Basa dengan informasi wisata, booking, dan gallery foto.",
    tags: ["React", "Node.js", "Maps API"],
    color: "#059669",
    icon: "🌿",
    url: "https://agrowisatadarangdan.oryzalokabasa.com",
  },
  {
    id: 5,
    title: "Artics Digital Strategy",
    category: "UI/UX & Web Dev",
    description: "Desain UI/UX untuk agency digital strategy. Meliputi landing page, dashboard, dan sistem manajemen klien.",
    tags: ["Figma", "Prototyping", "Design System"],
    color: "#e85d3a",
    icon: "🎯",
  },
  {
    id: 6,
    title: "Nukang",
    category: "UI/UX Design",
    description: "Desain UI/UX aplikasi mobile untuk jasa tukang bangunan. Memudahkan pengguna mencari dan memesan jasa tukang terpercaya.",
    tags: ["Figma", "Mobile Design", "Prototyping"],
    color: "#f59e0b",
    icon: "🔨",
  },
  {
    id: 7,
    title: "Phalanxium",
    category: "UI/UX Design",
    description: "Desain UI/UX game action strategy dengan mekanik pertahanan formasi untuk platform PC.",
    tags: ["Figma", "Game UI", "Prototype"],
    color: "#dc2626",
    icon: "⚔️",
  },
  {
    id: 8,
    title: "Health Mobile Apps",
    category: "UI/UX Design",
    description: "Desain UI/UX aplikasi mobile kesehatan dengan fitur tracking aktivitas, jadwal minum obat, dan konsultasi dokter.",
    tags: ["Figma", "Health Tech", "Mobile Design"],
    color: "#0ea5e9",
    icon: "💊",
  },
  {
    id: 9,
    title: "168 Trans",
    category: "UI/UX & Apps",
    description: "Desain UI/UX dan aplikasi jasa transportasi dan ekspedisi dengan sistem booking, tracking, dan manajemen armada.",
    tags: ["Figma", "Mobile App", "Booking System"],
    color: "#1a1a2e",
    icon: "🚛",
  },
  {
    id: 10,
    title: "Museum Game",
    category: "Game Development",
    description: "Game edukasi VR tentang sejarah museum Indonesia. Pemain menjelajahi ruangan dan menemukan artefak bersejarah.",
    tags: ["Unity", "C#", "VR"],
    color: "#8b5cf6",
    icon: "🏛️",
    url: "https://polytato.itch.io/uts-vr001-kelompok1",
  },
  {
    id: 11,
    title: "Kapur Game",
    category: "Game Development",
    description: "Game puzzle VR kasual dengan tema kapur tulis. Nikmati sensasi bermain dengan grafik unik chalk art style.",
    tags: ["Unity", "C#", "VR"],
    color: "#ec4899",
    icon: "✏️",
    url: "https://polytato.itch.io/uas-vr001-kelompok1",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] font-[family-name:var(--font-jakarta)]">
      {/* Header */}
      <section className="pt-8 md:pt-12 pb-6 md:pb-8 px-5 md:px-[8%]">
        <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-[#888] hover:text-[#1a1a2e] transition-colors mb-6 md:mb-8">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="font-[family-name:var(--font-sora)] font-extrabold text-[clamp(1.8rem,5vw,3.5rem)] text-[#1a1a2e] leading-tight">
          My Projects
        </h1>
        <p className="text-[13px] md:text-[14px] text-[#666] mt-3 max-w-[500px]">
          Kumpulan project yang sudah saya kerjakan, mulai dari website, mobile apps, UI/UX, hingga game development.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="px-5 md:px-[8%] pb-12 md:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url || "#"}
              target={project.url ? "_blank" : undefined}
              rel={project.url ? "noopener noreferrer" : undefined}
              className="block bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 group"
            >
              <div
                className="h-[110px] md:h-[130px] flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: project.color + "12" }}
              >
                <span className="text-[3rem] md:text-[3.5rem] group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </span>
                <div className="absolute w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full opacity-10 -right-3 md:-right-4 -top-3 md:-top-4" style={{ backgroundColor: project.color }} />
                <div className="absolute w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full opacity-10 -left-2 -bottom-2" style={{ backgroundColor: project.color }} />
              </div>

              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-semibold text-white" style={{ backgroundColor: project.color }}>
                    {project.category}
                  </span>
                  {project.url && (
                    <span className="text-[9px] md:text-[10px] text-[#1a3a6e] font-semibold flex items-center gap-1">
                      Visit
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </span>
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-sora)] font-bold text-[14px] md:text-[15px] text-[#1a1a2e] mb-2">
                  {project.title}
                </h3>
                <p className="text-[11px] md:text-[11.5px] text-[#666] leading-[1.6] mb-3 md:mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[9px] md:text-[10px] text-[#666] bg-[#f5f0e8] rounded-full border border-[#e8e4de]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-[8%] pb-12 md:pb-16">
        <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: "linear-gradient(135deg, #1a3a6e 0%, #1a1a2e 50%, #7c3aed 100%)" }}>
          <h2 className="font-[family-name:var(--font-sora)] font-bold text-[18px] md:text-[20px] text-white mb-2">
            Tertarik kerja sama?
          </h2>
          <p className="text-[12px] md:text-[13px] text-white/60 mb-4 md:mb-5">
            Yuk diskusi tentang project kamu berikutnya.
          </p>
          <a href="mailto:denitri0609@gmail.com" className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-[#1a1a2e] text-[12px] md:text-[13px] font-semibold rounded-full hover:bg-[#f5f0e8] transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            Hubungi Saya
          </a>
        </div>
      </section>
    </div>
  );
}
