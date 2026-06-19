import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "glow";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-muted text-foreground border-border",
    outline: "bg-transparent text-muted-foreground border-border",
    glow: "bg-[rgba(31,156,240,0.08)] text-primary border-[rgba(31,156,240,0.15)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
