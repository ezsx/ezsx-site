import type {
  StoryBrief,
  StoryHeadline,
  StoryProof,
  StoryStageSequence,
} from "../../components/story/story-types";
import type { Locale } from "../../content/locales";

export const repoSemanticStageOrder = [
  "target",
  "index",
  "retrieve",
  "connect",
  "handoff",
] as const;

export type RepoSemanticStageId =
  (typeof repoSemanticStageOrder)[number];

export type RepoSemanticContent = Readonly<{
  kicker: string;
  title: string;
  intro: readonly [string, string];
  brief: StoryBrief;
  navLabel: string;
  stages: StoryStageSequence<typeof repoSemanticStageOrder>;
  headlines: readonly StoryHeadline[];
  proof: StoryProof;
}>;

export const repoSemanticContent = {
  en: {
    kicker: "repo-semantic-mcp / retrieval substrate for coding agents",
    title: "Find the files that matter before the first edit.",
    intro: [
      "Coding agents are strong once they have the right context. In an unfamiliar repository, the expensive part is locating implementation, tests, docs and configuration without mistaking a plausible match for evidence.",
      "repo-semantic-mcp is not a hidden coding agent. It keeps repository maps fresh, combines meaning with exact terms, adds bounded structural context when useful, and hands the agent file ranges plus explicit verification actions.",
    ],
    brief: {
      label: "project brief / 30 second read",
      summary:
        "A repository retrieval layer that gives coding agents the right files, line ranges, and verification steps before they edit.",
      points: [
        {
          label: "challenge",
          text: "In an unfamiliar codebase, plausible semantic matches are not enough. Implementation, tests, docs, and configuration must return as verifiable evidence.",
        },
        {
          label: "built",
          text: "I built language-aware indexing, exact and semantic retrieval, a bounded relation graph, freshness tracking, and MCP handoff.",
        },
        {
          label: "result",
          text: "The frozen self-repo baseline reached 83.3% recall @ 10. In 19 / 24 tasks, every expected file appeared within the top 20.",
        },
      ],
    },
    navLabel: "Repository context retrieval story",
    stages: [
      {
        id: "target",
        tab: "prove readiness",
        result: "trusted repository state",
        title: "Target one repository, then prove its map is current",
        summary:
          "A compact status check tells the agent whether search, watcher and graph state are usable before the first query.",
        detail:
          "One process can keep up to ten repositories mounted, while each retains its own index, manifest, watcher and graph lifecycle. Status and search never rebuild anything implicitly; recovery remains an explicit action.",
        tags: [
          "10 live repositories",
          "independent lifecycle",
          "no implicit rebuild",
        ],
      },
      {
        id: "index",
        tab: "build the map",
        result: "structured code chunks",
        title: "Index code without flattening away its structure",
        summary:
          "Language-aware chunkers preserve paths, line ranges, symbols, headings and domain tags.",
        detail:
          "Python AST chunks functions, classes and methods; Markdown and structured formats keep their natural boundaries. Dense and sparse vectors land in Qdrant, while a path manifest and watcher reconcile edits, deletes and branch switches.",
        tags: [
          "AST + structured chunkers",
          "dense + sparse Qdrant",
          "bounded reconcile",
        ],
      },
      {
        id: "retrieve",
        tab: "let signals vote",
        result: "ranked seed context",
        title: "Let meaning and exact terms vote separately",
        summary:
          "The raw question drives dense retrieval; code-normalized terms drive sparse retrieval; weighted RRF fuses ranks instead of incomparable scores.",
        detail:
          "Exact-looking anchors change the branch priors and are never treated as semantic-only evidence. The optional reranker only reorders a bounded slate, pins exact hits, and falls back cleanly on timeout.",
        tags: [
          "RRF k = 60",
          "top 80 rerank",
          "up to 5 exact hits pinned",
        ],
      },
      {
        id: "connect",
        tab: "follow structure",
        result: "bounded evidence paths",
        title: "Add relationships only when they help the question",
        summary:
          "Strong seed chunks can expand through typed imports, routes, tests, docs, environment and policy links.",
        detail:
          "Graph retrieval is optional, bounded and freshness-gated - not a silent planner. Exact handoff suppresses it; stale or unsafe graph state returns a warning and a recovery action instead of pretending certainty.",
        tags: [
          "max 20 graph seeds",
          "typed evidence paths",
          "exact handoff suppresses graph",
        ],
      },
      {
        id: "handoff",
        tab: "hand off evidence",
        result: "actionable context envelope",
        title: "Return a map the coding agent can verify",
        summary:
          "Results arrive grouped by file with line ranges, matched terms, retrieval origins and structural evidence.",
        detail:
          "The envelope names uncovered terms and recommends exact rg, narrower filters or specific reads. The MCP does not write the fix: the agent reads source, verifies literals in the live tree, and decides what to edit.",
        tags: [
          "file groups + line ranges",
          "uncovered terms",
          "local rg authority",
        ],
      },
    ],
    headlines: [
      {
        label: "May 7 dogfood snapshot",
        value: "16,966",
        detail: "7,806 code · 9,160 docs",
      },
      {
        label: "golden recall @ 10",
        value: "83.3%",
        detail: "24 known-file tasks",
      },
      {
        label: "typed graph",
        value: "36,097",
        detail: "nodes · 48,862 edges",
      },
      {
        label: "live repository pool",
        value: "10",
        detail: "independent runtimes",
      },
    ],
    proof: {
      label: "frozen self-repo baseline · full-hit @ 20",
      value: "19 / 24 tasks recovered every expected file",
      detail: "file-level · pplx-embed-v1",
    },
  },
  ru: {
    kicker: "repo-semantic-mcp / retrieval substrate for coding agents",
    title: "Найти нужные файлы до первой правки.",
    intro: [
      "Coding-агент силён, когда получил правильный контекст. В незнакомом репозитории дорого не написать код, а найти реализацию, тесты, документацию и конфигурацию, не приняв правдоподобное совпадение за доказательство.",
      "repo-semantic-mcp - не скрытый coding-агент. Он поддерживает карту репозитория свежей, объединяет смысловой и точный retrieval, при необходимости добавляет ограниченный контекст из графа и возвращает диапазоны строк вместе с явными шагами проверки.",
    ],
    brief: {
      label: "project brief / 30 second read",
      summary:
        "Retrieval-слой по репозиторию, который до первой правки отдаёт coding-агенту нужные файлы, диапазоны строк и шаги проверки.",
      points: [
        {
          label: "challenge",
          text: "В незнакомом коде правдоподобного смыслового совпадения недостаточно. Реализация, тесты, документация и конфигурация должны возвращаться как проверяемые основания для решения.",
        },
        {
          label: "built",
          text: "Я построил языковую индексацию, совместил точный и семантический retrieval, добавил ограниченный граф связей, контроль свежести и MCP handoff.",
        },
        {
          label: "result",
          text: "Зафиксированный self-repo benchmark показал 83.3% recall @ 10. В 19 из 24 задач все ожидаемые файлы попали в top 20.",
        },
      ],
    },
    navLabel: "Repository context retrieval story",
    stages: [
      {
        id: "target",
        tab: "prove readiness",
        result: "trusted repository state",
        title: "Выбрать репозиторий и доказать свежесть его карты",
        summary:
          "Компактный статус заранее сообщает агенту, можно ли доверять поиску, watcher и состоянию графа.",
        detail:
          "Один процесс держит до десяти репозиториев, но у каждого свой индекс, manifest, watcher и lifecycle графа. Статус и поиск ничего не перестраивают скрыто: восстановление всегда остаётся явным действием.",
        tags: [
          "10 live repositories",
          "independent lifecycle",
          "no implicit rebuild",
        ],
      },
      {
        id: "index",
        tab: "build the map",
        result: "structured code chunks",
        title: "Индексировать код, не превращая его в плоский текст",
        summary:
          "Language-aware chunkers сохраняют пути, диапазоны строк, символы, заголовки и доменные теги.",
        detail:
          "Python AST выделяет функции, классы и методы; Markdown и структурные форматы сохраняют естественные границы. Dense и sparse-векторы попадают в Qdrant, а path manifest и watcher согласуют изменения, удаления и переключения веток.",
        tags: [
          "AST + structured chunkers",
          "dense + sparse Qdrant",
          "bounded reconcile",
        ],
      },
      {
        id: "retrieve",
        tab: "let signals vote",
        result: "ranked seed context",
        title: "Разделить поиск по смыслу и точным терминам",
        summary:
          "Исходный запрос идёт в dense retrieval, нормализованные термины кода - в sparse retrieval, а weighted RRF объединяет ранги, не смешивая несопоставимые оценки.",
        detail:
          "Якоря, похожие на точные, меняют приоритеты веток и никогда не считаются только семантическим доказательством. Опциональный reranker лишь переставляет ограниченную выборку, фиксирует точные совпадения и безопасно откатывается при timeout.",
        tags: [
          "RRF k = 60",
          "top 80 rerank",
          "up to 5 exact hits pinned",
        ],
      },
      {
        id: "connect",
        tab: "follow structure",
        result: "bounded evidence paths",
        title: "Добавлять связи только там, где они помогают вопросу",
        summary:
          "Сильные стартовые chunks могут расширяться через типизированные связи imports, routes, tests, docs, environment и policy.",
        detail:
          "Graph retrieval опционален, ограничен и зависит от свежести - это не скрытый planner. Exact handoff отключает граф, а устаревшее или небезопасное состояние возвращает предупреждение и действие для восстановления вместо ложной уверенности.",
        tags: [
          "max 20 graph seeds",
          "typed evidence paths",
          "exact handoff suppresses graph",
        ],
      },
      {
        id: "handoff",
        tab: "hand off evidence",
        result: "actionable context envelope",
        title: "Вернуть карту, которую coding-агент может проверить",
        summary:
          "Результаты сгруппированы по файлам и содержат диапазоны строк, совпавшие термины, источники retrieval и структурные подтверждения.",
        detail:
          "Context envelope называет непокрытые термины и рекомендует точный rg, более узкие фильтры или чтение конкретных файлов. MCP не пишет исправление: агент читает исходники, проверяет значения в рабочем дереве и решает, что менять.",
        tags: [
          "file groups + line ranges",
          "uncovered terms",
          "local rg - authority",
        ],
      },
    ],
    headlines: [
      {
        label: "May 7 dogfood snapshot",
        value: "16,966",
        detail: "7,806 code · 9,160 docs",
      },
      {
        label: "golden recall @ 10",
        value: "83.3%",
        detail: "24 known-file tasks",
      },
      {
        label: "typed graph",
        value: "36,097",
        detail: "nodes · 48,862 edges",
      },
      {
        label: "live repository pool",
        value: "10",
        detail: "independent runtimes",
      },
    ],
    proof: {
      label: "self-repo baseline · full-hit @ 20",
      value: "19 / 24 tasks found every expected file",
      detail: "file-level · pplx-embed-v1",
    },
  },
} satisfies Record<Locale, RepoSemanticContent>;
