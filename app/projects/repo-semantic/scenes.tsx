import type { CSSProperties } from "react";
import type { Locale } from "../../content/locales";
import type { RepoSemanticStageId } from "./content";

const indexBars = [82, 58, 91, 69, 47, 76, 63, 86] as const;

export const repoSemanticSceneCopy = {
  en: {
    targetRepo: "target repository",
    explicitTarget: "explicit on every read tool",
    runtimePool: "mounted repository pool",
    poolCapacity: "3 active · capacity 10",
    defaultRoute: "default",
    ready: "ready",
    active: "active",
    searchGate: "search",
    searchUsable: "usable",
    watcherGate: "watcher",
    watcherRunning: "running",
    graphGate: "graph",
    graphEffective: "effective",
    readinessState: "readiness state",
    readyState: "ready · no recovery required",
    lifecycleRule: "read-only tools never mutate lifecycle",
    lifecycleDetail:
      "build · rebuild · reindex · graph update remain explicit actions",
    sourceFiles: "repository files",
    sourceTypes: ["Python", "Markdown", "YAML / JSON", "TS / CUDA"],
    structuredChunking: "structure-aware chunking",
    chunkDetails: "symbols · headings · paths · line ranges",
    codeCollection: "code collection",
    docsCollection: "docs collection",
    denseVector: "dense · semantic meaning",
    sparseVector: "sparse · exact code terms",
    graphArtifact: "typed SQLite graph",
    manifest: "path manifest",
    watcherRail: "incremental freshness rail",
    watcherSequence: "edit / delete / branch switch",
    reconcile: "bounded reconcile",
    converged: "index + graph converge",
    queryLabel: "agent question",
    query:
      "Where is start_watcher recovery decided after a branch switch?",
    anchorAnalysis: "exact-anchor analysis",
    anchorDetected: "start_watcher · identifier",
    denseLane: "dense lane",
    denseQuery: "raw question",
    denseWeight: "weight 0.8",
    sparseLane: "sparse lane",
    sparseQuery: "code-normalized terms",
    sparseWeight: "weight 1.4",
    rankFusion: "rank fusion",
    rrfDetail: "RRF k = 60 · no raw-score blending",
    rerankStage: "bounded rerank",
    rerankDetail: "top 80 · exact hits pinned · timeout fallback",
    exactAuthority: "exact authority",
    rgHint: "rg --fixed-strings start_watcher .",
    graphHeading: "typed structural expansion",
    graphMeta: "strong seeds only · bounded and freshness-gated",
    seed: "seed",
    graphNodes: {
      summary: "status/summary.py",
      watcher: "watcher.py",
      indexer: "indexer.py",
      tests: "test_status_summary.py",
      docs: "P6.C readiness spec",
      config: "config.py",
    },
    relations: {
      imports: "imports",
      calls: "references",
      tests: "tested by",
      docs: "documented by",
      config: "reads config",
    },
    graphBudget: "20 seeds · 200 candidates · 3 evidence paths / result",
    graphRule: "explicit exact handoff → graph off → local rg",
    envelopeHeading: "grounded context envelope",
    envelopeMeta: "ranked files · explanations · next actions",
    fileRows: [
      ["01", "status/index_status.py", "196–301", "D · S"],
      ["02", "status/summary.py", "319–477", "D · S · G"],
      ["03", "watcher.py", "71–185", "D · G"],
      ["04", "indexer.py", "265–458", "S · G"],
    ],
    originLegend: "D dense · S sparse · G graph",
    matchedTerms: "matched terms",
    matchedValue: "start_watcher · branch switch · recovery",
    uncoveredTerms: "uncovered",
    uncoveredValue: "catch-up timeout",
    nextActions: "recommended next actions",
    actionRead: "read exact file ranges",
    actionExact: "verify start_watcher with local rg",
    handoffRule: "MCP stops here",
    handoffDetail: "the coding agent reads, verifies and edits",
  },
  ru: {
    targetRepo: "целевой репозиторий",
    explicitTarget: "явно передаётся каждому read tool",
    runtimePool: "пул подключённых репозиториев",
    poolCapacity: "3 active · вместимость 10",
    defaultRoute: "по умолчанию",
    ready: "готов",
    active: "активен",
    searchGate: "search",
    searchUsable: "доступен",
    watcherGate: "watcher",
    watcherRunning: "работает",
    graphGate: "graph",
    graphEffective: "доступен",
    readinessState: "состояние готовности",
    readyState: "ready · восстановление не требуется",
    lifecycleRule: "read-only tools не меняют lifecycle",
    lifecycleDetail:
      "build · rebuild · reindex · graph update остаются явными действиями",
    sourceFiles: "файлы репозитория",
    sourceTypes: ["Python", "Markdown", "YAML / JSON", "TS / CUDA"],
    structuredChunking: "structure-aware chunking",
    chunkDetails: "symbols · headings · paths · диапазоны строк",
    codeCollection: "коллекция code",
    docsCollection: "коллекция docs",
    denseVector: "dense · семантический смысл",
    sparseVector: "sparse · точные code terms",
    graphArtifact: "типизированный SQLite graph",
    manifest: "path manifest",
    watcherRail: "контур incremental freshness",
    watcherSequence: "edit / delete / смена ветки",
    reconcile: "ограниченный reconcile",
    converged: "index + graph сходятся",
    queryLabel: "вопрос агента",
    query:
      "Где решается recovery для start_watcher после смены ветки?",
    anchorAnalysis: "анализ exact anchors",
    anchorDetected: "start_watcher · identifier",
    denseLane: "dense-ветка",
    denseQuery: "исходный вопрос",
    denseWeight: "вес 0.8",
    sparseLane: "sparse-ветка",
    sparseQuery: "code-normalized terms",
    sparseWeight: "вес 1.4",
    rankFusion: "слияние рангов",
    rrfDetail: "RRF k = 60 · без смешивания raw scores",
    rerankStage: "ограниченный rerank",
    rerankDetail: "top 80 · exact hits закреплены · fallback при timeout",
    exactAuthority: "точный источник истины",
    rgHint: "rg --fixed-strings start_watcher .",
    graphHeading: "типизированное структурное расширение",
    graphMeta: "только сильные seeds · bounds + freshness gate",
    seed: "seed",
    graphNodes: {
      summary: "status/summary.py",
      watcher: "watcher.py",
      indexer: "indexer.py",
      tests: "test_status_summary.py",
      docs: "P6.C readiness spec",
      config: "config.py",
    },
    relations: {
      imports: "imports",
      calls: "references",
      tests: "tested by",
      docs: "documented by",
      config: "reads config",
    },
    graphBudget: "20 seeds · 200 candidates · 3 evidence paths / result",
    graphRule: "explicit exact handoff → graph off → local rg",
    envelopeHeading: "grounded context envelope",
    envelopeMeta: "ранжированные файлы · объяснения · следующие действия",
    fileRows: [
      ["01", "status/index_status.py", "196–301", "D · S"],
      ["02", "status/summary.py", "319–477", "D · S · G"],
      ["03", "watcher.py", "71–185", "D · G"],
      ["04", "indexer.py", "265–458", "S · G"],
    ],
    originLegend: "D dense · S sparse · G graph",
    matchedTerms: "matched terms",
    matchedValue: "start_watcher · смена ветки · recovery",
    uncoveredTerms: "не покрыто",
    uncoveredValue: "catch-up timeout",
    nextActions: "рекомендуемые действия",
    actionRead: "прочитать точные диапазоны файлов",
    actionExact: "проверить start_watcher локальным rg",
    handoffRule: "на этом MCP останавливается",
    handoffDetail: "coding-агент читает, проверяет и редактирует",
  },
} as const;

export type RepoSemanticSceneCopy =
  (typeof repoSemanticSceneCopy)[Locale];

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <i
      aria-hidden="true"
      className={`repo-flow-arrow${vertical ? " is-vertical" : ""}`}
    >
      <b />
    </i>
  );
}

function TargetScene({ copy }: { copy: RepoSemanticSceneCopy }) {
  const repos = [
    ["repo-semantic-mcp", copy.active, true],
    ["rag_app", copy.ready, false],
    ["vpn-server", copy.ready, false],
  ] as const;

  return (
    <div className="story-scene repo-scene repo-target-scene">
      <div className="repo-target-path">
        <span>{copy.targetRepo}</span>
        <strong>/workspace/repo-semantic-mcp</strong>
        <small>{copy.explicitTarget}</small>
      </div>

      <div className="repo-runtime-pool">
        <header>
          <span>{copy.runtimePool}</span>
          <strong>{copy.poolCapacity}</strong>
        </header>
        <div>
          {repos.map(([name, state, active]) => (
            <div className={active ? "is-active" : ""} key={name}>
              <i aria-hidden="true" />
              <strong>{name}</strong>
              <small>{state}</small>
              {active ? <b>{copy.defaultRoute}</b> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="repo-readiness-grid">
        <div>
          <span>{copy.searchGate}</span>
          <strong>{copy.searchUsable}</strong>
          <i aria-hidden="true" />
        </div>
        <div>
          <span>{copy.watcherGate}</span>
          <strong>{copy.watcherRunning}</strong>
          <i aria-hidden="true" />
        </div>
        <div>
          <span>{copy.graphGate}</span>
          <strong>{copy.graphEffective}</strong>
          <i aria-hidden="true" />
        </div>
      </div>

      <div className="repo-readiness-state">
        <span>{copy.readinessState}</span>
        <strong>{copy.readyState}</strong>
      </div>

      <div className="repo-lifecycle-rule">
        <i aria-hidden="true">!</i>
        <div>
          <strong>{copy.lifecycleRule}</strong>
          <small>{copy.lifecycleDetail}</small>
        </div>
      </div>
    </div>
  );
}

function IndexScene({ copy }: { copy: RepoSemanticSceneCopy }) {
  return (
    <div className="story-scene repo-scene repo-index-scene">
      <div className="repo-index-main">
        <div className="repo-source-files">
          <span>{copy.sourceFiles}</span>
          {copy.sourceTypes.map((source, index) => (
            <div key={source}>
              <i>{[".py", ".md", ".yml", ".tsx"][index]}</i>
              <strong>{source}</strong>
            </div>
          ))}
        </div>

        <FlowArrow />

        <div className="repo-chunker-core">
          <span>{copy.structuredChunking}</span>
          <strong>AST · headings · structured data</strong>
          <small>{copy.chunkDetails}</small>
          <div aria-hidden="true">
            {indexBars.map((width, index) => (
              <i
                key={`${width}-${index}`}
                style={
                  {
                    "--repo-index-width": `${width}%`,
                    "--repo-index-delay": `${index * 90}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>

        <FlowArrow />

        <div className="repo-index-stores">
          <div>
            <span>Qdrant</span>
            <strong>{copy.codeCollection}</strong>
            <small>{copy.denseVector}</small>
            <small>{copy.sparseVector}</small>
          </div>
          <div>
            <span>Qdrant</span>
            <strong>{copy.docsCollection}</strong>
            <small>{copy.denseVector}</small>
            <small>{copy.sparseVector}</small>
          </div>
          <div>
            <span>SQLite</span>
            <strong>{copy.graphArtifact}</strong>
            <small>{copy.manifest}</small>
          </div>
        </div>
      </div>

      <div className="repo-watcher-rail">
        <span>{copy.watcherRail}</span>
        <strong>{copy.watcherSequence}</strong>
        <i aria-hidden="true">
          <b />
        </i>
        <strong>{copy.reconcile}</strong>
        <i aria-hidden="true">
          <b />
        </i>
        <strong>{copy.converged}</strong>
      </div>
    </div>
  );
}

function RetrievalLane({
  copy,
  dense,
}: {
  copy: RepoSemanticSceneCopy;
  dense: boolean;
}) {
  const bars = dense ? indexBars : [...indexBars].reverse();

  return (
    <div className={`repo-retrieval-lane ${dense ? "is-dense" : "is-sparse"}`}>
      <header>
        <span>{dense ? copy.denseLane : copy.sparseLane}</span>
        <strong>{dense ? copy.denseWeight : copy.sparseWeight}</strong>
      </header>
      <small>{dense ? copy.denseQuery : copy.sparseQuery}</small>
      <div aria-hidden="true">
        {bars.map((width, index) => (
          <i
            key={`${width}-${index}`}
            style={{ "--repo-hit-width": `${width}%` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function RetrieveScene({ copy }: { copy: RepoSemanticSceneCopy }) {
  return (
    <div className="story-scene repo-scene repo-retrieve-scene">
      <div className="repo-query-card">
        <span>{copy.queryLabel}</span>
        <strong>{copy.query}</strong>
        <div>
          <small>{copy.anchorAnalysis}</small>
          <b>{copy.anchorDetected}</b>
        </div>
      </div>

      <div className="repo-retrieval-lanes">
        <RetrievalLane copy={copy} dense />
        <RetrievalLane copy={copy} dense={false} />
      </div>

      <div className="repo-ranking-spine">
        <div>
          <span>{copy.rankFusion}</span>
          <strong>weighted RRF</strong>
          <small>{copy.rrfDetail}</small>
        </div>
        <FlowArrow />
        <div className="is-accented">
          <span>{copy.rerankStage}</span>
          <strong>code-aware reorder</strong>
          <small>{copy.rerankDetail}</small>
        </div>
      </div>

      <div className="repo-exact-handoff">
        <span>{copy.exactAuthority}</span>
        <strong>{copy.rgHint}</strong>
      </div>
    </div>
  );
}

function ConnectScene({ copy }: { copy: RepoSemanticSceneCopy }) {
  return (
    <div className="story-scene repo-scene repo-connect-scene">
      <header>
        <span>{copy.graphHeading}</span>
        <strong>{copy.graphMeta}</strong>
      </header>

      <div className="repo-graph-canvas">
        <div className="repo-graph-node is-doc">
          <span>{copy.relations.docs}</span>
          <strong>{copy.graphNodes.docs}</strong>
        </div>
        <div className="repo-graph-node is-test">
          <span>{copy.relations.tests}</span>
          <strong>{copy.graphNodes.tests}</strong>
        </div>
        <div className="repo-graph-node is-seed">
          <span>{copy.seed}</span>
          <strong>{copy.graphNodes.summary}</strong>
          <i aria-hidden="true" />
        </div>
        <div className="repo-graph-node is-watcher">
          <span>{copy.relations.imports}</span>
          <strong>{copy.graphNodes.watcher}</strong>
        </div>
        <div className="repo-graph-node is-indexer">
          <span>{copy.relations.calls}</span>
          <strong>{copy.graphNodes.indexer}</strong>
        </div>
        <div className="repo-graph-node is-config">
          <span>{copy.relations.config}</span>
          <strong>{copy.graphNodes.config}</strong>
        </div>
        <div aria-hidden="true" className="repo-graph-links">
          {Array.from({ length: 6 }, (_, index) => (
            <i className={`link-${index + 1}`} key={index}>
              <b />
            </i>
          ))}
        </div>
      </div>

      <div className="repo-graph-budget">
        <strong>{copy.graphBudget}</strong>
        <span>{copy.graphRule}</span>
      </div>
    </div>
  );
}

function HandoffScene({ copy }: { copy: RepoSemanticSceneCopy }) {
  return (
    <div className="story-scene repo-scene repo-handoff-scene">
      <header>
        <span>{copy.envelopeHeading}</span>
        <strong>{copy.envelopeMeta}</strong>
      </header>

      <div className="repo-envelope-main">
        <div className="repo-file-groups">
          {copy.fileRows.map(([rank, path, range, origins]) => (
            <div key={path}>
              <span>{rank}</span>
              <strong>{path}</strong>
              <small>L{range}</small>
              <b>{origins}</b>
            </div>
          ))}
          <footer>{copy.originLegend}</footer>
        </div>

        <div className="repo-envelope-diagnostics">
          <div>
            <span>{copy.matchedTerms}</span>
            <strong>{copy.matchedValue}</strong>
          </div>
          <div className="is-uncovered">
            <span>{copy.uncoveredTerms}</span>
            <strong>{copy.uncoveredValue}</strong>
          </div>
          <section>
            <span>{copy.nextActions}</span>
            <strong>01 · {copy.actionRead}</strong>
            <strong>02 · {copy.actionExact}</strong>
          </section>
        </div>
      </div>

      <div className="repo-agent-handoff">
        <span>{copy.handoffRule}</span>
        <strong>{copy.handoffDetail}</strong>
      </div>
    </div>
  );
}

export function RepoSemanticScene({
  copy,
  stage,
}: {
  copy: RepoSemanticSceneCopy;
  stage: RepoSemanticStageId;
}) {
  if (stage === "target") return <TargetScene copy={copy} />;
  if (stage === "index") return <IndexScene copy={copy} />;
  if (stage === "retrieve") return <RetrieveScene copy={copy} />;
  if (stage === "connect") return <ConnectScene copy={copy} />;
  return <HandoffScene copy={copy} />;
}
