"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProjectCard from "@/components/ui/ProjectCard";
import { useApp } from "@/context/AppContext";

export default function ProjectsPage() {
  const { data, t, isLoading } = useApp();

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen flex flex-col justify-between">
        <div className="py-12 animate-in fade-in duration-700 flex-grow">
          {/* Header Section */}
          <div className="max-w-6xl mx-auto px-6 mb-16">
            <Breadcrumb />
            <h1 className="text-2xl md:text-3xl font-black text-[#37352f] mb-3 tracking-tight">
              {t.projects.portfolioTitle}
            </h1>
            <p className="text-[13px] text-[#37352f]/50 max-w-2xl leading-relaxed font-medium">
              {t.projects.portfolioSubtitle}
            </p>
          </div>

          {/* Grid Layout Section */}
          <div className="max-w-6xl mx-auto px-6 mb-20">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[1, 2, 3, 4].map((r, idx) => (
                  <div key={idx} className="h-96 bg-gray-50 rounded-[2rem] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {data.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
