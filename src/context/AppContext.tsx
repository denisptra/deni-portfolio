"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { defaultData, LocalDatabase } from "@/data/portfolio";

interface AppContextType {
  t: typeof idTexts;
  data: LocalDatabase;
  isLoading: boolean;
  updateData: (newData: LocalDatabase) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const idTexts = {
  nav: {
    about: "Tentang",
    experience: "Pengalaman",
    education: "Pendidikan",
    portfolio: "Proyek",
    achievements: "Sertifikat",
    contact: "Kontak",
  },
  hero: {
    badge: "AKTIF MENCARI PELUANG",
    showMore: "Lihat Semua Proyek",
  },
  study: {
    title: "Tingkat Pendidikan",
    subtitle: "Fondasi pengetahuan teknis dan perkembangan akademik saya.",
  },
  experience: {
    ctaTitle: "Ingin melihat resume lengkap saya?",
    ctaBtn: "Unduh PDF",
  },
  cta: {
    subtitle: "Silakan unduh PDF resume saya untuk informasi lebih lengkap.",
  },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LocalDatabase>(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = (newData: LocalDatabase) => {
    setData(newData);
    localStorage.setItem("portfolio_data", JSON.stringify(newData));
  };

  return (
    <AppContext.Provider value={{ t: idTexts, data, isLoading, updateData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
