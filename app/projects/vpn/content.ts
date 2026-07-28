import type {
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
  navLabel: string;
  stages: StoryStageSequence<typeof vpnStageOrder>;
  headlines: readonly StoryHeadline[];
  proof: StoryProof;
}>;

export const vpnContent = {
  en: {
    kicker: "vpn server / secure connectivity control plane",
    title: "From one connection request to a healthy node fleet.",
    intro: [
      "The system authenticates a device, finds protocol-ready capacity and returns an AWG or Xray configuration through one asynchronous Connect Flow.",
      "The larger job is keeping the control-plane ledger and the Linux fleet truthful through retries, restarts, refills, cleanup and node lifecycle changes.",
    ],
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
    kicker: "vpn server / control plane защищённого подключения",
    title: "От одного запроса на подключение — к здоровому парку нод.",
    intro: [
      "Система аутентифицирует устройство, находит готовую ёмкость нужного протокола и возвращает конфигурацию AWG или Xray через единый асинхронный Connect Flow.",
      "Более крупная задача — сохранять правдивое состояние реестра control plane и Linux-нод при повторах, перезапусках, пополнении, очистке и изменениях жизненного цикла.",
    ],
    navLabel: "История control plane VPN",
    stages: [
      {
        id: "request",
        tab: "безопасный вход",
        result: "доверенный запрос устройства",
        title: "Единый контракт подключения на edge",
        summary:
          "Публичный путь аутентифицирует пользователя до начала любой работы по выделению ёмкости.",
        detail:
          "Nginx принимает точный маршрут Connect Flow. Auth-service проверяет access token, после чего user-api выводит стабильную идентичность устройства и выбирает разрешённые локацию, policy pool и протокол.",
        tags: [
          "Connect Flow",
          "идентичность устройства",
          "изоляция policy",
        ],
      },
      {
        id: "queue",
        tab: "сохранить работу",
        result: "идемпотентная задача PostgreSQL",
        title: "Повторы сходятся к одной задаче",
        summary:
          "Детерминированный ключ запроса не позволяет шторму переподключений превратиться в дублирующуюся работу control plane.",
        detail:
          "Redis хранит короткоживущее представление pending или ready. PostgreSQL сохраняет устойчивую задачу generate_config; LISTEN/NOTIFY быстро будит воркеры, а polling остаётся резервным механизмом доставки.",
        tags: ["HMAC job id", "Redis TTL 180с", "at-least-once"],
      },
      {
        id: "allocate",
        tab: "выделить ёмкость",
        result: "один активный слот устройства",
        title: "Занять готовую ёмкость протокола",
        summary:
          "Воркер выбирает FREE-слот на ACTIVE-ноде внутри транзакции базы данных.",
        detail:
          "Регион, policy и метаданные протокола ограничивают набор кандидатов. Блокировки строк делают конкурентное выделение безопасным: AWG использует подготовленный peer, а Xray создаёт runtime-пользователя по требованию. Результат возвращается как ready либо как короткий pending, пока работа продолжается.",
        tags: ["FREE → ALLOCATED", "SKIP LOCKED", "AWG + Xray"],
      },
      {
        id: "fleet",
        tab: "держать резерв",
        result: "готовый парк нод",
        title: "Подготовить парк до появления спроса",
        summary:
          "Самопланирующийся caretaker поддерживает доступную ёмкость к следующему запросу на подключение.",
        detail:
          "Для каждой ноды и протокола задан целевой резерв FREE. Maintenance-воркеры создают и настраивают ноды, пополняют peers, очищают устаревшие слоты и собирают телеметрию. Нода становится ACTIVE только после фактической готовности заявленного протокола.",
        tags: ["policy target_free", "REFILL + CLEANUP", "правдивый ACTIVE"],
      },
      {
        id: "recover",
        tab: "сойтись после сбоя",
        result: "база и ноды согласованы",
        title: "Сбой как нормальный переход состояния",
        summary:
          "Leases, повторы и reconciliation превращают прерванную работу в восстанавливаемую.",
        detail:
          "Heartbeat продлевает живые claims; истёкшие leases возвращаются в очередь, ограниченные повторы могут завершиться dead-letter записью, а protocol-aware reconciliation исправляет расхождения после перезапуска ноды. Drain выводит ёмкость без новых аллокаций.",
        tags: ["lease + heartbeat", "retry + DLQ", "reconcile + drain"],
      },
    ],
    headlines: [
      {
        label: "пути протоколов",
        value: "2",
        detail: "AWG + Xray",
      },
      {
        label: "контракт доставки",
        value: "at least once",
        detail: "идемпотентные handlers",
      },
      {
        label: "инвариант устройства",
        value: "1 активный",
        detail: "слот / пользователь + устройство",
      },
      {
        label: "модель восстановления",
        value: "DB first",
        detail: "восстанавливаемое намерение",
      },
    ],
    proof: {
      label: "раздельные плоскости выполнения",
      value: "выдача пользователю ≠ обслуживание нод",
      detail: "общий jobq · изолированные worker pools",
    },
  },
} satisfies Record<Locale, VpnContent>;
