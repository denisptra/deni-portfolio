"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center mb-16" : "mb-16"}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-notion-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-notion-gray-text text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-16 rounded-full bg-brand-blue ${
        align === "center" ? "mx-auto" : ""
      }`} />
    </motion.div>
  );
}
