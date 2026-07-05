"use client";

import { motion } from "motion/react";
import { useI18n } from "@/context/i18n-provider";

import {
  siRust,
  siGo,
  siTypescript,
  siJavascript,
  siPhp,
  siPython,
  siOpenjdk,
  siReact,
  siNextdotjs,
  siVuedotjs,
  siTailwindcss,
  siFlutter,
  siWechat,
  siNodedotjs,
  siTauri,
  siSqlite,
  siMysql,
  siRedis,
  siMongodb,
  siDocker,
} from "simple-icons";

const techIcons: Record<string, { path: string; color: string }> = {
  Rust: { color: "#CE422B", path: siRust.path },
  Go: { color: "#" + siGo.hex, path: siGo.path },
  TypeScript: { color: "#" + siTypescript.hex, path: siTypescript.path },
  JavaScript: { color: "#" + siJavascript.hex, path: siJavascript.path },
  PHP: { color: "#" + siPhp.hex, path: siPhp.path },
  Python: { color: "#" + siPython.hex, path: siPython.path },
  Java: { color: "#E76F00", path: siOpenjdk.path },
  React: { color: "#" + siReact.hex, path: siReact.path },
  "Next.js": { color: "#FFFFFF", path: siNextdotjs.path },
  Vue: { color: "#" + siVuedotjs.hex, path: siVuedotjs.path },
  TailwindCSS: { color: "#" + siTailwindcss.hex, path: siTailwindcss.path },
  Flutter: { color: "#" + siFlutter.hex, path: siFlutter.path },
  "Mini Program": { color: "#" + siWechat.hex, path: siWechat.path },
  "Node.js": { color: "#" + siNodedotjs.hex, path: siNodedotjs.path },
  Tauri: { color: "#" + siTauri.hex, path: siTauri.path },
  SQLite: { color: "#0F80B5", path: siSqlite.path },
  MySQL: { color: "#" + siMysql.hex, path: siMysql.path },
  Redis: { color: "#" + siRedis.hex, path: siRedis.path },
  MongoDB: { color: "#" + siMongodb.hex, path: siMongodb.path },
  Docker: { color: "#" + siDocker.hex, path: siDocker.path },
};

type CategoryKey = "languages" | "frontend" | "backend";

const categories: { key: CategoryKey; items: string[] }[] = [
  {
    key: "languages",
    items: ["Rust", "Go", "TypeScript", "JavaScript", "PHP", "Python", "Java"],
  },
  {
    key: "frontend",
    items: ["React", "Next.js", "Vue", "TailwindCSS", "Flutter", "Mini Program"],
  },
  {
    key: "backend",
    items: [
      "Node.js",
      "Tauri",
      "MySQL",
      "SQLite",
      "Redis",
      "MongoDB",
      "Docker",
    ],
  },
];

function TechIcon({ name }: { name: string }) {
  const icon = techIcons[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      style={{ color: icon.color }}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

export function TechStack() {
  const { t } = useI18n();

  const categoryLabels = t.stack.tabs as Record<CategoryKey, string>;
  const techNames = (t.stack.techNames || {}) as Record<string, string>;
  const displayName = (key: string) => techNames[key] || key;

  return (
    <section id="stack" className="relative py-20 lg:py-24">
      {/* Terminal section divider */}
      <div className="mx-auto max-w-[1200px] px-6 mb-16">
        <div className="section-divider">
          <span className="text-accent/30">[stack]</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section header */}
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

        {/* Tech items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-10"
        >
          {categories.map((cat) => (
            <div key={cat.key}>
              <div className="mb-4 pb-2 border-b border-border-subtle">
                <span className="font-mono text-xs font-medium text-zinc-400 tracking-wide">
                  <span className="text-accent/50 mr-1.5">●</span>
                  {categoryLabels[cat.key]}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {cat.items.map((name) => (
                  <div
                    key={name}
                    className="group/tech flex items-center gap-2.5 cursor-default"
                  >
                    <TechIcon name={name} />
                    <span className="text-sm text-zinc-500 transition-colors duration-150 group-hover/tech:text-zinc-200">
                      {displayName(name)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
