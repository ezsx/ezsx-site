import type {
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
  navLabel: string;
  stages: StoryStageSequence<typeof seedforgeStageOrder>;
  headlines: readonly StoryHeadline[];
  proof: StoryProof;
}>;

export const seedforgeContent = {
  en: {
    kicker: "seedforge / verified GPU search",
    title:
      "From an upstream CUDA engine to a reliable two-GPU research system.",
    intro: [
      "A Noita seed deterministically defines a world. Seedforge reconstructs billions of those worlds on GPU, checks 22 target biomes for rare objects, and keeps only canonical, recoverable results.",
      "The central work was making the inherited path operational, accurate, complete and crash-safe. Kernel profiling and tuning came after that foundation worked end to end.",
    ],
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
    kicker: "seedforge / проверенный GPU-поиск",
    title:
      "От исходного CUDA-движка — к надёжной исследовательской системе на двух GPU.",
    intro: [
      "Seed в Noita детерминированно задаёт мир. Seedforge реконструирует миллиарды таких миров на GPU, проверяет 22 целевых биома на редкие объекты и сохраняет только канонические, восстанавливаемые результаты.",
      "Главная работа состояла в том, чтобы сделать унаследованный путь рабочим, точным, полным и устойчивым к сбоям. Профилирование и настройка ядра начались уже после того, как вся система заработала целиком.",
    ],
    navLabel: "История системы Seedforge",
    stages: [
      {
        id: "run",
        tab: "запустить",
        result: "рабочий CUDA-запуск",
        title: "CUDA-путь, который выдаёт результат",
        summary:
          "Сначала нужно было устранить ошибки сборки и выполнения — только потом имела смысл скорость поиска.",
        detail:
          "Нативные CUDA-сборки загружают данные Noita, проверяют выбранное устройство и передают структурированный прогресс и найденные результаты через укреплённый bridge. Неудачный запуск или пустой прогон не засчитывается как выполненная работа.",
        tags: [
          "нативные sm_70 + sm_120",
          "идентичность WAK",
          "структурированный поток результатов",
        ],
      },
      {
        id: "prove",
        tab: "доказать точность",
        result: "каноническое равенство",
        title: "Сначала корректность, затем скорость",
        summary:
          "Результаты CPU, V100 и RTX должны сходиться к одним и тем же каноническим блокам seed.",
        detail:
          "Цельные блоки для каждого seed сохраняют дубликаты и порядок записей. Проверки SHA-256 и выборочные сравнения с Telescope делают расхождения и известные остаточные случаи видимыми, а не скрывают их за одинаковым количеством результатов.",
        tags: ["seed-block-v2", "CPU = GPU", "916 сравнительных случаев"],
      },
      {
        id: "cover",
        tab: "охватить мир",
        result: "22 целевых биома",
        title: "Весь мир, а не одна карта",
        summary:
          "Движок реконструирует Wang worldgen и spawn hooks во всех 22 проверенных целевых биомах.",
        detail:
          "Production Path A генерирует 16 биомов, способных создавать сундуки, и сохраняет граничные попадания ещё в шести целях без собственных источников. Редкие граничные и wand-расхождения документируются явно.",
        tags: [
          "16 продуктивных источников",
          "22 принятые цели",
          "именованные расхождения",
        ],
      },
      {
        id: "orchestrate",
        tab: "разделить + восстановить",
        result: "V100 + RTX",
        title: "Один диапазон, два неравных GPU",
        summary:
          "Планировщик назначает непересекающиеся устойчивые ячейки по измеренной пропускной способности каждого биома.",
        detail:
          "Воркеры закреплены по UUID и сверяются по отпечатку CUDA-образа и игровых данных. Завершённые ячейки неизменяемы, прерванная работа возвращается в очередь, а финализация отклоняет пропуски и пересечения.",
        tags: [
          "взвешивание по мощности",
          "433 / 433 ячейки",
          "checkpoint + resume",
        ],
      },
      {
        id: "publish",
        tab: "зафиксировать результат",
        result: "воспроизводимая перепись",
        title: "Исследовательский артефакт, а не скриншот",
        summary:
          "Канонические потоки превращаются в запрашиваемый каталог, рейтинги и доказательства, закреплённые хешами.",
        detail:
          "Полная перепись coalmine покрывает поддерживаемый диапазон seed и сохраняет происхождение результатов. Отдельный запуск ROI12 на двух GPU завершил каждую запланированную ячейку без пропущенной или недействительной работы.",
        tags: [
          "SQLite + leaderboard",
          "доказательства SHA-256",
          "ноль пропущенных ячеек",
        ],
      },
    ],
    headlines: [
      {
        label: "проверенное покрытие мира",
        value: "22 / 22",
        detail: "целевых биома",
      },
      {
        label: "нативные воркеры",
        value: "2 GPU",
        detail: "V100 + RTX 5060 Ti",
      },
      {
        label: "измеренная мощность*",
        value: "135.2k",
        detail: "coalmine seed/с",
      },
      {
        label: "завершённая перепись",
        value: "2.147B",
        detail: "проверенных миров",
      },
    ],
    proof: {
      label: "доказательство оркестрации двух GPU",
      value: "ROI12 · 433 / 433 принятых ячейки",
      detail: "0 пропусков · 0 ошибок · восстанавливаемый реестр",
    },
  },
} satisfies Record<Locale, SeedforgeContent>;
