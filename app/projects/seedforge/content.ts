import type {
  StoryBrief,
  StoryHeadline,
  StoryProof,
  StoryStageSequence,
} from "../../components/story/story-types";
import type { Locale } from "../../content/locales";

export const seedforgeStageOrder = [
  "run",
  "prove",
  "cover",
  "orchestrate",
  "publish",
] as const;

export type SeedforgeStageId = (typeof seedforgeStageOrder)[number];

export type SeedforgeContent = Readonly<{
  kicker: string;
  title: string;
  intro: readonly [string, string];
  brief: StoryBrief;
  navLabel: string;
  stages: StoryStageSequence<typeof seedforgeStageOrder>;
  headlines: readonly StoryHeadline[];
  proof: StoryProof;
}>;

export const seedforgeContent = {
  en: {
    kicker: "seedforge / verified GPU search",
    title: "Run a reliable exhaustive seed search across two GPUs.",
    intro: [
      "A Noita seed deterministically defines a world. Seedforge reconstructs billions of those worlds on GPU, checks 22 target biomes for rare objects, and keeps only canonical, recoverable results.",
      "The central work was making the inherited path operational, accurate, complete and crash-safe. Kernel profiling and tuning came after that foundation worked end to end.",
    ],
    brief: {
      label: "project brief / 30 second read",
      summary:
        "A verified GPU system that exhaustively searches Noita worlds and preserves canonical, recoverable results.",
      points: [
        {
          label: "challenge",
          text: "The inherited CUDA search path did not run reliably, return correct results, or cover the full world. Performance only mattered after the system worked end to end.",
        },
        {
          label: "built",
          text: "I restored the native pipeline, proved CPU, V100 and RTX agreement, covered all 22 target biomes, and added crash-safe work distribution across two unequal GPUs.",
        },
        {
          label: "result",
          text: "The completed census scanned 2.147B world seeds. A separate dual-GPU run accepted all 433 cells with 0 missing and 0 invalid.",
        },
      ],
    },
    navLabel: "Seedforge system story",
    stages: [
      {
        id: "run",
        tab: "make it run",
        result: "accepted CUDA run",
        title: "A result-producing CUDA path",
        summary:
          "Build and runtime failures had to be solved before search performance mattered.",
        detail:
          "Native CUDA builds load Noita data, verify the selected device and stream structured progress and hits through a hardened bridge. A failed launch or an empty run is not accepted as work.",
        tags: [
          "native sm_70 + sm_120",
          "WAK identity",
          "structured hit stream",
        ],
      },
      {
        id: "prove",
        tab: "prove it",
        result: "canonical equality",
        title: "Correctness before speed",
        summary:
          "CPU, V100 and RTX output must converge to the same canonical seed blocks.",
        detail:
          "Whole per-seed blocks preserve duplicates and record order. SHA-256 gates and sampled Telescope comparisons make drift and known residuals visible instead of hiding them behind equal result counts.",
        tags: ["seed-block-v2", "CPU = GPU", "916 comparison cases"],
      },
      {
        id: "cover",
        tab: "cover the world",
        result: "22 target biomes",
        title: "World coverage, not one map",
        summary:
          "The engine reconstructs Wang worldgen and spawn hooks across all 22 audited target biomes.",
        detail:
          "Production Path A generates the 16 biomes that can create chests while retaining boundary hits in six source-empty targets. Rare boundary and wand residuals remain explicitly documented.",
        tags: [
          "16 productive sources",
          "22 accepted targets",
          "named residuals",
        ],
      },
      {
        id: "orchestrate",
        tab: "split + recover",
        result: "V100 + RTX",
        title: "One range, two unequal GPUs",
        summary:
          "The scheduler assigns disjoint durable cells by measured biome throughput.",
        detail:
          "Workers are pinned by UUID and fingerprinted against the CUDA image and game data. Finished cells remain immutable; interrupted work returns to the queue, and finalization rejects gaps or overlaps.",
        tags: [
          "capacity-weighted",
          "433 / 433 cells",
          "checkpoint + resume",
        ],
      },
      {
        id: "publish",
        tab: "prove the result",
        result: "reproducible census",
        title: "A research artifact, not a screenshot",
        summary:
          "Canonical streams become a queryable catalog, leaderboards and hash-pinned evidence.",
        detail:
          "The complete coalmine census covers the supported seed range and preserves result provenance. A separate dual-GPU ROI12 run completed every planned cell with zero missing or invalid work.",
        tags: [
          "SQLite + leaderboard",
          "SHA-256 evidence",
          "zero missing cells",
        ],
      },
    ],
    headlines: [
      {
        label: "audited world coverage",
        value: "22 / 22",
        detail: "target biomes",
      },
      {
        label: "native workers",
        value: "2 GPUs",
        detail: "V100 + RTX 5060 Ti",
      },
      {
        label: "measured capacity*",
        value: "135.2k",
        detail: "coalmine seed/s",
      },
      {
        label: "completed census",
        value: "2.147B",
        detail: "world seeds scanned",
      },
    ],
    proof: {
      label: "dual-GPU orchestration proof",
      value: "ROI12 · 433 / 433 accepted cells",
      detail: "0 missing · 0 invalid · resumable ledger",
    },
  },
  ru: {
    kicker: "seedforge / verified GPU search",
    title: "Надёжно запустить полный поиск seed на двух GPU.",
    intro: [
      "Seed в Noita детерминированно задаёт мир. Seedforge реконструирует миллиарды таких миров на GPU, проверяет редкие объекты во всех 22 целевых биомах и сохраняет только канонические результаты, которые можно проверить и восстановить.",
      "Главная работа состояла в том, чтобы довести унаследованный CUDA pipeline до рабочего, точного и устойчивого к сбоям состояния, а затем закрыть весь мир. Profiling и kernel tuning начались только после того, как pipeline стал стабильно запускаться, его результаты совпали с CPU-версией, а поиск охватил все 22 целевых биома.",
    ],
    brief: {
      label: "project brief / 30 second read",
      summary:
        "GPU-система для полного поиска миров Noita с проверяемыми результатами и восстановлением после сбоев.",
      points: [
        {
          label: "challenge",
          text: "Унаследованный CUDA pipeline не запускался стабильно, возвращал некорректные результаты и не покрывал весь мир. Profiling и kernel tuning начались только после исправления этих проблем.",
        },
        {
          label: "built",
          text: "Сначала я восстановил CUDA pipeline, добился совпадения результатов на CPU, V100 и RTX и добавил все 22 целевых биома. Затем настроил распределение работы между двумя GPU, восстановление после сбоев и только после этого занялся kernel tuning.",
        },
        {
          label: "result",
          text: "Полный поиск проверил 2,147 млрд миров. Отдельный запуск на двух GPU обработал 433 / 433 ячеек без пропусков и ошибок.",
        },
      ],
    },
    navLabel: "Seedforge system story",
    stages: [
      {
        id: "run",
        tab: "make it run",
        result: "accepted CUDA run",
        title: "CUDA pipeline, который действительно возвращает результат",
        summary:
          "Сначала нужно было устранить ошибки сборки и runtime. Только после этого имела смысл скорость поиска.",
        detail:
          "CUDA build загружает данные Noita, проверяет выбранный GPU и передаёт структурированный прогресс и найденные результаты через надёжный native bridge. Ошибка запуска или пустой run не засчитываются как завершённая работа.",
        tags: [
          "native sm_70 + sm_120",
          "WAK identity",
          "structured hit stream",
        ],
      },
      {
        id: "prove",
        tab: "prove it",
        result: "canonical equality",
        title: "Сначала корректность, затем скорость",
        summary:
          "Результаты CPU, V100 и RTX должны сходиться к одним и тем же каноническим seed blocks.",
        detail:
          "Результаты каждого seed хранятся цельным блоком, поэтому дубликаты и порядок записей не теряются. Проверки SHA-256 и выборочный cross-check с Telescope показывают расхождения и известные остаточные случаи, а не скрывают их за одинаковым числом результатов.",
        tags: ["seed-block-v2", "CPU = GPU", "916 comparison cases"],
      },
      {
        id: "cover",
        tab: "cover the world",
        result: "22 target biomes",
        title: "Весь мир, а не одна карта",
        summary:
          "Движок реконструирует Wang worldgen и spawn hooks во всех 22 проверенных целевых биомах.",
        detail:
          "Production Path A генерирует 16 биомов, которые могут создавать сундуки, и сохраняет boundary hits ещё в шести целевых биомах без собственных источников. Редкие граничные и wand-расхождения документируются явно.",
        tags: [
          "16 productive sources",
          "22 accepted targets",
          "named residuals",
        ],
      },
      {
        id: "orchestrate",
        tab: "split + recover",
        result: "V100 + RTX",
        title: "Один диапазон, два неравных GPU",
        summary:
          "Scheduler назначает непересекающиеся ячейки работы с учётом измеренной скорости по каждому биому.",
        detail:
          "CUDA workers закреплены по UUID; перед запуском проверяется fingerprint CUDA image и игровых данных. Завершённые ячейки больше не меняются, прерванная работа возвращается в queue, а финальная проверка отклоняет пропуски и пересечения.",
        tags: [
          "capacity-weighted",
          "433 / 433 cells",
          "checkpoint + resume",
        ],
      },
      {
        id: "publish",
        tab: "prove the result",
        result: "reproducible census",
        title: "Воспроизводимый результат, а не скриншот",
        summary:
          "Канонический result stream становится каталогом для запросов, leaderboard и набором доказательств с закреплёнными хешами.",
        detail:
          "Полный поиск coalmine покрывает поддерживаемый диапазон seed и сохраняет происхождение каждого результата. Отдельный запуск ROI12 на двух GPU завершил все запланированные ячейки без пропущенной или недействительной работы.",
        tags: [
          "SQLite + leaderboard",
          "SHA-256 evidence",
          "zero missing cells",
        ],
      },
    ],
    headlines: [
      {
        label: "audited world coverage",
        value: "22 / 22",
        detail: "target biomes",
      },
      {
        label: "native workers",
        value: "2 GPUs",
        detail: "V100 + RTX 5060 Ti",
      },
      {
        label: "measured capacity*",
        value: "135.2k",
        detail: "coalmine seed/s",
      },
      {
        label: "completed census",
        value: "2.147B",
        detail: "world seeds scanned",
      },
    ],
    proof: {
      label: "dual-GPU orchestration proof",
      value: "ROI12 · 433 / 433 accepted cells",
      detail: "0 missing · 0 invalid · resumable ledger",
    },
  },
} satisfies Record<Locale, SeedforgeContent>;
