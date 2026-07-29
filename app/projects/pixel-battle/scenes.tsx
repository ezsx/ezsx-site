import type { CSSProperties } from "react";
import type { Locale } from "../../content/locales";
import type { PixelBattleStageId } from "./content";

const paintedCells = new Set([3, 9, 10, 17, 20, 28, 29, 35, 42, 44, 52, 59]);
const canvasCells = Array.from({ length: 64 }, (_, index) => index);

export const pixelBattleSceneCopy = {
  en: {
    participant: "participant",
    flutterClient: "Flutter client",
    firstMessage: "first message",
    userLogin: "nickname + optional user_id",
    adminLogin: "admin JWT",
    websocketEdge: "FastAPI /ws",
    accepted: "accepted",
    connectionManager: "ConnectionManager",
    processMemory: "single-process memory",
    activeSockets: "user sockets",
    adminSockets: "admin sockets",
    lifecycle: "connect · notify · disconnect",
    canonicalState: "canonical state",
    postgres: "PostgreSQL",
    durableRows: "users · pixels · last_pixel_update",
    liveState: "live session state",
    selections: "selections",
    ephemeralRows: "sockets · nicknames · positions",
    fieldResponse: "field_state response",
    fieldMeta: "64 × 64 · cooldown",
    savedPixels: "persisted pixels",
    liveSelections: "memory selections",
    pixelRequest: "update_pixel",
    candidate: "candidate",
    coordinates: "x 18 · y 11",
    color: "#58a6ff",
    boundsGate: "bounds",
    insideField: "inside field",
    cooldownGate: "cooldown",
    userReady: "user ready",
    databaseGate: "PostgreSQL upsert",
    newerWins: "newer action_time wins",
    databaseResult: "canonical row · applied",
    updateEvent: "pixel_update",
    oneDelta: "one pixel delta",
    sequentialLoop: "sequential await loop",
    recipients: ["user A", "user B", "user C", "admin"],
    noBroker: "no broker · no cross-node bus",
    controlSurface: "event control",
    adminActions: "ban · cooldown · reset · pixel info",
    runtimeSignals: "Prometheus runtime signals",
    metricConnections: "active_websocket_connections",
    metricSent: "ws_messages_sent",
    metricReceived: "ws_messages_received",
    loadTest: "load-test evidence",
    concurrency: "1.5-2K concurrent",
    latency: "< 50 ms broadcast",
    evidenceBoundary: "reported test result, not a Prometheus latency metric",
  },
  ru: {
    participant: "участник",
    flutterClient: "Flutter-клиент",
    firstMessage: "первое сообщение",
    userLogin: "nickname + user_id, если есть",
    adminLogin: "admin JWT",
    websocketEdge: "FastAPI /ws",
    accepted: "принято",
    connectionManager: "ConnectionManager",
    processMemory: "память одного процесса",
    activeSockets: "user sockets",
    adminSockets: "admin sockets",
    lifecycle: "connect · notify · disconnect",
    canonicalState: "каноническое состояние",
    postgres: "PostgreSQL",
    durableRows: "users · pixels · last_pixel_update",
    liveState: "состояние live-сессии",
    selections: "selections",
    ephemeralRows: "sockets · nicknames · positions",
    fieldResponse: "ответ field_state",
    fieldMeta: "64 × 64 · cooldown",
    savedPixels: "сохранённые пиксели",
    liveSelections: "selections из памяти",
    pixelRequest: "update_pixel",
    candidate: "кандидат",
    coordinates: "x 18 · y 11",
    color: "#58a6ff",
    boundsGate: "bounds",
    insideField: "внутри поля",
    cooldownGate: "cooldown",
    userReady: "пользователь готов",
    databaseGate: "upsert в PostgreSQL",
    newerWins: "побеждает новый action_time",
    databaseResult: "каноническая строка · applied",
    updateEvent: "pixel_update",
    oneDelta: "delta одного пикселя",
    sequentialLoop: "последовательный await loop",
    recipients: ["user A", "user B", "user C", "admin"],
    noBroker: "без broker · без cross-node bus",
    controlSurface: "управление событием",
    adminActions: "ban · cooldown · reset · pixel info",
    runtimeSignals: "runtime-сигналы Prometheus",
    metricConnections: "active_websocket_connections",
    metricSent: "ws_messages_sent",
    metricReceived: "ws_messages_received",
    loadTest: "результат нагрузочного теста",
    concurrency: "1,5-2 тыс. подключений",
    latency: "рассылка < 50 мс",
    evidenceBoundary: "результат теста, а не Prometheus-метрика задержки",
  },
} as const;

export type PixelBattleSceneCopy =
  (typeof pixelBattleSceneCopy)[Locale];

function FlowLink({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <i
      aria-hidden="true"
      className={`pixel-flow-link is-${direction}`}
    >
      <b />
    </i>
  );
}

function PixelCanvas({
  compact = false,
  highlightIndex = 29,
  selections = false,
}: {
  compact?: boolean;
  highlightIndex?: number;
  selections?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pixel-canvas${compact ? " is-compact" : ""}`}
    >
      {canvasCells.map((index) => {
        const classNames = [
          paintedCells.has(index) ? "is-painted" : "",
          index === highlightIndex ? "is-current" : "",
          selections && (index === 20 || index === 44)
            ? "is-selected"
            : "",
        ]
          .filter(Boolean)
          .join(" ");

        return <i className={classNames || undefined} key={index} />;
      })}
    </div>
  );
}

function ConnectScene({ copy }: { copy: PixelBattleSceneCopy }) {
  return (
    <div className="story-scene pixel-scene pixel-connect-scene">
      <div className="pixel-connect-flow">
        <div className="pixel-component">
          <span>{copy.participant}</span>
          <strong>{copy.flutterClient}</strong>
          <small>WebSocket</small>
        </div>

        <FlowLink />

        <div className="pixel-login-card">
          <span>{copy.firstMessage}</span>
          <strong>{copy.userLogin}</strong>
          <small>{copy.adminLogin}</small>
        </div>

        <FlowLink />

        <div className="pixel-component is-accented">
          <span>{copy.websocketEdge}</span>
          <strong>{copy.accepted}</strong>
          <small>authenticate → register</small>
        </div>
      </div>

      <div className="pixel-manager-ledger">
        <div>
          <span>{copy.connectionManager}</span>
          <strong>{copy.processMemory}</strong>
          <small>{copy.lifecycle}</small>
        </div>
        <div>
          <span>{copy.activeSockets}</span>
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </div>
        <div>
          <span>{copy.adminSockets}</span>
          <i aria-hidden="true" className="is-admin" />
        </div>
      </div>
    </div>
  );
}

function SyncScene({ copy }: { copy: PixelBattleSceneCopy }) {
  return (
    <div className="story-scene pixel-scene pixel-sync-scene">
      <div className="pixel-state-sources">
        <div className="pixel-state-card is-durable">
          <span>{copy.canonicalState}</span>
          <strong>{copy.postgres}</strong>
          <small>{copy.durableRows}</small>
          <div aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="pixel-state-card">
          <span>{copy.liveState}</span>
          <strong>{copy.selections}</strong>
          <small>{copy.ephemeralRows}</small>
          <div aria-hidden="true">
            <i className="is-live" />
            <i className="is-live" />
          </div>
        </div>
      </div>

      <FlowLink direction="down" />

      <div className="pixel-field-state">
        <div>
          <span>{copy.fieldResponse}</span>
          <strong>{copy.fieldMeta}</strong>
          <small>
            {copy.savedPixels} + {copy.liveSelections}
          </small>
        </div>
        <PixelCanvas selections />
      </div>
    </div>
  );
}

function PlaceScene({ copy }: { copy: PixelBattleSceneCopy }) {
  const gates = [
    [copy.boundsGate, copy.insideField],
    [copy.cooldownGate, copy.userReady],
  ] as const;

  return (
    <div className="story-scene pixel-scene pixel-place-scene">
      <div className="pixel-candidate">
        <span>{copy.pixelRequest}</span>
        <strong>{copy.candidate}</strong>
        <small>{copy.coordinates}</small>
        <i aria-hidden="true" />
        <small>{copy.color}</small>
      </div>

      <div className="pixel-gate-stack">
        {gates.map(([label, result], index) => (
          <div key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <small>{result}</small>
            <i aria-hidden="true">✓</i>
          </div>
        ))}
      </div>

      <FlowLink />

      <div className="pixel-write-card">
        <span>{copy.databaseGate}</span>
        <strong>(x, y) ON CONFLICT</strong>
        <small>{copy.newerWins}</small>
        <div>
          <PixelCanvas compact />
          <b>{copy.databaseResult}</b>
        </div>
      </div>
    </div>
  );
}

function BroadcastScene({ copy }: { copy: PixelBattleSceneCopy }) {
  return (
    <div className="story-scene pixel-scene pixel-broadcast-scene">
      <div className="pixel-broadcast-origin">
        <span>{copy.databaseResult}</span>
        <strong>{copy.postgres}</strong>
        <small>{copy.updateEvent}</small>
      </div>

      <FlowLink />

      <div className="pixel-broadcast-manager">
        <span>{copy.connectionManager}</span>
        <strong>{copy.oneDelta}</strong>
        <small>{copy.sequentialLoop}</small>
        <i aria-hidden="true" />
      </div>

      <div className="pixel-recipient-grid">
        {copy.recipients.map((recipient, index) => (
          <div
            key={recipient}
            style={{ "--pixel-recipient-delay": `${index * 210}ms` } as CSSProperties}
          >
            <span>{recipient}</span>
            <PixelCanvas compact />
            <i aria-hidden="true" />
          </div>
        ))}
      </div>

      <p>{copy.noBroker}</p>
    </div>
  );
}

function OperateScene({ copy }: { copy: PixelBattleSceneCopy }) {
  const metrics = [
    copy.metricConnections,
    copy.metricSent,
    copy.metricReceived,
  ] as const;

  return (
    <div className="story-scene pixel-scene pixel-operate-scene">
      <div className="pixel-control-panel">
        <span>{copy.controlSurface}</span>
        <strong>admin WebSocket</strong>
        <small>{copy.adminActions}</small>
        <div>
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="pixel-metric-panel">
        <span>{copy.runtimeSignals}</span>
        {metrics.map((metric, index) => (
          <div key={metric}>
            <strong>{metric}</strong>
            <i
              aria-hidden="true"
              style={{ "--pixel-meter": `${[68, 84, 61][index]}%` } as CSSProperties}
            />
          </div>
        ))}
      </div>

      <div className="pixel-load-evidence">
        <span>{copy.loadTest}</span>
        <strong>{copy.concurrency}</strong>
        <strong>{copy.latency}</strong>
        <small>{copy.evidenceBoundary}</small>
      </div>
    </div>
  );
}

export function PixelBattleScene({
  copy,
  stage,
}: {
  copy: PixelBattleSceneCopy;
  stage: PixelBattleStageId;
}) {
  if (stage === "connect") return <ConnectScene copy={copy} />;
  if (stage === "sync") return <SyncScene copy={copy} />;
  if (stage === "place") return <PlaceScene copy={copy} />;
  if (stage === "broadcast") return <BroadcastScene copy={copy} />;
  return <OperateScene copy={copy} />;
}
