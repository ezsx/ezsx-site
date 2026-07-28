import type { Locale } from "../../content/locales";
import type { VpnStageId } from "./content";

const fleetNodes = [
  { id: "node / ams-01", protocol: "AWG", free: 7, total: 10, state: "active" },
  {
    id: "node / ams-02",
    protocol: "AWG + Xray",
    free: 4,
    total: 10,
    state: "refill",
  },
  {
    id: "node / pool-03",
    protocol: "Xray",
    free: 6,
    total: 10,
    state: "active",
  },
  {
    id: "node / pool-04",
    protocol: "AWG",
    free: 2,
    total: 10,
    state: "cleanup",
  },
] as const;

export const vpnSceneCopy = {
  en: {
    client: "client",
    clientName: "mobile / beta",
    edge: "edge",
    exactRoute: "exact route · limits",
    identity: "identity",
    verify: "verify access",
    controlApi: "control API",
    sourcePolicy: "source · policy · protocol",
    publicContract: "public contract",
    userId: "user id",
    deviceId: "device id",
    location: "location",
    authBoundary: "authorization boundary",
    noEnqueue: "no enqueue before identity is verified",
    requests: ["request A", "request A′", "request A″"],
    deterministicHmac: "deterministic HMAC",
    oneDevice: "one device · one parameter set",
    ephemeralView: "ephemeral view",
    pendingReady: "pending → ready · TTL",
    derived: "derived from lock + lease",
    delivery: "delivery",
    userWorker: "user-worker / 07",
    leaseJob: "lease job 8841",
    allocation: "allocation transaction",
    filters: "policy · region · protocol",
    sameDevice: "same device · reusable",
    bestCandidate: "ACTIVE node · best candidate",
    differentPolicy: "different policy",
    oneActive: "one active slot / user + device",
    awgHandler: "protocol handler / AWG",
    preparedPeer: "prepared peer",
    decrypt: "decrypt stored client config",
    xrayHandler: "protocol handler / Xray",
    onDemand: "on-demand user",
    applyPeer: "apply peer · build client config",
    resultCache: "result cache",
    ready: "ready",
    readyTiming: "200 now · or 202 pending",
    controller: "self-rescheduling controller",
    scan: "scan node × protocol pools",
    freeSlots: "representative slots free",
    active: "ACTIVE",
    workerClaim: "worker claim",
    heartbeat: "heartbeat extends live work",
    processExit: "process exit",
    heartbeatLost: "heartbeat lost",
    durableJob: "job remains durable",
    sweeper: "sweeper",
    releaseRetry: "release + retry",
    anotherWorker: "another worker may claim",
    databaseIntent: "database intent",
    allocatedPeers: "ALLOCATED peers",
    protocolAware: "protocol-aware",
    compareRepair: "compare · repair",
    nodeRuntime: "node runtime",
    livePeers: "live peers",
    terminalPaths: "terminal paths",
    outcomes: "success · retry/backoff · dead letter · safe drain",
  },
  ru: {
    client: "клиент",
    clientName: "mobile / beta",
    edge: "edge",
    exactRoute: "точный маршрут · лимиты",
    identity: "идентичность",
    verify: "проверка доступа",
    controlApi: "control API",
    sourcePolicy: "источник · policy · протокол",
    publicContract: "публичный контракт",
    userId: "пользователь",
    deviceId: "устройство",
    location: "локация",
    authBoundary: "граница авторизации",
    noEnqueue: "никаких задач до подтверждения личности",
    requests: ["запрос A", "запрос A′", "запрос A″"],
    deterministicHmac: "детерминированный HMAC",
    oneDevice: "одно устройство · один набор параметров",
    ephemeralView: "временное представление",
    pendingReady: "pending → ready · TTL",
    derived: "выведено из lock + lease",
    delivery: "доставка",
    userWorker: "user-worker / 07",
    leaseJob: "lease задачи 8841",
    allocation: "транзакция аллокации",
    filters: "policy · регион · протокол",
    sameDevice: "то же устройство · можно переиспользовать",
    bestCandidate: "ACTIVE-нода · лучший кандидат",
    differentPolicy: "другая policy",
    oneActive: "один активный слот / пользователь + устройство",
    awgHandler: "обработчик протокола / AWG",
    preparedPeer: "подготовленный peer",
    decrypt: "расшифровать сохранённый клиентский конфиг",
    xrayHandler: "обработчик протокола / Xray",
    onDemand: "пользователь по требованию",
    applyPeer: "создать peer · собрать клиентский конфиг",
    resultCache: "кеш результата",
    ready: "готово",
    readyTiming: "200 сейчас · либо 202 pending",
    controller: "самопланирующийся контроллер",
    scan: "обход пулов node × protocol",
    freeSlots: "репрезентативных слотов свободно",
    active: "ACTIVE",
    workerClaim: "claim воркера",
    heartbeat: "heartbeat продлевает живую работу",
    processExit: "завершение процесса",
    heartbeatLost: "heartbeat потерян",
    durableJob: "задача остаётся устойчивой",
    sweeper: "sweeper",
    releaseRetry: "освободить + повторить",
    anotherWorker: "задачу может взять другой воркер",
    databaseIntent: "намерение базы",
    allocatedPeers: "ALLOCATED peers",
    protocolAware: "с учётом протокола",
    compareRepair: "сравнить · исправить",
    nodeRuntime: "runtime ноды",
    livePeers: "живые peers",
    terminalPaths: "конечные пути",
    outcomes: "успех · retry/backoff · dead letter · безопасный drain",
  },
} as const;

export type VpnSceneCopy = (typeof vpnSceneCopy)[Locale];

function RequestScene({ copy }: { copy: VpnSceneCopy }) {

  return (
    <div className="story-scene vpn-scene vpn-request-scene">
      <div className="vpn-request-flow">
        <div className="vpn-component vpn-client-component">
          <span>{copy.client}</span>
          <strong>{copy.clientName}</strong>
          <small>Bearer · X-HWID</small>
        </div>
        <i aria-hidden="true" className="vpn-flow-link">
          <b />
        </i>
        <div className="vpn-component">
          <span>{copy.edge}</span>
          <strong>Nginx</strong>
          <small>{copy.exactRoute}</small>
        </div>
        <i aria-hidden="true" className="vpn-flow-link">
          <b />
        </i>
        <div className="vpn-component">
          <span>{copy.identity}</span>
          <strong>auth-service</strong>
          <small>{copy.verify}</small>
        </div>
        <i aria-hidden="true" className="vpn-flow-link">
          <b />
        </i>
        <div className="vpn-component is-selected">
          <span>{copy.controlApi}</span>
          <strong>user-api</strong>
          <small>{copy.sourcePolicy}</small>
        </div>
      </div>

      <div className="vpn-contract-card">
        <div>
          <span>{copy.publicContract}</span>
          <strong>POST /v1/connect-flow/connect</strong>
        </div>
        <div className="vpn-contract-fields">
          <span>{copy.userId}</span>
          <span>{copy.deviceId}</span>
          <span>{copy.location}</span>
          <span>AWG / Xray</span>
        </div>
      </div>

      <div className="vpn-scene-result">
        <span>{copy.authBoundary}</span>
        <strong>{copy.noEnqueue}</strong>
      </div>
    </div>
  );
}

function QueueScene({ copy }: { copy: VpnSceneCopy }) {
  const rows = [
    ["8841", "generate_config", "leased"],
    ["8842", "generate_config", "runnable"],
    ["8843", "maintenance_task", "runnable"],
  ];

  return (
    <div className="story-scene vpn-scene vpn-queue-scene">
      <div className="vpn-dedupe-path">
        <div>
          {copy.requests.map((request) => (
            <span key={request}>{request}</span>
          ))}
        </div>
        <i aria-hidden="true">→</i>
        <div className="vpn-key-card">
          <span>{copy.deterministicHmac}</span>
          <strong>job_4f7…c19</strong>
          <small>{copy.oneDevice}</small>
        </div>
        <i aria-hidden="true">→</i>
        <div className="vpn-redis-card">
          <span>{copy.ephemeralView}</span>
          <strong>Redis</strong>
          <small>{copy.pendingReady}</small>
        </div>
      </div>

      <div className="vpn-jobq-map">
        <div className="vpn-ledger">
          <div className="vpn-ledger-heading">
            <span>PostgreSQL · jobq.jobs</span>
            <strong>{copy.derived}</strong>
          </div>
          <div className="vpn-ledger-columns" aria-hidden="true">
            <span>id</span>
            <span>type</span>
            <span>{copy.delivery}</span>
          </div>
          {rows.map(([id, type, state], index) => (
            <div
              className={`vpn-ledger-row ${index === 0 ? "is-claimed" : ""}`}
              key={id}
            >
              <span>{id}</span>
              <strong>{type}</strong>
              <small>{state}</small>
            </div>
          ))}
        </div>

        <div className="vpn-worker-claim">
          <span>{copy.userWorker}</span>
          <strong>{copy.leaseJob}</strong>
          <small>FOR UPDATE SKIP LOCKED</small>
          <i aria-hidden="true">
            <b />
          </i>
        </div>
      </div>
    </div>
  );
}

function AllocateScene({ copy }: { copy: VpnSceneCopy }) {

  return (
    <div className="story-scene vpn-scene vpn-allocate-scene">
      <div className="vpn-allocation-transaction">
        <div className="vpn-transaction-heading">
          <span>{copy.allocation}</span>
          <strong>{copy.filters}</strong>
        </div>
        <div className="vpn-slot-candidates">
          <div>
            <span>slot 2a1</span>
            <strong>ALLOCATED</strong>
            <small>{copy.sameDevice}</small>
          </div>
          <div className="is-picked">
            <span>slot 8c4</span>
            <strong>FREE</strong>
            <small>{copy.bestCandidate}</small>
          </div>
          <div>
            <span>slot e09</span>
            <strong>FREE</strong>
            <small>{copy.differentPolicy}</small>
          </div>
        </div>
        <div className="vpn-state-transition">
          <span>FREE</span>
          <i aria-hidden="true">→</i>
          <strong>ALLOCATED</strong>
          <small>{copy.oneActive}</small>
        </div>
      </div>

      <div className="vpn-protocol-branches">
        <div>
          <span>{copy.awgHandler}</span>
          <strong>{copy.preparedPeer}</strong>
          <small>{copy.decrypt}</small>
        </div>
        <div>
          <span>{copy.xrayHandler}</span>
          <strong>{copy.onDemand}</strong>
          <small>{copy.applyPeer}</small>
        </div>
        <div className="vpn-ready-gate">
          <span>{copy.resultCache}</span>
          <strong>{copy.ready}</strong>
          <small>{copy.readyTiming}</small>
        </div>
      </div>
    </div>
  );
}

function FleetScene({ copy }: { copy: VpnSceneCopy }) {

  return (
    <div className="story-scene vpn-scene vpn-fleet-scene">
      <div className="vpn-caretaker">
        <span>{copy.controller}</span>
        <strong>caretaker</strong>
        <div aria-hidden="true" className="vpn-caretaker-ring">
          <i />
          <b />
        </div>
        <small>{copy.scan}</small>
        <div className="vpn-caretaker-actions">
          <span>REFILL</span>
          <span>CLEANUP</span>
          <span>TELEMETRY</span>
          <span>RECONCILE</span>
        </div>
      </div>

      <div className="vpn-fleet-grid">
        {fleetNodes.map((node) => (
          <div
            className={node.state !== "active" ? `is-${node.state}` : ""}
            key={node.id}
          >
            <span>{node.id}</span>
            <strong>{node.protocol}</strong>
            <div
              aria-label={`${node.free} / ${node.total} ${copy.freeSlots}`}
              role="img"
            >
              {Array.from({ length: node.total }, (_, index) => (
                <i
                  aria-hidden="true"
                  className={index < node.free ? "is-free" : "is-used"}
                  key={index}
                />
              ))}
            </div>
            <small>
              {node.state === "active"
                ? `${node.free} FREE · ${copy.active}`
                : node.state.toUpperCase()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecoverScene({ copy }: { copy: VpnSceneCopy }) {

  return (
    <div className="story-scene vpn-scene vpn-recover-scene">
      <div className="vpn-recovery-track">
        <div>
          <span>{copy.workerClaim}</span>
          <strong>lease_until 12:41:30</strong>
          <small>{copy.heartbeat}</small>
        </div>
        <i aria-hidden="true">→</i>
        <div className="is-interrupted">
          <span>{copy.processExit}</span>
          <strong>{copy.heartbeatLost}</strong>
          <small>{copy.durableJob}</small>
        </div>
        <i aria-hidden="true">↶</i>
        <div className="is-recovered">
          <span>{copy.sweeper}</span>
          <strong>{copy.releaseRetry}</strong>
          <small>{copy.anotherWorker}</small>
        </div>
      </div>

      <div className="vpn-convergence-map">
        <div>
          <span>{copy.databaseIntent}</span>
          <strong>{copy.allocatedPeers}</strong>
        </div>
        <i aria-hidden="true" className="vpn-convergence-line">
          <b />
        </i>
        <div className="vpn-reconcile-core">
          <span>{copy.protocolAware}</span>
          <strong>RECONCILE</strong>
          <small>{copy.compareRepair}</small>
        </div>
        <i aria-hidden="true" className="vpn-convergence-line">
          <b />
        </i>
        <div>
          <span>{copy.nodeRuntime}</span>
          <strong>{copy.livePeers}</strong>
        </div>
      </div>

      <div className="vpn-scene-result">
        <span>{copy.terminalPaths}</span>
        <strong>{copy.outcomes}</strong>
      </div>
    </div>
  );
}

export function VpnScene({
  copy,
  stage,
}: {
  copy: VpnSceneCopy;
  stage: VpnStageId;
}) {
  if (stage === "request") return <RequestScene copy={copy} />;
  if (stage === "queue") return <QueueScene copy={copy} />;
  if (stage === "allocate") return <AllocateScene copy={copy} />;
  if (stage === "fleet") return <FleetScene copy={copy} />;
  return <RecoverScene copy={copy} />;
}
