"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal, Cpu, HardDrive, RefreshCw } from "lucide-react";
import { useApp } from "@/context/AppContext";

const PRESET_COMMANDS = [
  { cmd: "cat profile.txt", label: "profile.txt", icon: "👤", desc: "View bio info" },
  { cmd: "antigravity --skills", label: "skills_check", icon: "📊", desc: "Scan capabilities" },
  { cmd: "antigravity --projects", label: "projects_list", icon: "📁", desc: "List main works" },
  { cmd: "sysinfo", label: "sysinfo", icon: "⚙️", desc: "Display terminal stats" },
  { cmd: "clear", label: "clear", icon: "🧹", desc: "Reset terminal view" }
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
      case "cat profile.txt":
        return [
          "deni@antigravity-os:~$ cat profile.txt",
          "--------------------------------------------------",
          "  [DEVELOPER PROFILE]",
          "  Name       : Deni Trio Saputra",
          "  Role       : Software & Design Partner",
          "  Location   : Jakarta Selatan, Indonesia",
          "  Availability: Ready for custom projects & freelancing",
          "--------------------------------------------------",
          "  Story: I bridge clean web/mobile code with graphic design",
          "  and interactive 3D elements. Powered by Antigravity AI."
        ];
      case "antigravity --skills":
        return [
          "deni@antigravity-os:~$ antigravity --skills",
          "Scanning developer competencies...",
          "==================================================",
          "  [MODULE]            [COMPETENCY LEVEL]",
          "  Web Programming     [████████████████████] 100%",
          "  Flutter Mobile Dev  [████████████████░░░░] 80%",
          "  3D Asset Blender    [██████████████░░░░░] 70%",
          "  Unity Game / XR     [████████████░░░░░░░] 60%",
          "  Arduino Physical    [██████████████░░░░░] 70%",
          "==================================================",
          "All integrated subsystems operational."
        ];
      case "antigravity --projects":
        return [
          "deni@antigravity-os:~$ antigravity --projects",
          "Fetching active repository listings...",
          "--------------------------------------------------",
          "  1. Oryza Lokabasa       - Next.js regional language hub",
          "  2. Padjajaran Silat Sys - Laravel organization portal",
          "  3. Campus Profile Web   - React/Vite responsive landing page",
          "  4. UI/UX Figma Case     - Mobile interactive mockup design",
          "--------------------------------------------------",
          "Type '/projects' on address bar to see screenshots."
        ];
      case "sysinfo":
        return [
          "deni@antigravity-os:~$ sysinfo",
          "--------------------------------------------------",
          "  OS NAME      : Antigravity OS v2.9-stable",
          "  TERMINAL     : xterm-256color",
          "  SHELL        : antigravity-sh 1.0.4",
          "  ENGINE       : React 19 + NextJS 16",
          "  CONNECTION   : SECURE PORT 3000 (active dev)",
          "  CO-PILOT     : Antigravity AI ONLINE",
          "  SYSTEM TIME  : " + new Date().toLocaleString(),
          "--------------------------------------------------"
        ];
      default:
        return [
          `deni@antigravity-os:~$ ${cmd}`,
          `Command not found: ${cmd}. Type clear or select a preset.`
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
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    // Add delay before displaying output
    await new Promise((resolve) => setTimeout(resolve, 150));

    const output = getCommandOutput(cmdText);
    setHistory((prev) => [...prev, ...output]);
    setCurrentInput("");
    setIsTyping(false);
  };

  // Boot sequence on mount
  useEffect(() => {
    const bootSequence = [
      "Initializing Antigravity OS v2.9-stable...",
      "[ OK ] Verifying memory sectors...",
      "[ OK ] Loading module: CORE_REACT_RENDERER",
      "[ OK ] Loading module: FLUTTER_MOBILE_INTEGRATION",
      "[ OK ] Loading module: UNITY_WEBGL_SYSTEM",
      "[ OK ] Loading module: BLENDER_3D_SHADER_ENGINE",
      "[ OK ] Connected to Co-Pilot: ANTIGRAVITY AI",
      "==================================================",
      "Welcome, Deni. Tactical developer telemetry loaded.",
      "Select dynamic presets below to query database."
    ];
    setHistory(bootSequence);
  }, []);

  // Scroll to bottom when history changes or typing occurs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentInput]);

  return (
    <div className="hero-section pt-10 md:pt-20 pb-20 border-b border-[#eef0f2] bg-white relative">
      {/* Grid background */}
      <div className="hero-grid-pattern" />

      {/* Floating background bubbles */}
      <div className="bubble w-52 h-52 top-10 left-[5%]" />
      <div className="bubble w-72 h-72 top-[20%] right-[10%]" style={{ animationDelay: "3s" }} />

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
          <div className="bg-[#090d16] rounded-2xl border border-cyan-500/20 shadow-[0_20px_50px_rgba(6,182,212,0.15)] overflow-hidden text-left relative">
            
            {/* CRT Monitor scanline effect overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/10 pointer-events-none z-20 [background-size:100%_4px]" />
            
            {/* Glossy top reflection */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/3 to-transparent pointer-events-none z-20" />

            {/* Terminal Window Header */}
            <div className="bg-[#0f1626] border-b border-cyan-500/10 px-5 py-4 flex items-center justify-between relative z-30 select-none">
              
              {/* Window controls */}
              <div className="flex items-center space-x-2.5">
                <button className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center text-[7px] text-red-950 font-black cursor-pointer hover:opacity-85">×</button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[7px] text-yellow-950 font-black cursor-pointer hover:opacity-85">-</button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] flex items-center justify-center text-[7px] text-green-950 font-black cursor-pointer hover:opacity-85">+</button>
              </div>

              {/* Window Title */}
              <div className="text-[10px] font-mono font-bold text-cyan-400/60 uppercase tracking-widest flex items-center space-x-2">
                <Terminal size={12} className="text-cyan-400 animate-pulse" />
                <span>antigravity-terminal-sh - deni@antigravity</span>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-2 font-mono text-[9px] text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="hidden sm:inline opacity-80 uppercase tracking-wider font-extrabold text-[8px]">Session OK</span>
              </div>
            </div>

            {/* Terminal Output Area */}
            <div className="p-6 sm:p-8 h-[320px] overflow-y-auto font-mono text-xs sm:text-[13px] text-slate-300 leading-relaxed space-y-2 select-text custom-scrollbar z-10 relative">
              
              {/* History outputs */}
              {history.map((line, idx) => {
                let colorClass = "text-slate-300";
                if (line.startsWith("deni@antigravity-os:~$")) {
                  colorClass = "text-cyan-400 font-extrabold";
                } else if (line.startsWith("[ OK ]")) {
                  colorClass = "text-emerald-400 font-bold";
                } else if (line.startsWith("==") || line.startsWith("--")) {
                  colorClass = "text-cyan-500/40";
                } else if (line.includes("Name") || line.includes("Role") || line.includes("Location")) {
                  colorClass = "text-cyan-200/90";
                } else if (line.includes("[MODULE]")) {
                  colorClass = "text-cyan-400/80 font-black uppercase tracking-wider";
                } else if (line.includes("v2.9-stable") || line.includes("antigravity-sh")) {
                  colorClass = "text-indigo-300";
                }

                return (
                  <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                    {line}
                  </div>
                );
              })}

              {/* Active input line typing animation */}
              <div className="text-cyan-400 font-extrabold flex items-center">
                <span>deni@antigravity-os:~$ </span>
                <span className="text-slate-100 ml-2 whitespace-pre">{currentInput}</span>
                <span className="ml-1 w-2.5 h-4.5 bg-cyan-400 inline-block animate-pulse" />
              </div>

              <div ref={terminalEndRef} />
            </div>

            {/* Preset Tactical Command Panel (Interactive buttons under terminal) */}
            <div className="bg-[#0f1626]/80 backdrop-blur-md border-t border-cyan-500/10 p-5 relative z-30 select-none">
              <div className="text-[9px] font-mono font-black uppercase tracking-widest text-cyan-500/40 mb-3.5">
                EXECUTE TELEMETRY COMMANDS
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                {PRESET_COMMANDS.map((item) => (
                  <button
                    key={item.cmd}
                    disabled={isTyping}
                    onClick={() => runCommand(item.cmd)}
                    className={`px-4 py-2.5 bg-slate-900/50 hover:bg-[#1F9CF0]/10 border border-cyan-500/10 hover:border-[#1F9CF0]/40 text-cyan-400 hover:text-white rounded-lg text-left sm:text-center text-[10px] font-mono font-bold tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
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
