"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useApp } from "@/context/AppContext";
import { Zap, Award, Star, Trophy, HelpCircle } from "lucide-react";

export default function AchievementsPage() {
  const { data, t, isLoading, lang } = useApp();

  const getIcon = (iconName: string) => {
    const size = 14;
    switch (iconName) {
      case "zap":
        return <Zap size={size} className="text-amber-500" />;
      case "award":
        return <Award size={size} className="text-blue-500" />;
      case "star":
        return <Star size={size} className="text-emerald-500" />;
      case "trophy":
        return <Trophy size={size} className="text-purple-500" />;
      default:
        return <HelpCircle size={size} className="text-gray-500" />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen flex flex-col justify-between">
        <div className="py-12 animate-in fade-in duration-700 flex-grow bg-white">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto px-6 mb-16">
            <Breadcrumb />
            <h1 className="text-3xl font-black text-[#37352f] mb-4 tracking-tight leading-none">
              {t.achievements.title}
            </h1>
            <p className="text-[13px] text-[#37352f]/50 leading-relaxed font-medium max-w-lg">
              {t.achievements.subtitle}
            </p>
          </div>

          {/* Certificates List Section */}
          <div className="max-w-4xl mx-auto px-6 space-y-4 mb-24">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="h-32 bg-gray-50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              data.achievements.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border border-[#eef0f2] p-6 rounded-2xl hover:bg-[#fcfcfc] transition-all flex items-start space-x-6 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f1f1ef] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {getIcon(c.icon)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1.5">
                      <h3 className="text-[15px] font-bold text-[#37352f] tracking-tight">
                        {c.title[lang] || c.title["en"]}
                      </h3>
                      <span className="text-[10px] font-black text-[#37352f]/20 uppercase tracking-[0.2em]">
                        {c.date}
                      </span>
                    </div>
                    <p className="text-[#1F9CF0] font-bold text-[11px] mb-2 uppercase tracking-wide">
                      {c.issuer}
                    </p>
                    <p className="text-[#37352f]/50 leading-relaxed text-[13px]">
                      {c.description[lang] || c.description["en"]}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
