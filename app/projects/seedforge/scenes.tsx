import type { Locale } from "../../content/locales";
import type { SeedforgeStageId } from "./content";

const biomes = [
  { label: "coal", source: true },
  { label: "coal alt", source: true },
  { label: "excav", source: true },
  { label: "snow cave", source: true },
  { label: "castle", source: true },
  { label: "rain", source: true },
  { label: "rain open", source: true },
  { label: "vault", source: true },
  { label: "crypt", source: true },
  { label: "fungi cave", source: true },
  { label: "fungi", source: true },
  { label: "rain dark", source: true },
  { label: "liquid", source: false },
  { label: "wand", source: false },
  { label: "the end", source: false },
  { label: "the sky", source: false },
  { label: "wizard", source: true },
  { label: "sand", source: false },
  { label: "pyramid", source: false },
  { label: "robobase", source: true },
  { label: "frozen", source: true },
  { label: "meat", source: true },
];

export const seedforgeSceneCopy = {
  en: {
    source: "source",
    runtime: "runtime",
    contract: "contract",
    cudaEngine: "CUDA engine",
    nativeBuild: "native build",
    resultStream: "result stream",
    deviceIdentity: "device identity",
    gameData: "game data",
    firstAcceptedOutput: "first accepted output",
    pass: "PASS",
    live: "LIVE",
    sameSeedBlock: "same seed block",
    canonicalBytes: "canonical bytes · duplicate + order preserving",
    hashMatch: "SHA-256 MATCH",
    productiveBiomes: "productive source biomes",
    boundaryTargets: "boundary-only targets retained",
    crossCheck: "sampled independent cross-check",
    telescopeCases: "916 CUDA ↔ Telescope cases",
    knownResiduals: "known residuals remain named in the evidence",
    ledger: "durable seed-range ledger",
    disjointRanges: "disjoint ranges · no gaps · no overlaps",
    worker: "worker",
    biomeAware: "biome-aware",
    scheduler: "scheduler",
    capacityWeighted: "capacity weighted",
    uuidPinned: "UUID-pinned",
    interruptedCell: "interrupted cell",
    recovery: "fingerprint → requeue → resume",
    census: "complete coalmine census",
    supportedRange: "100% of the supported range",
    chests: "great chests cataloged",
    orbSeeds: "known natural Orb seeds",
    acceptedCells: "accepted dual-GPU ROI12 cells",
    canonicalStream: "canonical stream",
    leaderboard: "leaderboard.csv",
    hashManifest: "hash manifest",
  },
  ru: {
    source: "источник",
    runtime: "выполнение",
    contract: "контракт",
    cudaEngine: "CUDA-движок",
    nativeBuild: "нативная сборка",
    resultStream: "поток результатов",
    deviceIdentity: "идентичность устройства",
    gameData: "игровые данные",
    firstAcceptedOutput: "первый принятый результат",
    pass: "ПРОЙДЕНО",
    live: "РАБОТАЕТ",
    sameSeedBlock: "тот же блок seed",
    canonicalBytes: "канонические байты · с сохранением дублей и порядка",
    hashMatch: "SHA-256 СОВПАЛ",
    productiveBiomes: "продуктивных биомов-источников",
    boundaryTargets: "сохранённых граничных целей",
    crossCheck: "выборочная независимая проверка",
    telescopeCases: "916 сравнений CUDA ↔ Telescope",
    knownResiduals: "известные расхождения явно указаны в доказательствах",
    ledger: "устойчивый реестр диапазонов seed",
    disjointRanges: "непересекающиеся диапазоны · без пропусков",
    worker: "воркер",
    biomeAware: "с учётом биома",
    scheduler: "планировщик",
    capacityWeighted: "взвешено по мощности",
    uuidPinned: "закреплён по UUID",
    interruptedCell: "прерванная ячейка",
    recovery: "отпечаток → очередь → продолжение",
    census: "полная перепись coalmine",
    supportedRange: "100% поддерживаемого диапазона",
    chests: "каталогизировано great chest",
    orbSeeds: "известных естественных Orb seed",
    acceptedCells: "принятых ячеек ROI12 на двух GPU",
    canonicalStream: "канонический поток",
    leaderboard: "leaderboard.csv",
    hashManifest: "манифест хешей",
  },
} as const;

export type SeedforgeSceneCopy = (typeof seedforgeSceneCopy)[Locale];

function RuntimeScene({ copy }: { copy: SeedforgeSceneCopy }) {

  return (
    <div className="story-scene runtime-scene">
      <div className="runtime-flow">
        <div className="scene-node">
          <span>{copy.source}</span>
          <strong>{copy.cudaEngine}</strong>
        </div>
        <span className="scene-arrow" aria-hidden="true">
          →
        </span>
        <div className="scene-node">
          <span>{copy.runtime}</span>
          <strong>{copy.nativeBuild}</strong>
        </div>
        <span className="scene-arrow" aria-hidden="true">
          →
        </span>
        <div className="scene-node">
          <span>{copy.contract}</span>
          <strong>{copy.resultStream}</strong>
        </div>
      </div>

      <div className="runtime-checks">
        <div>
          <span>{copy.deviceIdentity}</span>
          <strong>V100 · sm_70</strong>
          <b>{copy.pass}</b>
        </div>
        <div>
          <span>{copy.gameData}</span>
          <strong>data.wak · SHA-256</strong>
          <b>{copy.pass}</b>
        </div>
        <div>
          <span>{copy.firstAcceptedOutput}</span>
          <strong>progress → hit → done</strong>
          <b>{copy.live}</b>
        </div>
      </div>
    </div>
  );
}

function ProofScene({ copy }: { copy: SeedforgeSceneCopy }) {

  return (
    <div className="story-scene proof-scene">
      <div className="byte-streams">
        {["CPU", "V100", "RTX"].map((worker) => (
          <div className="byte-stream" key={worker}>
            <strong>{worker}</strong>
            <div aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => (
                <span
                  className={index % 5 === 0 ? "is-marked" : ""}
                  key={index}
                />
              ))}
            </div>
            <small>{copy.sameSeedBlock}</small>
          </div>
        ))}
      </div>

      <div className="canonical-gate">
        <span>{copy.canonicalBytes}</span>
        <strong>{copy.hashMatch}</strong>
      </div>
    </div>
  );
}

function CoverageScene({ copy }: { copy: SeedforgeSceneCopy }) {

  return (
    <div className="story-scene coverage-scene">
      <div className="biome-grid" aria-hidden="true">
        {biomes.map((biome) => (
          <span
            className={biome.source ? "is-source" : "is-boundary"}
            key={biome.label}
          >
            {biome.label}
          </span>
        ))}
      </div>

      <div className="coverage-legend">
        <span>
          <i className="legend-source" aria-hidden="true" />
          <strong>16</strong> {copy.productiveBiomes}
        </span>
        <span>
          <i className="legend-boundary" aria-hidden="true" />
          <strong>6</strong> {copy.boundaryTargets}
        </span>
      </div>

      <div className="coverage-gate">
        <span>{copy.crossCheck}</span>
        <strong>{copy.telescopeCases}</strong>
        <small>{copy.knownResiduals}</small>
      </div>
    </div>
  );
}

function OrchestrationScene({ copy }: { copy: SeedforgeSceneCopy }) {
  const workCells = Array.from({ length: 14 }, (_, index) => index);

  return (
    <div className="story-scene orchestration-scene">
      <div className="work-ledger">
        <span>{copy.ledger}</span>
        <div aria-hidden="true">
          {workCells.map((cell) => (
            <i
              className={
                cell < 8
                  ? "is-complete"
                  : cell === 8
                    ? "is-active"
                    : "is-queued"
              }
              key={cell}
            />
          ))}
        </div>
        <small>{copy.disjointRanges}</small>
      </div>

      <div className="gpu-workers">
        <div className="gpu-worker v100-worker">
          <div>
            <span>{copy.worker} 0</span>
            <strong>Tesla V100</strong>
          </div>
          <b>80 SM · sm_70</b>
          <p>59.5k seed/s</p>
          <small>{copy.uuidPinned}</small>
        </div>

        <div className="scheduler-node">
          <span>{copy.biomeAware}</span>
          <strong>{copy.scheduler}</strong>
          <small>{copy.capacityWeighted}</small>
        </div>

        <div className="gpu-worker rtx-worker">
          <div>
            <span>{copy.worker} 1</span>
            <strong>RTX 5060 Ti</strong>
          </div>
          <b>36 SM · sm_120</b>
          <p>75.7k seed/s</p>
          <small>{copy.uuidPinned}</small>
        </div>
      </div>

      <div className="recovery-line">
        <span>{copy.interruptedCell}</span>
        <i aria-hidden="true">↶</i>
        <strong>{copy.recovery}</strong>
      </div>
    </div>
  );
}

function PublishScene({ copy }: { copy: SeedforgeSceneCopy }) {

  return (
    <div className="story-scene publish-scene">
      <div className="census-range">
        <div>
          <span>{copy.census}</span>
          <strong>1 → 2,147,483,645</strong>
        </div>
        <div className="census-progress" aria-hidden="true">
          <span />
        </div>
        <small>{copy.supportedRange}</small>
      </div>

      <div className="evidence-results">
        <div>
          <strong>3,332,208</strong>
          <span>{copy.chests}</span>
        </div>
        <div>
          <strong>55 / 55</strong>
          <span>{copy.orbSeeds}</span>
        </div>
        <div>
          <strong>433 / 433</strong>
          <span>{copy.acceptedCells}</span>
        </div>
      </div>

      <div className="artifact-row">
        <span>{copy.canonicalStream}</span>
        <span>records.sqlite3</span>
        <span>{copy.leaderboard}</span>
        <span>{copy.hashManifest}</span>
      </div>
    </div>
  );
}

export function SeedforgeScene({
  copy,
  stage,
}: {
  copy: SeedforgeSceneCopy;
  stage: SeedforgeStageId;
}) {
  if (stage === "run") return <RuntimeScene copy={copy} />;
  if (stage === "prove") return <ProofScene copy={copy} />;
  if (stage === "cover") return <CoverageScene copy={copy} />;
  if (stage === "orchestrate") {
    return <OrchestrationScene copy={copy} />;
  }
  return <PublishScene copy={copy} />;
}
