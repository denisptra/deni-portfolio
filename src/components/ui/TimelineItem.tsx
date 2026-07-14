"use client";

import React from "react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string;
  iconType?: string;
}

export default function TimelineItem({
  title,
  subtitle,
  location,
  period,
  description,
}: TimelineItemProps) {
  return (
    <div className="relative z-10 mb-8 md:mb-12 last:mb-0">
      {/* Square Marker */}
      <div className="absolute -left-[25px] md:-left-[37px] top-1.5 w-[12px] md:w-[16px] h-[12px] md:h-[16px] bg-carbon-blue border-2 border-ink"></div>

      <div className="border-2 border-ink bg-surface p-3 md:p-6 brutal-shadow-sm transition-transform hover:-translate-y-1">
        <div className="flex flex-col md:flex-row justify-between md:items-start mb-3 md:mb-4 gap-2">
          <div>
            <h3 className="text-headline-card text-[14px] md:text-[20px] text-ink uppercase">{title}</h3>
            <p className="text-label-mono text-[10px] md:text-[12px] text-on-surface-variant mt-0.5 md:mt-1">
              {subtitle} {location ? `| ${location}` : ""}
            </p>
          </div>
          <div className="text-data-technical text-[11px] md:text-[14px] bg-carbon-blue text-white px-2 py-1 md:px-3 md:py-1 border-2 border-ink inline-block brutal-shadow-sm self-start">
            {period}
          </div>
        </div>
        <p className="text-body-main text-[13px] md:text-[16px] text-ink">
          {description}
        </p>
      </div>
    </div>
  );
}
