"use client";

import React from "react";
import { Palette, Play, Settings, GraduationCap, Code, Book, HelpCircle } from "lucide-react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string;
  iconType: string;
  isEducation?: boolean;
}

export default function TimelineItem({
  title,
  subtitle,
  location,
  period,
  description,
  iconType,
}: TimelineItemProps) {
  
  // Icon and background coloring mapping
  const getIcon = () => {
    switch (iconType) {
      case "design":
        return <Palette className="text-amber-500 w-6 h-6" />;
      case "media":
        return <Play className="text-red-500 w-6 h-6" fill="currentColor" />;
      case "tech":
        return <Settings className="text-green-500 w-6 h-6" />;
      case "university":
        return <GraduationCap className="text-blue-500 w-6 h-6" />;
      case "code":
        return <Code className="text-green-500 w-6 h-6" />;
      case "school":
        return <Book className="text-amber-500 w-6 h-6" />;
      default:
        return <HelpCircle className="text-gray-500 w-6 h-6" />;
    }
  };

  const getBgColor = () => {
    switch (iconType) {
      case "design":
        return "bg-amber-50";
      case "media":
        return "bg-red-50";
      case "tech":
        return "bg-green-50";
      case "university":
        return "bg-blue-50";
      case "code":
        return "bg-green-50";
      case "school":
        return "bg-amber-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="relative p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-lg transition-all duration-300 mb-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Icon Frame */}
        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${getBgColor()}`}>
          {getIcon()}
        </div>

        {/* Content Details */}
        <div className="flex-grow">
          {/* Header metadata row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {title}
              </h3>
              <p className="text-gray-600 font-medium text-sm">
                {subtitle}
                {location && (
                  <span className="text-gray-400 font-normal"> — {location}</span>
                )}
              </p>
            </div>
            
            {/* Period Badge */}
            <div className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg whitespace-nowrap border border-gray-100 self-start">
              {period}
            </div>
          </div>

          {/* Description Text */}
          <p className="text-gray-500 leading-relaxed text-sm font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
