import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className, id }: ContainerProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
