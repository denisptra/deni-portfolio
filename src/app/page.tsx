"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") || "en";
    router.replace(`/${savedLang}`);
  }, [router]);
  return null;
}
