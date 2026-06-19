"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaBanner from "@/components/ui/CtaBanner";
import TimelineItem from "@/components/ui/TimelineItem";
import { useApp } from "@/context/AppContext";

export default function ExperiencePage() {
  const { data, t, isLoading, lang } = useApp();

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen flex flex-col justify-between">
        <div className="py-12 animate-in fade-in duration-700 flex-grow">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto px-6 mb-16">
            <Breadcrumb />
            <h1 className="text-2xl md:text-3xl font-black text-[#37352f] mb-3 tracking-tight">
              {t.experience.title}
            </h1>
            <p className="text-[13px] text-[#37352f]/50 leading-relaxed font-medium">
              {t.experience.subtitle}
            </p>
          </div>

          {/* Timeline Section */}
          <div className="max-w-4xl mx-auto px-6 mb-20">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((r) => (
                  <div key={r} className="h-40 bg-gray-50 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : (
              data.experiences.map((r) => (
                <TimelineItem
                  key={r.id}
                  title={r.title[lang] || r.title["en"]}
                  subtitle={r.company}
                  location={r.location}
                  period={r.period}
                  description={r.description[lang] || r.description["en"]}
                  iconType={r.iconType}
                />
              ))
            )}
          </div>

          {/* CV Download Banner */}
          <CtaBanner
            emoji="👀"
            title={t.experience.ctaTitle}
            subtitle={t.cta.subtitle}
            buttonText={t.experience.ctaBtn}
            href="/CV.pdf"
            download="Deni_Trio_Saputra_CV.pdf"
          />
        </div>
        <Footer />
      </main>
    </>
  );
}
