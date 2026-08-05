"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import PuzzleExperience from "@/components/PuzzleExperience";
import StarField from "@/components/StarField";

function shouldSkipPuzzle() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("direct") === "true";
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (shouldSkipPuzzle()) {
      router.replace("/home");
    }
  }, [router]);

  const handleComplete = useCallback(() => {
    router.push("/home");
  }, [router]);

  if (shouldSkipPuzzle()) {
    return null;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0b]">
      <StarField />
      <PuzzleExperience onComplete={handleComplete} />
    </div>
  );
}
