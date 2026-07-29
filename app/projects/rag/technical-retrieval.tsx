import TechnicalDisclosure from "../../components/story/technical-disclosure";
import type { Locale } from "../../content/locales";

const traceScores = [
  ["01", "techsparks", "6.6"],
  ["02", "ai_ml_big_data", "5.2"],
  ["03", "techsparks", "3.5"],
  ["04", "data_secrets", "2.5"],
  ["05", "ai_ml_big_data", "2.4"],
] as const;

export const ragTechnicalCopy = {
  en: {
    eyebrow: "technical layer / evidence path",
    title: "Inspect one question through retrieval",
    expand: "expand retrieval",
    collapse: "collapse retrieval",
    meta: "RUN-008 trace · 3 queries · 28 hits · 5 sources",
    signalHeading: "four different jobs",
    signalMeta: "recall first · precision later",
    signals: [
      {
        name: "BM25",
        value: "≥ 100",
        detail: "recovers exact names, acronyms and rare terms",
      },
      {
        name: "dense",
        value: "≥ 40",
        detail: "recovers paraphrases and overall semantic meaning",
      },
      {
        name: "ColBERT",
        value: "128-d / token",
        detail: "finds the best document match for each query token",
      },
      {
        name: "cross-encoder",
        value: "post-search gate",
        detail: "re-sorts evidence and cuts low-relevance candidates",
      },
    ],
    traceHeading: "representative query trace",
    traceMeta: "recorded evaluation path",
    questionLabel: "question",
    question: "Кого Financial Times назвала человеком года в 2025?",
    planned: "query plan",
    plannedValue: "3 subqueries",
    searched: "hybrid search",
    searchedValue: "28 documents",
    filtered: "evidence gate",
    filteredValue: "5 documents",
    coverage: "nugget coverage",
    coverageValue: "1.00 · no refinement",
    funnelHeading: "retrieval funnel",
    funnelMeta: "minimum candidate limits",
    sparseLabel: "lexical lane",
    sparseDetail: "sparse-only query normalization",
    denseLabel: "semantic lane",
    denseDetail: "raw query · no prefix",
    fusionLabel: "native weighted RRF",
    fusionDetail: "BM25 3 : dense 1",
    colbertLabel: "late interaction",
    colbertDetail: "MaxSim over token vectors",
    mergeLabel: "multi-query merge",
    mergeDetail: "MMR-style λ 0.7 · max 30",
    diversityLabel: "source diversity",
    diversityDetail: "up to 3 results per channel and subquery",
    evidenceHeading: "surviving evidence",
    evidenceMeta: "cross-encoder logits",
    sourceLabel: "source",
    scoreLabel: "score",
    decisionLabel: "decision",
    keep: "keep",
    guard: "CE re-sort · gap + cutoff · cosine recall guard",
    release: "release contract",
    releaseValue: "5 numbered citations → local LLM → final SSE event",
    runtimeHeading: "heterogeneous runtime",
    runtimeMeta: "one system · three execution boundaries",
    llmLabel: "generation",
    llmValue: "Qwen3.5-35B-A3B · GGUF Q4_K_M",
    retrievalLabel: "retrieval models",
    retrievalValue: "embed · ColBERT · reranker",
    stateLabel: "API + state",
    stateValue: "FastAPI · Qdrant · Langfuse",
    boundaryReason:
      "The V100 runs in Windows TCC mode. GPU retrieval stays WSL2-native on the RTX 5060 Ti, while Docker remains CPU-only; explicit HTTP boundaries make that hardware constraint an ordinary service topology.",
    traceNote:
      "The trace is a recorded RUN-008 example, not live telemetry: 3 planned queries, 28 retrieved documents, 5 kept citations and 1.00 coverage.",
    metricNote:
      "Public metrics keep their denominators separate: RUN-009 has 120 reviewed questions; factual uses 105 answerable items, while evidence support uses the 65 retrieval-evidence cases.",
  },
  ru: {
    eyebrow: "технический слой / путь доказательств",
    title: "Посмотреть, как один вопрос проходит retrieval",
    expand: "развернуть retrieval",
    collapse: "свернуть retrieval",
    meta: "RUN-008 trace · 3 запроса · 28 hits · 5 источников",
    signalHeading: "четыре разные задачи",
    signalMeta: "сначала recall · затем precision",
    signals: [
      {
        name: "BM25",
        value: "≥ 100",
        detail: "возвращает точные имена, акронимы и редкие термины",
      },
      {
        name: "dense",
        value: "≥ 40",
        detail: "возвращает перефразы и общий семантический смысл",
      },
      {
        name: "ColBERT",
        value: "128-d / токен",
        detail: "ищет лучшее совпадение документа для каждого токена запроса",
      },
      {
        name: "cross-encoder",
        value: "post-search шлюз",
        detail: "пересортировывает evidence и отсекает слабых кандидатов",
      },
    ],
    traceHeading: "репрезентативная трасса запроса",
    traceMeta: "записанный evaluation path",
    questionLabel: "вопрос",
    question: "Кого Financial Times назвала человеком года в 2025?",
    planned: "query plan",
    plannedValue: "3 подзапроса",
    searched: "гибридный поиск",
    searchedValue: "28 документов",
    filtered: "шлюз доказательств",
    filteredValue: "5 документов",
    coverage: "покрытие nuggets",
    coverageValue: "1.00 · refinement не нужен",
    funnelHeading: "retrieval funnel",
    funnelMeta: "минимальные лимиты кандидатов",
    sparseLabel: "лексический путь",
    sparseDetail: "нормализация только sparse-запроса",
    denseLabel: "семантический путь",
    denseDetail: "исходный запрос · без prefix",
    fusionLabel: "native weighted RRF",
    fusionDetail: "BM25 3 : dense 1",
    colbertLabel: "late interaction",
    colbertDetail: "MaxSim по векторам токенов",
    mergeLabel: "слияние подзапросов",
    mergeDetail: "MMR-style λ 0.7 · максимум 30",
    diversityLabel: "разнообразие источников",
    diversityDetail: "до 3 результатов с канала на каждый подзапрос",
    evidenceHeading: "оставшиеся доказательства",
    evidenceMeta: "логиты cross-encoder",
    sourceLabel: "источник",
    scoreLabel: "score",
    decisionLabel: "решение",
    keep: "оставить",
    guard: "CE re-sort · gap + cutoff · cosine recall guard",
    release: "контракт выдачи",
    releaseValue: "5 нумерованных citations → локальная LLM → final SSE event",
    runtimeHeading: "гетерогенный runtime",
    runtimeMeta: "одна система · три границы исполнения",
    llmLabel: "генерация",
    llmValue: "Qwen3.5-35B-A3B · GGUF Q4_K_M",
    retrievalLabel: "retrieval-модели",
    retrievalValue: "embed · ColBERT · reranker",
    stateLabel: "API + состояние",
    stateValue: "FastAPI · Qdrant · Langfuse",
    boundaryReason:
      "V100 работает в Windows TCC mode. Retrieval на GPU остаётся WSL2-native на RTX 5060 Ti, а Docker - CPU-only; явные HTTP-границы превращают это аппаратное ограничение в обычную сервисную топологию.",
    traceNote:
      "Трасса - записанный пример RUN-008, а не live telemetry: 3 запланированных запроса, 28 найденных документов, 5 оставленных citations и coverage 1.00.",
    metricNote:
      "Публичные метрики сохраняют разные denominators: в RUN-009 - 120 проверенных вопросов; factual рассчитан по 105 answerable, evidence support - по 65 retrieval-evidence кейсам.",
  },
} as const;

export type RagTechnicalCopy = (typeof ragTechnicalCopy)[Locale];

export default function RagTechnicalRetrieval({
  text,
}: {
  text: RagTechnicalCopy;
}) {
  return (
    <>
      <TechnicalDisclosure
        bodyClassName="rag-technical-body"
        className="rag-technical"
        eyebrow={text.eyebrow}
        labels={{ expand: text.expand, collapse: text.collapse }}
        meta={text.meta}
        title={text.title}
      >
        <section
          className="rag-signal-guide"
          aria-labelledby="rag-signal-title"
        >
          <div className="technical-section-heading">
            <span id="rag-signal-title">{text.signalHeading}</span>
            <strong>{text.signalMeta}</strong>
          </div>
          <div className="rag-signal-grid">
            {text.signals.map((signal, index) => (
              <div key={signal.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{signal.name}</strong>
                <b>{signal.value}</b>
                <small>{signal.detail}</small>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rag-trace-overview"
          aria-labelledby="rag-trace-overview-title"
        >
          <div className="technical-section-heading">
            <span id="rag-trace-overview-title">{text.traceHeading}</span>
            <strong>{text.traceMeta}</strong>
          </div>

          <div className="rag-trace-question">
            <span>{text.questionLabel}</span>
            <strong>{text.question}</strong>
          </div>

          <ol className="rag-trace-stats">
            <li>
              <span>01</span>
              <strong>{text.planned}</strong>
              <small>{text.plannedValue}</small>
            </li>
            <li>
              <span>02</span>
              <strong>{text.searched}</strong>
              <small>{text.searchedValue}</small>
            </li>
            <li>
              <span>03</span>
              <strong>{text.filtered}</strong>
              <small>{text.filteredValue}</small>
            </li>
            <li>
              <span>04</span>
              <strong>{text.coverage}</strong>
              <small>{text.coverageValue}</small>
            </li>
          </ol>
        </section>

        <section
          className="rag-funnel-map"
          aria-labelledby="rag-funnel-title"
        >
          <div className="technical-section-heading">
            <span id="rag-funnel-title">{text.funnelHeading}</span>
            <strong>{text.funnelMeta}</strong>
          </div>

          <div className="rag-funnel-inputs">
            <div>
              <span>{text.sparseLabel}</span>
              <strong>BM25 · ≥ 100</strong>
              <small>{text.sparseDetail}</small>
            </div>
            <div>
              <span>{text.denseLabel}</span>
              <strong>dense · ≥ 40</strong>
              <small>{text.denseDetail}</small>
            </div>
          </div>

          <div className="rag-funnel-spine">
            <i aria-hidden="true" />
            <div>
              <span>{text.fusionLabel}</span>
              <strong>RRF · 3 : 1 · ≥ 50</strong>
              <small>{text.fusionDetail}</small>
            </div>
            <i aria-hidden="true" />
            <div className="is-accented">
              <span>{text.colbertLabel}</span>
              <strong>ColBERT · 128-d</strong>
              <small>{text.colbertDetail}</small>
            </div>
            <i aria-hidden="true" />
            <div>
              <span>{text.mergeLabel}</span>
              <strong>MMR · λ 0.7</strong>
              <small>{text.mergeDetail}</small>
            </div>
          </div>

          <div className="rag-diversity-rule">
            <span>{text.diversityLabel}</span>
            <strong>{text.diversityDetail}</strong>
          </div>
        </section>

        <section
          className="rag-trace-evidence"
          aria-labelledby="rag-evidence-title"
        >
          <div className="technical-section-heading">
            <span id="rag-evidence-title">{text.evidenceHeading}</span>
            <strong>{text.evidenceMeta}</strong>
          </div>

          <div className="rag-technical-table">
            <div>
              <span>#</span>
              <span>{text.sourceLabel}</span>
              <span>{text.scoreLabel}</span>
              <span>{text.decisionLabel}</span>
            </div>
            {traceScores.map(([index, source, score]) => (
              <div key={index}>
                <span>{index}</span>
                <strong>{source}</strong>
                <b>{score}</b>
                <small>{text.keep}</small>
              </div>
            ))}
          </div>

          <div className="rag-guard-rule">
            <span>{text.guard}</span>
          </div>

          <div className="rag-release-contract">
            <span>{text.release}</span>
            <strong>{text.releaseValue}</strong>
          </div>
        </section>

        <section
          className="rag-runtime-boundary"
          aria-labelledby="rag-runtime-title"
        >
          <div className="technical-section-heading">
            <span id="rag-runtime-title">{text.runtimeHeading}</span>
            <strong>{text.runtimeMeta}</strong>
          </div>

          <div className="rag-runtime-nodes">
            <div>
              <span>Windows host · V100 32GB</span>
              <strong>{text.llmLabel}</strong>
              <small>{text.llmValue}</small>
            </div>
            <i aria-hidden="true">HTTP</i>
            <div className="is-accented">
              <span>WSL2 native · RTX 5060 Ti</span>
              <strong>{text.retrievalLabel}</strong>
              <small>{text.retrievalValue}</small>
            </div>
            <i aria-hidden="true">HTTP</i>
            <div>
              <span>Docker · CPU only</span>
              <strong>{text.stateLabel}</strong>
              <small>{text.stateValue}</small>
            </div>
          </div>

          <p>{text.boundaryReason}</p>
        </section>

        <div className="story-notes rag-notes">
          <p>{text.traceNote}</p>
          <p>{text.metricNote}</p>
        </div>
      </TechnicalDisclosure>
    </>
  );
}
