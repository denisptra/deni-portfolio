import React from "react";
import { Zap, Award, Star, Trophy, HelpCircle } from "lucide-react";

interface CertCardProps {
  category: string;
  title: string;
  description: string;
  issuer: string;
  date: string;
  iconName: string;
}

export default function CertCard({
  category,
  title,
  description,
  issuer,
  date,
  iconName,
}: CertCardProps) {
  const getIcon = (iconName: string) => {
    const size = 16;
    switch (iconName) {
      case "zap":
        return <Zap size={size} className="text-archive-orange" />;
      case "award":
        return <Award size={size} className="text-carbon-blue" />;
      case "star":
        return <Star size={size} className="text-map-green" />;
      case "trophy":
        return <Trophy size={size} className="text-map-purple" />;
      default:
        return <HelpCircle size={size} className="text-outline" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    const norm = cat.toLowerCase();
    if (norm.includes("bootcamp")) return "bg-archive-orange text-ink";
    if (norm.includes("sertifikasi")) return "bg-archive-yellow text-ink";
    if (norm.includes("kursus")) return "bg-carbon-blue text-white";
    if (norm.includes("penghargaan")) return "bg-map-purple text-white";
    if (norm.includes("prestasi")) return "bg-map-pink text-white";
    return "bg-outline text-white";
  };

  const catColor = getCategoryColor(category);

  return (
    <div className="bg-paper border-thick border-ink brutal-shadow relative flex flex-col group hover:-translate-y-1 transition-transform">
      {/* Tab */}
      <div className={`absolute -top-[3px] -left-[3px] ${catColor} border-thick border-ink px-3 py-1 text-label-mono text-[10px] uppercase font-bold z-10 brutal-shadow-sm`}>
        {category}
      </div>

      {/* Content */}
      <div className="p-6 pt-10 flex-grow flex flex-col border-b-thick border-ink bg-surface">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="text-headline-card text-ink uppercase line-clamp-2">
            {title}
          </h3>
          <div className="w-8 h-8 rounded-full border-2 border-ink bg-white flex items-center justify-center flex-shrink-0">
            {getIcon(iconName)}
          </div>
        </div>
        <p className="text-body-main text-on-surface-variant mb-6">
          {description}
        </p>
      </div>

      {/* Footer / Metadata */}
      <div className="bg-surface-container-low p-4 flex justify-between items-center text-data-technical text-on-surface-variant border-t-thick border-ink">
        <span>Issuer: {issuer}</span>
        <span className="font-bold text-ink">{date}</span>
      </div>
    </div>
  );
}
