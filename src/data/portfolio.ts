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
  link?: string;
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
        en: "A community website for arts, language & culture of Nusantara. Features bilingual content (ID/EN), news articles, gallery, and contact system built with Next.js and PostgreSQL.",
        id: "Website komunitas seni, bahasa & budaya Nusantara. Menampilkan konten bilingual (ID/EN), artikel berita, galeri, dan sistem kontak yang dibangun dengan Next.js dan PostgreSQL.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ad64a5eb4-4951-48a6-8df8-6c2ebfea7d24%3AIndonesia_Bahasa_Ibu.jpg?table=block&id=34f93480-d049-80b3-9fbc-dc05d462bc02&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://oryzalokabasa.com/",
      stack: ["Next.js", "PostgreSQL", "Express.js", "Tailwind CSS", "TypeScript"],
    },
    {
      id: "pencak-silat-padjajaran",
      title: {
        en: "Pencak Silat Padjajaran",
        id: "Pencak Silat Padjajaran",
      },
      description: {
        en: "Official portal for Padepokan Pencak Silat Padjadjaran Pusat. An organizational website preserving the art of Pencak Silat heritage since 1970 with member management and event registration.",
        id: "Portal resmi Padepokan Pencak Silat Padjadjaran Pusat. Website organisasi yang melestarikan seni pencak silat warisan luhur nusantara sejak 1970 dengan manajemen anggota dan pendaftaran kegiatan.",
      },
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      link: "https://padjadjaranpusat.org/",
      stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    },
    {
      id: "agrowisata-darangdan",
      title: {
        en: "Darangdan Agrotourism",
        id: "Agrowisata Darangdan",
      },
      description: {
        en: "A modern agrotourism promotional website showcasing the beauty and activities of Darangdan agricultural tourism, built with Vite and featuring responsive UI/UX design.",
        id: "Website promosi agrowisata modern yang menampilkan keindahan dan aktivitas wisata pertanian Darangdan, dibangun dengan Vite dan desain UI/UX yang responsif.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ab4ac3266-7355-433e-afa1-7b1f0cc78a1c%3AScreenshot_2026-04-25_201757.png?table=block&id=34f93480-d049-8080-9897-de13c459d26a&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Vite", "JavaScript", "Tailwind CSS", "UI/UX Design"],
    },
    {
      id: "artics-digital-strategy",
      title: {
        en: "Artics Digital Strategy",
        id: "Artics Strategi Digital",
      },
      description: {
        en: "A corporate digital strategy landing page with clean modern aesthetics, built with React.js for a professional frontend experience.",
        id: "Landing page strategi digital korporat dengan estetika modern yang bersih, dibangun dengan React.js untuk pengalaman frontend yang profesional.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ade2c0e10-bb1e-44ba-a589-2b3d6e8ab6e3%3AScreenshot_2026-04-27_194952.png?table=block&id=34f93480-d049-808e-a236-e717600a6c9e&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["React.js", "JavaScript", "CSS"],
    },
    {
      id: "super-league-indonesia",
      title: {
        en: "Super League Indonesia",
        id: "Liga Super Indonesia",
      },
      description: {
        en: "A football league information platform with backend API, database management, and responsive UI design for displaying match data and team standings.",
        id: "Platform informasi liga sepak bola dengan backend API, manajemen database, dan desain UI responsif untuk menampilkan data pertandingan dan klasemen tim.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ac28a5645-2fad-4778-a7f6-f5ddd4fe7997%3ABeranda_(3).png?table=block&id=34f93480-d049-80d3-b5b5-d1c1947771c5&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Express.js", "PostgreSQL", "Vite", "Tailwind CSS"],
    },
    {
      id: "fetch-api-bmkg",
      title: {
        en: "BMKG Weather Fetch API",
        id: "Fetch API Cuaca BMKG",
      },
      description: {
        en: "A weather information web app that fetches real-time data from the Indonesian Meteorological Agency (BMKG) API, displaying forecasts with a clean React interface.",
        id: "Aplikasi web informasi cuaca yang mengambil data real-time dari API Badan Meteorologi, Klimatologi, dan Geofisika (BMKG), menampilkan prakiraan cuaca dengan antarmuka React yang bersih.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3A7047eb93-d0a8-48e6-88e5-a5e83ba0beb8%3AScreenshot_2026-04-27_195640.png?table=block&id=34f93480-d049-80da-9c55-e4e494b8f71a&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["React.js", "REST API", "JavaScript", "CSS"],
    },
    {
      id: "community-profile",
      title: {
        en: "Community Profile Website",
        id: "Website Profil Komunitas",
      },
      description: {
        en: "A full-stack community profile web application with Laravel backend, MySQL database, and comprehensive UI/UX design for organizational management.",
        id: "Aplikasi web profil komunitas full-stack dengan backend Laravel, database MySQL, dan desain UI/UX komprehensif untuk manajemen organisasi.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ab72a40a1-f87d-42b3-ac93-71c9fc2537b6%3ALanding_Page_(3).png?table=block&id=34f93480-d049-8006-ad7c-d236e6a9687b&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    },
    {
      id: "nukang",
      title: {
        en: "Nukang - Service Marketplace",
        id: "Nukang - Marketplace Jasa",
      },
      description: {
        en: "A service marketplace platform connecting users with skilled workers (tukang), featuring UI/UX design and Laravel-based backend architecture.",
        id: "Platform marketplace jasa yang menghubungkan pengguna dengan tenaga kerja terampil (tukang), dilengkapi desain UI/UX dan arsitektur backend berbasis Laravel.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ac6b6e37b-d7ec-410a-a31a-8c00d782460b%3ALanding_Page_(2).png?table=block&id=34f93480-d049-806f-bea7-dc228845865a&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Laravel", "MySQL", "Tailwind CSS", "Figma"],
    },
    {
      id: "crane-robotic",
      title: {
        en: "Robotic Crane",
        id: "Crane Robotik",
      },
      description: {
        en: "An Arduino-powered robotic crane project combining hardware engineering with software control systems for automated material handling.",
        id: "Proyek crane robotik berbasis Arduino yang menggabungkan rekayasa perangkat keras dengan sistem kontrol perangkat lunak untuk penanganan material otomatis.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3A5c283484-78ae-45b6-bc11-59003904cac1%3AScreenshot_2026-04-27_201235.png?table=block&id=34f93480-d049-80e0-8345-ff5ce507d4c7&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Arduino", "C++", "Electronics"],
    },
    {
      id: "museum-game",
      title: {
        en: "Museum Exploration Game",
        id: "Game Eksplorasi Museum",
      },
      description: {
        en: "An interactive museum exploration game built with Unity, allowing players to explore virtual museum environments with immersive 3D experiences.",
        id: "Game eksplorasi museum interaktif yang dibangun dengan Unity, memungkinkan pemain menjelajahi lingkungan museum virtual dengan pengalaman 3D yang imersif.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ac539809e-68b1-4411-923d-a0d4ac008765%3Aimage.png?table=block&id=34f93480-d049-8028-a9c4-c0852b639a2d&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://polytato.itch.io/uts-vr001-kelompok1",
      stack: ["Unity", "C#", "3D Modeling"],
    },
    {
      id: "kapur-game",
      title: {
        en: "Kapur Interactive Game",
        id: "Game Interaktif Kapur",
      },
      description: {
        en: "A creative interactive game developed in Unity featuring unique gameplay mechanics and engaging visual design for an immersive gaming experience.",
        id: "Game interaktif kreatif yang dikembangkan di Unity dengan mekanika gameplay unik dan desain visual menarik untuk pengalaman bermain yang imersif.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ae0a21f4c-12fa-43ad-b704-9509d33a48a9%3Aimage.png?table=block&id=34f93480-d049-80f9-8585-f40c7ee7fa72&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://polytato.itch.io/uas-vr001-kelompok1",
      stack: ["Unity", "C#", "Game Design"],
    },
    {
      id: "168-transportasi",
      title: {
        en: "168 Transportation App",
        id: "Aplikasi 168 Transportasi",
      },
      description: {
        en: "A transportation mobile app UI/UX design project with complete user flow, wireframes, and high-fidelity prototypes designed in Figma.",
        id: "Proyek desain UI/UX aplikasi mobile transportasi dengan alur pengguna lengkap, wireframe, dan prototipe high-fidelity yang didesain di Figma.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3A44c20f22-548e-4e8d-bdeb-a57b3094791c%3AOnboarding_Screen_2.png?table=block&id=34f93480-d049-801b-a1f2-f7f42398b264&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://www.figma.com/design/AQxlYsfnP8EXNNIyDc4QpF/168-Trans-1.0?node-id=10-13857&t=5wJHgZfJMCjCL9Pt-1",
      stack: ["Figma", "UI/UX Design", "Prototyping", "Mobile Design"],
    },
    {
      id: "sports-apps",
      title: {
        en: "Sports Mobile App Design",
        id: "Desain Aplikasi Mobile Olahraga",
      },
      description: {
        en: "A sports-themed mobile application UI/UX design featuring intuitive navigation, activity tracking interfaces, and modern visual design in Figma.",
        id: "Desain UI/UX aplikasi mobile bertema olahraga dengan navigasi intuitif, antarmuka pelacakan aktivitas, dan desain visual modern di Figma.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Accb3fcdb-4fef-4ffd-a264-8564fed54dbd%3AiPhone_14__15_Pro_Max_-_1.png?table=block&id=34f93480-d049-8050-a3b3-f1ffd2baeb89&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://www.figma.com/design/RdVcKKvJj2B8MAbQORcLI8/OUI---NUI?node-id=9-3&t=cBFphsA8BhUuRLIW-1",
      stack: ["Figma", "UI/UX Design", "Prototyping", "Mobile Design"],
    },
    {
      id: "phalanxium",
      title: {
        en: "Phalanxium Web Design",
        id: "Desain Web Phalanxium",
      },
      description: {
        en: "A waitlist web design project for Phalanxium platform, featuring sleek modern UI/UX design with interactive elements and professional aesthetics.",
        id: "Proyek desain web waitlist untuk platform Phalanxium, menampilkan desain UI/UX modern yang elegan dengan elemen interaktif dan estetika profesional.",
      },
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ab9a2c15b-57b1-431c-ad23-b668715294fd%3AHome.png?table=block&id=34f93480-d049-8096-a345-d4d2b39d2d69&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://www.figma.com/design/Mu4fLOAARLhvhDx74aufSJ/Phalanxium-UI-Design-%7C-Waitlist-Web-Version?node-id=736-3739&t=nV817S25S6lWDoLx-1",
      stack: ["Figma", "UI/UX Design", "Web Design"],
    },
  ],
  experiences: [
    {
      id: "exp-1",
      title: {
        en: "Part Time Graphic Design",
        id: "Desain Grafis Paruh Waktu",
      },
      company: "PT Altindo Mitra Perkasa",
      location: "Bekasi, West Java",
      period: "Jan 2025 - Jan 2026",
      description: {
        en: "Designed visual materials for the company's digital needs and collaborated with the team to support media and branding requirements.",
        id: "Mendesain materi visual untuk kebutuhan digital perusahaan dan berkolaborasi dengan tim untuk mendukung kebutuhan media dan branding.",
      },
      iconType: "design",
    },
    {
      id: "exp-2",
      title: {
        en: "Internship in Network Infrastructure",
        id: "Magang Infrastruktur Jaringan",
      },
      company: "Dinas Komunikasi dan Informatika",
      location: "Depok, Jawa Barat",
      period: "May 2024 - Jul 2024",
      description: {
        en: "Built a Web Community Using the Laravel Framework, helped solve network problems, and assisted in installing Access Points and LAN Cables.",
        id: "Membangun Komunitas Web Menggunakan Framework Laravel, membantu menyelesaikan masalah jaringan, dan membantu menginstal Access Point serta Kabel LAN.",
      },
      iconType: "code",
    },
    {
      id: "exp-3",
      title: {
        en: "Head of Media & Information",
        id: "Kepala Divisi Media & Informasi",
      },
      company: "Student Government Association",
      location: "South Jakarta",
      period: "Dec 2024 - Jan 2026",
      description: {
        en: "Documented student activities, managed social media content, and designed visual materials such as posters and banners for organizational events.",
        id: "Mendokumentasikan kegiatan mahasiswa, mengelola konten media sosial, dan mendesain materi visual seperti poster dan spanduk untuk acara organisasi.",
      },
      iconType: "media",
    },
  ],
  education: [
    {
      id: "edu-1",
      title: {
        en: "Computer Science",
        id: "Ilmu Komputer",
      },
      institution: "Cakrawala University",
      location: "Jakarta Selatan",
      period: "Sep 2024 - Present",
      description: {
        en: "Enrolled in Bachelor of Computer Science program, studying algorithms, information systems management, and project execution methodologies.",
        id: "Menempuh pendidikan jenjang Sarjana Komputer, mempelajari algoritma pemrograman, manajemen sistem informasi, dan metodologi pelaksanaan proyek.",
      },
      iconType: "university",
    },
    {
      id: "edu-2",
      title: {
        en: "Certificate in Junior Web Developer",
        id: "Sertifikat Junior Web Developer",
      },
      institution: "Pesantren Teknologi Informasi dan Komunikasi",
      location: "Depok, Jawa Barat",
      period: "Aug 2023 - Aug 2024",
      description: {
        en: "Completed software training on modern frameworks and web development.",
        id: "Menyelesaikan pelatihan perangkat lunak tentang kerangka kerja modern dan pengembangan web.",
      },
      iconType: "code",
    },
    {
      id: "edu-3",
      title: {
        en: "High School Diploma in Natural Science",
        id: "Diploma SMA jurusan IPA",
      },
      institution: "Madrasah Aliyah Al-Tsaqafah",
      location: "Jakarta Selatan",
      period: "Jul 2020 - May 2023",
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
        en: "Samsung Innovation Campus",
        id: "Samsung Innovation Campus",
      },
      date: "2024",
      issuer: "Samsung",
      description: {
        en: "Completed the Samsung Innovation Campus program, gaining advanced knowledge in technology innovation and practical application development.",
        id: "Menyelesaikan program Samsung Innovation Campus, memperoleh pengetahuan lanjutan dalam inovasi teknologi dan pengembangan aplikasi praktis.",
      },
      icon: "award",
      link: "https://drive.google.com/file/d/16VqK9vL1nlDgBwzwzCIMsBM6Uvxrh1sc/view?usp=sharing",
    },
    {
      id: "ach-2",
      title: {
        en: "Website Development with WordPress",
        id: "Pembuatan Website Menggunakan Wordpress",
      },
      date: "2024",
      issuer: "WordPress Academy",
      description: {
        en: "Certified in building professional websites using WordPress CMS, including theme customization, plugin management, and deployment.",
        id: "Tersertifikasi dalam membangun website profesional menggunakan WordPress CMS, termasuk kustomisasi tema, manajemen plugin, dan deployment.",
      },
      icon: "zap",
      link: "https://drive.google.com/file/d/1wj9RDSoe4_JhpY2TvTyrigOJdR3u8kKa/view?usp=sharing",
    },
    {
      id: "ach-3",
      title: {
        en: "Junior Web Developer Certification",
        id: "Sertifikasi Junior Web Developer",
      },
      date: "2024",
      issuer: "BNSP",
      description: {
        en: "National competency certification as Junior Web Developer, validating proficiency in HTML, CSS, JavaScript, and responsive web development.",
        id: "Sertifikasi kompetensi nasional sebagai Junior Web Developer, memvalidasi keahlian dalam HTML, CSS, JavaScript, dan pengembangan web responsif.",
      },
      icon: "star",
      link: "https://drive.google.com/file/d/16Ah7ffkYggRsxnNQar-7bRm45MmRRsqb/view?usp=sharing",
    },
    {
      id: "ach-4",
      title: {
        en: "Junior Computer Operator Certification",
        id: "Sertifikasi Operator Komputer Muda",
      },
      date: "2023",
      issuer: "BNSP",
      description: {
        en: "National competency certification as Junior Computer Operator, covering system administration, office applications, and IT operations.",
        id: "Sertifikasi kompetensi nasional sebagai Operator Komputer Muda, mencakup administrasi sistem, aplikasi perkantoran, dan operasi TI.",
      },
      icon: "trophy",
      link: "https://drive.google.com/file/d/1v6ulEw-VnTnFh2bLn2RuFD6aurEV5vGk/view?usp=sharing",
    },
    {
      id: "ach-5",
      title: {
        en: "Short Film Festival Jury",
        id: "Juri Festival Film Pendek",
      },
      date: "2024",
      issuer: "Festival Film",
      description: {
        en: "Selected as a jury member for a short film festival, evaluating cinematography, storytelling, and creative direction of competing entries.",
        id: "Terpilih sebagai anggota juri festival film pendek, mengevaluasi sinematografi, penceritaan, dan arahan kreatif dari karya-karya peserta.",
      },
      icon: "award",
      link: "https://drive.google.com/file/d/1mxUla2Ro9fiDVlbeC9VxltDsOgUywYpZ/view?usp=sharing",
    },
    {
      id: "ach-6",
      title: {
        en: "Campus Media Contribution",
        id: "Kontribusi Media Kampus",
      },
      date: "2024",
      issuer: "Universitas Terbuka",
      description: {
        en: "Recognized for outstanding contributions to campus media, including content creation, graphic design, and digital communication management.",
        id: "Diakui atas kontribusi luar biasa pada media kampus, termasuk pembuatan konten, desain grafis, dan manajemen komunikasi digital.",
      },
      icon: "star",
      link: "https://drive.google.com/file/d/1vL3Cs3hctH2ufr4Ca6bXjgch5n7grgOZ/view?usp=sharing",
    },
    {
      id: "ach-7",
      title: {
        en: "UI/UX Design Learning Certificate",
        id: "Sertifikat Pembelajaran Desain UI/UX",
      },
      date: "2023",
      issuer: "Online Academy",
      description: {
        en: "Completed UI/UX design learning program covering user research, wireframing, prototyping, and usability testing methodologies.",
        id: "Menyelesaikan program pembelajaran desain UI/UX yang mencakup riset pengguna, wireframing, prototyping, dan metodologi pengujian kegunaan.",
      },
      icon: "zap",
      link: "https://drive.google.com/file/d/1Ed6bKFxqm7-zPnowLwrJZDPEzV5cyLor/view?usp=sharing",
    },
    {
      id: "ach-8",
      title: {
        en: "Head of Media & Information",
        id: "Kepala Divisi Media & Informasi",
      },
      date: "2024",
      issuer: "Campus Student Organization",
      description: {
        en: "Appointed as Head of Media & Information division, leading content strategy, graphic design team, and digital publication workflows.",
        id: "Ditunjuk sebagai Kepala divisi Media & Informasi, memimpin strategi konten, tim desain grafis, dan alur kerja publikasi digital.",
      },
      icon: "trophy",
      link: "https://drive.google.com/file/d/1fAq-0bAYJA58x2GNwy1507dtJALNcw3G/view?usp=sharing",
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
