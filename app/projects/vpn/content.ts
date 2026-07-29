import type {
  StoryBrief,
  StoryHeadline,
  StoryProof,
  StoryStageSequence,
} from "../../components/story/story-types";
import type { Locale } from "../../content/locales";

export const vpnStageOrder = [
  "request",
  "queue",
  "allocate",
  "fleet",
  "recover",
] as const;

export type VpnStageId = (typeof vpnStageOrder)[number];

export type VpnContent = Readonly<{
  kicker: string;
  title: string;
  intro: readonly [string, string];
  brief: StoryBrief;
  navLabel: string;
  stages: StoryStageSequence<typeof vpnStageOrder>;
  headlines: readonly StoryHeadline[];
  proof: StoryProof;
}>;

export const vpnContent = {
  en: {
    kicker: "vpn server / secure connectivity control plane",
    title: "Issue secure connections without losing control of the node fleet.",
    intro: [
      "The system authenticates a device, finds protocol-ready capacity and returns an AWG or Xray configuration through one asynchronous Connect Flow.",
      "The larger job is keeping the control-plane ledger and the Linux fleet truthful through retries, restarts, refills, cleanup and node lifecycle changes.",
    ],
    brief: {
      label: "project brief / 30 second read",
      summary:
        "A secure-connectivity control plane that issues AWG or Xray configurations and keeps the Linux node fleet recoverable.",
      points: [
        {
          label: "challenge",
          text: "Concurrent reconnects, retries, restarts, and node drift had to stay consistent without duplicate allocations or lost work.",
        },
        {
          label: "built",
          text: "I designed the authenticated Connect Flow, durable PostgreSQL job queue, Redis status cache, transaction-safe allocation, and fleet maintenance workers.",
        },
        {
          label: "result",
          text: "Repeated requests converge on one durable job, each device keeps one active slot, and interrupted work returns safely to processing.",
        },
      ],
    },
    navLabel: "VPN control-plane system story",
    stages: [
      {
        id: "request",
        tab: "enter safely",
        result: "trusted device request",
        title: "One connection contract at the edge",
        summary:
          "The public path authenticates the user before any allocation work begins.",
        detail:
          "Nginx accepts the exact Connect Flow route. Auth-service verifies the access token; user-api then derives a stable device identity and resolves the allowed location, policy pool and protocol.",
        tags: ["Connect Flow", "device-bound identity", "policy isolation"],
      },
      {
        id: "queue",
        tab: "make work durable",
        result: "idempotent PostgreSQL job",
        title: "Retries converge on one job",
        summary:
          "A deterministic request key prevents a reconnect storm from becoming duplicate control-plane work.",
        detail:
          "Redis holds the short-lived pending or ready view. PostgreSQL stores the durable generate_config job; LISTEN/NOTIFY wakes workers quickly while polling remains the delivery fallback.",
        tags: ["HMAC job id", "Redis TTL 180s", "at-least-once"],
      },
      {
        id: "allocate",
        tab: "allocate capacity",
        result: "one active device slot",
        title: "Claim protocol-ready capacity",
        summary:
          "The worker selects a FREE slot on an ACTIVE node inside a database transaction.",
        detail:
          "Region, policy and protocol metadata constrain the candidate set. Row locks make concurrent allocation safe; AWG consumes a prepared peer while Xray creates its runtime user on demand. The result returns as ready, or as a short pending response while work continues.",
        tags: ["FREE → ALLOCATED", "SKIP LOCKED", "AWG + Xray"],
      },
      {
        id: "fleet",
        tab: "keep capacity warm",
        result: "protocol-ready node fleet",
        title: "Maintain the fleet before demand arrives",
        summary:
          "A self-rescheduling caretaker keeps usable capacity ahead of the next connection request.",
        detail:
          "Each node and protocol pool has a target FREE reserve. Maintenance workers provision and bootstrap nodes, refill peers, clean stale slots and collect telemetry. A node becomes ACTIVE only after its declared protocol path is actually ready.",
        tags: ["target_free policy", "REFILL + CLEANUP", "truthful ACTIVE"],
      },
      {
        id: "recover",
        tab: "converge after failure",
        result: "database and nodes agree",
        title: "Treat failure as a normal state transition",
        summary:
          "Leases, retries and reconciliation turn interrupted work into recoverable work.",
        detail:
          "Heartbeats extend live claims; expired leases return to the queue, bounded retries can end in a dead-letter record, and protocol-aware reconciliation repairs drift after node restarts. Draining removes capacity without accepting new allocations.",
        tags: ["lease + heartbeat", "retry + DLQ", "reconcile + drain"],
      },
    ],
    headlines: [
      {
        label: "protocol paths",
        value: "2",
        detail: "AWG + Xray",
      },
      {
        label: "delivery contract",
        value: "at least once",
        detail: "idempotent handlers",
      },
      {
        label: "device invariant",
        value: "1 active",
        detail: "slot / user + device",
      },
      {
        label: "recovery model",
        value: "DB first",
        detail: "recoverable intent",
      },
    ],
    proof: {
      label: "separate execution planes",
      value: "user issuance ≠ node maintenance",
      detail: "shared jobq · isolated worker pools",
    },
  },
  ru: {
    kicker: "vpn server / secure-connectivity control plane",
    title:
      "Выдавать защищённые подключения и сохранять контроль над парком узлов.",
    intro: [
      "Система аутентифицирует устройство, находит узел с готовым протоколом и свободным местом, затем возвращает конфигурацию AWG или Xray через единый асинхронный Connect Flow.",
      "Главная сложность - сохранять согласованное состояние control plane и парка Linux-узлов при повторных попытках, перезапусках, пополнении резерва, очистке и изменении состава инфраструктуры.",
    ],
    brief: {
      label: "project brief / 30 second read",
      summary:
        "Control plane, который выдаёт устройству готовую конфигурацию AWG или Xray и поддерживает парк Linux-узлов в рабочем состоянии.",
      points: [
        {
          label: "challenge",
          text: "Повторные подключения и сбои не должны создавать дублирующие задания, терять работу или повторно выдавать уже занятое место.",
        },
        {
          label: "built",
          text: "Я спроектировал единый Connect Flow, надёжную очередь заданий в PostgreSQL, быстрый кэш статусов в Redis, безопасное конкурентное выделение подключений и фоновые процессы обслуживания узлов.",
        },
        {
          label: "result",
          text: "Повторные запросы сходятся к одному заданию, за устройством остаётся одно активное подключение, а прерванная работа безопасно возвращается в очередь.",
        },
      ],
    },
    navLabel: "VPN control-plane story",
    stages: [
      {
        id: "request",
        tab: "secure entry",
        result: "trusted device request",
        title: "Единый контракт подключения на входе",
        summary:
          "Внешний маршрут аутентифицирует пользователя до начала выдачи подключения.",
        detail:
          "Nginx принимает только маршрут Connect Flow. auth-service проверяет access token, затем user-api формирует стабильный идентификатор устройства и определяет разрешённые регион, набор политик и протокол.",
        tags: [
          "Connect Flow",
          "device identity",
          "policy isolation",
        ],
      },
      {
        id: "queue",
        tab: "persist the work",
        result: "idempotent PostgreSQL job",
        title: "Повторные попытки сходятся к одному заданию",
        summary:
          "Детерминированный ключ не позволяет шторму переподключений создать несколько одинаковых заданий.",
        detail:
          "Redis хранит краткоживущий статус pending или ready. PostgreSQL сохраняет задание generate_config; LISTEN/NOTIFY быстро будит workers, а периодический опрос остаётся резервным механизмом доставки.",
        tags: ["HMAC job id", "Redis TTL 180с", "at-least-once"],
      },
      {
        id: "allocate",
        tab: "allocate capacity",
        result: "one active device slot",
        title: "Выделить место на узле с готовым протоколом",
        summary:
          "Worker выбирает свободное место на активном узле в рамках транзакции PostgreSQL.",
        detail:
          "Регион, политика и протокол ограничивают набор кандидатов. Блокировки строк защищают конкурентное выделение: AWG использует подготовленного peer, а Xray создаёт пользователя по требованию. Ответ приходит со статусом ready либо с кратким pending, пока задание выполняется.",
        tags: ["FREE → ALLOCATED", "SKIP LOCKED", "AWG + Xray"],
      },
      {
        id: "fleet",
        tab: "keep reserve",
        result: "protocol-ready node fleet",
        title: "Подготовить парк узлов до появления спроса",
        summary:
          "Фоновый worker сам планирует следующие запуски и заранее поддерживает резерв свободных подключений.",
        detail:
          "Для каждой пары узел / протокол задан целевой резерв. Фоновые workers создают и настраивают узлы, пополняют набор peers, очищают устаревшие подключения и собирают телеметрию. Узел становится ACTIVE только после фактической готовности протокола.",
        tags: ["policy target_free", "REFILL + CLEANUP", "truthful ACTIVE"],
      },
      {
        id: "recover",
        tab: "converge after failure",
        result: "database and nodes agree",
        title: "Считать сбой обычным переходом состояния",
        summary:
          "Аренда заданий, retry и сверка состояния позволяют безопасно продолжить прерванную работу.",
        detail:
          "Heartbeat продлевает аренду активного задания; задания с истёкшей арендой возвращаются в очередь, а после ограниченного числа retry попадают в DLQ. Сверка с учётом протокола устраняет расхождения после перезапуска узла, а режим drain выводит его из эксплуатации без новых подключений.",
        tags: ["lease + heartbeat", "retry + DLQ", "reconcile + drain"],
      },
    ],
    headlines: [
      {
        label: "protocol paths",
        value: "2",
        detail: "AWG + Xray",
      },
      {
        label: "delivery contract",
        value: "at least once",
        detail: "idempotent handlers",
      },
      {
        label: "device invariant",
        value: "1 active",
        detail: "slot / user + device",
      },
      {
        label: "recovery model",
        value: "DB first",
        detail: "recoverable intent",
      },
    ],
    proof: {
      label: "separate execution planes",
      value: "user issuance ≠ node maintenance",
      detail: "shared jobq · isolated worker pools",
    },
  },
} satisfies Record<Locale, VpnContent>;
