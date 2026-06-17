"use client";

import { motion } from "motion/react";
import { MapPin, Code, GithubLogo, Globe, Envelope } from "@phosphor-icons/react";
import { useI18n } from "@/context/i18n-provider";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Divider */}
        <div className="mb-20 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7"
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">
              {t.about.title}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-zinc-400">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </motion.div>

          {/* Right: info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="rounded-lg border border-border-subtle bg-surface p-6">
              {/* Avatar + name */}
              <div className="mb-6 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/35268547?s=120&v=4"
                  alt="bluvenr"
                  width={56}
                  height={56}
                  className="rounded-full ring-2 ring-border-subtle"
                />
                <div>
                  <h3 className="font-semibold text-zinc-100">bluvenr</h3>
                  <p className="font-mono text-xs text-accent">{t.about.status}</p>
                </div>
              </div>

              {/* Info items */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <MapPin size={16} weight="bold" className="text-accent/70" />
                  {t.about.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Code size={16} weight="bold" className="text-accent/70" />
                  Rust / Go / TypeScript
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-border-subtle" />

              {/* Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/bluvenr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-zinc-400 transition-colors hover:bg-surface-raised hover:text-zinc-200"
                  aria-label="GitHub"
                >
                  <GithubLogo size={16} weight="fill" />
                </a>
                <a
                  href="https://virapi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-zinc-400 transition-colors hover:bg-surface-raised hover:text-zinc-200"
                  aria-label="Website"
                >
                  <Globe size={16} weight="bold" />
                </a>
                <a
                  href="mailto:bluvenr@outlook.com"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-zinc-400 transition-colors hover:bg-surface-raised hover:text-zinc-200"
                  aria-label="Email"
                >
                  <Envelope size={16} weight="bold" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
