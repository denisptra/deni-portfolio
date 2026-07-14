"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from "react";
import { defaultData, LocalDatabase, isLocalDatabase } from "@/data/portfolio";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const savedData = localStorage.getItem("portfolio_data");
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            // Clear localStorage if data is old bilingual format (has en/id keys)
            if (parsed?.projects?.[0]?.title?.en || parsed?.projects?.[0]?.title?.id) {
              console.warn("Detected old bilingual data format, clearing localStorage cache.");
              localStorage.removeItem("portfolio_data");
            } else if (isLocalDatabase(parsed)) {
              setData(parsed);
              setIsLoading(false);
              return;
            }
          } catch {
            localStorage.removeItem("portfolio_data");
          }
        }
        const res = await fetch("/data.json");
        if (res.ok) {
          const fetchedData = await res.json();
          setData(fetchedData);
        }
      } catch (err) {
        console.error("Error loading dynamic data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

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
