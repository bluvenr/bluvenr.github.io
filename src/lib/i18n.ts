export type Locale = "zh" | "en";

export const dict = {
  zh: {
    nav: {
      projects: "项目",
      stack: "技术栈",
      about: "关于",
      contact: "联系",
    },
    hero: {
      greeting: "你好，我是",
      name: "bluvenr",
      tagline: "一个喜欢折腾的开发者",
      typing: [
        "构建开发者工具...",
        "热爱开源...",
        "Rust & Go & TypeScript...",
        "让开发体验更好...",
      ],
      ctaGithub: "GitHub",
      ctaProjects: "查看项目",
    },
    projects: {
      title: "重点项目",
      subtitle: "当前正在维护的开源项目",
      tokenowl: {
        name: "TokenOwl",
        desc: "AI 编码成本追踪器 — CC Switch 数据分析伙伴。实时追踪 AI 编码助手的使用情况和花费，支持多模型、多供应商的成本分析。",
        tags: ["Tauri v2", "React 19", "Rust", "SQLite"],
        website: "官网",
        github: "GitHub",
      },
      hookrun: {
        name: "HookRun",
        desc: "轻量 Webhook 动作引擎。基于 YAML 规则，在 webhook 请求到达时执行自定义命令、脚本和转发。单文件二进制，零依赖。",
        tags: ["Go", "YAML", "CLI"],
        website: "官网",
        github: "GitHub",
      },
      virapi: {
        name: "VirAPI",
        desc: "虚拟数据在线请求响应生成接口。非侵入式，支持 MockJs 语法，帮助前端开发者快速获得自定义规则的响应数据，无需搭建后端。",
        tags: ["TypeScript", "Vue", "Node.js"],
        website: "官网",
        github: "开源版",
      },
    },
    stack: {
      title: "技术栈",
      subtitle: "日常使用的工具与技术",
    },
    about: {
      title: "关于我",
      p1: "来自深圳的开发者，专注于构建提升开发效率的工具。",
      p2: "热爱开源，相信好的工具能让开发者把精力放在真正重要的事情上。日常在 Rust、Go 和 TypeScript 之间切换，喜欢探索不同语言的可能性。",
      p3: "目前在维护和迭代多个开源项目，欢迎 Star、Issue 和 PR。",
      location: "深圳，中国",
      status: "开源爱好者",
    },
    footer: {
      rights: "保留所有权利",
      builtWith: "使用 Next.js 构建",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      stack: "Stack",
      about: "About",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "bluvenr",
      tagline: "A developer who loves to tinker",
      typing: [
        "Building developer tools...",
        "Passionate about open source...",
        "Rust & Go & TypeScript...",
        "Making DX better...",
      ],
      ctaGithub: "GitHub",
      ctaProjects: "View Projects",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Open source projects I'm currently maintaining",
      tokenowl: {
        name: "TokenOwl",
        desc: "AI Coding Cost Tracker — CC Switch's Data Analysis Partner. Real-time visibility into AI coding assistant usage and spending across every model and provider.",
        tags: ["Tauri v2", "React 19", "Rust", "SQLite"],
        website: "Website",
        github: "GitHub",
      },
      hookrun: {
        name: "HookRun",
        desc: "A lightweight webhook action engine. Execute custom commands, scripts, and forward webhooks based on YAML rules. Single binary, zero dependencies.",
        tags: ["Go", "YAML", "CLI"],
        website: "Website",
        github: "GitHub",
      },
      virapi: {
        name: "VirAPI",
        desc: "Virtual API — non-invasive online mock data service. Supports MockJs syntax, helping frontend developers get custom response data without a backend.",
        tags: ["TypeScript", "Vue", "Node.js"],
        website: "Website",
        github: "Open Source",
      },
    },
    stack: {
      title: "Tech Stack",
      subtitle: "Tools and technologies I use daily",
    },
    about: {
      title: "About Me",
      p1: "A developer based in Shenzhen, focused on building tools that improve the developer experience.",
      p2: "Passionate about open source, believing that good tools let developers focus on what truly matters. Daily switching between Rust, Go, and TypeScript, always exploring what different languages can offer.",
      p3: "Currently maintaining and iterating on multiple open source projects. Stars, issues, and PRs are always welcome.",
      location: "Shenzhen, China",
      status: "Open Source Enthusiast",
    },
    footer: {
      rights: "All rights reserved",
      builtWith: "Built with Next.js",
    },
  },
} as const;

export type Dict = typeof dict["en"];

export function getDict(locale: Locale): Dict {
  return dict[locale] as unknown as Dict;
}
