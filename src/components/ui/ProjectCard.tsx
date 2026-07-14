"use client";

import React from "react";
import { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
    <article className="relative bg-paper border-2 md:border-thick border-ink brutal-shadow flex flex-col mt-10 group">
      <div className={`absolute -top-[29px] md:-top-9 left-[-2px] md:left-[-3px] ${theme.bg} ${theme.text} border-t-2 md:border-t-thick border-x-2 md:border-x-thick border-ink px-2.5 md:px-4 py-1 md:py-1.5 z-10 text-label-mono text-[9px] md:text-[12px] font-bold uppercase tracking-wider`}>
        Kategori: {categoryName}
      </div>

      <div className={`absolute -top-3 right-2 md:-top-4 md:right-4 z-20 ${isProcess ? "rotate-[15deg]" : "rotate-[-8deg]"} pointer-events-none`}>
        {isProcess ? (
          <div className="border-4 border-carbon-blue text-carbon-blue font-display text-[10px] md:text-sm font-bold uppercase px-1.5 py-0.5 md:px-3 md:py-1 bg-paper/90 shadow-[2px_2px_0px_0px_rgba(34,85,196,1)] backdrop-blur-sm mix-blend-multiply">
            PROSES
          </div>
        ) : (
          <div className="border-4 border-stempel-red text-stempel-red font-display text-[10px] md:text-sm font-bold uppercase px-1.5 py-0.5 md:px-3 md:py-1 bg-paper/90 shadow-[2px_2px_0px_0px_rgba(232,67,44,1)] backdrop-blur-sm mix-blend-multiply">
            SELESAI
          </div>
        )}
      </div>

      <div className="w-full h-48 md:h-64 border-b-2 md:border-b-thick border-ink overflow-hidden bg-surface-container relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#141311_1px,transparent_0)] bg-[length:16px_16px] opacity-10"></div>
        {project.imageUrl ? (
          <img
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            alt={project.title}
            src={project.imageUrl}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-data-technical text-on-surface-variant">NO_IMAGE.DAT</div>
        )}
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow bg-surface">
        <h2 className="text-headline-card text-[15px] md:text-[20px] text-ink uppercase mb-1.5 md:mb-2">
          {project.title}
        </h2>
        <p className="text-body-main text-[13px] md:text-[16px] text-on-surface-variant mb-4 md:mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto pt-3 md:pt-4 border-t-2 border-dashed border-outline-variant flex flex-wrap gap-1.5 md:gap-2">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="text-data-technical text-[11px] md:text-[14px] bg-paper px-1.5 py-0.5 md:px-2.5 md:py-1 border-[1.5px] border-ink text-ink brutal-shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
