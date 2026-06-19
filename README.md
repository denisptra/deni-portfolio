# Deni Trio Saputra - Personal Portfolio (Notion Style)

Website portofolio pribadi modern dan minimalis untuk **Deni Trio Saputra** yang di-clone secara visual (visual cloning) 100% dari referensi utama [denisptra.vercel.app](https://denisptra.vercel.app/) dengan integrasi tema Notion Light.

## 🚀 Fitur Utama
- **Notion Light Theme:** Menggunakan palet warna asli Notion (Latar putih `#ffffff`, teks `#37352f`, border `#eef0f2`).
- **Latar Belakang Interaktif:** Dilengkapi dengan *Grid Pattern* dan *Floating Bubbles* melayang dengan efek blur yang dianimasikan secara halus menggunakan CSS Keyframes.
- **Kompilasi Cepat (Turbopack):** Dikonfigurasi dengan compiler Next.js berbasis Rust (`next dev --turbo`) untuk waktu muat lokal di bawah 1 detik.
- **TypeScript & Tailwind CSS v4:** Ditulis menggunakan arsitektur tipe TypeScript yang aman dan utility classes Tailwind v4 yang modern.
- **Fully Responsive:** Layout grid dan spasi yang dioptimasikan secara matematis untuk mobile (360px/390px), tablet (768px), laptop (1024px), hingga desktop (1440px).
- **SEO Optimized:** Menyertakan OpenGraph, metadata lengkap, dan konfigurasi bahasa teroptimal (`lang="id"`).
- **Clean Code & No Warnings:** Lolos uji linter ESLint dan compiler tanpa error.

---

## 🛠️ Tech Stack
- **Core:** Next.js (App Router) & React 19
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animasi:** Motion (Framer Motion)
- **Ikon:** Lucide React
- **Font:** Google Fonts - Inter (dioptimasi via `next/font`)

---

## 📦 Panduan Instalasi & Penggunaan

### 1. Prasyarat
Pastikan Anda sudah menginstal Node.js (versi 18+) di komputer Anda.

### 2. Instalasi Dependensi
Jalankan perintah berikut di direktori root project untuk menginstal semua package yang diperlukan:
```bash
npm install
```

### 3. Menjalankan Server Lokal (Development)
Untuk menjalankan server lokal dengan dukungan **Turbopack** (Rust compiler yang sangat cepat):
```bash
npm run dev
```
Setelah dijalankan, buka **[http://localhost:3000](http://localhost:3000)** di browser Anda.

### 4. Membuat Build Produksi
Untuk mengecek apakah project siap untuk dideploy dan bebas dari error kompilasi:
```bash
npm run build
```

### 5. Menjalankan Hasil Build Produksi
```bash
npm run start
```

---

## ☁️ Panduan Deployment ke Vercel

Project ini 100% siap dideploy ke **Vercel** secara gratis. Ikuti langkah mudah berikut:

1. Buat repositori baru di GitHub Anda dan push kode project ini ke repositori tersebut:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Notion Portfolio"
   git remote add origin <url-repo-github-anda>
   git branch -M main
   git push -u origin main
   ```
2. Masuk ke **[Vercel Dashboard](https://vercel.com/)** menggunakan akun GitHub Anda.
3. Klik tombol **Add New** > **Project**.
4. Impor repositori GitHub yang baru saja Anda buat.
5. Vercel akan secara otomatis mendeteksi konfigurasi Next.js. Klik tombol **Deploy**.
6. Selesai! Website Anda akan aktif dalam waktu kurang dari 2 menit.

---

## 🎨 Catatan Desain & Variabel Visual

Sistem desain website ini disalin secara presisi dari computed style halaman referensi:

| Elemen | Nilai Variabel CSS / Properti | Keterangan |
| :--- | :--- | :--- |
| **Latar Belakang** | `--notion-bg: #ffffff` | Latar belakang putih bersih khas Notion |
| **Warna Teks Utama** | `--notion-text: #37352f` | Hitam-abu Notion |
| **Warna Teks Redup** | `--notion-gray-text: #787774` | Abu-abu redup Notion |
| **Warna Aksen** | `--brand-blue: #1F9CF0` | Biru cerah penanda interaksi aktif |
| **Garis Pembatas** | `--notion-border: #eef0f2` | Border abu-abu tipis |
| **Latar Sekunder** | `--notion-gray: #f1f1ef` | Latar belakang abu-abu muda untuk badge/tombol |
| **Tipografi** | `Inter`, sans-serif (Google Fonts) | Font modern, tajam, dan mudah dibaca |
| **Card Style** | `border: 1px solid #eef0f2` | Desain kartu minimalis dengan bayangan halus saat hover |

### Keamanan & Struktur Data
Seluruh informasi dinamis (data diri, daftar sertifikat, detail proyek, riwayat pengalaman, dan kontak) diatur secara terpusat pada file:
👉 [src/data/portfolio.ts](file:///D:/deni-portfolio/src/data/portfolio.ts)

*Anda dapat mengubah isi konten, tautan gambar, atau detail data di file tersebut secara manual tanpa perlu mengubah kode komponen visual.*
