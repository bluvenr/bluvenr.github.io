"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  GithubLogo,
  Globe,
  Star,
  GitFork,
  Code,
  Lightning,
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
    badges: [
      { label: "go", value: "1.21+", color: "00ADD8" },
    ],
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
    badges: [
      { label: "platform", value: "macOS | Windows | Linux", color: "2563eb" },
    ],
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
    badges: [],
    featured: false,
  },
];

function ShieldBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <span className="inline-flex items-center overflow-hidden rounded text-[10px] font-medium leading-tight">
      <span className="bg-zinc-700 px-1.5 py-0.5 text-zinc-200">{label}</span>
      <span className="px-1.5 py-0.5 text-white" style={{ backgroundColor: `#${color}` }}>
        {value}
      </span>
    </span>
  );
}

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="relative py-32">
      {/* Subtle divider line */}
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-20 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
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
            {t.projects.title}
          </h2>
          <p className="mt-3 max-w-lg text-base text-zinc-500">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Bento grid: 1 large + 2 smaller */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-2">
          {projects.map((project, i) => {
            const projData = t.projects[project.key];
            const Icon = project.icon;
            const isLarge = i === 0;

            return (
              <motion.div
                key={project.repo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative flex flex-col rounded-lg border border-border-subtle bg-surface transition-colors hover:border-zinc-700 ${
                  isLarge ? "md:col-span-7 md:row-span-2" : "md:col-span-5"
                }`}
              >
                {/* Accent glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.langColor}08, transparent)`,
                  }}
                />

                <div className="relative flex flex-1 flex-col p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle"
                        style={{ backgroundColor: `${project.langColor}15` }}
                      >
                        <Icon
                          size={20}
                          weight="bold"
                          style={{ color: project.langColor }}
                        />
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/title"
                      >
                        <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover/title:text-accent">
                          {projData.name}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: project.langColor }}
                          />
                          <span className="font-mono text-xs text-zinc-500">
                            {project.lang}
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-surface-raised hover:text-zinc-300"
                        aria-label="Website"
                      >
                        <Globe size={16} weight="bold" />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-surface-raised hover:text-zinc-300"
                        aria-label="GitHub"
                      >
                        <GithubLogo size={16} weight="fill" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`mb-5 text-sm leading-relaxed text-zinc-400 ${isLarge ? "max-w-md" : ""}`}>
                    {projData.desc}
                  </p>

                  {/* Badges row */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.badges.map((badge) => (
                      <ShieldBadge key={badge.label} {...badge} />
                    ))}
                    {/* Dynamic shields.io images */}
                    <img
                      src={`https://img.shields.io/github/stars/${project.repo}?style=flat-square&logo=github&label=stars&color=22c55e`}
                      alt="stars"
                      className="h-[18px]"
                      loading="lazy"
                    />
                    <img
                      src={`https://img.shields.io/github/license/${project.repo}?style=flat-square&color=22c55e`}
                      alt="license"
                      className="h-[18px]"
                      loading="lazy"
                    />
                    {isLarge && (
                      <>
                        <img
                          src={`https://img.shields.io/github/v/release/${project.repo}?style=flat-square&color=blue&include_prereleases`}
                          alt="release"
                          className="h-[18px]"
                          loading="lazy"
                        />
                        <img
                          src={`https://img.shields.io/github/last-commit/${project.repo}?style=flat-square&color=orange`}
                          alt="last commit"
                          className="h-[18px]"
                          loading="lazy"
                        />
                      </>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {projData.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-md bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
