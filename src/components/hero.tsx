"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, GithubLogo, Terminal } from "@phosphor-icons/react";
import { useI18n } from "@/context/i18n-provider";

function useTypewriter(texts: string[], typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentText.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, textIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

export function Hero() {
  const { t } = useI18n();
  const typedText = useTypewriter(t.hero.typing as unknown as string[]);

  return (
    <section className="relative flex min-h-[100dvh] items-end pb-24 pt-24">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div className="max-w-2xl">
          {/* Terminal line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2 font-mono text-sm text-zinc-500"
          >
            <Terminal size={16} weight="bold" className="text-accent" />
            <span className="text-accent">$</span>
            <span className="text-zinc-400">whoami</span>
          </motion.div>

          {/* Greeting + name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-4"
          >
            <p className="mb-2 font-mono text-sm text-zinc-500">
              {t.hero.greeting}
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter text-zinc-50 md:text-7xl lg:text-8xl">
              {t.hero.name}
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 text-xl text-zinc-400 md:text-2xl"
          >
            {t.hero.tagline}
          </motion.p>

          {/* Typing line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-10 h-7 font-mono text-sm text-accent/80 md:text-base"
          >
            <span className="text-accent/50">&gt; </span>
            <span>{typedText}</span>
            <span className="inline-block w-[2px] h-[1em] animate-pulse bg-accent ml-0.5 align-middle" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="https://github.com/bluvenr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/20 hover:border-accent/60 active:scale-[0.98]"
            >
              <GithubLogo size={16} weight="fill" />
              {t.hero.ctaGithub}
            </a>
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200 active:scale-[0.98]"
            >
              {t.hero.ctaProjects}
              <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Right side: decorative terminal card */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 xl:block"
        >
          <div className="w-[340px] rounded-lg border border-border-subtle bg-surface shadow-2xl shadow-black/40">
            {/* Title bar */}
            <div className="flex items-center gap-1.5 border-b border-border-subtle px-4 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-[10px] text-zinc-600">
                ~/projects
              </span>
            </div>
            {/* Content */}
            <div className="p-4 font-mono text-[11px] leading-relaxed">
              <div className="mb-2">
                <span className="text-accent">$</span>{" "}
                <span className="text-zinc-400">ls -la</span>
              </div>
              <div className="text-zinc-600">
                <div className="text-zinc-500">drwxr-xr-x  tokenowl/</div>
                <div className="text-zinc-500">drwxr-xr-x  hookrun/</div>
                <div className="text-zinc-500">drwxr-xr-x  open_virapi/</div>
              </div>
              <div className="mt-3 mb-1">
                <span className="text-accent">$</span>{" "}
                <span className="text-zinc-400">cat stats.json</span>
              </div>
              <div className="rounded bg-zinc-900/80 p-2 text-zinc-500">
                <div>
                  {"{"}
                </div>
                <div className="pl-3">
                  <span className="text-zinc-600">&quot;languages&quot;</span>:{" "}
                  <span className="text-accent/70">[&quot;Rust&quot;, &quot;Go&quot;, &quot;TS&quot;]</span>,
                </div>
                <div className="pl-3">
                  <span className="text-zinc-600">&quot;focus&quot;</span>:{" "}
                  <span className="text-accent/70">&quot;developer tools&quot;</span>,
                </div>
                <div className="pl-3">
                  <span className="text-zinc-600">&quot;status&quot;</span>:{" "}
                  <span className="text-accent/70">&quot;building...&quot;</span>
                </div>
                <div>{"}"}</div>
              </div>
              <div className="mt-3">
                <span className="text-accent">$</span>{" "}
                <span className="inline-block w-[7px] h-[12px] bg-accent/80 animate-pulse align-middle" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
