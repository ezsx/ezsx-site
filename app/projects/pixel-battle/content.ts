import type {
  StoryBrief,
  StoryHeadline,
  StoryProof,
  StoryStageSequence,
} from "../../components/story/story-types";
import type { Locale } from "../../content/locales";

export const pixelBattleStageOrder = [
  "connect",
  "sync",
  "place",
  "broadcast",
  "operate",
] as const;

export type PixelBattleStageId =
  (typeof pixelBattleStageOrder)[number];

export type PixelBattleContent = Readonly<{
  kicker: string;
  title: string;
  intro: readonly [string, string];
  brief: StoryBrief;
  navLabel: string;
  stages: StoryStageSequence<typeof pixelBattleStageOrder>;
  headlines: readonly StoryHeadline[];
  proof: StoryProof;
}>;

export const pixelBattleContent = {
  en: {
    kicker: "PixelBattle / real-time event backend",
    title: "Turn one accepted pixel into a shared moment.",
    intro: [
      "PixelBattle powered a collaborative canvas for a live event. Participants joined over WebSocket, loaded the same field and changed it one accepted pixel at a time.",
      "I owned the FastAPI backend and its protocol for the Flutter client: PostgreSQL held canonical users and pixels, while an in-process ConnectionManager held live sockets and selections and fanned accepted changes out sequentially.",
    ],
    brief: {
      label: "project brief / 30 second read",
      summary:
        "A FastAPI and WebSocket backend for a collaborative live canvas where each accepted pixel becomes a consistent update for connected clients.",
      points: [
        {
          label: "challenge",
          text: "Concurrent participants needed one canonical canvas, per-user action limits, and protection against stale writes.",
        },
        {
          label: "built",
          text: "I built the backend and Flutter protocol. PostgreSQL holds canonical state, WebSocket distributes accepted changes, and Prometheus exposes runtime signals.",
        },
        {
          label: "result",
          text: "Load testing reached 1.5-2K simultaneous connections with broadcast latency below 50 ms.",
        },
      ],
    },
    navLabel: "One accepted pixel through the PixelBattle backend",
    stages: [
      {
        id: "connect",
        tab: "join the event",
        result: "authenticated socket",
        title: "Open one persistent channel for the event",
        summary:
          "The first WebSocket message establishes a participant or administrator identity before live actions begin.",
        detail:
          "Participants join with a nickname and an optional existing user id; the manager registers their sockets, updates the connection gauge and broadcasts the new online count. Administrators use a JWT-backed flow and a separate socket list.",
        tags: [
          "FastAPI WebSocket",
          "user + admin paths",
          "connection lifecycle",
        ],
      },
      {
        id: "sync",
        tab: "load the canvas",
        result: "shared field snapshot",
        title: "Compose durable pixels with live presence",
        summary:
          "A new client receives the field size, cooldown, persisted pixels and current in-memory selections.",
        detail:
          "PostgreSQL remains the canonical store for users and pixels. Active sockets, nicknames and selections are process-local state because they describe the current live session, not durable canvas history.",
        tags: [
          "PostgreSQL pixels",
          "memory selections",
          "field size + cooldown",
        ],
      },
      {
        id: "place",
        tab: "accept one pixel",
        result: "canonical write",
        title: "Validate the action before it changes the field",
        summary:
          "The handler checks coordinates and the per-user cooldown before writing the candidate pixel.",
        detail:
          "The database upsert is keyed by coordinates and guarded by action time. It returns the canonical row only when the candidate is applied; a stale action stops before cooldown update and broadcast.",
        tags: [
          "bounds gate",
          "DB-backed cooldown",
          "timestamp-guarded upsert",
        ],
      },
      {
        id: "broadcast",
        tab: "fan out the delta",
        result: "clients converge",
        title: "Send the smallest useful change",
        summary:
          "After PostgreSQL returns the applied canonical row, the server broadcasts one pixel_update delta to active user and admin sockets.",
        detail:
          "ConnectionManager iterates connected recipients in-process and awaits each send sequentially. There is no broker or multi-node fan-out hidden behind the diagram.",
        tags: [
          "pixel_update",
          "sequential send loop",
          "single-process fan-out",
        ],
      },
      {
        id: "operate",
        tab: "run the event",
        result: "observable control",
        title: "Keep the live canvas understandable under load",
        summary:
          "The same protocol exposes online state and admin actions, while Prometheus reports three direct runtime signals.",
        detail:
          "The connection gauge and sent and received message counters describe runtime activity. Separately, load testing reached 1.5-2K concurrent connections with broadcast latency below 50 ms.",
        tags: [
          "active connections",
          "messages sent / received",
          "load-test evidence",
        ],
      },
    ],
    headlines: [
      {
        label: "load-tested concurrency",
        value: "1.5-2K",
        detail: "simultaneous connections",
      },
      {
        label: "load-test broadcast",
        value: "< 50 ms",
        detail: "update latency",
      },
      {
        label: "live update unit",
        value: "1 pixel",
        detail: "canonical write, then delta",
      },
      {
        label: "Prometheus runtime",
        value: "3 signals",
        detail: "connections · sent · received",
      },
    ],
    proof: {
      label: "accepted pixel contract",
      value: "canonical database write first, WebSocket delta next",
      detail: "stale actions stop before cooldown update and broadcast",
    },
  },
  ru: {
    kicker: "PixelBattle / real-time event backend",
    title: "Превратить принятый пиксель в общее событие.",
    intro: [
      "PixelBattle обслуживал совместный холст во время live-события. Участники подключались по WebSocket, получали общее поле и меняли его по одному принятому пикселю.",
      "Я отвечал за FastAPI backend и протокол Flutter-клиента: PostgreSQL хранил каноническое состояние пользователей и пикселей, а in-process ConnectionManager держал активные соединения и выделения и последовательно рассылал принятые изменения.",
    ],
    brief: {
      label: "project brief / 30 second read",
      summary:
        "Backend совместного live-холста на FastAPI и WebSocket, где каждый принятый пиксель становится согласованным обновлением для подключённых клиентов.",
      points: [
        {
          label: "challenge",
          text: "Для одновременной работы участников требовались единое состояние холста, ограничения частоты действий и защита от устаревших записей.",
        },
        {
          label: "built",
          text: "Я разработал backend и протокол Flutter-клиента. PostgreSQL хранит каноническое состояние, WebSocket рассылает принятые изменения, а Prometheus показывает runtime-метрики.",
        },
        {
          label: "result",
          text: "На нагрузочном тесте система выдержала 1,5-2 тыс. одновременных подключений при задержке рассылки ниже 50 мс.",
        },
      ],
    },
    navLabel: "One accepted pixel through the PixelBattle backend",
    stages: [
      {
        id: "connect",
        tab: "join the event",
        result: "authenticated socket",
        title: "Открыть постоянный канал для события",
        summary:
          "Первое WebSocket-сообщение определяет участника или администратора до начала действий.",
        detail:
          "Участник входит с ником и существующим user id, если он уже есть. Менеджер регистрирует WebSocket, обновляет счётчик соединений и рассылает новое число пользователей онлайн. Администратор использует JWT и отдельный список соединений.",
        tags: [
          "FastAPI WebSocket",
          "user + admin paths",
          "connection lifecycle",
        ],
      },
      {
        id: "sync",
        tab: "load the canvas",
        result: "shared field snapshot",
        title: "Соединить сохранённые пиксели с live-присутствием",
        summary:
          "Новый клиент получает размер поля, cooldown, сохранённые пиксели и текущие выделения из памяти.",
        detail:
          "PostgreSQL остаётся каноническим хранилищем пользователей и пикселей. Активные WebSocket-соединения, ники и выделения живут в памяти процесса, потому что описывают текущую live-сессию, а не историю холста.",
        tags: [
          "PostgreSQL pixels",
          "memory selections",
          "field size + cooldown",
        ],
      },
      {
        id: "place",
        tab: "accept one pixel",
        result: "canonical write",
        title: "Проверить действие до изменения поля",
        summary:
          "Обработчик проверяет координаты и cooldown пользователя перед записью пикселя.",
        detail:
          "Upsert в базе привязан к координатам и защищён временем действия. Он возвращает каноническую строку только при применении нового значения. Устаревшее действие останавливается до обновления cooldown и рассылки.",
        tags: [
          "bounds gate",
          "DB-backed cooldown",
          "timestamp-guarded upsert",
        ],
      },
      {
        id: "broadcast",
        tab: "fan out the delta",
        result: "clients converge",
        title: "Отправить минимальное полезное изменение",
        summary:
          "После того как PostgreSQL вернул каноническую строку, сервер рассылает одно изменение pixel_update активным пользовательским и административным WebSocket-соединениям.",
        detail:
          "ConnectionManager проходит подключённых получателей внутри процесса и последовательно ожидает каждую отправку. За схемой не скрыты broker или multi-node fan-out.",
        tags: [
          "pixel_update",
          "sequential send loop",
          "single-process fan-out",
        ],
      },
      {
        id: "operate",
        tab: "run the event",
        result: "observable control",
        title: "Сделать live-холст наблюдаемым под нагрузкой",
        summary:
          "Тот же протокол отдаёт онлайн-статус и действия администратора, а Prometheus показывает три прямых runtime-сигнала.",
        detail:
          "Число активных соединений и счётчики отправленных и принятых сообщений описывают работу runtime. На отдельном нагрузочном тесте система выдержала 1,5-2 тыс. одновременных подключений при задержке рассылки ниже 50 мс.",
        tags: [
          "active connections",
          "messages sent / received",
          "load-test evidence",
        ],
      },
    ],
    headlines: [
      {
        label: "load-tested concurrency",
        value: "1.5-2K",
        detail: "simultaneous connections",
      },
      {
        label: "load-test broadcast",
        value: "< 50 ms",
        detail: "update latency",
      },
      {
        label: "live update unit",
        value: "1 pixel",
        detail: "canonical write, then delta",
      },
      {
        label: "Prometheus runtime",
        value: "3 signals",
        detail: "connections · sent · received",
      },
    ],
    proof: {
      label: "accepted pixel contract",
      value: "canonical database write first, WebSocket delta next",
      detail: "stale actions stop before cooldown update and broadcast",
    },
  },
} satisfies Record<Locale, PixelBattleContent>;
