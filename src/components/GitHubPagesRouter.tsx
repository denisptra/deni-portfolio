"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GitHubPagesRouter() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== pathname) {
      router.replace(hash);
    }
  }, [pathname, router]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && hash !== window.location.pathname) {
        router.replace(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [router]);

  return null;
}
