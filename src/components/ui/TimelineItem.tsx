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
    <div className="relative z-10 mb-12 last:mb-0">
      {/* Square Marker */}
      <div className="absolute -left-[29px] md:-left-[37px] top-1.5 w-[16px] h-[16px] bg-carbon-blue border-2 border-ink"></div>

      <div className="border-2 border-ink bg-surface p-6 brutal-shadow-sm transition-transform hover:-translate-y-1">
        <div className="flex flex-col md:flex-row justify-between md:items-start mb-4 gap-2">
          <div>
            <h3 className="text-headline-card text-ink uppercase">{title}</h3>
            <p className="text-label-mono text-on-surface-variant mt-1">
              {subtitle} {location ? `| ${location}` : ""}
            </p>
          </div>
          <div className="text-data-technical bg-carbon-blue text-white px-3 py-1 border-2 border-ink inline-block brutal-shadow-sm self-start">
            {period}
          </div>
        </div>
        <p className="text-body-main text-ink">
          {description}
        </p>
      </div>
    </div>
  );
}
