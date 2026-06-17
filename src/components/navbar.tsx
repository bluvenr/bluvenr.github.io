"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GithubLogo, Translate, List, X } from "@phosphor-icons/react";
import { useI18n } from "@/context/i18n-provider";

export function Navbar() {
  const { t, locale, toggleLocale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "#projects", label: t.nav.projects },
    { href: "#stack", label: t.nav.stack },
    { href: "#about", label: t.nav.about },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-[#09090b]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a
          href="#"
          className="font-mono text-sm font-semibold tracking-tight text-accent"
        >
          ~/bluvenr
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-surface-raised hover:text-zinc-200 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={20} weight="bold" />
            ) : (
              <List size={20} weight="bold" />
            )}
          </button>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-mono text-zinc-400 transition-colors hover:bg-surface-raised hover:text-zinc-200"
            title={locale === "zh" ? "Switch to English" : "切换中文"}
          >
            <Translate size={14} weight="bold" />
            <span>{locale === "zh" ? "EN" : "中"}</span>
          </button>

          <a
            href="https://github.com/bluvenr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-mono text-zinc-400 transition-colors hover:bg-surface-raised hover:text-zinc-200"
            aria-label="GitHub"
          >
            <GithubLogo size={16} weight="fill" />
          </a>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border-subtle md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-surface-raised hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
