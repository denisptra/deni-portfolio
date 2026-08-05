"use client";

import { useEffect } from "react";

export default function AntiInspect() {
  useEffect(() => {
    // Disable right-click
    const onContext = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", onContext);

    // Disable common devtools shortcuts
    const onKey = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") { e.preventDefault(); return; }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase())) {
        e.preventDefault(); return;
      }
      // Ctrl+U (view source)
      if (e.ctrlKey && e.key.toUpperCase() === "U") {
        e.preventDefault(); return;
      }
    };
    document.addEventListener("keydown", onKey);

    // Detect devtools open via debugger timing (subtle)
    let devToolsOpen = false;
    const detectDevTools = () => {
      const start = performance.now();
      // This technique is non-blocking and very lightweight
      debugger; // eslint-disable-line
      const end = performance.now();
      if (end - start > 100) {
        devToolsOpen = true;
      }
    };

    // Periodic subtle check (every 5s, very light)
    const interval = setInterval(() => {
      try {
        detectDevTools();
      } catch {
        // Silently ignore
      }
    }, 5000);

    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("keydown", onKey);
      clearInterval(interval);
    };
  }, []);

  return null;
}
