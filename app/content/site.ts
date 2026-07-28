import type { Locale } from "./locales";

export const workItemOrder = [
  "seedforge",
  "vpn",
  "rag-app",
  "repo-semantic-mcp",
] as const;

export type WorkItemId = (typeof workItemOrder)[number];

export const workStoryHrefs = {
  seedforge: "#seedforge-core",
  vpn: "#vpn-control-plane",
  "rag-app": "#rag-evidence-system",
  "repo-semantic-mcp": "#repo-semantic-context",
} as const satisfies Record<WorkItemId, `#${string}`>;

export type WorkItem<Id extends WorkItemId = WorkItemId> = Readonly<{
  id: Id;
  name: string;
  type: string;
  repositoryHref?: string;
  description: string;
  details: readonly string[];
}>;

type WorkItemSequence<Ids extends readonly WorkItemId[]> = {
  readonly [Index in keyof Ids]: WorkItem<
    Extract<Ids[Index], WorkItemId>
  >;
};

export type SystemItem = Readonly<{
  name: string;
  value: string;
}>;

export type SiteContent = Readonly<{
  skipLink: string;
  nav: Readonly<{
    label: string;
    home: string;
    work: string;
    systems: string;
    contact: string;
    github: string;
  }>;
  localePickerLabel: string;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    copy: string;
    focusLabel: string;
    focus: readonly string[];
  }>;
  work: Readonly<{
    title: string;
    countLabel: string;
    items: WorkItemSequence<typeof workItemOrder>;
    repositoryLabel: string;
    technologiesLabel: string;
  }>;
  systems: Readonly<{
    title: string;
    subtitle: string;
    items: readonly SystemItem[];
  }>;
  contact: Readonly<{
    eyebrow: string;
    title: string;
    copy: string;
    github: string;
    email: string;
    telegram: string;
  }>;
  footer: Readonly<{
    domain: string;
    note: string;
  }>;
}>;

export const siteContent = {
  en: {
    skipLink: "Skip to content",
    nav: {
      label: "Primary navigation",
      home: "ezsx, home",
      work: "work",
      systems: "systems",
      contact: "contact",
      github: "github",
    },
    localePickerLabel: "Language",
    hero: {
      eyebrow: "systems / tools / 2026",
      title: "ezsx",
      copy:
        "Python systems across backend, Linux infrastructure, secure connectivity, retrieval, and GPU compute.",
      focusLabel: "Focus areas",
      focus: ["backend", "platform", "networking", "retrieval", "compute"],
    },
    work: {
      title: "Selected work",
      countLabel: "systems",
      repositoryLabel: "repository",
      technologiesLabel: "technologies",
      items: [
        {
          id: "seedforge",
          name: "CUDA seed search",
          type: "public repository",
          repositoryHref: "https://github.com/ezsx/NoitaSeedSearcherCUDA",
          description:
            "GPU-assisted exhaustive seed search with correctness gates, resumable heterogeneous-GPU runs, and reproducible results.",
          details: ["CUDA", "profiling", "verification", "GPU"],
        },
        {
          id: "vpn",
          name: "Secure connectivity",
          type: "private system",
          description:
            "Server-side control plane for asynchronous configuration issuance and Linux node lifecycle around AmneziaWG and Xray.",
          details: ["Python", "PostgreSQL", "Redis", "Linux"],
        },
        {
          id: "rag-app",
          name: "rag_app",
          type: "public repository",
          repositoryHref: "https://github.com/ezsx/rag_app",
          description:
            "Self-hosted RAG and ReAct with hybrid retrieval, citations, local inference, and an independent evaluation pipeline.",
          details: ["Python", "Qdrant", "LLM", "evaluation"],
        },
        {
          id: "repo-semantic-mcp",
          name: "repo-semantic-mcp",
          type: "public repository",
          repositoryHref: "https://github.com/ezsx/repo-semantic-mcp",
          description:
            "Code-aware repository retrieval for coding agents: dense + sparse search, weighted RRF, bounded graph expansion, and freshness diagnostics.",
          details: ["Python", "Qdrant", "MCP", "retrieval"],
        },
      ],
    },
    systems: {
      title: "Systems",
      subtitle: "working set",
      items: [
        {
          name: "backend",
          value: "Python / FastAPI / PostgreSQL / Redis / ClickHouse",
        },
        {
          name: "platform",
          value: "Linux / Docker / Compose / Swarm / Ansible / observability",
        },
        {
          name: "networking",
          value: "AmneziaWG / Xray / routing / firewall / DNS",
        },
        {
          name: "retrieval",
          value: "Qdrant / hybrid search / reranking / evaluation / MCP",
        },
        {
          name: "compute",
          value: "CUDA / profiling / exhaustive search",
        },
      ],
    },
    contact: {
      eyebrow: "direct contact",
      title: "Contact",
      copy:
        "Project source code is on GitHub. You can reach me by email or Telegram.",
      github: "GitHub",
      email: "Email",
      telegram: "Telegram",
    },
    footer: {
      domain: "ezsx.xx.kg",
      note: "personal engineering projects",
    },
  },
  ru: {
    skipLink: "Перейти к содержимому",
    nav: {
      label: "Основная навигация",
      home: "ezsx, на главную",
      work: "проекты",
      systems: "стек",
      contact: "контакты",
      github: "github",
    },
    localePickerLabel: "Язык",
    hero: {
      eyebrow: "системы / инструменты / 2026",
      title: "ezsx",
      copy:
        "Python-системы на пересечении бэкенда, Linux-инфраструктуры, защищённых подключений, retrieval и GPU-вычислений.",
      focusLabel: "Направления работы",
      focus: ["бэкенд", "платформа", "сети", "retrieval", "вычисления"],
    },
    work: {
      title: "Выбранные проекты",
      countLabel: "системы",
      repositoryLabel: "репозиторий",
      technologiesLabel: "технологии",
      items: [
        {
          id: "seedforge",
          name: "CUDA-поиск seed",
          type: "публичный репозиторий",
          repositoryHref: "https://github.com/ezsx/NoitaSeedSearcherCUDA",
          description:
            "Полный поиск seed с GPU-ускорением, проверками корректности, восстанавливаемыми запусками на неоднородных GPU и воспроизводимыми результатами.",
          details: ["CUDA", "profiling", "verification", "GPU"],
        },
        {
          id: "vpn",
          name: "Защищённое подключение",
          type: "частная система",
          description:
            "Серверный control plane для асинхронной выдачи конфигураций и управления жизненным циклом Linux-нод с AmneziaWG и Xray.",
          details: ["Python", "PostgreSQL", "Redis", "Linux"],
        },
        {
          id: "rag-app",
          name: "rag_app",
          type: "публичный репозиторий",
          repositoryHref: "https://github.com/ezsx/rag_app",
          description:
            "Self-hosted RAG и ReAct с гибридным поиском, цитатами, локальным inference и независимым контуром оценки.",
          details: ["Python", "Qdrant", "LLM", "evaluation"],
        },
        {
          id: "repo-semantic-mcp",
          name: "repo-semantic-mcp",
          type: "публичный репозиторий",
          repositoryHref: "https://github.com/ezsx/repo-semantic-mcp",
          description:
            "Поиск по репозиторию для coding agents: dense + sparse retrieval, взвешенный RRF, ограниченное расширение графа и диагностика актуальности индекса.",
          details: ["Python", "Qdrant", "MCP", "retrieval"],
        },
      ],
    },
    systems: {
      title: "Системы",
      subtitle: "рабочий стек",
      items: [
        {
          name: "бэкенд",
          value: "Python / FastAPI / PostgreSQL / Redis / ClickHouse",
        },
        {
          name: "платформа",
          value: "Linux / Docker / Compose / Swarm / Ansible / observability",
        },
        {
          name: "сети",
          value: "AmneziaWG / Xray / routing / firewall / DNS",
        },
        {
          name: "retrieval",
          value: "Qdrant / hybrid search / reranking / evaluation / MCP",
        },
        {
          name: "вычисления",
          value: "CUDA / profiling / exhaustive search",
        },
      ],
    },
    contact: {
      eyebrow: "связь",
      title: "Контакты",
      copy:
        "Исходный код проектов размещён на GitHub. Связаться со мной можно по email или в Telegram.",
      github: "GitHub",
      email: "Email",
      telegram: "Telegram",
    },
    footer: {
      domain: "ezsx.xx.kg",
      note: "личные инженерные проекты",
    },
  },
} satisfies Record<Locale, SiteContent>;
