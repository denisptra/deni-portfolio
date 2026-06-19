"use client";

import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { MultilingualProject } from "@/data/portfolio";

export default function ProjectCard({ project }: { project: MultilingualProject }) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t } = useApp();

  const title = project.title[lang] || project.title["en"];
  const description = project.description[lang] || project.description["en"];

  return (
    <>
      {/* Premium Project Card */}
      <div
        className="group relative flex flex-col justify-between rounded-[2.5rem] bg-white border border-[#eef0f2] overflow-hidden cursor-pointer hover:border-blue-100 hover:-translate-y-2 duration-500 ease-out shadow-xs hover:shadow-2xl select-none"
        onClick={() => setIsOpen(true)}
      >
        {/* Card Image Header with floating tech tag */}
        <div className="relative overflow-hidden aspect-[16/10] m-3.5 rounded-[1.8rem] border border-[#eef0f2] shadow-inner bg-[#fafaf9]">
          {/* Grayscale hover to full color transform */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-103 group-hover:rotate-0.5"
          />
          
          {/* Dark scrim overlay on card hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Card Content body */}
        <div className="px-7 pb-7 pt-2 flex-grow flex flex-col justify-between">
          <div>
            {/* Project Title */}
            <h3 className="text-xl md:text-2xl font-black text-[#37352f] mb-3 tracking-tight group-hover:text-[#1F9CF0] transition-colors duration-300">
              {title}
            </h3>
            
            {/* Description Teaser */}
            <p className="text-[#37352f]/50 text-[13px] leading-relaxed line-clamp-2 font-medium">
              {description}
            </p>
          </div>

          <div className="mt-5">
            {/* Tech Badges on the front card */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="bg-[#f1f1ef]/80 text-[#37352f]/60 text-[9px] font-extrabold px-2.5 py-1.5 rounded-lg border border-[#eef0f2]/60 uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="text-[9px] text-[#37352f]/40 font-bold px-1.5 py-1.5 flex items-center">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>

            {/* View Details Link with sliding arrow icon */}
            <div className="flex items-center justify-between pt-4 border-t border-[#eef0f2]">
              <span className="text-[10px] font-black text-[#37352f]/40 group-hover:text-black transition-colors uppercase tracking-[0.2em] flex items-center gap-1.5">
                <span>{t.projects.viewDetails}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#37352f]/20 backdrop-blur-[4px] animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-[#eef0f2] animate-in slide-in-from-bottom-4 duration-300">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-10 p-2.5 bg-white/90 rounded-full hover:bg-[#f1f1ef] transition-colors border border-[#eef0f2] shadow-sm cursor-pointer"
            >
              <X size={18} className="text-[#37352f]" />
            </button>

            {/* Project Image */}
            <div className="p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.imageUrl}
                className="w-full aspect-video object-cover rounded-2xl"
                alt={title}
              />
            </div>

            {/* Modal Body */}
            <div className="p-10 md:p-14 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <h2 className="text-3xl md:text-5xl font-black text-[#37352f] tracking-tight leading-none">
                  {title}
                </h2>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#1F9CF0] hover:bg-[#1581cc] text-white px-8 py-3.5 rounded-2xl font-bold text-xs transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-50/50"
                  >
                    {t.projects.livePreview}
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-14 border-t border-[#eef0f2] pt-12">
                {/* Left Description Column */}
                <div className="md:col-span-2 space-y-6">
                  <h4 className="font-black uppercase tracking-[0.25em] text-[#37352f]/20 text-[10px]">
                    {t.projects.overview}
                  </h4>
                  <p className="text-[#37352f]/60 leading-relaxed text-[15px]">
                    {description}
                  </p>
                </div>

                {/* Right Stack Column */}
                <div className="space-y-12">
                  <div>
                    <h4 className="font-black uppercase tracking-[0.25em] text-[#37352f]/20 text-[10px] mb-5">
                      {t.projects.stack}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#f1f1ef] text-[#37352f]/60 px-4 py-1.5 rounded-xl text-[11px] font-bold border border-[#eef0f2]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
