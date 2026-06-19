"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ToolsSection from "@/components/sections/ToolsSection";
import ProjectCard from "@/components/ui/ProjectCard";
import CtaBanner from "@/components/ui/CtaBanner";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { data, t } = useApp();

  // Teaser displays first 2 projects
  const teaserProjects = data.projects.slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <HeroSection />
        
        {/* Spacer & Tools Section */}
        <ToolsSection />

        {/* Projects Teaser Section */}
        <section className="py-24 px-6 bg-white border-b border-[#eef0f2]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#37352f]/30 mb-4">
                  {t.projects.portfolioTitle}
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-[#37352f] tracking-tight">
                  {t.projects.title}
                </h2>
              </div>
              
              <Link
                href="/projects"
                className="inline-flex items-center text-xs font-bold text-[#1F9CF0] hover:text-[#1581cc] transition-colors gap-1 uppercase tracking-widest self-start md:self-auto"
              >
                <span>{t.projects.showMore}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid layout - 2 Columns for teaser */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {teaserProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Call To Action Banner */}
        <CtaBanner
          emoji="⚡"
          title={t.cta.title}
          subtitle={t.cta.subtitle}
          buttonText={t.cta.sayHello}
        />
      </main>
      <Footer />
    </>
  );
}
