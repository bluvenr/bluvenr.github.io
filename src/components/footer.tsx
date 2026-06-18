"use client";

import { useI18n } from "@/context/i18n-provider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-border-subtle pt-16 pb-10">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Terminal exit sequence */}
        <div className="mb-12 font-mono text-xs text-zinc-600 space-y-1 select-none">
          <div>
            <span className="text-accent/60">{t.footer.exit}</span>
          </div>
          <div className="text-zinc-700">{t.footer.exitCode}</div>
          <div>
            <span className="terminal-cursor" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="font-mono text-xs text-zinc-600">
            <span className="text-accent/60">~/</span>bluvenr &copy;{" "}
            {new Date().getFullYear()}
          </div>

          <div className="font-mono text-xs text-zinc-600">
            <span>{t.footer.builtWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
