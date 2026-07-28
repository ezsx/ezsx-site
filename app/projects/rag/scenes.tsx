import type { CSSProperties } from "react";
import type { Locale } from "../../content/locales";
import type { RagStageId } from "./content";

const recallBars = [78, 54, 88, 42, 68, 91, 48, 73] as const;
const evidenceScores = [6.6, 5.2, 3.5, 2.5, 2.4, -1.8] as const;

export const ragSceneCopy = {
  en: {
    feed: "Telegram feed",
    selectedChannels: "selected channels",
    normalize: "normalize + enrich",
    naturalSplit: "natural-boundary split",
    stableIdentity: "stable identity",
    vectorViews: "three searchable views",
    denseMeaning: "semantic meaning",
    sparseTerms: "exact terms",
    colbertTokens: "token interactions",
    idempotentResult: "same message → same point",
    rerunConverges: "a rerun updates the corpus instead of duplicating it",
    userQuestion: "user question",
    question: "Who did Financial Times name person of the year in 2025?",
    queryPlan: "query plan",
    originalQuery: "original wording",
    focusedLookup: "focused lookup",
    corroboration: "corroborating context",
    reactController: "ReAct controller",
    phaseVisibility: "phase visibility",
    visibleTools: "visible now · 5 / 15",
    searchTool: "hybrid search",
    rerankTool: "evidence filter",
    composeTool: "cited context",
    routeFamily: "route family",
    routeOptions: "retrieval · analytics · navigation · refusal",
    lexicalRecall: "lexical recall",
    semanticRecall: "semantic recall",
    exactTerms: "BM25 · exact names / acronyms",
    denseMeaningLane: "dense · paraphrases / meaning",
    prefetch: "prefetch candidates",
    weightedFusion: "weighted fusion",
    lexicalPriority: "lexical signal gets 3× weight",
    lateInteraction: "late interaction",
    tokenMaxSim: "query token ↔ document token",
    diverseMerge: "subquery merge",
    mmrBalance: "relevance 0.7 · diversity 0.3",
    recoveredPool: "recovered candidate pool",
    traceHits: "28 hits in the representative trace",
    evidenceGate: "evidence gate",
    candidate: "candidate",
    ceScore: "CE score",
    outcome: "outcome",
    kept: "keep",
    rescued: "cosine rescue",
    dropped: "drop",
    nuggetCoverage: "query-nugget coverage",
    nuggetLabels: ["who", "award", "year"],
    citations: "citations",
    covered: "covered",
    coverageResult: "3 / 3 covered · 1.00",
    refinementIdle: "targeted refinement stays idle",
    refinementRule: "below 0.75 → search only uncovered nuggets",
    eventStream: "typed SSE stream",
    events: [
      "step_started",
      "tool_invoked",
      "observation",
      "citations",
      "final",
    ],
    localGeneration: "local generation",
    answerLead: "Financial Times named Jensen Huang its 2025 person of the year.",
    sourceOne: "techsparks · 2025-12-12",
    sourceTwo: "ai_ml_big_data · 2025-12-13",
    answerContract: "claim → source number → source metadata",
    computeMap: "execution boundary",
    llmNode: "V100 · Qwen 35B",
    retrievalNode: "RTX 5060 Ti · embed / rerank",
    stateNode: "Docker CPU · FastAPI / Qdrant",
  },
  ru: {
    feed: "Telegram-лента",
    selectedChannels: "выбранные каналы",
    normalize: "нормализация + enrichment",
    naturalSplit: "деление по естественным границам",
    stableIdentity: "стабильная идентичность",
    vectorViews: "три поисковых представления",
    denseMeaning: "семантический смысл",
    sparseTerms: "точные термины",
    colbertTokens: "взаимодействия токенов",
    idempotentResult: "то же сообщение → та же точка",
    rerunConverges: "повторный запуск обновляет корпус, а не дублирует его",
    userQuestion: "вопрос пользователя",
    question: "Кого Financial Times назвала человеком года в 2025?",
    queryPlan: "query plan",
    originalQuery: "исходная формулировка",
    focusedLookup: "точечный поиск",
    corroboration: "подтверждающий контекст",
    reactController: "ReAct controller",
    phaseVisibility: "видимость по фазам",
    visibleTools: "сейчас видно · 5 / 15",
    searchTool: "гибридный поиск",
    rerankTool: "фильтр доказательств",
    composeTool: "контекст с citations",
    routeFamily: "семейство маршрутов",
    routeOptions: "retrieval · analytics · navigation · refusal",
    lexicalRecall: "лексический recall",
    semanticRecall: "семантический recall",
    exactTerms: "BM25 · точные имена / акронимы",
    denseMeaningLane: "dense · перефразы / смысл",
    prefetch: "кандидатов до фильтра",
    weightedFusion: "взвешенное слияние",
    lexicalPriority: "лексический сигнал получает вес ×3",
    lateInteraction: "late interaction",
    tokenMaxSim: "токен запроса ↔ токен документа",
    diverseMerge: "слияние подзапросов",
    mmrBalance: "релевантность 0.7 · diversity 0.3",
    recoveredPool: "пул найденных кандидатов",
    traceHits: "28 hits в репрезентативной трассе",
    evidenceGate: "шлюз доказательств",
    candidate: "кандидат",
    ceScore: "CE score",
    outcome: "решение",
    kept: "оставить",
    rescued: "cosine rescue",
    dropped: "отсечь",
    nuggetCoverage: "покрытие nuggets вопроса",
    nuggetLabels: ["кто", "награда", "год"],
    citations: "citations",
    covered: "покрыто",
    coverageResult: "3 / 3 покрыто · 1.00",
    refinementIdle: "targeted refinement не запускается",
    refinementRule: "ниже 0.75 → искать только непокрытые nuggets",
    eventStream: "типизированный SSE stream",
    events: [
      "step_started",
      "tool_invoked",
      "observation",
      "citations",
      "final",
    ],
    localGeneration: "локальная генерация",
    answerLead: "Financial Times назвала Дженсена Хуанга человеком года 2025.",
    sourceOne: "techsparks · 2025-12-12",
    sourceTwo: "ai_ml_big_data · 2025-12-13",
    answerContract: "утверждение → номер → метаданные источника",
    computeMap: "граница исполнения",
    llmNode: "V100 · Qwen 35B",
    retrievalNode: "RTX 5060 Ti · embed / rerank",
    stateNode: "Docker CPU · FastAPI / Qdrant",
  },
} as const;

export type RagSceneCopy = (typeof ragSceneCopy)[Locale];

function FlowLink() {
  return (
    <i aria-hidden="true" className="rag-flow-link">
      <b />
    </i>
  );
}

function IngestScene({ copy }: { copy: RagSceneCopy }) {
  return (
    <div className="story-scene rag-scene rag-ingest-scene">
      <div className="rag-ingest-flow">
        <div className="rag-source-stack">
          <span>{copy.feed}</span>
          <strong>{copy.selectedChannels}</strong>
          <div>
            <i>@techsparks</i>
            <i>@ai_ml_big_data</i>
            <i>@data_secrets</i>
          </div>
        </div>

        <FlowLink />

        <div className="rag-transform-card">
          <span>{copy.normalize}</span>
          <strong>Telethon → chunks</strong>
          <small>{copy.naturalSplit}</small>
          <div>
            <i>≤ 1500</i>
            <i>~ 1200</i>
            <i>0 overlap</i>
          </div>
        </div>

        <FlowLink />

        <div className="rag-vector-store">
          <span>Qdrant · {copy.vectorViews}</span>
          <div>
            <strong>dense · 1024</strong>
            <small>{copy.denseMeaning}</small>
            <i aria-hidden="true" />
          </div>
          <div>
            <strong>sparse · BM25</strong>
            <small>{copy.sparseTerms}</small>
            <i aria-hidden="true" />
          </div>
          <div>
            <strong>ColBERT · 128 × token</strong>
            <small>{copy.colbertTokens}</small>
            <i aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="rag-idempotent-rail">
        <span>{copy.stableIdentity}</span>
        <strong>UUID5(channel_id : message_id : chunk)</strong>
        <small>
          {copy.idempotentResult} · {copy.rerunConverges}
        </small>
      </div>
    </div>
  );
}

function PlanScene({ copy }: { copy: RagSceneCopy }) {
  const planRows = [
    ["01", copy.originalQuery],
    ["02", copy.focusedLookup],
    ["03", copy.corroboration],
  ] as const;

  return (
    <div className="story-scene rag-scene rag-plan-scene">
      <div className="rag-query-card">
        <span>{copy.userQuestion}</span>
        <strong>{copy.question}</strong>
      </div>

      <div className="rag-plan-grid">
        <div className="rag-query-plan">
          <span>{copy.queryPlan}</span>
          {planRows.map(([index, label]) => (
            <div key={index}>
              <i>{index}</i>
              <strong>{label}</strong>
            </div>
          ))}
        </div>

        <div className="rag-agent-core">
          <span>{copy.reactController}</span>
          <strong>Qwen3.5-35B-A3B</strong>
          <small>{copy.phaseVisibility}</small>
          <i aria-hidden="true" />
        </div>

        <div className="rag-tool-window">
          <span>{copy.visibleTools}</span>
          <strong>query_plan</strong>
          <strong className="is-active">search</strong>
          <strong>rerank</strong>
          <strong>compose_context</strong>
          <strong>final_answer</strong>
        </div>
      </div>

      <div className="rag-route-strip">
        <span>{copy.routeFamily}</span>
        <strong>{copy.routeOptions}</strong>
      </div>
    </div>
  );
}

function RecallLane({
  bars,
  detail,
  label,
  value,
}: {
  bars: readonly number[];
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rag-recall-lane">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
      <div aria-hidden="true" className="rag-recall-bars">
        {bars.map((width, index) => (
          <i
            key={`${width}-${index}`}
            style={{ "--rag-bar": `${width}%` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function RetrieveScene({ copy }: { copy: RagSceneCopy }) {
  return (
    <div className="story-scene rag-scene rag-retrieve-scene">
      <div className="rag-recall-pair">
        <RecallLane
          bars={recallBars}
          detail={copy.exactTerms}
          label={copy.lexicalRecall}
          value={`100 · ${copy.prefetch}`}
        />
        <RecallLane
          bars={[...recallBars].reverse()}
          detail={copy.denseMeaningLane}
          label={copy.semanticRecall}
          value={`40 · ${copy.prefetch}`}
        />
      </div>

      <div className="rag-retrieval-pipeline">
        <div>
          <span>{copy.weightedFusion}</span>
          <strong>RRF · BM25 3 : dense 1</strong>
          <small>{copy.lexicalPriority}</small>
        </div>
        <FlowLink />
        <div className="is-colbert">
          <span>{copy.lateInteraction}</span>
          <strong>ColBERT MaxSim</strong>
          <small>{copy.tokenMaxSim}</small>
          <i aria-hidden="true">
            <b />
            <b />
            <b />
            <b />
            <b />
          </i>
        </div>
        <FlowLink />
        <div>
          <span>{copy.diverseMerge}</span>
          <strong>MMR · λ 0.7</strong>
          <small>{copy.mmrBalance}</small>
        </div>
      </div>

      <div className="rag-candidate-pool">
        <span>{copy.recoveredPool}</span>
        <div aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <i className={index < 7 ? "is-ranked" : ""} key={index} />
          ))}
        </div>
        <strong>{copy.traceHits}</strong>
      </div>
    </div>
  );
}

function GroundScene({ copy }: { copy: RagSceneCopy }) {
  return (
    <div className="story-scene rag-scene rag-ground-scene">
      <div className="rag-evidence-table">
        <div className="rag-evidence-heading">
          <span>{copy.evidenceGate}</span>
          <small>{copy.candidate}</small>
          <small>{copy.ceScore}</small>
          <small>{copy.outcome}</small>
        </div>
        {evidenceScores.map((score, index) => {
          const outcome =
            index < 4 ? copy.kept : index === 4 ? copy.rescued : copy.dropped;
          const state =
            index < 4 ? "is-kept" : index === 4 ? "is-rescued" : "is-dropped";

          return (
            <div className={state} key={score}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>doc_{["a17", "c04", "f31", "b09", "e22", "d18"][index]}</strong>
              <i>{score.toFixed(1)}</i>
              <small>{outcome}</small>
            </div>
          );
        })}
      </div>

      <div className="rag-coverage-panel">
        <span>{copy.nuggetCoverage}</span>
        <div className="rag-coverage-matrix">
          {copy.nuggetLabels.map((label, row) => (
            <div key={label}>
              <strong>{label}</strong>
              <span>
                {Array.from({ length: 5 }, (_, column) => (
                  <i
                    aria-label={column === row || column === row + 1 ? copy.covered : undefined}
                    className={column === row || column === row + 1 ? "is-covered" : ""}
                    key={column}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>
        <strong>{copy.coverageResult}</strong>
        <small>{copy.refinementIdle}</small>
        <div className="rag-refinement-rule">
          <i aria-hidden="true">↶</i>
          <span>{copy.refinementRule}</span>
        </div>
      </div>
    </div>
  );
}

function AnswerScene({ copy }: { copy: RagSceneCopy }) {
  return (
    <div className="story-scene rag-scene rag-answer-scene">
      <div className="rag-answer-main">
        <div className="rag-sse-rail">
          <span>{copy.eventStream}</span>
          <ol>
            {copy.events.map((event, index) => (
              <li className={index === copy.events.length - 1 ? "is-final" : ""} key={event}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                <strong>{event}</strong>
              </li>
            ))}
          </ol>
        </div>

        <div className="rag-answer-card">
          <span>{copy.localGeneration}</span>
          <p>
            {copy.answerLead} <sup>[1][2]</sup>
          </p>
          <div>
            <small>[1]</small>
            <strong>{copy.sourceOne}</strong>
          </div>
          <div>
            <small>[2]</small>
            <strong>{copy.sourceTwo}</strong>
          </div>
          <footer>{copy.answerContract}</footer>
        </div>
      </div>

      <div className="rag-compute-boundary">
        <span>{copy.computeMap}</span>
        <strong>{copy.llmNode}</strong>
        <strong>{copy.retrievalNode}</strong>
        <strong>{copy.stateNode}</strong>
      </div>
    </div>
  );
}

export function RagScene({
  copy,
  stage,
}: {
  copy: RagSceneCopy;
  stage: RagStageId;
}) {
  if (stage === "ingest") return <IngestScene copy={copy} />;
  if (stage === "plan") return <PlanScene copy={copy} />;
  if (stage === "retrieve") return <RetrieveScene copy={copy} />;
  if (stage === "ground") return <GroundScene copy={copy} />;
  return <AnswerScene copy={copy} />;
}
