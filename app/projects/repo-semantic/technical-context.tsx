import TechnicalDisclosure from "../../components/story/technical-disclosure";
import type { Locale } from "../../content/locales";

export const repoSemanticTechnicalCopy = {
  en: {
    eyebrow: "technical layer / context contract",
    title: "Inspect one repository-context request",
    expand: "expand context path",
    collapse: "collapse context path",
    meta: "1 repo · hybrid seeds · bounded graph · exact verification",
    requestHeading: "request + readiness gate",
    requestMeta: "read state before retrieval",
    questionLabel: "agent question",
    question:
      "Where is start_watcher recovery decided after a branch switch?",
    requestParams: [
      "repo_root · explicit",
      "route · hybrid",
      "graph · expand",
      "rerank · auto",
      "top_k · 8",
    ],
    statusLabel: "compact readiness",
    statusRows: [
      ["repository", "repo-semantic-mcp", "target verified"],
      ["search", "usable", "index contract matches"],
      ["watcher", "running", "incremental freshness"],
      ["graph", "effective", "expansion allowed"],
    ],
    lifecycleNote:
      "If this gate reports recovery or a hard contract mismatch, retrieval explains the state; it does not silently rebuild the index or graph.",
    pipelineHeading: "two-level ranking path",
    pipelineMeta: "rank fusion first · bounded reorder second",
    signals: [
      {
        index: "01",
        name: "dense",
        value: "weight 0.8",
        detail: "raw question · paraphrases and intent",
      },
      {
        index: "02",
        name: "sparse",
        value: "weight 1.4",
        detail: "code-normalized terms · exact anchor retained",
      },
      {
        index: "03",
        name: "graph",
        value: "weight 0.5",
        detail: "explicit expand · typed neighbors from strong seeds",
      },
      {
        index: "04",
        name: "rerank",
        value: "top 80",
        detail: "optional code-aware reorder · candidates survive failure",
      },
    ],
    fusionLabel: "fusion contract",
    fusionValue: "weighted RRF · k = 60",
    fusionDetail:
      "dense + sparse fuse first; that ranked slate and graph fuse again - raw scores are never treated as one scale",
    pinnedLabel: "exact-evidence guard",
    pinnedValue: "up to 5 exact hits pinned",
    pinnedDetail: "500 ms stage deadline · 400 ms HTTP timeout",
    exactLabel: "live-tree verification",
    exactValue: "rg --fixed-strings --line-number start_watcher .",
    slateHeading: "representative context slate",
    slateMeta: "implemented paths · schematic order, not live telemetry",
    slateColumns: ["#", "file / range", "origin", "why it matters"],
    slateRows: [
      [
        "01",
        "status/index_status.py · L196-301",
        "D · S",
        "watcher state and recovery actions",
      ],
      [
        "02",
        "status/summary.py · L319-477",
        "D · S · G",
        "compact state and next-action policy",
      ],
      [
        "03",
        "watcher.py · L71-185",
        "D · G",
        "runtime watcher and event batching",
      ],
      [
        "04",
        "indexer.py · L265-458",
        "S · G",
        "bounded startup reconcile",
      ],
      [
        "05",
        "P6.C readiness spec",
        "D · G",
        "agent-facing readiness contract",
      ],
    ],
    branchLegend: "D dense · S sparse · G graph",
    envelopeHeading: "response envelope",
    envelopeMeta: "evidence with gaps and actions",
    envelopeFields: [
      ["file_groups", "paths · chunk ids · line ranges"],
      ["matched_terms", "start_watcher · branch switch · recovery"],
      ["uncovered_terms", "catch-up timeout"],
      ["evidence_paths", "typed structural steps"],
      ["verification", "required · exact anchor detected"],
    ],
    actionsLabel: "recommended next actions",
    actions: [
      ["01", "read_file_range", "read the ranked implementation ranges"],
      ["02", "run_local_rg", "verify the identifier in the live tree"],
      ["03", "retry_with_path_filter", "narrow only if the slate is broad"],
    ],
    runtimeHeading: "multi-repository runtime",
    runtimeMeta: "shared substrate · isolated repository state",
    sharedLabel: "process-wide",
    sharedValue: "registry · embedding provider · Qdrant client",
    sharedDetail: "one MCP / HTTP service",
    repoLabel: "per repository",
    repoValue: "indexer · manifest · watcher · graph maintenance",
    repoDetail: "independent lifecycle and leases",
    capacityLabel: "pool bound",
    capacityValue: "10 live repositories",
    capacityDetail: "explicit target or active default",
    boundaryTitle: "retrieval substrate, not a hidden planner",
    boundaryDetail:
      "The service returns grounded candidates and diagnostics. The coding agent still reads source, verifies exact literals, forms the change plan and owns the edit.",
    traceNote:
      "The request above is a representative schematic assembled from implemented contracts, not a recorded query or live telemetry. Graph expansion is optional and compatibility-auto is disabled by default.",
    metricNote:
      "Scale counts come from the dated May 7 private-repository checkpoint. Retrieval metrics come from a frozen 24-task self-repository, file-localization artifact with no line-range labels - not a neutral public benchmark; exact identifiers still require local rg.",
  },
  ru: {
    eyebrow: "технический слой / контракт контекста",
    title: "Посмотреть путь одного repository-context запроса",
    expand: "развернуть путь контекста",
    collapse: "свернуть путь контекста",
    meta: "1 repo · hybrid seeds · bounded graph · exact verification",
    requestHeading: "запрос + readiness gate",
    requestMeta: "сначала прочитать состояние",
    questionLabel: "вопрос агента",
    question:
      "Где решается recovery для start_watcher после смены ветки?",
    requestParams: [
      "repo_root · явно",
      "route · hybrid",
      "graph · expand",
      "rerank · auto",
      "top_k · 8",
    ],
    statusLabel: "компактная готовность",
    statusRows: [
      ["репозиторий", "repo-semantic-mcp", "target подтверждён"],
      ["search", "доступен", "index contract совпадает"],
      ["watcher", "работает", "incremental freshness"],
      ["graph", "доступен", "expansion разрешён"],
    ],
    lifecycleNote:
      "Если gate сообщает recovery или hard contract mismatch, retrieval объясняет состояние, но не перестраивает индекс или graph скрыто.",
    pipelineHeading: "двухуровневое ранжирование",
    pipelineMeta: "сначала rank fusion · затем bounded reorder",
    signals: [
      {
        index: "01",
        name: "dense",
        value: "вес 0.8",
        detail: "исходный вопрос · перефразы и intent",
      },
      {
        index: "02",
        name: "sparse",
        value: "вес 1.4",
        detail: "code-normalized terms · exact anchor сохранён",
      },
      {
        index: "03",
        name: "graph",
        value: "вес 0.5",
        detail: "explicit expand · typed neighbors сильных seeds",
      },
      {
        index: "04",
        name: "rerank",
        value: "top 80",
        detail: "опциональный code-aware reorder · кандидаты не теряются",
      },
    ],
    fusionLabel: "контракт fusion",
    fusionValue: "weighted RRF · k = 60",
    fusionDetail:
      "сначала сливаются dense + sparse, затем их slate и graph; raw scores не считаются одной шкалой",
    pinnedLabel: "guard точных доказательств",
    pinnedValue: "до 5 exact hits закреплены",
    pinnedDetail: "deadline стадии 500 мс · HTTP timeout 400 мс",
    exactLabel: "проверка живого tree",
    exactValue: "rg --fixed-strings --line-number start_watcher .",
    slateHeading: "репрезентативный context slate",
    slateMeta: "реальные пути · схематичный порядок, не live telemetry",
    slateColumns: ["#", "файл / range", "origin", "зачем нужен"],
    slateRows: [
      [
        "01",
        "status/index_status.py · L196-301",
        "D · S",
        "состояние watcher и recovery actions",
      ],
      [
        "02",
        "status/summary.py · L319-477",
        "D · S · G",
        "компактное состояние и policy действий",
      ],
      [
        "03",
        "watcher.py · L71-185",
        "D · G",
        "runtime watcher и batching событий",
      ],
      [
        "04",
        "indexer.py · L265-458",
        "S · G",
        "ограниченный startup reconcile",
      ],
      [
        "05",
        "P6.C readiness spec",
        "D · G",
        "agent-facing readiness contract",
      ],
    ],
    branchLegend: "D dense · S sparse · G graph",
    envelopeHeading: "response envelope",
    envelopeMeta: "evidence вместе с gaps и actions",
    envelopeFields: [
      ["file_groups", "paths · chunk ids · диапазоны строк"],
      ["matched_terms", "start_watcher · смена ветки · recovery"],
      ["uncovered_terms", "catch-up timeout"],
      ["evidence_paths", "типизированные структурные шаги"],
      ["verification", "required · обнаружен exact anchor"],
    ],
    actionsLabel: "рекомендуемые следующие действия",
    actions: [
      ["01", "read_file_range", "прочитать ranges реализации"],
      ["02", "run_local_rg", "проверить identifier в живом tree"],
      ["03", "retry_with_path_filter", "сузить выдачу, только если она широка"],
    ],
    runtimeHeading: "multi-repository runtime",
    runtimeMeta: "общий substrate · изолированное состояние repo",
    sharedLabel: "на весь процесс",
    sharedValue: "registry · embedding provider · Qdrant client",
    sharedDetail: "один MCP / HTTP service",
    repoLabel: "на репозиторий",
    repoValue: "indexer · manifest · watcher · graph maintenance",
    repoDetail: "независимые lifecycle и leases",
    capacityLabel: "граница пула",
    capacityValue: "10 live-репозиториев",
    capacityDetail: "явный target или active default",
    boundaryTitle: "retrieval substrate, а не скрытый planner",
    boundaryDetail:
      "Сервис возвращает grounded candidates и diagnostics. Coding-агент сам читает source, проверяет exact literals, строит план изменения и отвечает за edit.",
    traceNote:
      "Запрос выше - репрезентативная схема из реализованных contracts, а не записанный query или live telemetry. Graph expansion опционален, а compatibility-auto по умолчанию отключён.",
    metricNote:
      "Масштаб взят из датированного 7 мая checkpoint private-репозитория. Retrieval-метрики - из зафиксированного self-repo artifact на 24 file-localization задачах без line-range labels, а не из нейтрального public benchmark; exact identifiers всё равно проверяются локальным rg.",
  },
} as const;

export type RepoSemanticTechnicalCopy =
  (typeof repoSemanticTechnicalCopy)[Locale];

export default function RepoSemanticTechnicalContext({
  text,
}: {
  text: RepoSemanticTechnicalCopy;
}) {
  return (
    <>
      <TechnicalDisclosure
        bodyClassName="repo-semantic-technical-body"
        className="repo-semantic-technical"
        eyebrow={text.eyebrow}
        labels={{ expand: text.expand, collapse: text.collapse }}
        meta={text.meta}
        title={text.title}
      >
        <section
          className="repo-technical-request"
          aria-labelledby="repo-technical-request-title"
        >
          <div className="technical-section-heading">
            <span id="repo-technical-request-title">
              {text.requestHeading}
            </span>
            <strong>{text.requestMeta}</strong>
          </div>

          <div className="repo-request-layout">
            <div>
              <span>{text.questionLabel}</span>
              <strong>{text.question}</strong>
              <ul>
                {text.requestParams.map((parameter) => (
                  <li key={parameter}>{parameter}</li>
                ))}
              </ul>
            </div>

            <div className="repo-status-ledger">
              <span>{text.statusLabel}</span>
              {text.statusRows.map(([label, value, detail]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{detail}</small>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          <p className="repo-lifecycle-note">{text.lifecycleNote}</p>
        </section>

        <section
          className="repo-technical-pipeline"
          aria-labelledby="repo-technical-pipeline-title"
        >
          <div className="technical-section-heading">
            <span id="repo-technical-pipeline-title">
              {text.pipelineHeading}
            </span>
            <strong>{text.pipelineMeta}</strong>
          </div>

          <div className="repo-signal-stack">
            {text.signals.map((signal) => (
              <div key={signal.index}>
                <span>{signal.index}</span>
                <strong>{signal.name}</strong>
                <b>{signal.value}</b>
                <small>{signal.detail}</small>
              </div>
            ))}
          </div>

          <div className="repo-fusion-contract">
            <div>
              <span>{text.fusionLabel}</span>
              <strong>{text.fusionValue}</strong>
              <small>{text.fusionDetail}</small>
            </div>
            <div>
              <span>{text.pinnedLabel}</span>
              <strong>{text.pinnedValue}</strong>
              <small>{text.pinnedDetail}</small>
            </div>
          </div>

          <div className="repo-exact-contract">
            <span>{text.exactLabel}</span>
            <strong>{text.exactValue}</strong>
          </div>
        </section>

        <section
          className="repo-technical-slate"
          aria-labelledby="repo-technical-slate-title"
        >
          <div className="technical-section-heading">
            <span id="repo-technical-slate-title">
              {text.slateHeading}
            </span>
            <strong>{text.slateMeta}</strong>
          </div>

          <div className="repo-slate-table">
            <div>
              {text.slateColumns.map((column) => (
                <span key={column}>{column}</span>
              ))}
            </div>
            {text.slateRows.map(([rank, path, origin, reason]) => (
              <div key={rank}>
                <span>{rank}</span>
                <strong>{path}</strong>
                <b>{origin}</b>
                <small>{reason}</small>
              </div>
            ))}
          </div>

          <p className="repo-branch-legend">{text.branchLegend}</p>
        </section>

        <section
          className="repo-technical-envelope"
          aria-labelledby="repo-technical-envelope-title"
        >
          <div className="technical-section-heading">
            <span id="repo-technical-envelope-title">
              {text.envelopeHeading}
            </span>
            <strong>{text.envelopeMeta}</strong>
          </div>

          <dl className="repo-envelope-fields">
            {text.envelopeFields.map(([field, value]) => (
              <div key={field}>
                <dt>{field}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="repo-action-list">
            <span>{text.actionsLabel}</span>
            {text.actions.map(([index, action, detail]) => (
              <div key={index}>
                <i>{index}</i>
                <strong>{action}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
        </section>

        <section
          className="repo-technical-runtime"
          aria-labelledby="repo-technical-runtime-title"
        >
          <div className="technical-section-heading">
            <span id="repo-technical-runtime-title">
              {text.runtimeHeading}
            </span>
            <strong>{text.runtimeMeta}</strong>
          </div>

          <div className="repo-runtime-contract">
            <div>
              <span>{text.sharedLabel}</span>
              <strong>{text.sharedValue}</strong>
              <small>{text.sharedDetail}</small>
            </div>
            <i aria-hidden="true">1 : N</i>
            <div className="is-accented">
              <span>{text.repoLabel}</span>
              <strong>{text.repoValue}</strong>
              <small>{text.repoDetail}</small>
            </div>
            <i aria-hidden="true">≤ 10</i>
            <div>
              <span>{text.capacityLabel}</span>
              <strong>{text.capacityValue}</strong>
              <small>{text.capacityDetail}</small>
            </div>
          </div>

          <div className="repo-product-boundary">
            <strong>{text.boundaryTitle}</strong>
            <p>{text.boundaryDetail}</p>
          </div>
        </section>

        <div className="story-notes repo-semantic-notes">
          <p>{text.traceNote}</p>
          <p>{text.metricNote}</p>
        </div>
      </TechnicalDisclosure>
    </>
  );
}
