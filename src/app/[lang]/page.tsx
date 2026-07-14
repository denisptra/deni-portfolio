"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerforationStrip from "@/components/layout/PerforationStrip";
import HeroSection from "@/components/sections/HeroSection";
import ToolsSection from "@/components/sections/ToolsSection";
import ProjectCard from "@/components/ui/ProjectCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CardStack from "@/components/ui/CardStack";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { data, t, lang } = useApp();
  const teaserProjects = data.projects.slice(0, 4);

  return (
    <>
      <Navbar />
      <PerforationStrip />

      <main className="md:pl-perforation-width px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="flex flex-col gap-24 items-center">

          <AnimatedSection className="w-full">
            <HeroSection />
          </AnimatedSection>

          <AnimatedSection className="w-full">
            <ToolsSection />
          </AnimatedSection>

          <hr className="dashed-divider w-full" />

          {/* Project Teaser Section */}
          <AnimatedSection className="w-full text-center">
            <div className="inline-block bg-map-green border-t-thick border-x-thick border-ink px-4 py-2 text-label-mono font-bold text-white uppercase relative z-10 -mb-[3px]">
              DOKUMEN: PROYEK_UNGGULAN
            </div>

            <div className="border-thick border-ink bg-paper p-6 md:p-8 brutal-shadow relative">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b-2 border-dashed border-ink pb-4 gap-4">
                <h2 className="text-headline-section text-ink uppercase">
                  Arsip Proyek Pilihan
                </h2>
                <Link
                  href={`/${lang}/projects`}
                  className="px-4 py-2 bg-archive-yellow border-2 border-ink text-ink text-label-mono font-bold uppercase brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
                >
                  <span className="material-symbols-outlined text-[16px]">folder_open</span>
                  {t.projects.showMore || "Lihat Semua Proyek"}
                </Link>
              </div>

              <CardStack
                className="w-full"
                items={teaserProjects.slice(0, 4).map((p) => ({
                  id: p.id,
                  content: (
                    <div className="w-full">
                      <ProjectCard project={p} />
                    </div>
                  ),
                }))}
              />
            </div>
          </AnimatedSection>

        </div>
      </main>

      <Footer />
    </>
  );
}
