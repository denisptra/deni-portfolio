export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  stack: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  iconType: string;
}

export interface Education {
  id: string;
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  iconType: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  issuer: string;
  description: string;
  icon: string;
  link?: string;
}

export interface LocalDatabase {
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  achievements: Achievement[];
}

export const defaultData: LocalDatabase = {
  projects: [
    {
      id: "oryza-lokabasa",
      title: "Oryza Lokabasa",
      description: "Website komunitas seni, bahasa & budaya Nusantara. Menampilkan konten bilingual, artikel berita, galeri, dan sistem kontak yang dibangun dengan Next.js dan PostgreSQL.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ad64a5eb4-4951-48a6-8df8-6c2ebfea7d24%3AIndonesia_Bahasa_Ibu.jpg?table=block&id=34f93480-d049-80b3-9fbc-dc05d462bc02&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://oryzalokabasa.com/",
      stack: ["Next.js", "PostgreSQL", "Express.js", "Tailwind CSS", "TypeScript"],
    },
    {
      id: "pencak-silat-padjajaran",
      title: "Pencak Silat Padjajaran",
      description: "Portal resmi Padepokan Pencak Silat Padjadjaran Pusat. Website organisasi yang melestarikan seni pencak silat warisan luhur nusantara sejak 1970 dengan manajemen anggota dan pendaftaran kegiatan.",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      link: "https://padjadjaranpusat.org/",
      stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    },
    {
      id: "agrowisata-darangdan",
      title: "Agrowisata Darangdan",
      description: "Website promosi agrowisata modern yang menampilkan keindahan dan aktivitas wisata pertanian Darangdan, dibangun dengan Vite dan desain UI/UX yang responsif.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ab4ac3266-7355-433e-afa1-7b1f0cc78a1c%3AScreenshot_2026-04-25_201757.png?table=block&id=34f93480-d049-8080-9897-de13c459d26a&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Vite", "JavaScript", "Tailwind CSS", "UI/UX Design"],
    },
    {
      id: "artics-digital-strategy",
      title: "Artics Strategi Digital",
      description: "Landing page strategi digital korporat dengan estetika modern yang bersih, dibangun dengan React.js untuk pengalaman frontend yang profesional.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ade2c0e10-bb1e-44ba-a589-2b3d6e8ab6e3%3AScreenshot_2026-04-27_194952.png?table=block&id=34f93480-d049-808e-a236-e717600a6c9e&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["React.js", "JavaScript", "CSS"],
    },
    {
      id: "super-league-indonesia",
      title: "Liga Super Indonesia",
      description: "Platform informasi liga sepak bola dengan backend API, manajemen database, dan desain UI responsif untuk menampilkan data pertandingan dan klasemen tim.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ac28a5645-2fad-4778-a7f6-f5ddd4fe7997%3ABeranda_(3).png?table=block&id=34f93480-d049-80d3-b5b5-d1c1947771c5&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Express.js", "PostgreSQL", "Vite", "Tailwind CSS"],
    },
    {
      id: "fetch-api-bmkg",
      title: "Fetch API Cuaca BMKG",
      description: "Aplikasi web informasi cuaca yang mengambil data real-time dari API BMKG, menampilkan prakiraan cuaca dengan antarmuka React yang bersih.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3A7047eb93-d0a8-48e6-88e5-a5e83ba0beb8%3AScreenshot_2026-04-27_195640.png?table=block&id=34f93480-d049-80da-9c55-e4e494b8f71a&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["React.js", "REST API", "JavaScript", "CSS"],
    },
    {
      id: "community-profile",
      title: "Website Profil Komunitas",
      description: "Aplikasi web profil komunitas full-stack dengan backend Laravel, database MySQL, dan desain UI/UX komprehensif untuk manajemen organisasi.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ab72a40a1-f87d-42b3-ac93-71c9fc2537b6%3ALanding_Page_(3).png?table=block&id=34f93480-d049-8006-ad7c-d236e6a9687b&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    },
    {
      id: "nukang",
      title: "Nukang - Marketplace Jasa",
      description: "Platform marketplace jasa yang menghubungkan pengguna dengan tenaga kerja terampil (tukang), dilengkapi desain UI/UX dan arsitektur backend berbasis Laravel.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ac6b6e37b-d7ec-410a-a31a-8c00d782460b%3ALanding_Page_(2).png?table=block&id=34f93480-d049-806f-bea7-dc228845865a&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Laravel", "MySQL", "Tailwind CSS", "Figma"],
    },
    {
      id: "crane-robotic",
      title: "Crane Robotik",
      description: "Proyek crane robotik berbasis Arduino yang menggabungkan rekayasa perangkat keras dengan sistem kontrol perangkat lunak untuk penanganan material otomatis.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3A5c283484-78ae-45b6-bc11-59003904cac1%3AScreenshot_2026-04-27_201235.png?table=block&id=34f93480-d049-80e0-8345-ff5ce507d4c7&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://github.com/denisptra",
      stack: ["Arduino", "C++", "Electronics"],
    },
    {
      id: "museum-game",
      title: "Game Eksplorasi Museum",
      description: "Game eksplorasi museum interaktif yang dibangun dengan Unity, memungkinkan pemain menjelajahi lingkungan museum virtual dengan pengalaman 3D yang imersif.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ac539809e-68b1-4411-923d-a0d4ac008765%3Aimage.png?table=block&id=34f93480-d049-8028-a9c4-c0852b639a2d&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://polytato.itch.io/uts-vr001-kelompok1",
      stack: ["Unity", "C#", "3D Modeling"],
    },
    {
      id: "kapur-game",
      title: "Game Interaktif Kapur",
      description: "Game interaktif kreatif yang dikembangkan di Unity dengan mekanika gameplay unik dan desain visual menarik untuk pengalaman bermain yang imersif.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ae0a21f4c-12fa-43ad-b704-9509d33a48a9%3Aimage.png?table=block&id=34f93480-d049-80f9-8585-f40c7ee7fa72&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://polytato.itch.io/uas-vr001-kelompok1",
      stack: ["Unity", "C#", "Game Design"],
    },
    {
      id: "168-transportasi",
      title: "Aplikasi 168 Transportasi",
      description: "Proyek desain UI/UX aplikasi mobile transportasi dengan alur pengguna lengkap, wireframe, dan prototipe high-fidelity yang didesain di Figma.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3A44c20f22-548e-4e8d-bdeb-a57b3094791c%3AOnboarding_Screen_2.png?table=block&id=34f93480-d049-801b-a1f2-f7f42398b264&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://www.figma.com/design/AQxlYsfnP8EXNNIyDc4QpF/168-Trans-1.0?node-id=10-13857&t=5wJHgZfJMCjCL9Pt-1",
      stack: ["Figma", "UI/UX Design", "Prototyping", "Mobile Design"],
    },
    {
      id: "sports-apps",
      title: "Desain Aplikasi Mobile Olahraga",
      description: "Desain UI/UX aplikasi mobile bertema olahraga dengan navigasi intuitif, antarmuka pelacakan aktivitas, dan desain visual modern di Figma.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Accb3fcdb-4fef-4ffd-a264-8564fed54dbd%3AiPhone_14__15_Pro_Max_-_1.png?table=block&id=34f93480-d049-8050-a3b3-f1ffd2baeb89&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://www.figma.com/design/RdVcKKvJj2B8MAbQORcLI8/OUI---NUI?node-id=9-3&t=cBFphsA8BhUuRLIW-1",
      stack: ["Figma", "UI/UX Design", "Prototyping", "Mobile Design"],
    },
    {
      id: "phalanxium",
      title: "Desain Web Phalanxium",
      description: "Proyek desain web waitlist untuk platform Phalanxium, menampilkan desain UI/UX modern yang elegan dengan elemen interaktif dan estetika profesional.",
      imageUrl: "https://denisptra.notion.site/image/attachment%3Ab9a2c15b-57b1-431c-ad23-b668715294fd%3AHome.png?table=block&id=34f93480-d049-8096-a345-d4d2b39d2d69&spaceId=f9ddd867-7794-4081-bc5e-9fb1766f1385&width=600",
      link: "https://www.figma.com/design/Mu4fLOAARLhvhDx74aufSJ/Phalanxium-UI-Design-%7C-Waitlist-Web-Version?node-id=736-3739&t=nV817S25S6lWDoLx-1",
      stack: ["Figma", "UI/UX Design", "Web Design"],
    },
  ],
  experiences: [
    {
      id: "exp-1",
      title: "Desain Grafis Paruh Waktu",
      company: "PT Altindo Mitra Perkasa",
      location: "Bekasi, Jawa Barat",
      period: "Jan 2025 - Jan 2026",
      description: "Mendesain materi visual untuk kebutuhan digital perusahaan dan berkolaborasi dengan tim untuk mendukung kebutuhan media dan branding.",
      iconType: "design",
    },
    {
      id: "exp-2",
      title: "Magang Infrastruktur Jaringan",
      company: "Dinas Komunikasi dan Informatika",
      location: "Depok, Jawa Barat",
      period: "Mei 2024 - Jul 2024",
      description: "Membangun Komunitas Web Menggunakan Framework Laravel, membantu menyelesaikan masalah jaringan, dan membantu menginstal Access Point serta Kabel LAN.",
      iconType: "code",
    },
    {
      id: "exp-3",
      title: "Kepala Divisi Media & Informasi",
      company: "Student Government Association",
      location: "Jakarta Selatan",
      period: "Des 2024 - Jan 2026",
      description: "Mendokumentasikan kegiatan mahasiswa, mengelola konten media sosial, dan mendesain materi visual seperti poster dan spanduk untuk acara organisasi.",
      iconType: "media",
    },
  ],
  education: [
    {
      id: "edu-1",
      title: "Ilmu Komputer",
      institution: "Universitas Cakrawala",
      location: "Jakarta Selatan",
      period: "Sep 2024 - Sekarang",
      description: "Menempuh pendidikan jenjang Sarjana Komputer, mempelajari algoritma pemrograman, manajemen sistem informasi, dan metodologi pelaksanaan proyek.",
      iconType: "university",
    },
    {
      id: "edu-2",
      title: "Sertifikat Junior Web Developer",
      institution: "Pesantren Teknologi Informasi dan Komunikasi",
      location: "Depok, Jawa Barat",
      period: "Agu 2023 - Agu 2024",
      description: "Menyelesaikan pelatihan perangkat lunak tentang kerangka kerja modern dan pengembangan web.",
      iconType: "code",
    },
    {
      id: "edu-3",
      title: "SMA jurusan IPA",
      institution: "Madrasah Aliyah Al-Tsaqafah",
      location: "Jakarta Selatan",
      period: "Jul 2020 - Mei 2023",
      description: "Lulus peminatan ilmu pengetahuan alam, aktif memimpin klub media informasi, dan mendesain pengumuman grafis serta konten visual sekolah.",
      iconType: "school",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Samsung Innovation Campus",
      date: "2024",
      issuer: "Samsung",
      description: "Menyelesaikan program Samsung Innovation Campus, memperoleh pengetahuan lanjutan dalam inovasi teknologi dan pengembangan aplikasi praktis.",
      icon: "award",
      link: "https://drive.google.com/file/d/16VqK9vL1nlDgBwzwzCIMsBM6Uvxrh1sc/view?usp=sharing",
    },
    {
      id: "ach-2",
      title: "Pembuatan Website Menggunakan Wordpress",
      date: "2024",
      issuer: "WordPress Academy",
      description: "Tersertifikasi dalam membangun website profesional menggunakan WordPress CMS, termasuk kustomisasi tema, manajemen plugin, dan deployment.",
      icon: "zap",
      link: "https://drive.google.com/file/d/1wj9RDSoe4_JhpY2TvTyrigOJdR3u8kKa/view?usp=sharing",
    },
    {
      id: "ach-3",
      title: "Sertifikasi Junior Web Developer",
      date: "2024",
      issuer: "BNSP",
      description: "Sertifikasi kompetensi nasional sebagai Junior Web Developer, memvalidasi keahlian dalam HTML, CSS, JavaScript, dan pengembangan web responsif.",
      icon: "star",
      link: "https://drive.google.com/file/d/16Ah7ffkYggRsxnNQar-7bRm45MmRRsqb/view?usp=sharing",
    },
    {
      id: "ach-4",
      title: "Sertifikasi Operator Komputer Muda",
      date: "2023",
      issuer: "BNSP",
      description: "Sertifikasi kompetensi nasional sebagai Operator Komputer Muda, mencakup administrasi sistem, aplikasi perkantoran, dan operasi TI.",
      icon: "trophy",
      link: "https://drive.google.com/file/d/1v6ulEw-VnTnFh2bLn2RuFD6aurEV5vGk/view?usp=sharing",
    },
    {
      id: "ach-5",
      title: "Juri Festival Film Pendek",
      date: "2024",
      issuer: "Festival Film",
      description: "Terpilih sebagai anggota juri festival film pendek, mengevaluasi sinematografi, penceritaan, dan arahan kreatif dari karya-karya peserta.",
      icon: "award",
      link: "https://drive.google.com/file/d/1mxUla2Ro9fiDVlbeC9VxltDsOgUywYpZ/view?usp=sharing",
    },
    {
      id: "ach-6",
      title: "Kontribusi Media Kampus",
      date: "2024",
      issuer: "Universitas Terbuka",
      description: "Diakui atas kontribusi luar biasa pada media kampus, termasuk pembuatan konten, desain grafis, dan manajemen komunikasi digital.",
      icon: "star",
      link: "https://drive.google.com/file/d/1vL3Cs3hctH2ufr4Ca6bXjgch5n7grgOZ/view?usp=sharing",
    },
    {
      id: "ach-7",
      title: "Sertifikat Pembelajaran Desain UI/UX",
      date: "2023",
      issuer: "Online Academy",
      description: "Menyelesaikan program pembelajaran desain UI/UX yang mencakup riset pengguna, wireframing, prototyping, dan metodologi pengujian kegunaan.",
      icon: "zap",
      link: "https://drive.google.com/file/d/1Ed6bKFxqm7-zPnowLwrJZDPEzV5cyLor/view?usp=sharing",
    },
    {
      id: "ach-8",
      title: "Kepala Divisi Media & Informasi",
      date: "2024",
      issuer: "Campus Student Organization",
      description: "Ditunjuk sebagai Kepala divisi Media & Informasi, memimpin strategi konten, tim desain grafis, dan alur kerja publikasi digital.",
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
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
  { name: "Notion", icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
];
