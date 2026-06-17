"use client";

import { motion } from "motion/react";
import { useI18n } from "@/context/i18n-provider";

// Official SVG icons from Simple Icons (https://simpleicons.org/)
import {
  siRust,
  siGo,
  siTypescript,
  siJavascript,
  siReact,
  siNextdotjs,
  siVuedotjs,
  siTailwindcss,
  siNodedotjs,
  siTauri,
  siSqlite,
  siDocker,
} from "simple-icons";

const techIcons: Record<string, { path: string; color: string }> = {
  Rust: { color: "#CE422B", path: siRust.path },
  Go: { color: "#" + siGo.hex, path: siGo.path },
  TypeScript: { color: "#" + siTypescript.hex, path: siTypescript.path },
  JavaScript: { color: "#" + siJavascript.hex, path: siJavascript.path },
  React: { color: "#" + siReact.hex, path: siReact.path },
  "Next.js": { color: "#FFFFFF", path: siNextdotjs.path },
  Vue: { color: "#" + siVuedotjs.hex, path: siVuedotjs.path },
  TailwindCSS: { color: "#" + siTailwindcss.hex, path: siTailwindcss.path },
  "Node.js": { color: "#" + siNodedotjs.hex, path: siNodedotjs.path },
  Tauri: { color: "#" + siTauri.hex, path: siTauri.path },
  SQLite: { color: "#0F80B5", path: siSqlite.path },
  Docker: { color: "#" + siDocker.hex, path: siDocker.path },
};

const techStack = [
  {
    category: { en: "Languages", zh: "语言" },
    items: [
      { name: "Rust" },
      { name: "Go" },
      { name: "TypeScript" },
      { name: "JavaScript" },
    ],
  },
  {
    category: { en: "Frontend", zh: "前端" },
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Vue" },
      { name: "TailwindCSS" },
    ],
  },
  {
    category: { en: "Backend & Tools", zh: "后端与工具" },
    items: [
      { name: "Node.js" },
      { name: "Tauri" },
      { name: "SQLite" },
      { name: "Docker" },
    ],
  },
];

function TechIcon({ name }: { name: string }) {
  const icon = techIcons[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      style={{ color: icon.color }}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

export function TechStack() {
  const { t, locale } = useI18n();

  return (
    <section id="stack" className="relative py-32">
      {/* Subtle divider line */}
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-20 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">
            {t.stack.title}
          </h2>
          <p className="mt-3 max-w-lg text-base text-zinc-500">
            {t.stack.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {techStack.map((group, groupIndex) => (
            <motion.div
              key={group.category.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-zinc-500">
                {locale === "zh" ? group.category.zh : group.category.en}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex items-center gap-3 rounded-lg border border-border-subtle bg-surface px-4 py-3 transition-colors hover:border-zinc-700"
                  >
                    <TechIcon name={item.name} />
                    <span className="text-sm text-zinc-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
