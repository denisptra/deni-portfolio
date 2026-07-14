"use client";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

interface CardStackItem {
  id: string;
  content: React.ReactNode;
}

interface CardStackProps {
  items: CardStackItem[];
  className?: string;
}

export default function CardStack({ items, className }: CardStackProps) {
  const total = items.length;

  return (
    <div className={`flex flex-col gap-6 ${className || ""}`}>
      {items.map((item, i) => (
        <StackCardWrapper key={item.id} index={i} total={total}>
          {item.content}
        </StackCardWrapper>
      ))}
    </div>
  );
}

function StackCardWrapper({
  children,
  index,
  total,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.3, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      transition={{ type: "spring", stiffness: 80, damping: 25 }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
}
