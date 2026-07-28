import type { Locale } from "../../content/locales";

export type CudaPipelineId = "alu" | "fma" | "lsu" | "cbu" | "xu" | "fp64";

export type CudaTracePhaseId =
  | "dispatch"
  | "precheck"
  | "wang"
  | "path"
  | "hooks"
  | "objects"
  | "filter"
  | "commit";

export type CudaTracePhase = {
  id: CudaTracePhaseId;
  number: string;
  axis: string;
  status: string;
  summary: string;
  pipelines: CudaPipelineId[];
};

export const CUDA_TRACE_PHASES: CudaTracePhase[] = [
  {
    id: "dispatch",
    number: "01",
    axis: "span × 8",
    status: "dispatching 64-thread blocks",
    summary: "each CUDA thread receives a short seed span",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "precheck",
    number: "02",
    axis: "optional precheck",
    status: "running configured cheap gates",
    summary: "reject or bypass before world reconstruction",
    pipelines: ["alu", "fma", "cbu", "fp64"],
  },
  {
    id: "wang",
    number: "03",
    axis: "Wang layout",
    status: "building compact tile indices",
    summary: "PRNG, Wang layout and path-bit inputs",
    pipelines: ["alu", "fma", "lsu", "xu", "fp64"],
  },
  {
    id: "path",
    number: "04",
    axis: "path + retry",
    status: "walking sparse traversability paths",
    summary: "bitmap predicates, DFS, visited state and retry",
    pipelines: ["alu", "lsu", "cbu", "xu"],
  },
  {
    id: "hooks",
    number: "05",
    axis: "spawn hooks",
    status: "scanning baked Wang spawn hooks",
    summary: "bounds, room, color, biome and chunk gates",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "objects",
    number: "06",
    axis: "pixel-scene",
    status: "resolving scene and object candidates",
    summary: "descriptor selection and nested spawn indexing",
    pipelines: ["alu", "fma", "lsu", "fp64"],
  },
  {
    id: "filter",
    number: "07",
    axis: "hit filter",
    status: "feeding the incremental filter",
    summary: "match counters accept only requested records",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "commit",
    number: "08",
    axis: "binary hit",
    status: "returning the accepted payload",
    summary: "GPU result first; canonical evidence is host-side",
    pipelines: ["alu", "lsu"],
  },
];

export const CUDA_TRACE_PHASES_RU: CudaTracePhase[] = [
  {
    id: "dispatch",
    number: "01",
    axis: "span × 8",
    status: "запуск блоков по 64 потока",
    summary: "каждый CUDA-поток получает короткий диапазон seed",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "precheck",
    number: "02",
    axis: "необязательная проверка",
    status: "выполнение настроенных дешёвых фильтров",
    summary: "отклонение или пропуск до реконструкции мира",
    pipelines: ["alu", "fma", "cbu", "fp64"],
  },
  {
    id: "wang",
    number: "03",
    axis: "раскладка Wang",
    status: "построение компактных индексов тайлов",
    summary: "PRNG, раскладка Wang и входы path-bit",
    pipelines: ["alu", "fma", "lsu", "xu", "fp64"],
  },
  {
    id: "path",
    number: "04",
    axis: "путь + повтор",
    status: "обход разреженных путей проходимости",
    summary: "bitmap-предикаты, DFS, visited state и retry",
    pipelines: ["alu", "lsu", "cbu", "xu"],
  },
  {
    id: "hooks",
    number: "05",
    axis: "spawn hooks",
    status: "сканирование встроенных Wang spawn hooks",
    summary: "границы, комната, цвет, биом и chunk gates",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "objects",
    number: "06",
    axis: "pixel-scene",
    status: "разрешение кандидатов сцен и объектов",
    summary: "выбор descriptor и вложенная индексация spawn",
    pipelines: ["alu", "fma", "lsu", "fp64"],
  },
  {
    id: "filter",
    number: "07",
    axis: "фильтр результатов",
    status: "передача в инкрементальный фильтр",
    summary: "счётчики совпадений принимают только нужные записи",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "commit",
    number: "08",
    axis: "бинарный результат",
    status: "возврат принятого payload",
    summary: "сначала результат GPU; каноническое доказательство — на host",
    pipelines: ["alu", "lsu"],
  },
];

const cudaTracePhases = {
  en: CUDA_TRACE_PHASES,
  ru: CUDA_TRACE_PHASES_RU,
} satisfies Record<Locale, readonly CudaTracePhase[]>;

export function getCudaTracePhases(locale: Locale) {
  return cudaTracePhases[locale];
}

export const cudaTraceCopy = {
  en: {
    eyebrow: "execution trace / final P7 schematic",
    title: "One warp through the search",
    next: "next stage",
    replay: "replay trace",
    resume: "resume trace",
    pause: "pause trace",
    stages: "CUDA search stages",
    canvas:
      "Representative 32-lane CUDA warp trace: dispatch, optional precheck, Wang layout, bitmap path traversal and retry, spawn hooks, pixel-scene and object selection, incremental hit filtering, then a binary result returned to the host",
    legend: "Execution trace legend",
    seed: "seed span",
    reject: "configured reject",
    lane: "active lane",
    hit: "accepted binary hit",
    evidence: "release evidence / host side",
    release: "binary payload → canonical bytes → CPU = V100 = RTX",
    caveat:
      "Sequence, lane masks, SM cohort and duration are schematic—not stage-time or per-SM telemetry. Static prechecks are configuration dependent; the profiled default coalmine command bypassed them. The 3.08-lane and pipeline counters are P6 diagnostic context, while this trace follows the final P7 search shape.",
  },
  ru: {
    eyebrow: "трасса выполнения / схема финального P7",
    title: "Один warp проходит весь поиск",
    next: "следующий этап",
    replay: "повторить трассу",
    resume: "продолжить трассу",
    pause: "остановить трассу",
    stages: "Этапы CUDA-поиска",
    canvas:
      "Репрезентативная трасса 32-lane CUDA warp: запуск, необязательная предварительная проверка, раскладка Wang, обход bitmap-пути и retry, spawn hooks, выбор pixel-scene и объектов, инкрементальная фильтрация, затем возврат бинарного результата на host",
    legend: "Легенда трассы выполнения",
    seed: "диапазон seed",
    reject: "настроенное отклонение",
    lane: "активный lane",
    hit: "принятый бинарный результат",
    evidence: "доказательство релиза / host side",
    release: "бинарный payload → канонические байты → CPU = V100 = RTX",
    caveat:
      "Последовательность, маски lane, группа SM и длительность показаны схематично — это не время стадий и не телеметрия отдельных SM. Статические предварительные проверки зависят от конфигурации; профилированная команда coalmine по умолчанию их обходила. Значение 3,08 lane и счётчики конвейеров относятся к диагностическому P6, а эта трасса повторяет форму финального поиска P7.",
  },
} as const;

export type CudaTraceCopy = (typeof cudaTraceCopy)[Locale];
