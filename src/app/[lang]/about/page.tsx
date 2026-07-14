"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerforationStrip from "@/components/layout/PerforationStrip";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { useApp } from "@/context/AppContext";

export default function AboutPage() {
  const { t } = useApp();

  return (
    <>
      <Navbar />
      <PerforationStrip />

      <main className="md:pl-perforation-width px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="w-full flex flex-col gap-8 items-center">

          <Breadcrumb />

          {/* Bio Section Card */}
          <AnimatedCard className="w-full">
            <div className="bg-paper border-thick border-ink p-6 md:p-12 brutal-shadow relative mt-6">
              <div className="absolute top-0 left-0 w-full h-2 border-t-4 border-dashed border-ink opacity-30 mt-1"></div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter mt-4">

                {/* Left Column: Picture Profile */}
                <div className="md:col-span-4 flex flex-col gap-4">
                  <div className="aspect-[3/4] border-thick border-ink bg-surface brutal-shadow relative overflow-hidden flex items-center justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Deni.png"
                      alt="Deni Trio Saputra"
                      className="w-full h-full object-cover filter grayscale contrast-125 border-2 border-ink"
                    />
                    <div className="absolute top-4 right-4 z-20 transform rotate-[15deg]">
                      <div className="border-4 border-stempel-red px-3 py-1 text-stempel-red font-display text-lg font-bold uppercase tracking-widest bg-paper/85 shadow-[2px_2px_0_0_rgba(232,67,44,1)]">
                        DTS
                      </div>
                    </div>
                  </div>
                  <div className="text-data-technical text-ink border-l-2 border-ink pl-2 flex justify-between">
                    <span>REG: DTS-BIO-001</span>
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Right Column: Bio details */}
                <div className="md:col-span-8 flex flex-col gap-6">
                  <div>
                    <h1 className="text-display-hero-mobile md:text-headline-section text-ink uppercase mb-2">
                      Deni Trio Saputra
                    </h1>
                    <p className="text-label-mono text-on-surface-variant uppercase">
                      Software Development &amp; Design Partner
                    </p>
                  </div>

                  <hr className="border-t-2 border-dashed border-ink" />

                  <div className="space-y-4 text-body-main text-ink">
                    <p>
                      Saya memiliki ketertarikan kuat dalam bidang teknologi dan pengembangan perangkat lunak, dengan pengalaman praktis membangun beberapa proyek digital seperti platform web sistem administrasi, portal profil komunitas, landing page, dan aplikasi web interaktif.
                    </p>
                    <p>
                      Selain memprogram dengan React/Next.js dan Laravel, saya juga terbiasa merancang tata letak antarmuka di Figma, pemodelan 3D di Blender, pengembangan game interaktif di Unity, pemrograman mikrokontroler Arduino, serta integrasi mobile application lintas platform menggunakan Flutter.
                    </p>
                  </div>

                  <div className="mt-4 p-4 border-2 border-ink bg-surface brutal-shadow-yellow italic text-data-technical text-ink">
                    &ldquo;Teknologi terbaik adalah yang mampu mempermudah kehidupan manusia serta menyatukan kolaborasi antar sesama.&rdquo;
                  </div>
                </div>

              </div>
            </div>
          </AnimatedCard>

        </div>
      </main>

      <Footer />
    </>
  );
}
