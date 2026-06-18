"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  GithubLogo,
  Globe,
  Lightning,
  Code,
  Database,
} from "@phosphor-icons/react";
import { useI18n } from "@/context/i18n-provider";

const projects = [
  {
    key: "hookrun" as const,
    repo: "bluvenr/hookrun",
    website: "https://hookrun.virapi.com",
    github: "https://github.com/bluvenr/hookrun",
    lang: "Go",
    langColor: "#00ADD8",
    icon: Lightning,
    featured: true,
  },
  {
    key: "tokenowl" as const,
    repo: "bluvenr/tokenowl",
    website: "https://tokenowl.virapi.com",
    github: "https://github.com/bluvenr/tokenowl",
    lang: "Rust",
    langColor: "#dea584",
    icon: Code,
    featured: false,
  },
  {
    key: "virapi" as const,
    repo: "bluvenr/open_virapi",
    website: "https://virapi.com",
    github: "https://github.com/bluvenr/open_virapi",
    lang: "TypeScript",
    langColor: "#3178c6",
    icon: Database,
    featured: false,
  },
];

const tagDescriptions: Record<string, string> = {
  "Tauri v2": "Rust-powered desktop framework",
  "React 19": "Latest React with server components",
  Rust: "Memory-safe systems programming",
  SQLite: "Embedded relational database",
  Go: "High-performance backend language",
  YAML: "Human-readable config format",
  CLI: "Command-line interface tool",
  TypeScript: "Type-safe JavaScript superset",
  Vue: "Progressive frontend framework",
  "Node.js": "Server-side JavaScript runtime",
};

function ProjectCard({
  project,
  projData,
  index,
}: {
  project: (typeof projects)[0];
  projData: { name: string; desc: string; tags: readonly string[]; codePreview?: string };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = project.icon;
  const isFeatured = index === 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative flex flex-col rounded-lg border border-border-subtle bg-surface transition-all duration-300 hover:border-zinc-700 overflow-hidden ${
        isFeatured ? "md:col-span-7 md:row-span-2" : "md:col-span-5"
      }`}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: project.langColor }}
      />

      {/* Radial glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.langColor}06, transparent 60%)`,
        }}
      />

      <div className="relative flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle transition-all duration-300 group-hover:shadow-md"
              style={{
                backgroundColor: `${project.langColor}12`,
                boxShadow: `0 0 0 0 ${project.langColor}00`,
              }}
            >
              <Icon size={20} weight="bold" style={{ color: project.langColor }} />
            </div>
            <div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title"
              >
                <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover/title:text-accent">
                  {projData.name}
                </h3>
              </a>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: project.langColor }}
                />
                <span className="font-mono text-xs text-zinc-500">
                  {project.lang}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-all hover:bg-surface-raised hover:text-zinc-300"
              aria-label="Website"
            >
              <Globe size={15} weight="bold" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-all hover:bg-surface-raised hover:text-zinc-300"
              aria-label="GitHub"
            >
              <GithubLogo size={15} weight="fill" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-all hover:bg-surface-raised hover:text-zinc-300"
              aria-label="Open"
            >
              <ArrowUpRight size={15} weight="bold" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className={`mb-5 text-sm leading-relaxed text-zinc-400 ${isFeatured ? "max-w-md" : ""}`}>
          {projData.desc}
        </p>

        {/* Code preview for featured project */}
        {isFeatured && projData.codePreview && (
          <div className="mb-5 rounded-md border border-border-subtle bg-[#0a0a0c] overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border-subtle">
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
              <span className="font-mono text-[9px] text-zinc-600 ml-1">rules.yaml</span>
            </div>
            <pre className="px-3 py-2.5 font-mono text-[10px] leading-relaxed text-zinc-500 overflow-x-auto">
              {projData.codePreview}
            </pre>
          </div>
        )}

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-2">
          {projData.tags.map((tag) => (
            <span
              key={tag}
              className="group/tag relative rounded-md bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:text-zinc-200 hover:bg-zinc-800 cursor-default"
            >
              {tag}
              {/* Tooltip */}
              {tagDescriptions[tag] && (
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2.5 py-1.5 text-[10px] text-zinc-300 opacity-0 transition-opacity duration-200 group-hover/tag:opacity-100 shadow-lg border border-zinc-700">
                  {tagDescriptions[tag]}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      {/* Terminal section divider */}
      <div className="mx-auto max-w-[1200px] px-6 mb-16">
        <div className="section-divider">
          <span className="text-accent/30">[projects]</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">
            {t.projects.title}
          </h2>
          <p className="mt-3 max-w-lg text-base text-zinc-500">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-2">
          {projects.map((project, i) => {
            const projData = t.projects[project.key];
            return (
              <ProjectCard
                key={project.repo}
                project={project}
                projData={projData as { name: string; desc: string; tags: readonly string[]; codePreview?: string }}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
