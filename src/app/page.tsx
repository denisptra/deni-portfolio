"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import PuzzleExperience from "@/components/PuzzleExperience";
import StarField from "@/components/StarField";

function hasCompletedPuzzle() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("puzzle_completed") === "true";
}

function getRedirectPath() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("r");
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const rPath = getRedirectPath();
    if (hasCompletedPuzzle()) {
      router.replace(rPath || "/home");
    } else if (rPath && rPath !== "/") {
      // User refreshed on a sub-page, redirect to that page after puzzle
      sessionStorage.setItem("pending_redirect", rPath);
    }
  }, [router]);

  const handleComplete = useCallback(() => {
    localStorage.setItem("puzzle_completed", "true");
    const pending = sessionStorage.getItem("pending_redirect");
    sessionStorage.removeItem("pending_redirect");
    router.push(pending || "/home");
  }, [router]);

  if (hasCompletedPuzzle()) {
    return null;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0b]">
      <StarField />
      <PuzzleExperience onComplete={handleComplete} />
    </div>
  );
}
