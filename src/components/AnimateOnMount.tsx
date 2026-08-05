"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function AnimateOnMount({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const allEls = container.querySelectorAll("[data-animate], [data-scroll]");

    const checkVisible = () => {
      allEls.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.classList.contains("is-visible")) return;

        const rect = htmlEl.getBoundingClientRect();
        const viewH = window.innerHeight;

        if (rect.top < viewH * 0.92 && rect.bottom > 0) {
          htmlEl.classList.add("is-visible");
        }
      });
    };

    // Setup styles
    allEls.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      const isAnimate = htmlEl.hasAttribute("data-animate");

      htmlEl.style.opacity = "0";
      htmlEl.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";

      if (isAnimate) {
        htmlEl.style.transform = "translateY(24px)";
        htmlEl.style.transition = `opacity 0.6s ${i * 0.06}s cubic-bezier(0.16,1,0.3,1), transform 0.6s ${i * 0.06}s cubic-bezier(0.16,1,0.3,1)`;
      } else {
        const dir = htmlEl.getAttribute("data-scroll") || "up";
        if (dir === "up") htmlEl.style.transform = "translateY(30px)";
        else if (dir === "left") htmlEl.style.transform = "translateX(-40px)";
        else if (dir === "right") htmlEl.style.transform = "translateX(40px)";
        else if (dir === "scale") htmlEl.style.transform = "scale(0.95)";
      }
    });

    // Check on scroll
    const scrollParent = container.closest("[class*='overflow-y-auto']") || container.parentElement;
    scrollParent?.addEventListener("scroll", checkVisible, { passive: true });

    // Check on mount and with requestAnimationFrame
    checkVisible();
    const raf = requestAnimationFrame(checkVisible);

    // Also check on window scroll as fallback
    window.addEventListener("scroll", checkVisible, { passive: true });

    // Poll for a bit to catch late-rendering elements
    const poll = setInterval(checkVisible, 100);

    return () => {
      scrollParent?.removeEventListener("scroll", checkVisible);
      window.removeEventListener("scroll", checkVisible);
      cancelAnimationFrame(raf);
      clearInterval(poll);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
