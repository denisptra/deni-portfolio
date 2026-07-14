"use client";

export default function Footer() {

  return (
    <footer className="w-full border-t-thick border-ink bg-paper mt-12 md:mt-16">
      <div className="flex flex-col items-center justify-center w-full py-6 md:py-10 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="w-full border-t-2 border-dashed border-ink pt-5 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3 text-data-technical text-[12px] md:text-[14px] text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">archive</span>
            <span>© Deni Trio Saputra</span>
          </div>
          <nav className="flex gap-4 md:gap-6 text-label-mono text-[10px] md:text-[12px] uppercase">
            <a
              className="text-on-surface-variant hover:text-ink transition-colors"
              href="https://www.linkedin.com/in/deni-trio-saputra-451075276/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-on-surface-variant hover:text-ink transition-colors"
              href="https://github.com/denisptra"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-on-surface-variant hover:text-ink transition-colors"
              href="mailto:denitri0609@gmail.com"
            >
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
