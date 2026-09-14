"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-outfit)] font-black text-[80px] leading-none text-[#e85d3a]">
          !
        </h1>
        <p className="font-[family-name:var(--font-outfit)] font-bold text-[22px] text-[#1a1a2e] mt-4">
          Something went wrong
        </p>
        <p className="text-[13px] text-[#666] mt-3 max-w-[320px] mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 px-6 py-3 bg-[#1a1a2e] text-white text-[13px] font-semibold rounded-full hover:bg-[#1a3a6e] transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
