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

export function AppProvider({ children, initialLang = "en" }: { children: ReactNode, initialLang?: "en" | "id" }) {
  const [lang, setLangState] = useState<"en" | "id">(initialLang);
  const [data, setData] = useState<LocalDatabase>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  // Sync lang state if initialLang prop changes (e.g. navigation)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(initialLang);
    document.documentElement.lang = initialLang;
  }, [initialLang]);

  const setLang = (newLang: "en" | "id") => {
    setLangState(newLang);
    localStorage.setItem("app_lang", newLang);
    // Optionally redirect to the new lang path
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(en|id)/, `/${newLang}`);
    if (newPath !== currentPath) {
      window.location.href = newPath;
    }
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
