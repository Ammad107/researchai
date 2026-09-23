'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleHelp,
  Clipboard,
  Clock3,
  Copy,
  Database,
  FileText,
  FlaskConical,
  Globe2,
  Layers3,
  LayoutDashboard,
  Link2,
  LoaderCircle,
  Moon,
  MoreHorizontal,
  Network,
  Play,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Sun,
  TerminalSquare,
  Upload,
  Users,
  Zap,
} from 'lucide-react'

const steps = [
  { title: 'Query decomposition & intent mapping', detail: 'Generated 12 sub-questions from your research brief.', icon: Network },
  { title: 'Autonomous multi-source extraction', detail: 'Scanning 48 sources across the global web.', icon: Globe2 },
  { title: 'Semantic chunking & verification', detail: 'Cross-referencing claims and filtering low-trust domains.', icon: ShieldCheck },
  { title: 'Executive synthesis & citation mapping', detail: 'Assembling a concise, decision-ready report.', icon: FileText },
]

const sources = [
  ['mckinsey.com', '92%', 'AI adoption is shifting from experimentation to workflow redesign.', 'Enterprise survey'],
  ['hbr.org', '89%', 'The highest-performing teams pair copilots with operating model changes.', 'Research brief'],
  ['stanford.edu', '97%', 'Human-in-the-loop review remains critical for high-stakes decisions.', 'Academic paper'],
  ['a16z.com', '84%', 'Vertical AI products are emerging as the next durable software layer.', 'Market analysis'],
]

export default function Page() {
  const [prompt, setPrompt] = useState('Analyze the enterprise AI adoption landscape in 2025. Identify the most defensible trends, leading use cases, and strategic implications for a B2B SaaS product team.')
  const [depth, setDepth] = useState('Deep-Dive Report')
  const [scope, setScope] = useState('Global Web')
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [tab, setTab] = useState('report')
  const [dark, setDark] = useState(true)
  const [copied, setCopied] = useState(false)
  const [governanceOpen, setGovernanceOpen] = useState(false)
  const [strictCitations, setStrictCitations] = useState(true)
  const [blacklist, setBlacklist] = useState(true)
  const [guardrailLevel, setGuardrailLevel] = useState('High Cross-Examination')
  const [sourceDepth, setSourceDepth] = useState(6)

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => setProgress((value) => {
      if (value >= 4) { window.clearInterval(timer); return 4 }
      return value + 1
    }), 900)
    return () => window.clearInterval(timer)
  }, [running])

  const status = useMemo(() => running ? (progress === 4 ? 'Complete' : 'Agent is working') : 'Ready to research', [running, progress])
  const startResearch = () => { setProgress(0); setRunning(true); setTab('report') }
  const copyMarkdown = async () => { await navigator.clipboard?.writeText('# Enterprise AI Adoption Landscape\n\nThe market is moving from pilots to workflow redesign.'); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }

  return (
    <div className={dark ? 'app-shell dark' : 'app-shell'}>
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Sparkles /></div><span>ResearchIQ <em>AI</em></span></div>
        <div className="workspace-switcher"><div className="workspace-icon">RI</div><div><small>WORKSPACE</small><strong>Acme Intelligence</strong></div><ChevronDown /></div>
        <nav className="nav-list" aria-label="Main navigation">
          <button className="nav-item active"><LayoutDashboard /> Command center</button>
          <button className="nav-item"><Clock3 /> Research history <span className="nav-count">12</span></button>
          <button className="nav-item"><Layers3 /> Collections</button>
          <button className="nav-item"><Users /> Team workspace</button>
        </nav>
        <div className="sidebar-label">SYSTEM</div>
        <nav className="nav-list"><button className="nav-item"><BarChart3 /> Usage &amp; analytics</button><button className="nav-item"><Settings2 /> Settings</button></nav>
        <div className="sidebar-bottom"><div className="usage-heading"><span>Token usage</span><strong>68%</strong></div><div className="usage-bar"><i /></div><p>68.4k of 100k tokens</p><button className="upgrade"><Zap /> Upgrade plan <ArrowUpRight /></button></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>Command center</strong></div><div className="top-actions"><div className="live-status"><i /> {status}</div><button className="icon-button" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button><button className="icon-button"><CircleHelp /></button><div className="avatar">AS</div></div></header>
        <section className="page-heading"><div><div className="eyebrow"><span className="pulse-dot" /> AUTONOMOUS RESEARCH SYSTEM</div><h1>Command center</h1><p>Turn complex questions into decision-ready intelligence.</p></div><button className="outline-button"><Plus /> New research</button></section>

        <section className="research-layout">
          <div className="panel prompt-panel"><div className="panel-heading"><div><span className="panel-kicker">01 / RESEARCH BRIEF</span><h2>What should we investigate?</h2></div><button className="more-button"><MoreHorizontal /></button></div><label className="prompt-label" htmlFor="research-prompt">Research prompt</label><textarea id="research-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} /><div className="field-row"><label>Research depth<select value={depth} onChange={(event) => setDepth(event.target.value)}><option>Quick Brief</option><option>Deep-Dive Report</option><option>Market Analysis Matrix</option></select></label><label>Search scope<select value={scope} onChange={(event) => setScope(event.target.value)}><option>Global Web</option><option>Academic</option><option>Tech Blogs</option></select></label></div><div className="prompt-footer"><span><TerminalSquare /> Shift + Enter for new line</span><button className="run-button" onClick={startResearch} disabled={running}>{running ? <LoaderCircle className="spin" /> : <Play />} {running ? 'Researching…' : 'Initialize agent'}<span className="button-kbd">⌘ ↵</span></button></div></div>

          <div className="panel telemetry-panel"><div className="panel-heading"><div><span className="panel-kicker">02 / LIVE TELEMETRY</span><h2>Agent execution stream</h2></div><span className="streaming-badge"><i /> LIVE</span></div><div className="step-list">{steps.map((step, index) => { const active = running && progress === index; const complete = running && progress > index; const Icon = step.icon; return <div className={`step ${active ? 'active' : ''} ${complete ? 'complete' : ''}`} key={step.title}><div className="step-rail"><div className="step-icon">{complete ? <Check /> : active ? <LoaderCircle className="spin" /> : <Icon />}</div>{index < steps.length - 1 && <div className="rail-line" />}</div><div className="step-copy"><div className="step-title">{step.title}<span>{complete ? 'Complete' : active ? 'Running' : 'Queued'}</span></div><p>{step.detail}</p>{active && <div className="activity"><i /><i /><i /><span>{blacklist && index === 2 ? 'Applying domain blacklist filter…' : strictCitations && index === 3 ? 'Mapping verified URLs to claims…' : 'Working across tool calls'}</span></div>}</div></div> })}</div><div className="telemetry-footer"><span><Database /> 24 tools available</span><span><Clock3 /> Avg. run 02:48</span></div></div>
        </section>

        <section className={`governance-panel ${governanceOpen ? 'is-open' : ''}`} aria-label="Agent Governance & Guardrails">
          <button className="governance-toggle" onClick={() => setGovernanceOpen(!governanceOpen)} aria-expanded={governanceOpen}>
            <span className="governance-icon"><ShieldAlert /></span><span><b>Agent Governance &amp; Guardrails</b><small>Control evidence quality, source trust, and cross-examination depth.</small></span><SlidersHorizontal className="governance-settings" /><ChevronDown className="governance-chevron" />
          </button>
          {governanceOpen && <div className="governance-controls">
            <label className="governance-control"><span><b>Strict Citation Enforcement</b><small>Requires every claim to map to verified URLs.</small></span><input type="checkbox" checked={strictCitations} onChange={(event) => setStrictCitations(event.target.checked)} /><i /></label>
            <label className="governance-control"><span><b>Domain Blacklisting</b><small>Excludes low-trust or unverified blogs/forums.</small></span><input type="checkbox" checked={blacklist} onChange={(event) => setBlacklist(event.target.checked)} /><i /></label>
            <label className="governance-field"><span><b>Hallucination Guardrail Level</b><small>Sets the agent&apos;s verification threshold.</small></span><select value={guardrailLevel} onChange={(event) => setGuardrailLevel(event.target.value)}><option>Standard</option><option>High Cross-Examination</option></select></label>
            <label className="governance-field range-field"><span><b>Max Source Depth</b><small>{sourceDepth} sources per sub-query</small></span><output>{sourceDepth}</output><input type="range" min="3" max="10" value={sourceDepth} onChange={(event) => setSourceDepth(Number(event.target.value))} /></label>
          </div>}
        </section>

        <section className="output-section"><div className="output-heading"><div><div className="eyebrow">03 / OUTPUT DASHBOARD</div><h2>Research workspace</h2></div><div className="output-actions"><span className="saved"><Check /> Auto-saved just now</span><button className="icon-button"><Upload /></button></div></div><div className="tabs"><button className={tab === 'report' ? 'tab active' : 'tab'} onClick={() => setTab('report')}><FileText /> Executive synthesis <span>01</span></button><button className={tab === 'sources' ? 'tab active' : 'tab'} onClick={() => setTab('sources')}><ShieldCheck /> Source credibility matrix <span>04</span></button><button className={tab === 'metrics' ? 'tab active' : 'tab'} onClick={() => setTab('metrics')}><BarChart3 /> Evaluation &amp; Telemetry Metrics</button><button className={tab === 'export' ? 'tab active' : 'tab'} onClick={() => setTab('export')}><Clipboard /> Export &amp; PM handoff</button></div><div className="output-panel">{tab === 'report' && <ReportView />} {tab === 'sources' && <SourceView />} {tab === 'metrics' && <MetricsView sourceDepth={sourceDepth} guardrailLevel={guardrailLevel} />} {tab === 'export' && <ExportView copied={copied} copyMarkdown={copyMarkdown} />}</div></section>
        <footer className="footer"><span>ResearchIQ AI <b>v2.4.0</b></span><span>All systems operational <i /></span></footer>
      </main>
    </div>
  )
}

function ReportView() { return <article className="report-view"><div className="report-meta"><span>DEEP-DIVE REPORT</span><span>Generated 23 Sep 2026 · 1,842 words</span></div><h2>Enterprise AI is entering the <mark>operational era</mark></h2><p className="lead">The competitive frontier is moving beyond model access. Leading organizations are redesigning workflows around AI-native systems, with measurable gains emerging where adoption is paired with clear governance and human review.</p><div className="insight-grid"><div className="insight-card violet"><span>KEY INSIGHT / 01</span><strong>From pilots to platforms</strong><p>72% of enterprise AI programs now prioritize repeatable workflows over isolated experiments.</p></div><div className="insight-card cyan"><span>KEY INSIGHT / 02</span><strong>Trust compounds adoption</strong><p>Transparent citations and review loops correlate with 2.4× higher weekly active usage.</p></div></div><h3>What matters for product teams</h3><ul><li><b>Design for orchestration,</b> not just assistance. The winning layer coordinates context, tools, and human decisions.</li><li><b>Make evidence visible.</b> Audit trails and source provenance are becoming product features, not compliance overhead.</li><li><b>Own the workflow outcome.</b> Customers are buying time-to-decision and revenue impact, not tokens or prompts.</li></ul><div className="citation-row"><span>Sources referenced</span><button>[1] McKinsey</button><button>[2] Harvard Business Review</button><button>[3] Stanford HAI</button></div></article> }
function SourceView() { return <div className="source-view"><div className="source-summary"><div><span className="summary-number">92%</span><span>Average trust score</span></div><div><span className="summary-number">48</span><span>Sources scanned</span></div><div><span className="summary-number">04</span><span>Sources cited</span></div></div><div className="table-wrap"><table><thead><tr><th>DOMAIN</th><th>TRUST SCORE</th><th>KEY FINDING EXTRACTED</th><th>TYPE</th><th /></tr></thead><tbody>{sources.map((source) => <tr key={source[0]}><td><div className="domain"><span><Globe2 /></span><b>{source[0]}</b></div></td><td><strong className="score">{source[1]}</strong><div className="mini-bar"><i style={{ width: source[1] }} /></div></td><td>{source[2]}</td><td><span className="type-badge">{source[3]}</span></td><td><Link2 /></td></tr>)}</tbody></table></div></div> }
function MetricsView({ sourceDepth, guardrailLevel }: { sourceDepth: number, guardrailLevel: string }) {
  const metrics = [['Average Query Latency', '4.2s', '−18% vs. workspace avg', Clock3], ['Citation Accuracy Score', '96.4%', 'Verified source match', ShieldCheck], ['Token Efficiency', '82.7%', '68.4k tokens consumed', Zap], ['Tool-Call Success Rate', '100%', '48 / 48 API calls passed', Check]] as const
  return <div className="metrics-view"><div className="metrics-intro"><div><span className="report-meta">EVALUATION RUN / 24 SEP 2026</span><h2>Agent performance telemetry</h2><p>Live evaluation signals from the current research run and active governance profile.</p></div><span className="evaluation-status"><i /> Evaluation healthy</span></div><div className="metric-grid">{metrics.map(([label, value, detail, Icon]) => <div className="metric-card" key={label}><div className="metric-card-top"><span>{label}</span><Icon /></div><strong>{value}</strong><small>{detail}</small></div>)}</div><div className="evaluation-footer"><span><ShieldCheck /> {guardrailLevel} enabled</span><span><Database /> {sourceDepth} max sources / sub-query</span><span><SlidersHorizontal /> Evaluation profile: Production</span></div></div>
}

function ExportView({ copied, copyMarkdown }: { copied: boolean, copyMarkdown: () => void }) { return <div className="export-view"><div className="export-hero"><div className="export-icon"><Clipboard /></div><div><h2>Ready for the next decision?</h2><p>Package this research for your team or take it into your product workflow.</p></div></div><div className="export-grid"><button onClick={copyMarkdown}><Copy /><strong>{copied ? 'Copied to clipboard' : 'Copy Markdown'}</strong><span>Bring the full synthesis into any doc.</span></button><button><FileText /><strong>Export as PRD spec</strong><span>Create a structured product brief.</span></button><button><Link2 /><strong>Share live sandbox link</strong><span>Invite collaborators to this report.</span></button></div></div> }
