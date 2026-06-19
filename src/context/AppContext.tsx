"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { translations, defaultData, LocalDatabase, TranslationText } from "@/data/portfolio";

interface AppContextType {
  lang: "en" | "id";
  setLang: (lang: "en" | "id") => void;
  t: TranslationText;
  data: LocalDatabase;
  isLoading: boolean;
  updateData: (newData: LocalDatabase) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<"en" | "id">("en");
  const [data, setData] = useState<LocalDatabase>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize lang from localStorage (client-side only)
  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as "en" | "id";
    if (savedLang === "en" || savedLang === "id") {
      setTimeout(() => {
        setLangState(savedLang);
      }, 0);
    }
  }, []);

  const setLang = (newLang: "en" | "id") => {
    setLangState(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const savedData = localStorage.getItem("portfolio_data");
        if (savedData) {
          setData(JSON.parse(savedData));
          setIsLoading(false);
          return;
        }

        const res = await fetch("/data.json");
        if (res.ok) {
          const fetchedData = await res.json();
          setData(fetchedData);
        } else {
          console.warn("Failed to fetch data.json, using defaultData.");
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

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ lang, setLang, t, data, isLoading, updateData }}>
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
