"use client";

import { motion } from "motion/react";
import { GithubLogo, XLogo, Globe, Envelope } from "@phosphor-icons/react";
import { useI18n } from "@/context/i18n-provider";

function LogLine({ prefix, text, delay }: { prefix: string; text: string; delay: number }) {
  const prefixColor =
    prefix === "[INIT]"
      ? "text-accent/70"
      : prefix === "[PHILOSOPHY]"
      ? "text-blue-400/70"
      : prefix === "[VIBE]"
      ? "text-purple-400"
      : "text-yellow-500/70";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className="group/log flex gap-3 text-sm leading-relaxed"
    >
      <span className={`font-mono text-[11px] mt-1 shrink-0 ${prefixColor}`}>
        {prefix}
      </span>
      <span className="text-zinc-400">{text}</span>
    </motion.div>
  );
}

export function About() {
  const { t } = useI18n();
  const logs = t.about.logs as unknown as { prefix: string; text: string }[];
  const config = t.about.config as unknown as {
    title: string;
    comments: { personal: string; languages: string; working: string };
    name: string;
    location: string;
    focus: string;
    languages: string[];
    currently: string;
  };

  return (
    <section id="about" className="relative py-20 lg:py-24">
      {/* Terminal section divider */}
      <div className="mx-auto max-w-[1200px] px-6 mb-16">
        <div className="section-divider">
          <span className="text-accent/30">[about]</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          {/* Left: terminal log */}
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

            <div className="space-y-5">
              {logs.map((log, i) => (
                <LogLine
                  key={i}
                  prefix={log.prefix}
                  text={log.text}
                  delay={0.1 + i * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: config file card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
              {/* File tab */}
              <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-2.5">
                <img
                  src="https://github.com/bluvenr.png"
                  alt="bluvenr"
                  className="h-5 w-5 rounded-full ring-1 ring-accent/20"
                />
                <span className="font-mono text-[10px] text-zinc-500">
                  {config.title}
                </span>
              </div>

              {/* Config content */}
              <div className="p-5 font-mono text-[12px] leading-relaxed">
                <div className="text-zinc-600 mb-1">
                  <span className="text-zinc-700">{config.comments.personal}</span>
                </div>
                <div>
                  <span className="text-blue-400">name</span>
                  <span className="text-zinc-400"> = </span>
                  <span className="text-accent/80">&quot;{config.name}&quot;</span>
                </div>
                <div>
                  <span className="text-blue-400">location</span>
                  <span className="text-zinc-400"> = </span>
                  <span className="text-accent/80">&quot;{config.location}&quot;</span>
                </div>
                <div>
                  <span className="text-blue-400">focus</span>
                  <span className="text-zinc-400"> = </span>
                  <span className="text-accent/80">&quot;{config.focus}&quot;</span>
                </div>

                <div className="my-3 h-px bg-border-subtle" />

                <div className="text-zinc-600 mb-1">
                  <span className="text-zinc-700">{config.comments.languages}</span>
                </div>
                <div>
                  <span className="text-blue-400">languages</span>
                  <span className="text-zinc-400"> = [</span>
                  {config.languages.map((lang, i) => (
                    <span key={lang}>
                      <span className="text-accent/80">&quot;{lang}&quot;</span>
                      {i < config.languages.length - 1 && (
                        <span className="text-zinc-500">, </span>
                      )}
                    </span>
                  ))}
                  <span className="text-zinc-400">]</span>
                </div>

                <div className="my-3 h-px bg-border-subtle" />

                <div className="text-zinc-600 mb-1">
                  <span className="text-zinc-700">{config.comments.working}</span>
                </div>
                <div>
                  <span className="text-blue-400">currently</span>
                  <span className="text-zinc-400"> = </span>
                  <span className="text-accent/80">&quot;{config.currently}&quot;</span>
                  <span className="inline-block w-[2px] h-[11px] bg-accent ml-1 align-middle cursor-blink" />
                </div>
              </div>

              {/* Links row */}
              <div className="border-t border-border-subtle px-5 py-3 flex items-center gap-3">
                <a
                  href="https://github.com/bluvenr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle text-zinc-400 transition-all hover:bg-surface-raised hover:text-zinc-200 hover:border-zinc-600"
                  aria-label="GitHub"
                >
                  <GithubLogo size={15} weight="fill" />
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[9px] text-zinc-300 opacity-0 transition-opacity group-hover/link:opacity-100 border border-zinc-700">
                    github.com/bluvenr
                  </span>
                </a>
                <a
                  href="https://x.com/bluvenr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle text-zinc-400 transition-all hover:bg-surface-raised hover:text-zinc-200 hover:border-zinc-600"
                  aria-label="X"
                >
                  <XLogo size={15} weight="fill" />
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[9px] text-zinc-300 opacity-0 transition-opacity group-hover/link:opacity-100 border border-zinc-700">
                    x.com/bluvenr
                  </span>
                </a>
                <a
                  href="https://virapi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle text-zinc-400 transition-all hover:bg-surface-raised hover:text-zinc-200 hover:border-zinc-600"
                  aria-label="Website"
                >
                  <Globe size={15} weight="bold" />
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[9px] text-zinc-300 opacity-0 transition-opacity group-hover/link:opacity-100 border border-zinc-700">
                    virapi.com
                  </span>
                </a>
                <a
                  href="mailto:bluvenr@outlook.com"
                  className="group/link relative flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle text-zinc-400 transition-all hover:bg-surface-raised hover:text-zinc-200 hover:border-zinc-600"
                  aria-label="Email"
                >
                  <Envelope size={15} weight="bold" />
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[9px] text-zinc-300 opacity-0 transition-opacity group-hover/link:opacity-100 border border-zinc-700">
                    bluvenr@outlook.com
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
