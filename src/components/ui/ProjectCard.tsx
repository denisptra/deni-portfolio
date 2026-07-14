"use client";

import React from "react";
import { MultilingualProject } from "@/data/portfolio";
import { useApp } from "@/context/AppContext";

interface ProjectCardProps {
  project: MultilingualProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { lang } = useApp();

  // Category-based colors mapping
  const getCategoryTheme = (stack: string[]) => {
    const mainTech = stack[0]?.toLowerCase() || "";
    if (mainTech.includes("next") || mainTech.includes("react") || mainTech.includes("express") || mainTech.includes("laravel")) {
      return { bg: "bg-map-green", text: "text-white", border: "border-map-green" };
    }
    if (mainTech.includes("flutter") || mainTech.includes("mobile") || mainTech.includes("figma")) {
      return { bg: "bg-map-purple", text: "text-white", border: "border-map-purple" };
    }
    if (mainTech.includes("unity") || mainTech.includes("game")) {
      return { bg: "bg-map-pink", text: "text-white", border: "border-map-pink" };
    }
    if (mainTech.includes("arduino")) {
      return { bg: "bg-archive-orange", text: "text-ink", border: "border-archive-orange" };
    }
    return { bg: "bg-carbon-blue", text: "text-white", border: "border-carbon-blue" };
  };

  const theme = getCategoryTheme(project.stack);
  const titleText = project.title[lang] || project.title["en"];
  const descText = project.description[lang] || project.description["en"];

  // Determine category display name
  const getCategoryName = (stack: string[]) => {
    const mainTech = stack[0]?.toLowerCase() || "";
    if (mainTech.includes("next") || mainTech.includes("react") || mainTech.includes("express") || mainTech.includes("laravel")) return "WEB DEV";
    if (mainTech.includes("flutter") || mainTech.includes("mobile")) return "MOBILE";
    if (mainTech.includes("figma")) return "UI/UX";
    if (mainTech.includes("unity") || mainTech.includes("game")) return "GAME";
    if (mainTech.includes("arduino")) return "ROBOTICS";
    return "PROJECT";
  };

  const categoryName = getCategoryName(project.stack);
  const isProcess = project.id === "pencak-silat-padjajaran" || project.id === "168-transportasi" || project.id === "cinego";

  return (
    <article className="relative bg-paper border-thick border-ink brutal-shadow flex flex-col mt-10 group">
      {/* Category Tab */}
      <div className={`absolute -top-9 left-[-3px] ${theme.bg} ${theme.text} border-t-thick border-x-thick border-ink px-4 py-1.5 z-10 text-label-mono font-bold uppercase tracking-wider`}>
        Kategori: {categoryName}
      </div>

      {/* Stamp (Selesai / Proses) */}
      <div className={`absolute -top-4 right-4 z-20 ${isProcess ? "rotate-[15deg]" : "rotate-[-8deg]"} pointer-events-none`}>
        {isProcess ? (
          <div className="border-4 border-carbon-blue text-carbon-blue font-display text-sm font-bold uppercase px-3 py-1 bg-paper/90 shadow-[2px_2px_0px_0px_rgba(34,85,196,1)] backdrop-blur-sm mix-blend-multiply">
            PROSES
          </div>
        ) : (
          <div className="border-4 border-stempel-red text-stempel-red font-display text-sm font-bold uppercase px-3 py-1 bg-paper/90 shadow-[2px_2px_0px_0px_rgba(232,67,44,1)] backdrop-blur-sm mix-blend-multiply">
            SELESAI
          </div>
        )}
      </div>

      {/* Project Image Box */}
      <div className="w-full h-64 border-b-thick border-ink overflow-hidden bg-surface-container relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#141311_1px,transparent_0)] bg-[length:16px_16px] opacity-10"></div>
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            alt={titleText}
            src={project.imageUrl}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-data-technical text-on-surface-variant">NO_IMAGE.DAT</div>
        )}
      </div>

      {/* Project details */}
      <div className="p-6 flex flex-col flex-grow bg-surface">
        <h2 className="text-headline-card text-ink uppercase mb-2">
          {titleText}
        </h2>
        <p className="text-body-main text-on-surface-variant mb-6 line-clamp-3">
          {descText}
        </p>

        {/* Tags */}
        <div className="mt-auto pt-4 border-t-2 border-dashed border-outline-variant flex flex-wrap gap-2">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="text-data-technical bg-paper px-2.5 py-1 border-[1.5px] border-ink text-ink brutal-shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
