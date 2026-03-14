'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AgentLiveData {
  status?: string
  lastTask?: string
  lastRun?: string
}

interface CronLiveData {
  status?: string
  lastRun?: string
  lastOutput?: string
}

interface Lesson {
  date: string
  agent: string
  severity: 'HIGH' | 'MEDIUM'
  text?: string
  lesson?: string
}

interface EmpireStatus {
  agents?: Record<string, AgentLiveData>
  crons?: Record<string, CronLiveData>
  lessons?: Lesson[]
  error?: string
}

interface Props {
  initialData: EmpireStatus
}

// ─── Static config ────────────────────────────────────────────────────────────

const AGENTS = [
  { id: 'pruttius', name: 'Pruttius Maximus', role: 'CEO / Orchestrator', emoji: '👑', color: '#C9A84C', telegram: '@pruttius_bot', workspace: 'workspace/' },
  { id: 'scriptor', name: 'Scriptor', role: 'Content & SEO', emoji: '✍️', color: '#7EC8E3', telegram: '@pouchout_scriptor_bot', workspace: 'workspace-scriptor/' },
  { id: 'crescentius', name: 'Crescentius', role: 'Ads & Growth', emoji: '📊', color: '#A78BFA', telegram: '@pouchout_crescentius_bot', workspace: 'workspace-crescentius/' },
  { id: 'socialis', name: 'Socialis', role: 'Social & TikTok', emoji: '🦊', color: '#FB923C', telegram: '@pouchout_socialis_bot', workspace: 'workspace-socialis/' },
  { id: 'fabricius', name: 'Fabricius', role: 'iOS Apps', emoji: '🦡', color: '#34D399', telegram: '@pouchout_fabricius_bot', workspace: 'workspace-fabricius/' },
  { id: 'designius', name: 'Designius', role: 'Visual Creative & Web', emoji: '🦎', color: '#F472B6', telegram: null, workspace: 'workspace-designius/' },
  { id: 'translatius', name: 'Translatius', role: 'Translations', emoji: '🦉', color: '#FCD34D', telegram: null, workspace: 'workspace-translatius/' },
]

const CRONS = [
  { id: 'morning-brief', label: 'Empire Morning Brief', time: '00:00 UTC daily', baliTime: '08:00 Bali', script: 'tiktok-trends.py', apps: 'All apps' },
  { id: 'reddit-warmup', label: 'Reddit Warmup', time: '01:00 UTC daily', baliTime: '09:00 Bali', script: 'reddit-cookie-warmup.py', apps: 'Hypnobirthing+' },
  { id: 'blog-publish', label: 'Blog Publish', time: '00:00 UTC daily', baliTime: '08:00 Bali', script: 'publish-blog.py', apps: 'PouchOut + Lyrical' },
  { id: 'keyword-analysis', label: 'Keyword Analysis', time: '01:00 UTC Sunday', baliTime: '09:00 Bali (Sun)', script: 'competitor-keyword-analysis.py', apps: 'PouchOut' },
  { id: 'evening-digest', label: 'Evening Digest', time: '13:00 UTC daily', baliTime: '21:00 Bali', script: 'empire-evening-digest.py', apps: 'Empire' },
  { id: 'morning-mandate', label: 'Morning Mandate', time: '22:00 UTC daily', baliTime: '06:00 Bali', script: 'morning-mandate.py', apps: 'All agents' },
  { id: 'dna-backup', label: 'DNA Backup', time: '01:30 UTC Sunday', baliTime: '09:30 Bali (Sun)', script: 'empire-dna-backup.sh', apps: 'All agents' },
]

const APPS = [
  { name: 'PouchOut', emoji: '💊', status: 'LIVE', url: 'pouchoutapp.com', detail: 'blog active' },
  { name: 'Hypnobirthing+', emoji: '🤰', status: 'LIVE', url: 'hypnobirthing.plus', detail: 'reddit active' },
  { name: 'Lyrical', emoji: '🎵', status: 'LAUNCHING', url: 'lyricalmusic.app', detail: 'blog active' },
  { name: 'HypnoFlow', emoji: '🧠', status: 'LIVE', url: null, detail: null },
  { name: 'Contraction Timer+', emoji: '⏱️', status: 'LIVE', url: null, detail: null },
  { name: 'Nerva', emoji: '🫧', status: 'BUILDING', url: null, detail: null },
  { name: 'App Star Family', emoji: '🚀', status: 'REBUILDING', url: 'appstarfamily.com', detail: null },
]

const INFRA = [
  { name: 'VPS', status: 'LIVE', detail: '100.103.172.60' },
  { name: 'Docker Container', status: 'LIVE', detail: 'openclaw-gateway-1' },
  { name: 'Telegram Bots', status: 'LIVE', detail: '7 agents' },
  { name: 'Kimi K2.5', status: 'LIVE', detail: 'Moonshot API' },
  { name: 'Brave Search', status: 'LIVE', detail: '$5/mo' },
  { name: 'Decodo Proxy', status: 'LIVE', detail: 'us.decodo.com:10001' },
  { name: 'Vercel Pro', status: 'LIVE', detail: '3 projects' },
  { name: 'RevenueCat', status: 'LIVE', detail: 'PouchOut' },
  { name: 'AgentMail', status: 'LIVE', detail: 'pruttius_maximus@' },
  { name: 'GitHub PAT', status: 'LIVE', detail: 'AppStarFamily org' },
  { name: 'Apple Search Ads', status: 'LIVE', detail: '~10 apps' },
  { name: 'Meta Ads', status: 'PLANNED', detail: 'deferred' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusColor(s?: string) {
  const v = (s ?? '').toLowerCase()
  if (v === 'done' || v === 'live' || v === 'complete') return '#34D399'
  if (v === 'active') return '#7EC8E3'
  if (v === 'idle') return '#6B7280'
  if (v === 'waiting') return '#F59E0B'
  if (v === 'scheduled' || v === 'cyan') return '#7EC8E3'
  if (v === 'planned') return '#6B7280'
  if (v === 'launching') return '#A78BFA'
  if (v === 'building' || v === 'rebuilding') return '#FB923C'
  if (v === 'failed' || v === 'error') return '#EF4444'
  return '#6B7280'
}

function StatusBadge({ status }: { status?: string }) {
  const color = statusColor(status)
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: color + '22',
        color,
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.05em',
        padding: '3px 8px',
        borderRadius: '4px',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
      {status ?? 'unknown'}
    </span>
  )
}

function useBaliClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Makassar',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = ['Agents', 'Crons', 'Apps', 'Lessons', 'Infra'] as const
type Tab = (typeof TABS)[number]

// ─── Main component ───────────────────────────────────────────────────────────

export default function EmpireDashboard({ initialData }: Props) {
  const router = useRouter()
  const [data, setData] = useState<EmpireStatus>(initialData)
  const [activeTab, setActiveTab] = useState<Tab>('Agents')
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)
  const baliTime = useBaliClock()

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/empire-status', { cache: 'no-store' })
      if (res.ok) {
        const fresh = await res.json()
        setData(fresh)
      }
    } catch {
      // keep stale data
    }
    router.refresh()
  }, [router])

  useEffect(() => {
    const id = setInterval(refresh, 60_000)
    return () => clearInterval(id)
  }, [refresh])

  // Derived stats
  const agents = data.agents ?? {}
  const crons = data.crons ?? {}
  const lessons = data.lessons ?? []

  const activeToday = AGENTS.filter(a => {
    const live = agents[a.id]
    if (!live) return false
    const s = (live.status ?? '').toLowerCase()
    if (s === 'active') return true
    if (live.lastRun) {
      const d = new Date(live.lastRun)
      const today = new Date()
      return d.toDateString() === today.toDateString()
    }
    return false
  }).length

  const cronsDone = CRONS.filter(c => (crons[c.id]?.status ?? '').toLowerCase() === 'done').length
  const cronsTotal = CRONS.length

  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#0A0F1E',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#E5E7EB',
    } as React.CSSProperties,
    header: {
      position: 'sticky' as const,
      top: 0,
      zIndex: 50,
      backgroundColor: '#0D1423',
      borderBottom: '1px solid #1F2937',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '56px',
    } as React.CSSProperties,
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    } as React.CSSProperties,
    headerTitle: {
      color: '#C9A84C',
      fontWeight: '700',
      fontSize: '16px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
    } as React.CSSProperties,
    clock: {
      color: '#C9A84C',
      fontFamily: 'monospace',
      fontSize: '14px',
      fontWeight: '600',
      backgroundColor: '#C9A84C11',
      padding: '4px 10px',
      borderRadius: '6px',
      border: '1px solid #C9A84C33',
    } as React.CSSProperties,
    statBar: {
      display: 'flex',
      gap: '0',
      borderBottom: '1px solid #1F2937',
    } as React.CSSProperties,
    stat: {
      flex: 1,
      padding: '14px 24px',
      borderRight: '1px solid #1F2937',
      textAlign: 'center' as const,
    } as React.CSSProperties,
    statValue: {
      color: '#C9A84C',
      fontWeight: '700',
      fontSize: '26px',
      lineHeight: 1,
      marginBottom: '4px',
    } as React.CSSProperties,
    statLabel: {
      color: '#6B7280',
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
    } as React.CSSProperties,
    tabBar: {
      display: 'flex',
      borderBottom: '1px solid #1F2937',
      backgroundColor: '#0D1423',
    } as React.CSSProperties,
    content: {
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    } as React.CSSProperties,
    footer: {
      borderTop: '1px solid #1F2937',
      padding: '16px 24px',
      textAlign: 'center' as const,
      color: '#374151',
      fontSize: '11px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
    } as React.CSSProperties,
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <div style={s.headerLeft}>
          <span style={{ fontSize: '20px' }}>👑</span>
          <span style={s.headerTitle}>The Pruttius Empire</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#6B7280', fontSize: '11px', letterSpacing: '0.05em' }}>BALI</span>
          <span style={s.clock}>{baliTime}</span>
        </div>
      </header>

      {/* Stat bar */}
      <div style={s.statBar}>
        {[
          { label: 'Agents', value: '7' },
          { label: 'Active Today', value: String(activeToday) },
          { label: 'Crons Done', value: `${cronsDone}/${cronsTotal}` },
          { label: 'Apps Live', value: '5' },
        ].map((stat, i) => (
          <div key={stat.label} style={{ ...s.stat, ...(i === 3 ? { borderRight: 'none' } : {}) }}>
            <div style={s.statValue}>{stat.value}</div>
            <div style={s.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div style={s.tabBar}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 20px',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '0.04em',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #C9A84C' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === tab ? '#C9A84C' : '#6B7280',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Error banner */}
      {data.error && (
        <div
          style={{
            backgroundColor: '#EF444411',
            borderBottom: '1px solid #EF444433',
            padding: '10px 24px',
            fontSize: '12px',
            color: '#EF4444',
          }}
        >
          ⚠️ Status endpoint offline — showing last known data. Error: {data.error}
        </div>
      )}

      {/* Content */}
      <div style={s.content}>
        {activeTab === 'Agents' && (
          <AgentsTab agents={agents} expandedAgent={expandedAgent} setExpandedAgent={setExpandedAgent} />
        )}
        {activeTab === 'Crons' && <CronsTab crons={crons} />}
        {activeTab === 'Apps' && <AppsTab />}
        {activeTab === 'Lessons' && <LessonsTab lessons={lessons} />}
        {activeTab === 'Infra' && <InfraTab />}
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        THE PRUTTIUS EMPIRE · EST. MARCH 2026 · BALI HQ · LONG MAY HE PINCH 👑🦞
      </footer>
    </div>
  )
}

// ─── Agents tab ───────────────────────────────────────────────────────────────

function AgentsTab({
  agents,
  expandedAgent,
  setExpandedAgent,
}: {
  agents: Record<string, AgentLiveData>
  expandedAgent: string | null
  setExpandedAgent: (id: string | null) => void
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
      }}
    >
      {AGENTS.map(agent => {
        const live = agents[agent.id] ?? {}
        const expanded = expandedAgent === agent.id
        return (
          <div
            key={agent.id}
            onClick={() => setExpandedAgent(expanded ? null : agent.id)}
            style={{
              backgroundColor: '#111827',
              border: `1px solid ${expanded ? agent.color + '66' : '#1F2937'}`,
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: expanded ? `0 0 20px ${agent.color}22` : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px', lineHeight: 1 }}>{agent.emoji}</span>
                <div>
                  <div style={{ color: agent.color, fontWeight: '700', fontSize: '15px' }}>{agent.name}</div>
                  <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '2px' }}>{agent.role}</div>
                </div>
              </div>
              <StatusBadge status={live.status} />
            </div>

            {live.lastTask && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#4B5563', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '3px' }}>LAST TASK</div>
                <div style={{ color: '#D1D5DB', fontSize: '13px', lineHeight: '1.4' }}>{live.lastTask}</div>
              </div>
            )}

            {live.lastRun && (
              <div>
                <div style={{ color: '#4B5563', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '3px' }}>LAST RUN</div>
                <div style={{ color: '#9CA3AF', fontSize: '12px' }}>{live.lastRun}</div>
              </div>
            )}

            {expanded && (
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: `1px solid ${agent.color}33`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
                onClick={e => e.stopPropagation()}
              >
                <div>
                  <span style={{ color: '#4B5563', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em' }}>TELEGRAM  </span>
                  <span style={{ color: agent.telegram ? '#7EC8E3' : '#4B5563', fontSize: '13px' }}>
                    {agent.telegram ?? 'Not configured yet'}
                  </span>
                </div>
                <div>
                  <span style={{ color: '#4B5563', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em' }}>WORKSPACE  </span>
                  <span style={{ color: '#9CA3AF', fontSize: '13px', fontFamily: 'monospace' }}>{agent.workspace}</span>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Crons tab ────────────────────────────────────────────────────────────────

function CronsTab({ crons }: { crons: Record<string, CronLiveData> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {CRONS.map(cron => {
        const live = crons[cron.id] ?? {}
        return (
          <div
            key={cron.id}
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1F2937',
              borderRadius: '10px',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap' as const,
            }}
          >
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ color: '#E5E7EB', fontWeight: '600', fontSize: '15px', marginBottom: '6px' }}>{cron.label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <span style={{ color: '#6B7280', fontSize: '12px' }}>
                  🕐 {cron.time}
                  <span style={{ display: 'block', color: '#4B5563', fontSize: '11px', marginTop: '2px' }}>{cron.baliTime}</span>
                </span>
                <span style={{ color: '#6B7280', fontSize: '12px', fontFamily: 'monospace' }}>📜 {cron.script}</span>
                <span style={{ color: '#6B7280', fontSize: '12px' }}>📱 {cron.apps}</span>
              </div>
              {live.lastRun && (
                <div style={{ color: '#4B5563', fontSize: '12px', marginTop: '6px' }}>Last run: {live.lastRun}</div>
              )}
              {live.lastOutput && (
                <div
                  style={{
                    marginTop: '8px',
                    backgroundColor: '#0A0F1E',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#9CA3AF',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap' as const,
                    wordBreak: 'break-word' as const,
                    maxHeight: '80px',
                    overflow: 'hidden',
                  }}
                >
                  {live.lastOutput}
                </div>
              )}
            </div>
            <StatusBadge status={live.status ?? 'scheduled'} />
          </div>
        )
      })}
    </div>
  )
}

// ─── Apps tab ─────────────────────────────────────────────────────────────────

function AppsTab() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '14px',
      }}
    >
      {APPS.map(app => (
        <div
          key={app.name}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '10px',
            padding: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '24px' }}>{app.emoji}</span>
            <StatusBadge status={app.status.toLowerCase()} />
          </div>
          <div style={{ color: '#E5E7EB', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{app.name}</div>
          {app.url && (
            <div style={{ color: '#7EC8E3', fontSize: '12px', marginBottom: '4px' }}>{app.url}</div>
          )}
          {app.detail && (
            <div style={{ color: '#6B7280', fontSize: '12px' }}>{app.detail}</div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Lessons tab ──────────────────────────────────────────────────────────────

function LessonsTab({ lessons }: { lessons: Lesson[] }) {
  const sorted = [...lessons].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (!sorted.length) {
    return (
      <div style={{ color: '#4B5563', textAlign: 'center', padding: '48px 0', fontSize: '14px' }}>
        No lessons recorded yet.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {sorted.map((lesson, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                backgroundColor: lesson.severity === 'HIGH' ? '#EF444422' : '#F59E0B22',
                color: lesson.severity === 'HIGH' ? '#EF4444' : '#F59E0B',
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                padding: '3px 7px',
                borderRadius: '4px',
                marginBottom: '6px',
                display: 'inline-block',
              }}
            >
              {lesson.severity}
            </div>
            <div style={{ color: '#4B5563', fontSize: '11px' }}>{lesson.date}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#C9A84C', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
              {lesson.agent}
            </div>
            <div style={{ color: '#D1D5DB', fontSize: '14px', lineHeight: '1.5' }}>{lesson.lesson ?? lesson.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Infra tab ────────────────────────────────────────────────────────────────

function InfraTab() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '12px',
      }}
    >
      {INFRA.map(item => (
        <div
          key={item.name}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '10px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ color: '#E5E7EB', fontWeight: '600', fontSize: '13px', marginBottom: '3px' }}>{item.name}</div>
            <div style={{ color: '#6B7280', fontSize: '12px', fontFamily: item.detail?.includes('.') ? 'monospace' : 'inherit' }}>
              {item.detail}
            </div>
          </div>
          <StatusBadge status={item.status.toLowerCase()} />
        </div>
      ))}
    </div>
  )
}
