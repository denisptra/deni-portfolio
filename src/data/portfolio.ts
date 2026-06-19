export interface TranslationText {
  nav: {
    about: string;
    experience: string;
    explore: string;
    education: string;
    portfolio: string;
    achievements: string;
    contact: string;
    downloadCv: string;
    eduSub: string;
    portSub: string;
    achSub: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    viewProjects: string;
    letsTalk: string;
    introVideo: string;
  };
  about: {
    title: string;
    intro: string;
    quote: string;
    storyTitle: string;
    storyPara1: string;
    storyPara2: string;
    valuesTitle: string;
    v1Title: string;
    v1Desc: string;
    v2Title: string;
    v2Desc: string;
    v3Title: string;
    v3Desc: string;
  };
  experience: {
    title: string;
    subtitle: string;
    ctaTitle: string;
    ctaBtn: string;
  };
  study: {
    title: string;
    subtitle: string;
  };
  achievements: {
    title: string;
    subtitle: string;
  };
  tools: {
    title: string;
    frameworksTitle: string;
    toolsTitle: string;
  };
  projects: {
    title: string;
    portfolioTitle: string;
    portfolioSubtitle: string;
    showMore: string;
    viewDetails: string;
    livePreview: string;
    overview: string;
    stack: string;
  };
  cta: {
    title: string;
    subtitle: string;
    sayHello: string;
    collaborate: string;
    works: string;
  };
  footer: {
    description: string;
    sitemap: string;
    socials: string;
    legal: string;
    rights: string;
    credit: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailMe: string;
    basedIn: string;
    form: {
      name: string;
      email: string;
      message: string;
      placeholderMessage: string;
      send: string;
    };
  };
}

export const translations: Record<"en" | "id", TranslationText> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      explore: "Explore",
      education: "Education",
      portfolio: "Portfolio",
      achievements: "Certifications",
      contact: "Contact",
      downloadCv: "Download CV",
      eduSub: "Academic journey & training",
      portSub: "Showcase of latest work",
      achSub: "Milestones and honors",
    },
    hero: {
      badge: "Available for new projects",
      title: "Software & Design Partner.",
      subtitle: "I build clean, functional, and scalable digital products. With experience in web development and graphic design.",
      viewProjects: "View Projects",
      letsTalk: "Let's Talk",
      introVideo: "Introduction.mp4",
    },
    about: {
      title: "I'm Deni Trio Saputra.",
      intro: "A tech enthusiast and creative designer focused on software development and impactful visual solutions.",
      quote: "Technology is best when it brings people together.",
      storyTitle: "About Me",
      storyPara1: "I have a strong interest in technology and software development, with practical experience building several projects such as football websites, company profiles, and simple web applications.",
      storyPara2: "I am familiar with various programming tools and capable of learning new technical concepts quickly. In addition to web development and graphic design, I am actively learning 3D modeling in Blender, cross-platform mobile development in Flutter, interactive gaming/XR experiences in Unity, and physical computing using Arduino.",
      valuesTitle: "Skills & Expertise",
      v1Title: "Web Development",
      v1Desc: "Proficient in modern web programming stacks and database management.",
      v2Title: "Design & 3D Modeling",
      v2Desc: "Skilled in Figma, Adobe Illustrator, Photoshop, and 3D assets rendering in Blender.",
      v3Title: "Game & Mobile Dev",
      v3Desc: "Developing cross-platform mobile apps with Flutter, interactive games in Unity, and hardware coding with Arduino.",
    },
    experience: {
      title: "Work & Organization",
      subtitle: "My professional journey through technical roles, creative freelance work, and organizational leadership.",
      ctaTitle: "Want to see my full resume?",
      ctaBtn: "Download PDF",
    },
    study: {
      title: "Education Level",
      subtitle: "Foundations of my technical knowledge and academic growth.",
    },
    achievements: {
      title: "Skills & Certifications",
      subtitle: "Validations of my technical competency and professional growth.",
    },
    tools: {
      title: "Tools & Technologies I Use to Craft Products",
      frameworksTitle: "Frameworks & Tech Stack",
      toolsTitle: "Design & Productivity Tools",
    },
    projects: {
      title: "Latest Projects",
      portfolioTitle: "Portfolio",
      portfolioSubtitle: "A showcase of web applications and design work based on real-world requirements.",
      showMore: "Show More",
      viewDetails: "View details",
      livePreview: "Live Preview",
      overview: "Project Overview",
      stack: "Stack Used",
    },
    cta: {
      title: "Have a vision for a project?",
      subtitle: "I'm open to collaborations and opportunities. Let's build something meaningful together.",
      sayHello: "Say Hello",
      collaborate: "Let's Collaborate",
      works: "See My Works",
    },
    footer: {
      description: "Deni Trio Saputra — Software & Design. Crafting digital solutions with purpose and passion.",
      sitemap: "Sitemap",
      socials: "Socials",
      legal: "Legal",
      rights: "All rights reserved",
      credit: "Built in Jakarta, Indonesia",
    },
    contact: {
      title: "Get In Touch.",
      subtitle: "Feel free to reach out for collaborations or just to say hi. I'm usually responsive via email.",
      emailMe: "Email Me",
      basedIn: "Based In",
      form: {
        name: "Your Name",
        email: "Email Address",
        message: "Message",
        placeholderMessage: "Describe your project or inquiry...",
        send: "Send Message",
      },
    },
  },
  id: {
    nav: {
      about: "Tentang",
      experience: "Pengalaman",
      explore: "Eksplorasi",
      education: "Pendidikan",
      portfolio: "Portofolio",
      achievements: "Sertifikasi",
      contact: "Kontak",
      downloadCv: "Unduh CV",
      eduSub: "Perjalanan akademik & pelatihan",
      portSub: "Kumpulan karya terbaru",
      achSub: "Pencapaian dan penghargaan",
    },
    hero: {
      badge: "Tersedia untuk proyek baru",
      title: "Partner Software & Desain.",
      subtitle: "Saya membangun produk digital yang rapi, fungsional, dan dapat dikembangkan. Berpengalaman dalam pengembangan web dan desain grafis.",
      viewProjects: "Lihat Proyek",
      letsTalk: "Hubungi Saya",
      introVideo: "Perkenalan.mp4",
    },
    about: {
      title: "Saya Deni Trio Saputra.",
      intro: "Penggemar teknologi dan desainer kreatif yang berfokus pada pengembangan software dan solusi visual yang berdampak.",
      quote: "Teknologi terbaik adalah yang menyatukan manusia.",
      storyTitle: "Tentang Saya",
      storyPara1: "Saya memiliki ketertarikan kuat pada teknologi dan pengembangan perangkat lunak, dengan pengalaman praktis membangun beberapa proyek seperti website sepak bola, company profile, dan aplikasi web sederhana.",
      storyPara2: "Saya terbiasa menggunakan berbagai tools pemrograman dan mampu mempelajari konsep teknis baru dengan cepat. Selain pengembangan web dan desain grafis, saya juga aktif mempelajari modeling 3D di Blender, pengembangan aplikasi mobile lintas platform dengan Flutter, pemrograman game/VR interaktif di Unity, serta perakitan mikrokontroler dengan Arduino.",
      valuesTitle: "Keahlian & Kompetensi",
      v1Title: "Pengembangan Web",
      v1Desc: "Mahir dalam stack pemrograman web modern serta manajemen database.",
      v2Title: "Desain & Modeling 3D",
      v2Desc: "Terampil menggunakan Figma, Adobe Illustrator, Photoshop, dan pembuatan aset 3D di Blender.",
      v3Title: "Game & Mobile Dev",
      v3Desc: "Mengembangkan aplikasi mobile dengan Flutter, game interaktif di Unity, dan pemrograman hardware Arduino.",
    },
    experience: {
      title: "Kerja & Organisasi",
      subtitle: "Perjalanan profesional saya melalui peran teknis, pekerjaan lepas kreatif, dan kepemimpinan organisasi.",
      ctaTitle: "Ingin melihat resume lengkap saya?",
      ctaBtn: "Unduh PDF",
    },
    study: {
      title: "Tingkat Pendidikan",
      subtitle: "Fondasi pengetahuan teknis dan perkembangan akademik saya.",
    },
    achievements: {
      title: "Keahlian & Sertifikasi",
      subtitle: "Validasi terhadap kompetensi teknis dan perkembangan profesional saya.",
    },
    tools: {
      title: "Alat & Teknologi yang Saya Gunakan untuk Membuat Produk",
      frameworksTitle: "Framework & Tech Stack",
      toolsTitle: "Tools Desain & Produktivitas",
    },
    projects: {
      title: "Proyek Terbaru",
      portfolioTitle: "Portofolio",
      portfolioSubtitle: "Kumpulan aplikasi web dan desain berdasarkan kebutuhan dunia nyata.",
      showMore: "Lihat Semua",
      viewDetails: "Lihat Detail",
      livePreview: "Pratinjau",
      overview: "Ikhtisar Proyek",
      stack: "Teknologi",
    },
    cta: {
      title: "Punya visi untuk sebuah proyek?",
      subtitle: "Saya terbuka untuk kolaborasi dan kesempatan baru. Mari membangun sesuatu yang bermakna bersama.",
      sayHello: "Sapa Saya",
      collaborate: "Mari Berkolaborasi",
      works: "Lihat Karya Saya",
    },
    footer: {
      description: "Deni Trio Saputra — Software & Desain. Membangun solusi digital dengan tujuan dan semangat.",
      sitemap: "Peta Situs",
      socials: "Media Sosial",
      legal: "Legal",
      rights: "Hak cipta dilindungi",
      credit: "Dibuat di Jakarta, Indonesia",
    },
    contact: {
      title: "Hubungi Saya.",
      subtitle: "Silakan hubungi saya untuk kolaborasi atau sekadar menyapa. Biasanya saya responsif melalui email.",
      emailMe: "Email Saya",
      basedIn: "Berbasis di",
      form: {
        name: "Nama Anda",
        email: "Alamat Email",
        message: "Pesan",
        placeholderMessage: "Jelaskan proyek atau kebutuhan Anda...",
        send: "Kirim Pesan",
      },
    },
  },
};

export interface MultilingualProject {
  id: string;
  title: Record<"en" | "id", string>;
  description: Record<"en" | "id", string>;
  imageUrl: string;
  link?: string;
  stack: string[];
}

export interface MultilingualExperience {
  id: string;
  title: Record<"en" | "id", string>;
  company: string;
  location: string;
  period: string;
  description: Record<"en" | "id", string>;
  iconType: string;
}

export interface MultilingualEducation {
  id: string;
  title: Record<"en" | "id", string>;
  institution: string;
  location: string;
  period: string;
  description: Record<"en" | "id", string>;
  iconType: string;
}

export interface MultilingualAchievement {
  id: string;
  title: Record<"en" | "id", string>;
  date: string;
  issuer: string;
  description: Record<"en" | "id", string>;
  icon: string;
}

export interface LocalDatabase {
  projects: MultilingualProject[];
  experiences: MultilingualExperience[];
  education: MultilingualEducation[];
  achievements: MultilingualAchievement[];
}

export const defaultData: LocalDatabase = {
  projects: [
    {
      id: "oryza-lokabasa",
      title: {
        en: "Oryza Lokabasa",
        id: "Oryza Lokabasa",
      },
      description: {
        en: "A digital web platform dedicated to preserving Indonesian regional languages and cultural heritage, built with Next.js, PostgreSQL, and Prisma.",
        id: "Platform web digital yang didedikasikan untuk melestarikan bahasa daerah dan warisan budaya Indonesia, dibangun dengan Next.js, PostgreSQL, dan Prisma.",
      },
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
      link: "https://github.com/denisptra",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    },
    {
      id: "pencak-silat-padjajaran",
      title: {
        en: "Sistem Pencak Silat Padjajaran",
        id: "Sistem Pencak Silat Padjajaran",
      },
      description: {
        en: "An integrated administrative and management portal for the Pencak Silat Padjajaran organization, featuring member lists and registration tracking.",
        id: "Portal administrasi dan manajemen terintegrasi untuk organisasi Pencak Silat Padjajaran, menampilkan pendataan anggota dan pendaftaran kegiatan.",
      },
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      link: "https://github.com/denisptra",
      stack: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    },
    {
      id: "organization-website",
      title: {
        en: "Campus Organization Profile",
        id: "Website Profil Organisasi",
      },
      description: {
        en: "A modern responsive landing page for a student organization, featuring event timelines, member lists, publication gallery, and public inquiries form.",
        id: "Landing page responsif modern untuk organisasi mahasiswa kampus, menampilkan linimasa kegiatan, daftar anggota, galeri publikasi, dan kontak.",
      },
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
      link: "https://github.com/denisptra",
      stack: ["React", "Vite", "Tailwind CSS", "Node.js"],
    },
    {
      id: "admin-dashboard",
      title: {
        en: "Responsive Admin Dashboard",
        id: "Dashboard Admin Responsif",
      },
      description: {
        en: "A dynamic management dashboard panel with visual charts, interactive statistics, secure login system, and user profile role editing controls.",
        id: "Panel dashboard manajemen dinamis dengan grafik visual, statistik interaktif, sistem login aman, dan kontrol pengeditan hak akses profil.",
      },
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      link: "https://github.com/denisptra",
      stack: ["React", "Next.js", "Tailwind CSS", "Recharts"],
    },
    {
      id: "uiux-portfolio",
      title: {
        en: "UI/UX Mobile App Case Study",
        id: "Studi Kasus UI/UX Aplikasi Mobile",
      },
      description: {
        en: "A user-centered design project detailing the research, interface wireframes, logo design, high-fidelity mockups, and interactive prototype in Figma.",
        id: "Proyek desain berorientasi pengguna yang merinci riset kebutuhan, wireframe antarmuka, desain logo, mockup high-fidelity, dan prototype figma.",
      },
      imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop",
      link: "https://figma.com",
      stack: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
    },
    {
      id: "graphic-design-portfolio",
      title: {
        en: "Creative Graphic Design Collection",
        id: "Koleksi Desain Grafis Kreatif",
      },
      description: {
        en: "A curated collection of marketing visual assets, event posters, corporate branding logos, banner designs, and social media posts.",
        id: "Kumpulan aset visual promosi pemasaran, poster acara, logo identitas perusahaan, desain banner, dan kiriman konten kreatif media sosial.",
      },
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
      link: "https://behance.net",
      stack: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
    },
  ],
  experiences: [
    {
      id: "exp-1",
      title: {
        en: "Junior Web Developer",
        id: "Junior Web Developer",
      },
      company: "Freelance",
      location: "Jakarta Selatan, Indonesia",
      period: "2024 - Present",
      description: {
        en: "Designed and built custom responsive sites and web management systems for local businesses, writing clean code and integrating REST API services.",
        id: "Merancang dan membangun situs responsif kustom serta sistem manajemen web untuk bisnis lokal, menulis kode bersih, dan mengintegrasikan layanan REST API.",
      },
      iconType: "code",
    },
    {
      id: "exp-2",
      title: {
        en: "UI/UX & Graphic Designer",
        id: "Desainer Grafis & UI/UX",
      },
      company: "Freelance",
      location: "Jakarta, Indonesia",
      period: "2023 - Present",
      description: {
        en: "Created user flows, interface mockups, and visual publication assets including posters, banners, and logos to support branding strategies.",
        id: "Membuat alur pengguna, mockup antarmuka, serta aset publikasi visual termasuk poster, banner, dan logo untuk mendukung strategi identitas brand.",
      },
      iconType: "design",
    },
    {
      id: "exp-3",
      title: {
        en: "Active Student Staff",
        id: "Anggota Staf Aktif",
      },
      company: "Campus Student Organization",
      location: "Jakarta, Indonesia",
      period: "2022 - Present",
      description: {
        en: "Managed digital posts, created graphic illustrations for events, and updated information layouts on the official organization page.",
        id: "Mengelola postingan digital, membuat ilustrasi grafis untuk acara, serta memperbarui tata letak informasi pada halaman resmi organisasi.",
      },
      iconType: "media",
    },
  ],
  education: [
    {
      id: "edu-1",
      title: {
        en: "Computer Science (Management)",
        id: "Ilmu Komputer (Manajemen)",
      },
      institution: "Universitas Terbuka",
      location: "Jakarta, Indonesia",
      period: "2023 - Present",
      description: {
        en: "Enrolled in Bachelor of Computer Science program, studying algorithms, information systems management, and project execution methodologies.",
        id: "Menempuh pendidikan jenjang Sarjana Komputer, mempelajari algoritma pemrograman, manajemen sistem informasi, dan metodologi proyek.",
      },
      iconType: "university",
    },
    {
      id: "edu-2",
      title: {
        en: "Web Programming Intensive Training",
        id: "Pelatihan Intensif Pemrograman Web",
      },
      institution: "Pesantren PeTIK & SantriKoding",
      location: "Depok, Indonesia",
      period: "2023 - 2024",
      description: {
        en: "Completed full stack software training on modern frameworks (React, Laravel, Node.js), database relational administration, and server deployment.",
        id: "Menyelesaikan pelatihan perangkat lunak full stack dengan framework modern (React, Laravel, Node.js), administrasi database relasional, dan server.",
      },
      iconType: "code",
    },
    {
      id: "edu-3",
      title: {
        en: "Senior High School Science Student",
        id: "Siswa SMA Peminatan IPA",
      },
      institution: "Senior High School",
      location: "Lampung, Indonesia",
      period: "2020 - 2023",
      description: {
        en: "Graduated science major, actively leading publication clubs and designing school announcements and visual content.",
        id: "Lulus peminatan ilmu pengetahuan alam, aktif memimpin klub media informasi, dan mendesain pengumuman grafis serta konten visual sekolah.",
      },
      iconType: "school",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: {
        en: "Web Development Fundamentals",
        id: "Dasar Pemrograman Web",
      },
      date: "2024",
      issuer: "Dicoding Indonesia",
      description: {
        en: "Acquired formal validation of core markup language (HTML), styling layouts (CSS), logic (JavaScript), and responsive screen optimizations.",
        id: "Memperoleh validasi formal bahasa markup (HTML), tata letak gaya (CSS), logika interaktif (JavaScript), serta optimasi layar responsif.",
      },
      icon: "zap",
    },
    {
      id: "ach-2",
      title: {
        en: "React & Next.js Professional",
        id: "Pengembangan React & Next.js",
      },
      date: "2024",
      issuer: "Udemy & SantriKoding",
      description: {
        en: "Advanced training in React hook flows, state handlers, Next.js routing structures, component design, and server optimization.",
        id: "Pelatihan tingkat lanjut alur hook React, penangan status, struktur router Next.js, desain komponen, dan optimasi server.",
      },
      icon: "award",
    },
    {
      id: "ach-3",
      title: {
        en: "UI/UX Design Certification",
        id: "Sertifikasi Desain UI/UX",
      },
      date: "2023",
      issuer: "Coursera",
      description: {
        en: "Valid validation in creating wireframes, defining user flows, conducting UX evaluations, interface mapping, and high-fidelity layouts.",
        id: "Sertifikasi kompetensi pembuatan wireframe, penentuan alur pengguna, pelaksanaan evaluasi UX, pemetaan antarmuka, dan tata letak.",
      },
      icon: "star",
    },
    {
      id: "ach-4",
      title: {
        en: "Creative Graphic Design Certificate",
        id: "Sertifikat Desain Grafis Kreatif",
      },
      date: "2023",
      issuer: "Canva Design Academy",
      description: {
        en: "Practical training validating corporate branding typography, visual hierarchy balance, layout composition, and content export formats.",
        id: "Pelatihan praktis memvalidasi tipografi identitas brand, keseimbangan tata letak visual, komposisi warna, dan format ekspor konten.",
      },
      icon: "trophy",
    },
  ],
};

export const frameworks = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

export const tools = [
  { name: "Antigravity", icon: "https://antigravity.google/assets/image/antigravity-logo.png" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "Affinity", icon: "https://cdn.worldvectorlogo.com/logos/new-affinity-logo.svg" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
  { name: "Notion", icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
];
