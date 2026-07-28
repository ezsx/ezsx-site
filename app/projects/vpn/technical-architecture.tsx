import TechnicalDisclosure from "../../components/story/technical-disclosure";
import type { Locale } from "../../content/locales";

export const vpnTechnicalCopy = {
  en: {
    eyebrow: "architecture decision / task delivery",
    title: "Why the queue lives in PostgreSQL",
    expand: "expand architecture",
    collapse: "collapse architecture",
    meta: "core state · jobq · leases · retry · DLQ",
    mapHeading: "control plane / data plane",
    currentFlow: "current Connect Flow",
    edge: "01 · edge",
    edgeDetail: "route · limits · identity",
    issue: "02 · issue",
    issueDetail: "dedupe · pending / ready",
    durable: "03 · durable state",
    durableDetail: "core tables + jobq",
    deviceQueue: "device-scoped queue",
    lifecycle: "node lifecycle",
    nodeQueue: "node-scoped queue",
    fleet: "Linux node fleet / data plane",
    activeRule: "ACTIVE only after protocol-ready bootstrap",
    anatomy: "durable job anatomy",
    jobq: "PostgreSQL-backed jobq",
    enqueue: "enqueue",
    sharedTransaction: "optional shared DB transaction",
    claim: "claim",
    parallelWorkers: "parallel workers",
    execute: "execute",
    crashRecovery: "crash recovery",
    resolve: "resolve",
    boundedOutcome: "bounded outcome",
    fastWakeup: "fast wake-up",
    fallback: "delivery fallback",
    periodicPoll: "periodic poll",
    serialization: "per-key serialization",
    advisory:
      "advisory lock prevents overlapping work for one resource",
    why: "why PostgreSQL fits here",
    decisionTitle: "A durable task queue, not an event stream.",
    decision:
      "Control-plane work is coupled to relational node, slot and policy state. PostgreSQL keeps those invariants close, supports transactional enqueue where a flow needs it, and provides leases, delayed retry and deduplication without a second durability and backup plane.",
    currentFit: "current fit",
    postgresFit: "state-coupled control-plane tasks",
    revisit: "revisit for",
    rabbitFit: "broker-scale routing, fan-out or message throughput",
    kafkaFit: "replayable event streams and many independent consumers",
    caveat:
      "Scoped choice, not a universal rule. Long remote handlers also consume database connections, so worker concurrency and pool headroom are explicit operational constraints.",
    connectFlowNote:
      "Connect Flow is the current public issuance path; legacy /config is not presented as the primary interface.",
    representativeNote:
      "Fleet cards are representative architecture, not live node counts or per-node telemetry.",
  },
  ru: {
    eyebrow: "архитектурное решение / доставка задач",
    title: "Почему очередь живёт в PostgreSQL",
    expand: "развернуть архитектуру",
    collapse: "свернуть архитектуру",
    meta: "состояние · jobq · leases · retry · DLQ",
    mapHeading: "control plane / data plane",
    currentFlow: "текущий Connect Flow",
    edge: "01 · edge",
    edgeDetail: "маршрут · лимиты · идентичность",
    issue: "02 · выдача",
    issueDetail: "дедупликация · pending / ready",
    durable: "03 · устойчивое состояние",
    durableDetail: "core-таблицы + jobq",
    deviceQueue: "очередь уровня устройства",
    lifecycle: "жизненный цикл ноды",
    nodeQueue: "очередь уровня ноды",
    fleet: "парк Linux-нод / data plane",
    activeRule: "ACTIVE только после готовности заявленного протокола",
    anatomy: "устройство устойчивой задачи",
    jobq: "jobq на PostgreSQL",
    enqueue: "постановка",
    sharedTransaction: "опционально в общей DB-транзакции",
    claim: "получение",
    parallelWorkers: "параллельные воркеры",
    execute: "выполнение",
    crashRecovery: "восстановление после сбоя",
    resolve: "завершение",
    boundedOutcome: "ограниченный исход",
    fastWakeup: "быстрое пробуждение",
    fallback: "резерв доставки",
    periodicPoll: "периодический poll",
    serialization: "сериализация по ключу",
    advisory:
      "advisory lock не допускает пересечения работ над одним ресурсом",
    why: "почему здесь подходит PostgreSQL",
    decisionTitle: "Устойчивая очередь задач, а не поток событий.",
    decision:
      "Работа control plane связана с реляционным состоянием нод, слотов и policy. PostgreSQL держит эти инварианты рядом, позволяет транзакционно поставить задачу там, где это требуется сценарию, и даёт leases, отложенные повторы и дедупликацию без второй плоскости хранения и резервного копирования.",
    currentFit: "подходит сейчас",
    postgresFit: "задачи control plane, связанные с состоянием",
    revisit: "пересмотреть при",
    rabbitFit: "сложной маршрутизации, fan-out или большом потоке сообщений",
    kafkaFit: "переигрываемых потоках событий и множестве независимых consumers",
    caveat:
      "Это выбор для конкретного контура, а не универсальное правило. Долгие удалённые handlers также занимают соединения с базой, поэтому concurrency воркеров и запас DB pool являются явными операционными ограничениями.",
    connectFlowNote:
      "Connect Flow - текущий публичный путь выдачи; legacy /config не показан как основной интерфейс.",
    representativeNote:
      "Карточки парка показывают репрезентативную архитектуру, а не живое число нод или их телеметрию.",
  },
} as const;

export type VpnTechnicalCopy = (typeof vpnTechnicalCopy)[Locale];

export default function VpnTechnicalArchitecture({
  text,
}: {
  text: VpnTechnicalCopy;
}) {
  return (
    <>
      <TechnicalDisclosure
        bodyClassName="vpn-technical-body"
        className="vpn-technical"
        eyebrow={text.eyebrow}
        labels={{ expand: text.expand, collapse: text.collapse }}
        meta={text.meta}
        title={text.title}
      >
        <section
          className="vpn-architecture-map"
          aria-labelledby="vpn-map-title"
        >
          <div className="technical-section-heading">
            <span id="vpn-map-title">{text.mapHeading}</span>
            <strong>{text.currentFlow}</strong>
          </div>

          <div className="vpn-plane-row">
            <div>
              <span>{text.edge}</span>
              <strong>Nginx + auth-service</strong>
              <small>{text.edgeDetail}</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>{text.issue}</span>
              <strong>user-api + Redis</strong>
              <small>{text.issueDetail}</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="is-ledger">
              <span>{text.durable}</span>
              <strong>PostgreSQL</strong>
              <small>{text.durableDetail}</small>
            </div>
          </div>

          <div className="vpn-worker-split">
            <div>
              <span>user-worker</span>
              <strong>generate_config</strong>
              <small>{text.deviceQueue}</small>
            </div>
            <div className="vpn-worker-rail" aria-hidden="true">
              <i />
              <b />
              <i />
            </div>
            <div>
              <span>maintenance-worker</span>
              <strong>{text.lifecycle}</strong>
              <small>{text.nodeQueue}</small>
            </div>
          </div>

          <div className="vpn-data-plane">
            <span>{text.fleet}</span>
            <div>
              <strong>AWG</strong>
              <strong>Xray</strong>
              <small>{text.activeRule}</small>
            </div>
          </div>
        </section>

        <section
          className="vpn-queue-anatomy"
          aria-labelledby="vpn-queue-title"
        >
          <div className="technical-section-heading">
            <span id="vpn-queue-title">{text.anatomy}</span>
            <strong>{text.jobq}</strong>
          </div>

          <ol className="vpn-job-lifecycle">
            <li>
              <span>{text.enqueue}</span>
              <strong>idem_key</strong>
              <small>{text.sharedTransaction}</small>
            </li>
            <li>
              <span>{text.claim}</span>
              <strong>SKIP LOCKED</strong>
              <small>{text.parallelWorkers}</small>
            </li>
            <li>
              <span>{text.execute}</span>
              <strong>lease + heartbeat</strong>
              <small>{text.crashRecovery}</small>
            </li>
            <li>
              <span>{text.resolve}</span>
              <strong>success / retry / DLQ</strong>
              <small>{text.boundedOutcome}</small>
            </li>
          </ol>

          <div className="vpn-queue-wakeup">
            <div>
              <span>{text.fastWakeup}</span>
              <strong>LISTEN / NOTIFY</strong>
            </div>
            <i aria-hidden="true">+</i>
            <div>
              <span>{text.fallback}</span>
              <strong>{text.periodicPoll}</strong>
            </div>
          </div>

          <div className="vpn-queue-serial">
            <span>{text.serialization}</span>
            <strong>
              {"node:{node_id} · user:{user_id}:device:{device_id}"}
            </strong>
            <small>{text.advisory}</small>
          </div>
        </section>

        <section
          className="vpn-queue-decision"
          aria-labelledby="vpn-decision-title"
        >
          <div>
            <span id="vpn-decision-title">{text.why}</span>
            <h4>{text.decisionTitle}</h4>
            <p>{text.decision}</p>
          </div>

          <div className="vpn-broker-comparison">
            <div className="is-current">
              <span>{text.currentFit}</span>
              <strong>PostgreSQL jobq</strong>
              <small>{text.postgresFit}</small>
            </div>
            <div>
              <span>{text.revisit}</span>
              <strong>RabbitMQ</strong>
              <small>{text.rabbitFit}</small>
            </div>
            <div>
              <span>{text.revisit}</span>
              <strong>Kafka</strong>
              <small>{text.kafkaFit}</small>
            </div>
          </div>

          <p className="vpn-decision-caveat">{text.caveat}</p>
        </section>
      </TechnicalDisclosure>

      <div className="story-notes vpn-notes">
        <p>
          {text.connectFlowNote.includes("/config") ? (
            <>
              {text.connectFlowNote.split("/config")[0]}
              <code>/config</code>
              {text.connectFlowNote.split("/config")[1]}
            </>
          ) : (
            text.connectFlowNote
          )}
        </p>
        <p>{text.representativeNote}</p>
      </div>
    </>
  );
}
