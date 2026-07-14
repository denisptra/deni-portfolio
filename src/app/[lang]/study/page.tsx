"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerforationStrip from "@/components/layout/PerforationStrip";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaBanner from "@/components/ui/CtaBanner";
import TimelineItem from "@/components/ui/TimelineItem";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CardStack from "@/components/ui/CardStack";
import { useApp } from "@/context/AppContext";

export default function StudyPage() {
  const { data, t, isLoading, lang } = useApp();

  return (
    <>
      <Navbar />
      <PerforationStrip />

      <main className="md:pl-perforation-width px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="w-full flex flex-col gap-8 items-center">

          <Breadcrumb />

          {/* Header Section */}
          <AnimatedSection className="w-full text-center">
            <div className="border-b-thick border-dashed border-ink pb-8 mt-6">
              <span className="text-label-mono text-on-surface-variant block mb-2 uppercase">Dokumen Identifikasi</span>
              <h1 className="text-display-hero-mobile md:text-display-hero text-ink uppercase">
                {t.study.title}
              </h1>
              <p className="text-data-technical text-on-surface-variant mt-2">
                {t.study.subtitle}
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline Section */}
          <AnimatedSection className="relative w-full text-center">
            <div className="inline-block bg-map-green text-white border-t-thick border-x-thick border-ink px-4 py-2 text-label-mono font-bold uppercase relative z-10 -mb-[3px]">
              RIWAYAT PENDIDIKAN
            </div>

            <div className="border-thick border-ink bg-paper p-6 md:p-8 brutal-shadow relative text-left">
              <h2 className="text-headline-section text-ink mb-12 uppercase border-b-2 border-dashed border-ink pb-4">
                Track Record Pendidikan
              </h2>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[11px] md:left-[19px] top-2 bottom-0 w-[3px] bg-map-green z-0"></div>

                {isLoading ? (
                  <div className="space-y-6">
                    {[1, 2].map((r) => (
                      <div key={r} className="h-40 bg-surface-container border-2 border-ink animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <CardStack
                    items={data.education.map((r) => ({
                      id: r.id,
                      content: (
                        <div className="relative z-10 mb-4 last:mb-0">
                          <TimelineItem
                            title={r.title[lang] || r.title["en"]}
                            subtitle={r.institution}
                            location={r.location}
                            period={r.period}
                            description={r.description[lang] || r.description["en"]}
                            iconType={r.iconType}
                          />
                        </div>
                      ),
                    }))}
                  />
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* CV Download Banner */}
          <div className="w-full">
            <CtaBanner
              emoji="🎓"
              title={t.experience.ctaTitle}
              subtitle={t.cta.subtitle}
              buttonText={t.experience.ctaBtn}
              href="/Deni-Trio-Saputra-UI-UX.pdf"
              download="Deni Trio Saputra - UI UX.pdf"
            />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
