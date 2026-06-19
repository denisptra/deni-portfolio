"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal, Cpu, HardDrive, RefreshCw } from "lucide-react";
import { useApp } from "@/context/AppContext";

const PRESET_COMMANDS = [
  { cmd: "Siapa Deni Trio Saputra?", label: "Siapa Deni?", icon: "👤", desc: "Profil singkat Deni" },
  { cmd: "Apa keahlian teknis Deni?", label: "Keahlian & Skills", icon: "📊", desc: "Keahlian pemrograman & desain" },
  { cmd: "Tampilkan proyek terbaru", label: "Proyek Terbaru", icon: "📁", desc: "Daftar proyek terpilih" },
  { cmd: "Bagaimana cara menghubungi Deni?", label: "Hubungi Deni", icon: "📧", desc: "Kontak & media sosial" },
  { cmd: "clear", label: "Clear Chat", icon: "🧹", desc: "Bersihkan obrolan" }
];

export default function HeroSection() {
  const { t } = useApp();
  const [history, setHistory] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Command database
  const getCommandOutput = (cmd: string): string[] => {
    switch (cmd.trim()) {
      case "Siapa Deni Trio Saputra?":
        return [
          "User: Siapa Deni Trio Saputra?",
          "AI Agent:",
          "Deni Trio Saputra adalah seorang Software & Design Partner profesional yang berbasis di Jakarta Selatan, Indonesia.",
          "Ia terampil menjembatani kode pemrograman web/mobile dengan seni desain grafis & pemodelan 3D interaktif.",
          "",
          "🚀 Fokus Utama: Membangun produk digital yang bersih, modern, dan scalable.",
          "💡 Filosofi   : Menyeimbangkan performa kode tingkat tinggi dengan estetika visual premium."
        ];
      case "Apa keahlian teknis Deni?":
        return [
          "User: Apa keahlian teknis Deni?",
          "AI Agent:",
          "Melakukan pemindaian sistem keahlian Deni Trio Saputra...",
          "──────────────────────────────────────────────────",
          "  • Web Programming   : React, TypeScript, Next.js, Laravel, Node.js [100%]",
          "  • Mobile Dev        : Flutter, Cross-Platform App Integration [80%]",
          "  • Design & 3D Art   : Figma UI/UX, Adobe Illustrator, Blender [70%]",
          "  • Game & XR         : Unity Engine, Interactive Gaming Systems [60%]",
          "  • Microcontroller   : Arduino physical computing, IoT hardware [70%]",
          "──────────────────────────────────────────────────",
          "Semua modul keahlian aktif dan berjalan optimal."
        ];
      case "Tampilkan proyek terbaru":
        return [
          "User: Tampilkan proyek terbaru",
          "AI Agent:",
          "Menghubungkan ke database portofolio...",
          "Berikut adalah beberapa proyek unggulan dari Deni:",
          "──────────────────────────────────────────────────",
          "  1. Oryza Lokabasa       - Hub pelestarian bahasa daerah (Next.js & PostgreSQL)",
          "  2. Padjajaran Silat Sys - Portal manajemen organisasi silat (Laravel & MySQL)",
          "  3. Campus Profile Web   - Landing page responsif kemahasiswaan (React & Vite)",
          "  4. UI/UX Figma Case     - Prototipe interaktif desain aplikasi mobile",
          "──────────────────────────────────────────────────",
          "Anda dapat menavigasi ke halaman 'Portfolio' di atas untuk detail selengkapnya."
        ];
      case "Bagaimana cara menghubungi Deni?":
        return [
          "User: Bagaimana cara menghubungi Deni?",
          "AI Agent:",
          "Berikut adalah detail kontak resmi Deni Trio Saputra:",
          "──────────────────────────────────────────────────",
          "  📧 Email      : denisptra@my.id",
          "  🌐 Website    : https://denisptra.my.id",
          "  🐙 GitHub     : https://github.com/denisptra",
          "  💼 LinkedIn   : Deni Trio Saputra",
          "──────────────────────────────────────────────────",
          "Anda juga dapat mengirimkan pesan langsung lewat formulir di halaman 'Contact'."
        ];
      default:
        return [
          `User: ${cmd}`,
          `AI Agent: Maaf, saya tidak menemukan informasi untuk pencarian "${cmd}". Silakan pilih preset di bawah.`
        ];
    }
  };

  // Run a command with auto-typing animation
  const runCommand = async (cmdText: string) => {
    if (isTyping) return;
    setIsTyping(true);

    if (cmdText === "clear") {
      setCurrentInput("");
      setHistory([]);
      setIsTyping(false);
      return;
    }

    // Auto-type effect for input line
    let typed = "";
    for (let i = 0; i < cmdText.length; i++) {
      typed += cmdText[i];
      setCurrentInput(typed);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    // Add delay before displaying output
    await new Promise((resolve) => setTimeout(resolve, 200));

    const output = getCommandOutput(cmdText);
    setHistory((prev) => [...prev, ...output]);
    setCurrentInput("");
    setIsTyping(false);
  };

  // Boot sequence on mount
  useEffect(() => {
    const bootSequence = [
      "Initializing Antigravity AI CLI v1.0.0...",
      "[ OK ] Menghubungkan ke sistem kecerdasan buatan...",
      "[ OK ] Memuat basis data profil Deni Trio Saputra...",
      "──────────────────────────────────────────────────",
      "AI Agent: Halo! Saya adalah asisten virtual portofolio Deni.",
      "Tanyakan apa saja mengenai profil, keahlian, atau proyek Deni di bawah ini!"
    ];
    setHistory(bootSequence);
  }, []);

  // Scroll to bottom when history changes or typing occurs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentInput]);

  return (
    <div className="hero-section pt-10 md:pt-20 pb-20 border-b border-[#eef0f2] bg-white relative overflow-hidden">
      {/* Grid background */}
      <div className="hero-grid-pattern" />

      {/* Floating background bubbles */}
      <div className="bubble w-52 h-52 top-10 left-[5%]" />
      <div className="bubble w-72 h-72 top-[20%] right-[10%]" style={{ animationDelay: "3s" }} />

      {/* Floating Notion-like Emojis/Icons */}
      <div className="hidden lg:block select-none pointer-events-none">
        {/* Left Side Floating Icons */}
        <div className="absolute top-[12%] left-[8%] animate-float-slow bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef0f2] w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
          🚀
        </div>
        <div className="absolute top-[32%] left-[4%] animate-float-medium bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef0f2] w-14 h-14 rounded-2xl flex items-center justify-center text-2xl z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
          💻
        </div>
        <div className="absolute top-[52%] left-[9%] animate-float-fast bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef0f2] w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
          🎨
        </div>
        <div className="absolute top-[75%] left-[5%] animate-float-slow bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef0f2] w-13 h-13 rounded-2xl flex items-center justify-center text-xl z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
          💡
        </div>

        {/* Right Side Floating Icons */}
        <div className="absolute top-[15%] right-[6%] animate-float-medium bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef0f2] w-13 h-13 rounded-2xl flex items-center justify-center text-xl z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
          📝
        </div>
        <div className="absolute top-[35%] right-[9%] animate-float-slow bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef0f2] w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
          📱
        </div>
        <div className="absolute top-[55%] right-[4%] animate-float-fast bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef0f2] w-14 h-14 rounded-2xl flex items-center justify-center text-2xl z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
          ⚡
        </div>
        <div className="absolute top-[72%] right-[8%] animate-float-medium bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef0f2] w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
          🎓
        </div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-3 text-center">
        {/* Availability Badge */}
        <div className="flex justify-center mb-10 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#f1f1ef] text-[#37352f]/60 border border-[#eef0f2] tracking-tight shadow-2xs">
            <span className="mr-2 flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            {t.hero.badge}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#37352f] tracking-tight leading-[1.02] mb-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          {t.hero.title}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm md:text-xl text-[#37352f]/50 leading-relaxed max-w-3xl mx-auto mb-16 font-medium animate-in fade-in slide-in-from-bottom-5 duration-700">
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Link
            href="/projects"
            className="w-full sm:w-auto bg-[#1F9CF0] hover:bg-[#1581cc] text-white px-10 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl shadow-blue-50/50 text-center hover:scale-102 active:scale-98"
          >
            {t.hero.viewProjects}
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#1F9CF0] px-10 py-3.5 rounded-xl font-bold text-sm transition-all border border-blue-100 flex items-center justify-center hover:scale-102 active:scale-98"
          >
            {t.hero.letsTalk}
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Futuristic Terminal / Antigravity Console (Lightweight static container) */}
        <div className="relative max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 px-2 sm:px-0">
          
          {/* Terminal Box Wrapper */}
          <div className="bg-[#fafafa] rounded-2xl border border-[#eef0f2] shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden text-left relative">

            {/* Terminal Window Header */}
            <div className="bg-[#f1f1ef]/85 border-b border-[#eef0f2] px-5 py-4 flex items-center justify-between relative z-30 select-none">
              
              {/* Window controls */}
              <div className="flex items-center space-x-2.5">
                <button className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center text-[7px] text-red-950 font-black cursor-pointer hover:opacity-85">×</button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[7px] text-yellow-950 font-black cursor-pointer hover:opacity-85">-</button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] flex items-center justify-center text-[7px] text-green-950 font-black cursor-pointer hover:opacity-85">+</button>
              </div>

              {/* Window Title */}
              <div className="text-[10px] font-mono font-bold text-[#37352f]/60 uppercase tracking-widest flex items-center space-x-2">
                <Terminal size={12} className="text-[#37352f]/70" />
                <span>antigravity-terminal-sh - deni@antigravity</span>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-2 font-mono text-[9px] text-[#37352f]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="hidden sm:inline opacity-80 uppercase tracking-wider font-extrabold text-[8px]">Session OK</span>
              </div>
            </div>

            {/* Terminal Output Area */}
            <div className="p-6 sm:p-8 h-[320px] overflow-y-auto font-mono text-xs sm:text-[13px] text-[#37352f]/85 leading-relaxed space-y-2 select-text custom-scrollbar z-10 relative">
              
              {/* History outputs */}
              {history.map((line, idx) => {
                let colorClass = "text-[#37352f]/80";
                if (line.startsWith("User:")) {
                  colorClass = "text-[#1F9CF0] font-black mt-3";
                } else if (line.startsWith("AI Agent:")) {
                  colorClass = "text-[#37352f] font-black tracking-tight mt-2";
                } else if (line.startsWith("[ OK ]")) {
                  colorClass = "text-emerald-600 font-bold";
                } else if (line.startsWith("==") || line.startsWith("--") || line.startsWith("──") || line.startsWith("───")) {
                  colorClass = "text-[#37352f]/10";
                } else if (line.includes("•")) {
                  colorClass = "text-[#37352f]/85 pl-2 font-mono";
                } else if (line.includes("1.") || line.includes("2.") || line.includes("3.") || line.includes("4.")) {
                  colorClass = "text-[#37352f]/85 pl-2 font-mono";
                } else if (line.startsWith("Initializing") || line.startsWith("Melakukan") || line.startsWith("Menghubungkan")) {
                  colorClass = "text-[#787774]/70 italic";
                }

                return (
                  <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                    {line}
                  </div>
                );
              })}

              {/* Active input line typing animation */}
              <div className="text-[#1F9CF0] font-black flex items-center mt-3">
                <span>User: </span>
                <span className="text-[#37352f] ml-2 whitespace-pre">{currentInput}</span>
                <span className="ml-1 w-2.5 h-4.5 bg-[#37352f] inline-block animate-pulse" />
              </div>

              <div ref={terminalEndRef} />
            </div>

            {/* Preset Tactical Command Panel (Interactive buttons under terminal) */}
            <div className="bg-[#f1f1ef]/40 backdrop-blur-md border-t border-[#eef0f2] p-5 relative z-30 select-none">
              <div className="text-[9px] font-mono font-black uppercase tracking-widest text-[#37352f]/40 mb-3.5">
                EXECUTE TELEMETRY COMMANDS
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                {PRESET_COMMANDS.map((item) => (
                  <button
                    key={item.cmd}
                    disabled={isTyping}
                    onClick={() => runCommand(item.cmd)}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-[#eef0f2] text-[#37352f] rounded-xl text-left sm:text-center text-[10px] font-mono font-bold tracking-wider transition-all flex items-center gap-2 shadow-2xs hover:shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
