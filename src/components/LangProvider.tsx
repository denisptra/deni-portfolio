"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Lang = "en" | "id";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { en: "Home", id: "Beranda" },
  "nav.projects": { en: "Projects", id: "Proyek" },
  "nav.experience": { en: "Experience", id: "Pengalaman" },
  "nav.skills": { en: "Skills", id: "Keahlian" },
  "nav.certificates": { en: "Certificates", id: "Sertifikat" },
  "nav.contact": { en: "Contact", id: "Kontak" },
  "nav.secret": { en: "Panda's Secret", id: "Rahasia Panda" },

  // Hero
  "hero.role1": { en: "Web & Mobile Developer", id: "Pengembang Web & Mobile" },
  "hero.role2": { en: "UI/UX Designer", id: "Desainer UI/UX" },
  "hero.desc": {
    en: "I build digital products with clean code, reliable performance, and distinctive visual design. Every project is crafted with attention to detail.",
    id: "Saya membangun produk digital dengan kode bersih, performa andal, dan desain visual yang unik. Setiap proyek dikerjakan dengan perhatian pada detail.",
  },
  "hero.stat.projects": { en: "Projects", id: "Proyek" },
  "hero.stat.years": { en: "Years", id: "Tahun" },
  "hero.stat.skills": { en: "Skills", id: "Keahlian" },
  "hero.cta.works": { en: "View My Work", id: "Lihat Karya Saya" },
  "hero.cta.contact": { en: "Contact", id: "Hubungi" },
  "hero.scroll": { en: "Scroll", id: "Gulir" },

  // About
  "about.label": { en: "01 / About", id: "01 / Tentang" },
  "about.title1": { en: "Web & Mobile Developer", id: "Pengembang Web & Mobile" },
  "about.title2": { en: "UI/UX Designer", id: "Desainer UI/UX" },
  "about.p1": {
    en: "Digital product developer focused on clean code, reliable performance, and distinctive premium visual design aesthetics.",
    id: "Pengembang produk digital yang fokus pada kode bersih, performa andal, dan estetika desain visual premium yang unik.",
  },
  "about.p2": {
    en: "From web applications to mobile games, from robotics systems to video editing — I enjoy the process of turning ideas into tangible reality.",
    id: "Dari aplikasi web hingga game mobile, dari sistem robotika hingga editing video — saya menikmati proses mengubah ide menjadi kenyataan.",
  },
  "about.pandaFan": { en: "Full-Stack Developer", id: "Full-Stack Developer" },
  "about.techNerd": { en: "Creative Technologist", id: "Creative Technologist" },
  "about.location": { en: "South Jakarta", id: "Jakarta Selatan" },

  // Projects
  "projects.label": { en: "02 / Projects", id: "02 / Proyek" },
  "projects.title": { en: "Featured Work", id: "Karya Pilihan" },
  "projects.filter.all": { en: "All", id: "Semua" },
  "projects.filter.web": { en: "Web", id: "Web" },
  "projects.filter.mobile": { en: "Mobile", id: "Mobile" },
  "projects.filter.design": { en: "Design", id: "Desain" },
  "projects.filter.robotic": { en: "Robotics", id: "Robotika" },
  "projects.filter.editing": { en: "Editing", id: "Editing" },
  "projects.filter.game": { en: "Game", id: "Game" },
  "projects.sub.uiux": { en: "UI/UX", id: "UI/UX" },
  "projects.sub.graphic": { en: "Graphic", id: "Grafis" },
  "projects.empty": {
    en: "No projects here yet. But hey, the panda is still looking for bamboo, so give it time.",
    id: "Belum ada proyek di sini. Tapi hei, panda masih cari bambu, jadi sabar ya.",
  },

  // Experience
  "exp.label": { en: "03 / Experience", id: "03 / Pengalaman" },
  "exp.title": { en: "Where I Work", id: "Di Mana Saya Bekerja" },

  // Skills
  "skills.label": { en: "04 / Skills", id: "04 / Keahlian" },
  "skills.title": { en: "Tech Matrix", id: "Matriks Teknis" },

  // Certificates
  "cert.label": { en: "06 / Certificates", id: "06 / Sertifikat" },
  "cert.title": { en: "Certifications & Achievements", id: "Sertifikasi & Pencapaian" },

  // Contact
  "contact.label": { en: "07 / Contact", id: "07 / Kontak" },
  "contact.title": { en: "Let's Work Together", id: "Ayo Bekerja Sama" },
  "contact.desc": {
    en: "Have an interesting project or want to discuss technology? I'm always open to new opportunities and conversations.",
    id: "Punya proyek menarik atau ingin berdiskusi tentang teknologi? Saya selalu terbuka untuk peluang dan percakapan baru.",
  },
  "contact.copyright": { en: "2025 Deni Trio Saputra. All rights reserved.", id: "2025 Deni Trio Saputra. Hak cipta dilindungi." },

  // Bamboo hints
  "bamboo.hint": {
    en: "Oh no! Po lost his bamboo! Help him find all 8 hidden pieces across the pages. His stomach depends on you!",
    id: "Oh no! Po kehilangan bambunya! Bantu dia temukan 8 potongan tersembunyi di setiap halaman. Perutnya bergantung padamu!",
  },
  "bamboo.found": { en: "Found!", id: "Ditemukan!" },
  "bamboo.allFound": {
    en: "All bamboo found! Po is doing a happy dance! You are officially a bamboo hero.",
    id: "Semua bambu ditemukan! Po lagi joget bahagia! Kamu resmi jadi pahlawan bambu.",
  },

  // Puzzle
  "puzzle.intro1": {
    en: "Lights out. Time for hide and seek!",
    id: "Mati lampu. Saatnya petak umpet!",
  },
  "puzzle.intro2": {
    en: "Can you find me? I'm hiding!",
    id: "Bisakah kamu menemukanku? Aku lagi sembunyi!",
  },
  "puzzle.found1": {
    en: "You found me! Are you psychic or something?",
    id: "Kamu menemukanku! Kamu indigo ya?",
  },
  "puzzle.found2": {
    en: "Okay okay, you win! Let me show you something cool...",
    id: "Oke oke, kamu menang! Biar aku tunjukin sesuatu yang keren...",
  },
  "puzzle.follow": {
    en: "Follow me... but don't step on my bamboo!",
    id: "Ikut aku... tapi jangan injak bambuku!",
  },
  "puzzle.clickHint": {
    en: "Click here if you spot me (hint: I'm round and black & white)",
    id: "Klik di sini kalau kamu lihat aku (hint: aku bulat dan hitam putih)",
  },
  "puzzle.tapHint": {
    en: "Tap anywhere to search. I dare you!",
    id: "Ketuk di mana saja untuk mencari. Aku tantang kamu!",
  },
  "puzzle.clickExploring": {
    en: "Click when you see the panda. No peeking!",
    id: "Klik saat kamu lihat panda. Jangan curang!",
  },
  "puzzle.tapExploring": {
    en: "Tap to catch the panda. Quick, before he runs away!",
    id: "Ketuk untuk menangkap panda. Cepat, sebelum dia kabur!",
  },
  "puzzle.hiding": {
    en: "He's hiding somewhere in this room... maybe behind that pixel you didn't notice?",
    id: "Dia bersembunyi di suatu tempat di ruangan ini... mungkin di balik pixel yang kamu gak sadar?",
  },
  "puzzle.unlocked": {
    en: "Portfolio Unlocked! You unlocked the secret panda vault.",
    id: "Portofolio Terbuka! Kamu membuka brankas rahasia panda.",
  },
};

const LangContext = createContext<LangContextValue>({
  lang: "id",
  setLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback((key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
