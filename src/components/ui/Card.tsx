"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-custom border border-border p-6 bg-card text-card-foreground",
        hover && "transition-all duration-200 hover:bg-[#fcfcfc] hover:border-zinc-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      {children}
    </div>
  );
}
