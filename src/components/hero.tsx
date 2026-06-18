"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, GithubLogo, Terminal, Headphones } from "@phosphor-icons/react";
import { useI18n } from "@/context/i18n-provider";

function useTypewriter(texts: string[], typingSpeed = 60, deletingSpeed = 30, pauseDuration = 2500) {
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

function TerminalCard({ session, titleBar }: { session: string[]; titleBar: string }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < session.length) {
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), 180);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, session.length]);

  return (
    <div className="w-[360px] rounded-lg border border-border-subtle bg-surface shadow-2xl shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-border-subtle px-4 py-2.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 font-mono text-[10px] text-zinc-600">
          {titleBar}
        </span>
      </div>
      {/* Content */}
      <div className="p-4 font-mono text-[11px] leading-relaxed min-h-[180px]">
        {session.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={line.startsWith("$") ? "mb-0.5" : "text-zinc-500"}>
            {line.startsWith("$") ? (
              <>
                <span className="text-accent">$</span>
                <span className="text-zinc-300">{line.slice(1)}</span>
              </>
            ) : line.includes("Compiling") ? (
              <span className="text-yellow-500/80">{line}</span>
            ) : line.includes("Finished") ? (
              <span className="text-accent/80">{line}</span>
            ) : (
              <span className="text-zinc-400">{line}</span>
            )}
          </div>
        ))}
        {visibleLines < session.length && (
          <span className="terminal-cursor" />
        )}
        {visibleLines >= session.length && (
          <div className="mt-1">
            <span className="text-accent">$</span>{" "}
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

// Code-flavored characters: brackets, operators, hex, types, keywords + katakana for Matrix feel
const RAIN_CHARS =
  "(){}[]<>=+-*/%&|^~!?:;,." +
  "0123456789abcdef" +
  "fnletvariffortruefalse" +
  "#$@\\`\"'" +
  "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD";

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 16;
    let drops: number[] = [];
    let speeds: number[] = [];
    let brightness: number[] = [];
    let animId: number;

    const setup = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () =>
        Math.random() * -50
      );
      speeds = Array.from({ length: cols }, () =>
        0.4 + Math.random() * 0.6
      );
      brightness = Array.from({ length: cols }, () =>
        0.5 + Math.random() * 0.5
      );
    };

    const draw = () => {
      // Longer fade trail
      ctx.fillStyle = "rgba(9, 9, 11, 0.035)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const b = brightness[i];

        // Leading char — brighter, occasional flash
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(34, 197, 94, ${0.8 * b})`;
        } else {
          ctx.fillStyle = `rgba(34, 197, 94, ${0.55 * b})`;
        }
        ctx.fillText(char, x, y);

        // Trail chars — fading
        if (drops[i] > 1) {
          ctx.fillStyle = `rgba(34, 197, 94, ${0.25 * b})`;
          const t1 = RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)];
          ctx.fillText(t1, x, y - fontSize);
          if (drops[i] > 2) {
            ctx.fillStyle = `rgba(34, 197, 94, ${0.1 * b})`;
            const t2 = RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)];
            ctx.fillText(t2, x, y - fontSize * 2);
          }
        }

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = Math.random() * -10;
          brightness[i] = 0.5 + Math.random() * 0.5;
        }
        drops[i] += speeds[i];
      }
      animId = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const onResize = () => {
      cancelAnimationFrame(animId);
      setup();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.3]"
      />
      {/* Bottom fade-out gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 sm:h-80"
        style={{
          background: "linear-gradient(to bottom, transparent 20%, #09090b)",
        }}
      />
    </>
  );
}

export function Hero() {
  const { t } = useI18n();
  const typedText = useTypewriter(t.hero.typing as unknown as string[]);

  return (
    <section className="relative flex min-h-[100dvh] items-center pt-20 overflow-hidden">
      {/* Matrix code rain */}
      <MatrixRain />

      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scan line overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.015]">
        <div
          className="scan-line h-[2px] w-full bg-accent"
        />
      </div>

      {/* Glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-accent/4 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div className="flex items-center gap-12 xl:gap-16">
          {/* Left: main content */}
          <div className="flex-1 max-w-2xl">
            {/* Terminal prompt */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 flex items-center gap-2 font-mono text-xs text-zinc-500"
            >
              <Terminal size={14} weight="bold" className="text-accent" />
              <span className="text-accent/70">{t.hero.greeting}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mb-3 inline-block text-5xl font-bold leading-[1.05] tracking-tighter text-zinc-50 md:text-7xl lg:text-8xl"
            >
              {t.hero.name}
              <span className="text-accent">.</span>
              {/* Headphone icon — vibe coding vibe */}
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                  delay: 0.8,
                }}
                className="absolute -right-5 -top-1 text-accent/25 md:-right-7 md:-top-2 lg:-right-8 lg:-top-3"
              >
                <Headphones
                  size={32}
                  weight="fill"
                  className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 -rotate-12"
                />
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-5 text-lg text-zinc-400 md:text-xl lg:text-2xl"
            >
              {t.hero.tagline}
            </motion.p>

            {/* Typing line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mb-10 h-6 font-mono text-sm text-accent/80 md:text-base"
            >
              <span className="text-accent/40">&gt; </span>
              <span>{typedText}</span>
              <span className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 align-middle cursor-blink" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="https://github.com/bluvenr"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/20 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 active:scale-[0.98]"
              >
                <GithubLogo size={16} weight="fill" />
                {t.hero.ctaGithub}
              </a>
              <a
                href="#projects"
                className="group flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:text-zinc-200 active:scale-[0.98]"
              >
                {t.hero.ctaProjects}
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Right: terminal card (lg+) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block shrink-0"
          >
            <TerminalCard session={t.terminal.session as unknown as string[]} titleBar={t.terminal.titleBar} />
          </motion.div>
        </div>

        {/* Mobile: mini terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 rounded-lg border border-border-subtle bg-surface p-4 lg:hidden"
        >
          <div className="flex items-center gap-1.5 mb-3">
            <div className="h-2 w-2 rounded-full bg-red-500/60" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <div className="h-2 w-2 rounded-full bg-green-500/60" />
            <span className="ml-2 font-mono text-[9px] text-zinc-600">{t.terminal.mobileTitle}</span>
          </div>
          <div className="font-mono text-[11px] leading-relaxed text-zinc-500 space-y-0.5">
            {(t.terminal.mobileSession as unknown as string[]).map((line, i) => (
              <div key={i}>
                {line.startsWith("$") ? (
                  <><span className="text-accent">$</span>{" "}<span className="text-zinc-400">{line.slice(2)}</span></>
                ) : line.includes("Compiling") ? (
                  <span className="text-yellow-500/70">{line}</span>
                ) : (
                  <span className="text-accent/70">{line}</span>
                )}
              </div>
            ))}
            <div>
              <span className="text-accent">$</span>{" "}
              <span className="terminal-cursor" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
