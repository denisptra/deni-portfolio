"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null; // Jika hanya "/" atau "/[lang]", sembunyikan breadcrumbs

  const lang = segments[0];
  const pageSegments = segments.slice(1);

  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-8 uppercase tracking-widest animate-in fade-in slide-in-from-left-2 duration-300">
      <Link href={`/${lang}`} className="flex items-center hover:text-black transition-colors">
        <Home size={14} className="mr-1.5" />
        Home
      </Link>
      {pageSegments.map((segment, index) => {
        const isLast = index === pageSegments.length - 1;
        const href = `/${lang}/${pageSegments.slice(0, index + 1).join("/")}`;
        const label = segment.replace(/-/g, " ");

        return (
          <div key={href} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-gray-300" />
            {isLast ? (
              <span className="text-black font-bold">{label}</span>
            ) : (
              <Link href={href} className="hover:text-black transition-colors">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
