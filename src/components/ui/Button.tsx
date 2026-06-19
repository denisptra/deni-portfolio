"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, external, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md shadow-brand-blue/10 hover:shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-0.5",
      secondary:
        "bg-notion-gray text-notion-text hover:bg-notion-gray/80 border border-notion-border",
      outline:
        "border border-notion-border text-notion-text hover:bg-notion-gray/50 hover:border-zinc-300",
      ghost: "text-notion-gray-text hover:text-notion-text hover:bg-notion-gray/50",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-sm px-6 py-3",
      lg: "text-base px-8 py-4",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
