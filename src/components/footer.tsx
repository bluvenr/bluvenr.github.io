"use client";

import { useI18n } from "@/context/i18n-provider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border-subtle py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="font-mono text-xs text-zinc-600">
          <span className="text-accent/60">~/</span>bluvenr &copy; {new Date().getFullYear()}
        </div>

        <div className="flex items-center gap-1 font-mono text-xs text-zinc-600">
          <span>{t.footer.builtWith}</span>
          <span className="text-accent/40">&middot;</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
