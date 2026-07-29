import TechnicalDisclosure from "../../components/story/technical-disclosure";
import type { Locale } from "../../content/locales";

export const pixelBattleTechnicalCopy = {
  en: {
    eyebrow: "technical layer / accepted pixel",
    title: "Inspect one accepted pixel",
    expand: "expand runtime",
    collapse: "collapse runtime",
    meta: "WebSocket · bounds · cooldown · PostgreSQL · broadcast",
    pipelineHeading: "request path",
    pipelineMeta: "one user update_pixel",
    receive: "receive",
    receiveValue: "typed WebSocket message",
    validate: "validate",
    validateValue: "bounds + user cooldown",
    persist: "persist",
    persistValue: "timestamp-guarded upsert",
    release: "release",
    releaseValue: "pixel_update delta",
    rejectionRule: "rejection boundary",
    rejectionDetail:
      "Invalid coordinates, an active cooldown or a stale action return an error and stop before broadcast.",
    orderingRule: "accepted ordering",
    orderingDetail:
      "The upsert returns a row only when it applies the candidate. Cooldown state and the live delta follow that canonical write.",
    ownershipHeading: "state ownership",
    ownershipMeta: "durable truth vs live session",
    durable: "PostgreSQL / canonical",
    durableItems: [
      "users + ban state",
      "pixels by coordinate",
      "last pixel update",
      "pixel action time",
    ],
    ephemeral: "ConnectionManager / memory",
    ephemeralItems: [
      "user sockets",
      "admin sockets",
      "nickname map",
      "live selections",
    ],
    config: "process configuration",
    configItems: ["field size", "cooldown value"],
    snapshotRule: "field_state composition",
    snapshotDetail:
      "Persisted pixels come from PostgreSQL; selections are joined from process memory when the response is built.",
    fanoutHeading: "broadcast semantics",
    fanoutMeta: "current single-instance contract",
    fanoutInput: "accepted pixel",
    fanoutManager: "ConnectionManager.broadcast",
    fanoutLoop: "for recipient → await send_text",
    fanoutTargets: "users + admins",
    fanoutBoundary: "architecture boundary",
    fanoutDetail:
      "Broadcast is in-process and sequential. No RabbitMQ, Kafka, Redis pub/sub or cross-node delivery is claimed.",
    signalsHeading: "runtime signals",
    signalsMeta: "actual Prometheus instrumentation",
    signalRows: [
      [
        "Gauge",
        "active_websocket_connections",
        "connected user sockets",
      ],
      ["Counter", "ws_messages_sent", "messages sent through metric wrapper"],
      [
        "Counter",
        "ws_messages_received",
        "messages received through metric wrapper",
      ],
    ],
    loadHeading: "load-test evidence",
    loadConcurrency: "1.5-2K",
    loadConcurrencyDetail: "simultaneous connections",
    loadLatency: "< 50 ms",
    loadLatencyDetail: "broadcast update latency",
    measurementBoundary:
      "The concurrency and latency figures are reported load-test results. They are not derived from a Prometheus latency histogram.",
    ownershipNote:
      "The Flutter application appears only at the integration boundary; this story covers the backend and WebSocket contract.",
    scaleNote:
      "The shown runtime is a single-instance design. Horizontal fan-out would require an explicit shared delivery layer and connection routing.",
  },
  ru: {
    eyebrow: "технический слой / принятый пиксель",
    title: "Разобрать один принятый пиксель",
    expand: "развернуть runtime",
    collapse: "свернуть runtime",
    meta: "WebSocket · bounds · cooldown · PostgreSQL · broadcast",
    pipelineHeading: "путь запроса",
    pipelineMeta: "один user update_pixel",
    receive: "получить",
    receiveValue: "типизированное WebSocket-сообщение",
    validate: "проверить",
    validateValue: "bounds + cooldown пользователя",
    persist: "сохранить",
    persistValue: "upsert с проверкой timestamp",
    release: "выпустить",
    releaseValue: "delta pixel_update",
    rejectionRule: "граница отказа",
    rejectionDetail:
      "Некорректные координаты, активный cooldown или stale-действие возвращают ошибку и останавливают путь до broadcast.",
    orderingRule: "порядок принятого действия",
    orderingDetail:
      "Upsert возвращает строку только при применении candidate. Обновление cooldown и live-delta следуют за этой канонической записью.",
    ownershipHeading: "владение состоянием",
    ownershipMeta: "устойчивая истина и live-сессия",
    durable: "PostgreSQL / канон",
    durableItems: [
      "users + состояние ban",
      "пиксели по координатам",
      "время последнего пикселя",
      "action time пикселя",
    ],
    ephemeral: "ConnectionManager / память",
    ephemeralItems: [
      "user sockets",
      "admin sockets",
      "карта nicknames",
      "live selections",
    ],
    config: "конфигурация процесса",
    configItems: ["размер поля", "значение cooldown"],
    snapshotRule: "сборка field_state",
    snapshotDetail:
      "Сохранённые пиксели приходят из PostgreSQL; selections добавляются из памяти процесса при сборке ответа.",
    fanoutHeading: "семантика broadcast",
    fanoutMeta: "текущий контракт одного instance",
    fanoutInput: "принятый пиксель",
    fanoutManager: "ConnectionManager.broadcast",
    fanoutLoop: "для каждого recipient → await send_text",
    fanoutTargets: "users + admins",
    fanoutBoundary: "граница архитектуры",
    fanoutDetail:
      "Broadcast выполняется внутри процесса и последовательно. RabbitMQ, Kafka, Redis pub/sub или cross-node delivery здесь не заявлены.",
    signalsHeading: "runtime-сигналы",
    signalsMeta: "реальная Prometheus instrumentation",
    signalRows: [
      [
        "Gauge",
        "active_websocket_connections",
        "подключённые user sockets",
      ],
      [
        "Counter",
        "ws_messages_sent",
        "сообщения через metric wrapper отправки",
      ],
      [
        "Counter",
        "ws_messages_received",
        "сообщения через metric wrapper приёма",
      ],
    ],
    loadHeading: "результат нагрузочного теста",
    loadConcurrency: "1,5-2 тыс.",
    loadConcurrencyDetail: "одновременных подключений",
    loadLatency: "< 50 мс",
    loadLatencyDetail: "задержка широковещательного обновления",
    measurementBoundary:
      "Показатели concurrency и latency относятся к нагрузочному тесту. Они не вычислены из Prometheus histogram задержки.",
    ownershipNote:
      "Flutter-приложение показано только на границе интеграции; история посвящена backend и WebSocket-контракту.",
    scaleNote:
      "Показан runtime одного instance. Для горизонтального fan-out потребуются явный общий слой доставки и маршрутизация соединений.",
  },
} as const;

export type PixelBattleTechnicalCopy =
  (typeof pixelBattleTechnicalCopy)[Locale];

function StateCard({
  items,
  label,
  state,
}: {
  items: readonly string[];
  label: string;
  state?: "durable" | "live";
}) {
  return (
    <div className={state ? `is-${state}` : undefined}>
      <span>{label}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function PixelBattleTechnicalRuntime({
  text,
}: {
  text: PixelBattleTechnicalCopy;
}) {
  const pipeline = [
    [text.receive, text.receiveValue],
    [text.validate, text.validateValue],
    [text.persist, text.persistValue],
    [text.release, text.releaseValue],
  ] as const;

  return (
    <>
      <TechnicalDisclosure
        bodyClassName="pixel-technical-body"
        className="pixel-technical"
        eyebrow={text.eyebrow}
        labels={{ expand: text.expand, collapse: text.collapse }}
        meta={text.meta}
        title={text.title}
      >
        <section
          className="pixel-technical-pipeline"
          aria-labelledby="pixel-pipeline-title"
        >
          <div className="technical-section-heading">
            <span id="pixel-pipeline-title">{text.pipelineHeading}</span>
            <strong>{text.pipelineMeta}</strong>
          </div>

          <ol className="pixel-request-pipeline">
            {pipeline.map(([label, value], index) => (
              <li key={label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{label}</strong>
                <small>{value}</small>
              </li>
            ))}
          </ol>

          <div className="pixel-pipeline-rules">
            <div>
              <span>{text.rejectionRule}</span>
              <strong>{text.rejectionDetail}</strong>
            </div>
            <div className="is-accented">
              <span>{text.orderingRule}</span>
              <strong>{text.orderingDetail}</strong>
            </div>
          </div>
        </section>

        <section
          className="pixel-state-ownership"
          aria-labelledby="pixel-ownership-title"
        >
          <div className="technical-section-heading">
            <span id="pixel-ownership-title">{text.ownershipHeading}</span>
            <strong>{text.ownershipMeta}</strong>
          </div>

          <div className="pixel-state-grid">
            <StateCard
              items={text.durableItems}
              label={text.durable}
              state="durable"
            />
            <StateCard
              items={text.ephemeralItems}
              label={text.ephemeral}
              state="live"
            />
            <StateCard items={text.configItems} label={text.config} />
          </div>

          <div className="pixel-snapshot-contract">
            <span>{text.snapshotRule}</span>
            <strong>{text.snapshotDetail}</strong>
          </div>
        </section>

        <section
          className="pixel-fanout-contract"
          aria-labelledby="pixel-fanout-title"
        >
          <div className="technical-section-heading">
            <span id="pixel-fanout-title">{text.fanoutHeading}</span>
            <strong>{text.fanoutMeta}</strong>
          </div>

          <div className="pixel-fanout-path">
            <div>
              <span>01</span>
              <strong>{text.fanoutInput}</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div className="is-accented">
              <span>02</span>
              <strong>{text.fanoutManager}</strong>
              <small>{text.fanoutLoop}</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>03</span>
              <strong>{text.fanoutTargets}</strong>
            </div>
          </div>

          <div className="pixel-fanout-boundary">
            <span>{text.fanoutBoundary}</span>
            <strong>{text.fanoutDetail}</strong>
          </div>
        </section>

        <section
          className="pixel-runtime-evidence"
          aria-labelledby="pixel-signals-title"
        >
          <div className="technical-section-heading">
            <span id="pixel-signals-title">{text.signalsHeading}</span>
            <strong>{text.signalsMeta}</strong>
          </div>

          <div className="pixel-signal-table">
            {text.signalRows.map(([kind, name, detail]) => (
              <div key={name}>
                <span>{kind}</span>
                <strong>{name}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>

          <div className="pixel-load-test">
            <span>{text.loadHeading}</span>
            <div>
              <strong>{text.loadConcurrency}</strong>
              <small>{text.loadConcurrencyDetail}</small>
            </div>
            <div>
              <strong>{text.loadLatency}</strong>
              <small>{text.loadLatencyDetail}</small>
            </div>
            <p>{text.measurementBoundary}</p>
          </div>
        </section>
      </TechnicalDisclosure>

      <div className="story-notes pixel-notes">
        <p>{text.ownershipNote}</p>
        <p>{text.scaleNote}</p>
      </div>
    </>
  );
}
