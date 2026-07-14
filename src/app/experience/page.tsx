"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerforationStrip from "@/components/layout/PerforationStrip";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TimelineItem from "@/components/ui/TimelineItem";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CardStack from "@/components/ui/CardStack";
import { useApp } from "@/context/AppContext";

export default function ExperiencePage() {
  const { data, isLoading } = useApp();

  return (
    <>
      <Navbar />
      <PerforationStrip />

      <main className="md:pl-perforation-width px-4 md:px-margin-desktop py-6 md:py-12 max-w-container-max mx-auto">
        <div className="w-full flex flex-col gap-8 items-center">

          <Breadcrumb />

          {/* Experience Section */}
          <AnimatedSection className="relative w-full text-center">
            {/* Tab */}
            <div className="inline-block bg-carbon-blue text-white border-t-thick border-x-thick border-ink px-4 py-2 text-label-mono font-bold uppercase relative z-10 -mb-[3px]">
              RIWAYAT PEKERJAAN
            </div>

            <div className="border-thick border-ink bg-paper p-6 md:p-8 brutal-shadow relative text-left">
              <h2 className="text-headline-section text-ink mb-12 uppercase border-b-2 border-dashed border-ink pb-4">
                Track Record Pekerjaan &amp; Organisasi
              </h2>

              <div className="relative pl-8 md:pl-12">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[11px] md:left-[19px] top-2 bottom-0 w-[3px] bg-carbon-blue z-0"></div>

                {isLoading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((r) => (
                      <div key={r} className="h-40 bg-surface-container border-2 border-ink animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <CardStack
                    items={data.experiences.map((r) => ({
                      id: r.id,
                      content: (
                        <div className="relative z-10 mb-4 last:mb-0">
                          <TimelineItem
                            title={r.title}
                            subtitle={r.company}
                            location={r.location}
                            period={r.period}
                            description={r.description}
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

        </div>
      </main>

      <Footer />
    </>
  );
}
