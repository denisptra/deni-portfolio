"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { lang } = useApp();

  const getDocumentNo = (path: string) => {
    if (path.includes("/about")) return "LAMPIRAN_01 // BIODATA";
    if (path.includes("/experience")) return "LAMPIRAN_02 // RIWAYAT WORK";
    if (path.includes("/projects")) return "LAMPIRAN_04 // BERKAS PROYEK";
    if (path.includes("/achievements")) return "LAMPIRAN_05 // SERTIFIKAT";
    if (path.includes("/contact")) return "LAMPIRAN_06 // FORMULIR KONTAK";
    return "ARSIP_UTAMA";
  };

  const docNo = getDocumentNo(pathname);

  return (
    <div className="w-full mb-8 border-b-2 border-dashed border-ink pb-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-archive-yellow border-2 border-ink text-ink text-label-mono font-bold uppercase brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-ink"
        >
          <span className="material-symbols-outlined text-[14px]">home</span>
          Beranda
        </Link>
        <span className="text-data-technical text-on-surface-variant font-bold tracking-wider">
          {docNo}
        </span>
      </div>
    </div>
  );
}
