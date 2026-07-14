import React from "react";

export default function PerforationStrip() {
  return (
    <aside className="fixed left-0 top-0 h-full w-perforation-width z-40 hidden md:flex flex-col items-center py-8 gap-12 border-r-thick border-ink bg-surface-container-low">
      <div className="flex flex-col gap-8 w-full items-center mt-16">
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
        <div className="perforation-hole"></div>
      </div>
    </aside>
  );
}
