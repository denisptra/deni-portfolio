"use client";

import PandaMascot from "@/components/PandaMascot";
import { useLang } from "@/components/LangProvider";

export default function AboutSection() {
  const { t } = useLang();
  return (
    <section id="about" className="py-[100px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <div data-animate className="font-[family-name:var(--font-mono)] text-[0.75rem] text-white/30 tracking-[0.15em] uppercase mb-5">
          {t("about.label")}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 data-animate className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.2] mb-8 text-[#f5f5f0]">
              {t("about.title1")}
              <br />
              <span className="text-white/45">— {t("about.title2")}</span>
            </h2>

            <p data-scroll="up" className="text-[1rem] leading-[1.8] text-white/45 mb-4">
              {t("about.p1")}
            </p>

            <p data-scroll="up" className="text-[1rem] leading-[1.8] text-white/45 mb-8">
              {t("about.p2")}
            </p>

            <div data-scroll="up" className="flex flex-wrap gap-2">
              {["UI/UX", "Web Dev", "Mobile", "Game Dev", "Robotics", "Video", "Design"].map((tag, i) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 text-[0.8rem] text-white/45 bg-white/[0.03] border border-white/[0.05] rounded-full hover:border-white/15 hover:text-white transition-all duration-300"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div data-scroll="up" className="mt-6 flex items-center gap-4 text-[0.8rem] text-white/30">
              <span>{t("about.location")}</span>
              <span>denitri0609@gmail.com</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div data-scroll="scale" className="w-[260px] h-[300px] flex items-center justify-center">
              <PandaMascot pose="working-laptop" size={250} />
            </div>

            <div data-scroll="right" className="absolute top-4 right-0 flex items-center gap-2.5 px-4 py-3 bg-[rgba(14,14,16,0.85)] backdrop-blur-[12px] border border-white/[0.05] rounded-xl text-[0.8rem] text-white/50">
              <span className="text-lg">{t("about.pandaFan")}</span>
            </div>

            <div
              data-scroll="left"
              className="absolute bottom-8 left-0 flex items-center gap-2.5 px-4 py-3 bg-[rgba(14,14,16,0.85)] backdrop-blur-[12px] border border-white/[0.05] rounded-xl text-[0.8rem] text-white/50"
            >
              <span className="text-lg">{t("about.techNerd")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
