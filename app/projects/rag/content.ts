import type {
  StoryHeadline,
  StoryProof,
  StoryStageSequence,
} from "../../components/story/story-types";
import type { Locale } from "../../content/locales";

export const ragStageOrder = [
  "ingest",
  "plan",
  "retrieve",
  "ground",
  "answer",
] as const;

export type RagStageId = (typeof ragStageOrder)[number];

export type RagContent = Readonly<{
  kicker: string;
  title: string;
  intro: readonly [string, string];
  navLabel: string;
  stages: StoryStageSequence<typeof ragStageOrder>;
  headlines: readonly StoryHeadline[];
  proof: StoryProof;
}>;

export const ragContent = {
  en: {
    kicker: "rag_app / self-hosted evidence system",
    title: "Answer questions over Telegram with evidence you can inspect.",
    intro: [
      "This is not a vector-database wrapper. The system maintains a changing corpus, plans each question, combines lexical and semantic recall, checks whether the evidence is sufficient, and only then writes a cited answer.",
      "The full path is self-hosted across Windows, WSL2 and Docker: Qwen on a V100, embedding and reranking on an RTX 5060 Ti, and FastAPI plus Qdrant on CPU.",
    ],
    navLabel: "RAG evidence system story",
    stages: [
      {
        id: "ingest",
        tab: "build evidence",
        result: "stable searchable posts",
        title: "Turn a noisy feed into durable evidence",
        summary:
          "Telegram messages become repeatable Qdrant points with searchable text, metadata and three complementary vector views.",
        detail:
          "Telethon reads the selected channels. Short posts stay whole; long posts are split on natural boundaries. Dense, sparse BM25 and ColBERT vectors are encoded before a deterministic UUID5 upsert, so a rerun converges instead of duplicating the corpus.",
        tags: ["36 channels", "UUID5 upsert", "dense + sparse + ColBERT"],
      },
      {
        id: "plan",
        tab: "understand the ask",
        result: "plan + bounded tools",
        title: "Route the question before searching",
        summary:
          "The agent decides whether the request needs retrieval, analytics, navigation or a safe refusal.",
        detail:
          "A query plan keeps the original wording and adds focused subqueries in the user’s language. The ReAct loop sees at most five phase-relevant tools out of fifteen; forced search prevents an unsupported answer when no valid short-circuit applies.",
        tags: ["native function calling", "5 / 15 tools visible", "forced search"],
      },
      {
        id: "retrieve",
        tab: "recover candidates",
        result: "multi-signal recall",
        title: "Let different search signals disagree",
        summary:
          "Exact terms, semantic meaning and token-level matches each get a chance to recover the source.",
        detail:
          "Each subquery starts with 100 BM25 and 40 dense candidates. Weighted RRF favours the lexical lane 3:1, ColBERT applies late-interaction MaxSim, and the subquery result sets are merged with an MMR-style relevance/diversity pass.",
        tags: ["BM25 100 · dense 40", "RRF 3:1", "ColBERT 128-d MaxSim"],
      },
      {
        id: "ground",
        tab: "test the evidence",
        result: "covered answer context",
        title: "Filter relevance without losing recall",
        summary:
          "A cross-encoder sharpens the order while an independent semantic guard can rescue useful evidence.",
        detail:
          "The CE scores drive re-sorting, gap detection and an adaptive cutoff; dense rank protects strong candidates from a bad cutoff. Query-plan nuggets are then checked against the surviving documents. In the current coverage path, a score below 0.75 triggers one targeted search for what is missing.",
        tags: ["CE + cosine guard", "coverage ≥ 0.75", "1 targeted refinement"],
      },
      {
        id: "answer",
        tab: "release with sources",
        result: "inspectable response",
        title: "Stream the answer and its evidence",
        summary:
          "The local LLM receives a bounded context whose source numbers remain stable from prompt to UI.",
        detail:
          "FastAPI streams the working trace, observations, citations and final response as typed SSE events. The answer is grounded in the selected posts; evaluation keeps factual quality, evidence support, refusals and confidence intervals separate.",
        tags: ["Qwen3.5-35B-A3B", "typed SSE events", "numbered citations"],
      },
    ],
    headlines: [
      {
        label: "reviewed set",
        value: "120",
        detail: "4 behavior modes",
      },
      {
        label: "factual",
        value: "0.898",
        detail: "105 answerable · 95% CI",
      },
      {
        label: "evidence support",
        value: "0.886",
        detail: "65 retrieval cases · 95% CI",
      },
      {
        label: "refusal slice",
        value: "15 / 15",
        detail: "correctly refused",
      },
    ],
    proof: {
      label: "agent routing on the broad evaluation",
      value: "99 / 105 key-tool decisions",
      detail: "RUN-009 · tool-call F1 0.911",
    },
  },
  ru: {
    kicker: "rag_app / self-hosted система доказательств",
    title: "Отвечать по Telegram-корпусу с проверяемыми источниками.",
    intro: [
      "Это не обёртка над векторной базой. Система поддерживает меняющийся корпус, планирует каждый вопрос, совмещает лексический и семантический поиск, проверяет достаточность доказательств и лишь затем формирует ответ с источниками.",
      "Весь контур работает локально между Windows, WSL2 и Docker: Qwen на V100, embedding и reranking на RTX 5060 Ti, FastAPI и Qdrant на CPU.",
    ],
    navLabel: "История RAG-системы доказательств",
    stages: [
      {
        id: "ingest",
        tab: "собрать доказательства",
        result: "стабильный корпус постов",
        title: "Превратить шумную ленту в устойчивые данные",
        summary:
          "Telegram-сообщения становятся повторяемыми точками Qdrant с текстом, метаданными и тремя дополняющими представлениями.",
        detail:
          "Telethon читает выбранные каналы. Короткие посты сохраняются целиком, длинные делятся по естественным границам. Dense, sparse BM25 и ColBERT-векторы кодируются до детерминированного UUID5 upsert, поэтому повторный запуск сходится, а не дублирует корпус.",
        tags: ["36 каналов", "UUID5 upsert", "dense + sparse + ColBERT"],
      },
      {
        id: "plan",
        tab: "понять вопрос",
        result: "план + ограниченные tools",
        title: "Выбрать маршрут до начала поиска",
        summary:
          "Агент решает, нужен ли обычный retrieval, аналитика, навигация либо безопасный отказ.",
        detail:
          "Query plan сохраняет исходную формулировку и добавляет точечные подзапросы на языке пользователя. ReAct-цикл видит не более пяти релевантных фазе tools из пятнадцати; forced search не позволяет ответить без источников, если корректного short-circuit нет.",
        tags: ["native function calling", "видно 5 / 15 tools", "forced search"],
      },
      {
        id: "retrieve",
        tab: "найти кандидатов",
        result: "поиск по разным сигналам",
        title: "Разрешить поисковым сигналам не соглашаться",
        summary:
          "Точные термины, общий смысл и совпадения на уровне токенов независимо пытаются вернуть нужный источник.",
        detail:
          "Каждый подзапрос начинает со 100 BM25- и 40 dense-кандидатов. Weighted RRF отдаёт лексическому пути вес 3:1, ColBERT выполняет late-interaction MaxSim, а наборы результатов объединяются MMR-проходом с балансом релевантности и разнообразия.",
        tags: ["BM25 100 · dense 40", "RRF 3:1", "ColBERT 128-d MaxSim"],
      },
      {
        id: "ground",
        tab: "проверить контекст",
        result: "покрытый контекст ответа",
        title: "Повысить точность, не потеряв полноту",
        summary:
          "Cross-encoder уточняет порядок, а независимый семантический guard может спасти полезный документ.",
        detail:
          "CE scores управляют пересортировкой, gap detection и адаптивным отсечением; dense rank защищает сильных кандидатов от ошибочного cutoff. Затем nuggets из query plan проверяются по оставшимся документам. В текущем coverage path оценка ниже 0.75 запускает один точечный поиск по недостающим аспектам.",
        tags: ["CE + cosine guard", "coverage ≥ 0.75", "1 targeted refinement"],
      },
      {
        id: "answer",
        tab: "ответить с источниками",
        result: "проверяемый ответ",
        title: "Передать ответ вместе с доказательствами",
        summary:
          "Локальная LLM получает ограниченный контекст, в котором номера источников остаются стабильными от prompt до UI.",
        detail:
          "FastAPI отправляет ход работы, наблюдения, citations и финальный текст типизированными SSE-событиями. Ответ опирается на выбранные посты, а evaluation раздельно измеряет factual quality, evidence support, отказы и доверительные интервалы.",
        tags: ["Qwen3.5-35B-A3B", "типизированные SSE", "нумерованные citations"],
      },
    ],
    headlines: [
      {
        label: "проверенный набор",
        value: "120",
        detail: "4 режима поведения",
      },
      {
        label: "factual",
        value: "0.898",
        detail: "105 answerable · 95% CI",
      },
      {
        label: "evidence support",
        value: "0.886",
        detail: "65 retrieval-кейсов · 95% CI",
      },
      {
        label: "срез отказов",
        value: "15 / 15",
        detail: "корректных отказов",
      },
    ],
    proof: {
      label: "маршрутизация агента на широком evaluation",
      value: "99 / 105 key-tool решений",
      detail: "RUN-009 · tool-call F1 0.911",
    },
  },
} satisfies Record<Locale, RagContent>;
