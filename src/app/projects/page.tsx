"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerforationStrip from "@/components/layout/PerforationStrip";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProjectCard from "@/components/ui/ProjectCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CardStack from "@/components/ui/CardStack";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

export default function ProjectsPage() {
  const { data, isLoading } = useApp();
  const [filter, setFilter] = useState("SEMUA");

  const categories = [
    { name: "SEMUA", value: "SEMUA" },
    { name: "WEB DEV", value: "WEB DEV" },
    { name: "MOBILE", value: "MOBILE" },
    { name: "GAME", value: "GAME" },
    { name: "ROBOTICS", value: "ROBOTICS" },
  ];

  const getProjectCategory = (stack: string[]) => {
    const mainTech = stack[0]?.toLowerCase() || "";
    if (mainTech.includes("next") || mainTech.includes("react") || mainTech.includes("express") || mainTech.includes("laravel")) return "WEB DEV";
    if (mainTech.includes("flutter") || mainTech.includes("mobile")) return "MOBILE";
    if (mainTech.includes("unity") || mainTech.includes("game")) return "GAME";
    if (mainTech.includes("arduino")) return "ROBOTICS";
    return "OTHERS";
  };

  const filteredProjects = filter === "SEMUA"
    ? data.projects
    : data.projects.filter(p => getProjectCategory(p.stack) === filter);

  return (
    <>
      <Navbar />
      <PerforationStrip />

      <main className="md:pl-perforation-width px-4 md:px-margin-desktop py-6 md:py-12 max-w-container-max mx-auto">
        <div className="flex flex-col gap-8 items-center">

          <Breadcrumb />

          {/* Section Header */}
          <AnimatedSection className="w-full text-center">
            <div className="border-b-thick border-dashed border-ink pb-8">
              <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                <div className="text-center md:text-left">
                  <span className="text-label-mono text-on-surface-variant block mb-2 uppercase">Dokumen Identifikasi</span>
                  <h1 className="text-display-hero-mobile md:text-display-hero text-ink uppercase">Berkas Proyek</h1>
                </div>
                <div className="text-data-technical px-3 py-1 bg-ink text-white font-bold self-center md:self-start">
                  [ LAMPIRAN 04 ]
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pb-6 border-b-2 border-dashed border-ink w-full">
            <span className="text-label-mono font-bold text-ink">FILTER:</span>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 border-2 border-ink text-label-mono font-bold uppercase brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-ink ${
                  filter === cat.value
                    ? "bg-archive-yellow text-ink"
                    : "bg-surface text-on-surface-variant hover:text-ink hover:bg-surface-variant"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
              {[1, 2, 3, 4].map((r, idx) => (
                <div key={idx} className="h-96 bg-surface-container border-2 border-ink animate-pulse" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="border-2 border-ink bg-paper p-12 text-center w-full">
              <p className="text-display-hero-mobile text-on-surface-variant mb-4">404</p>
              <p className="text-body-main text-on-surface-variant mb-6">Tidak ada proyek untuk kategori ini.</p>
              <button
                onClick={() => setFilter("SEMUA")}
                className="px-6 py-3 bg-archive-yellow border-2 border-ink text-ink text-label-mono font-bold uppercase brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                Tampilkan Semua
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              {filteredProjects.map((project, idx) => (
                <div key={project.id} className="w-full">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex justify-center border-t-thick border-dashed border-ink pt-8 w-full">
            <button className="bg-archive-yellow text-ink border-thick border-ink px-8 py-4 text-label-mono font-bold uppercase brutal-shadow brutal-shadow-hover transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ink">
              <span className="material-symbols-outlined text-ink">folder_open</span>
              Buka Arsip Lama
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
