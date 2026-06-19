"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaBanner from "@/components/ui/CtaBanner";
import { useApp } from "@/context/AppContext";

export default function AboutPage() {
  const { t } = useApp();

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen flex flex-col justify-between">
        <div className="py-12 animate-in fade-in duration-700 flex-grow">
          <div className="max-w-4xl mx-auto px-6">
            <Breadcrumb />
            
            {/* Bio section with photo */}
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20 mt-6">
              <div className="w-52 h-52 md:w-64 md:h-64 flex-shrink-0 relative">
                <div className="absolute inset-2 border border-black/5 rounded-xl rotate-3 -z-10 bg-[#f9f9f8]" />
                <div className="w-full h-full rounded-xl overflow-hidden shadow-sm grayscale-[0.3] hover:grayscale-0 transition-all duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Deni.png" alt="Deni Trio Saputra" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-black text-[#37352f] mb-4 tracking-tight leading-tight">
                  {t.about.title}
                </h1>
                <p className="text-[14px] text-[#37352f]/60 leading-relaxed mb-6">
                  {t.about.intro}
                </p>
                <div className="inline-block px-3 py-1 bg-[#f1f1ef] rounded text-[11px] font-bold text-[#37352f]/40 italic">
                  &ldquo;{t.about.quote}&rdquo;
                </div>
              </div>
            </div>

            {/* Story & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-[#37352f]/60 mb-20">
              <div className="space-y-4">
                <h2 className="text-sm font-black text-[#37352f] uppercase tracking-widest">
                  {t.about.storyTitle}
                </h2>
                <p className="text-[13px] leading-relaxed">
                  {t.about.storyPara1}
                </p>
                <p className="text-[13px] leading-relaxed">
                  {t.about.storyPara2}
                </p>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-sm font-black text-[#37352f] uppercase tracking-widest">
                  {t.about.valuesTitle}
                </h2>
                <ul className="space-y-6">
                  {[
                    { title: t.about.v1Title, desc: t.about.v1Desc },
                    { title: t.about.v2Title, desc: t.about.v2Desc },
                    { title: t.about.v3Title, desc: t.about.v3Desc }
                  ].map((val, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[10px] font-black text-[#37352f]/20 mr-4 mt-0.5">
                        0{idx + 1}
                      </span>
                      <div className="text-[13px] leading-relaxed">
                        <strong className="text-[#37352f] font-black block mb-0.5">
                          {val.title}
                        </strong>
                        {val.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <CtaBanner
            variant="dark"
            emoji="🚀"
            title={t.cta.title}
            subtitle={t.cta.subtitle}
            buttonText={t.cta.collaborate}
          />
        </div>
        <Footer />
      </main>
    </>
  );
}
