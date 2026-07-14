"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerforationStrip from "@/components/layout/PerforationStrip";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CertCard from "@/components/ui/CertCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CardStack from "@/components/ui/CardStack";
import { useApp } from "@/context/AppContext";

export default function AchievementsPage() {
  const { data, t, isLoading, lang } = useApp();

  // Mapping categorizations for badges
  const getCategoryName = (id: string) => {
    if (id === "ach-1") return "BOOTCAMP";
    if (id === "ach-2") return "KURSUS";
    if (id === "ach-3") return "SERTIFIKASI";
    if (id === "ach-4") return "SERTIFIKASI";
    if (id === "ach-5") return "PENGHARGAAN";
    if (id === "ach-6") return "PRESTASI";
    if (id === "ach-7") return "KURSUS";
    if (id === "ach-8") return "PRESTASI";
    return "SERTIFIKAT";
  };

  const getIconName = (id: string) => {
    if (id === "ach-1" || id === "ach-5") return "award";
    if (id === "ach-2" || id === "ach-7") return "zap";
    if (id === "ach-3" || id === "ach-6") return "star";
    if (id === "ach-4" || id === "ach-8") return "trophy";
    return "star";
  };

  return (
    <>
      <Navbar />
      <PerforationStrip />

      <main className="md:pl-perforation-width px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="w-full flex flex-col gap-8 items-center">

          <Breadcrumb />

          {/* SECTION: SERTIFIKAT */}
          <AnimatedSection className="w-full relative text-center">
            {/* Section Header */}
            <div className="flex items-end gap-4 mb-12 border-b-thick border-ink pb-4 justify-center">
              <div className="bg-archive-orange text-ink px-4 py-2 text-label-mono border-thick border-ink brutal-shadow-sm uppercase font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">folder</span>
                Lampiran_05
              </div>
              <h1 className="text-headline-section text-ink uppercase m-0 leading-none">
                Sertifikat &amp; Prestasi
              </h1>
            </div>

            {/* Certifications Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="h-64 bg-surface-container border-2 border-ink animate-pulse" />
                ))}
              </div>
            ) : (
              <CardStack
                className="w-full"
                items={data.achievements.map((c) => ({
                  id: c.id,
                  content: (
                    <CertCard
                      category={getCategoryName(c.id)}
                      title={c.title[lang] || c.title["en"]}
                      description={c.description[lang] || c.description["en"]}
                      issuer={c.issuer}
                      date={c.date}
                      iconName={getIconName(c.id)}
                    />
                  ),
                }))}
              />
            )}
          </AnimatedSection>

        </div>
      </main>

      <Footer />
    </>
  );
}
