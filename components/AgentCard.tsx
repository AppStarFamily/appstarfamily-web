import Image from 'next/image'
import type { Agent } from '@/data/agents'

interface AgentCardProps {
  agent: Agent
  variant?: 'ceo' | 'specialist'
}

const accentColors: Record<string, { color: string; border: string; glow: string; dim: string }> = {
  pruttius:    { color: '#C9922A', border: 'rgba(201,146,42,0.35)', glow: 'rgba(201,146,42,0.18)', dim: 'rgba(201,146,42,0.06)' },
  scriptor:    { color: '#D4A843', border: 'rgba(212,168,67,0.3)',  glow: 'rgba(212,168,67,0.16)', dim: 'rgba(212,168,67,0.05)' },
  crescentius: { color: '#60A5FA', border: 'rgba(96,165,250,0.32)', glow: 'rgba(96,165,250,0.18)', dim: 'rgba(96,165,250,0.05)' },
  socialis:    { color: '#FB923C', border: 'rgba(251,146,60,0.32)', glow: 'rgba(251,146,60,0.18)', dim: 'rgba(251,146,60,0.05)' },
  fabricius:   { color: '#F97316', border: 'rgba(249,115,22,0.32)', glow: 'rgba(249,115,22,0.18)', dim: 'rgba(249,115,22,0.05)' },
}

export default function AgentCard({ agent, variant = 'specialist' }: AgentCardProps) {
  const accent = accentColors[agent.id] ?? accentColors.pruttius

  if (variant === 'ceo') {
    return (
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(201,146,42,0.07) 0%, rgba(5,9,20,0.98) 60%, rgba(4,8,18,0.99) 100%)',
          border: '1px solid rgba(201,146,42,0.3)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,146,42,0.1)',
        }}
      >
        {/* Top highlight edge */}
        <div className="absolute top-0 inset-x-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,146,42,0.4) 40%, rgba(201,146,42,0.2) 70%, transparent)'
        }} />

        <div className="flex flex-col md:flex-row">
          {/* Portrait — left side */}
          <div className="relative md:w-[40%] aspect-square md:aspect-auto">
            <Image
              src={agent.portrait}
              alt={agent.name}
              fill
              className="object-cover"
              placeholder="empty"
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to right, transparent 60%, rgba(5,9,20,0.9) 100%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(5,9,20,0.8) 0%, transparent 30%)'
            }} />
          </div>

          {/* Info — right side */}
          <div className="p-6 md:p-8 md:w-[60%] flex flex-col justify-center relative">
            <div className="text-3xl mb-2">{agent.emoji}</div>
            <h3 className="font-jakarta text-gold-light text-3xl md:text-4xl font-bold">
              {agent.name}
            </h3>
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold/55 mt-1 mb-4">
              {agent.subtitle}
            </p>

            {/* Gold divider */}
            <div className="h-px mb-5" style={{ background: 'linear-gradient(to right, rgba(201,146,42,0.4), transparent)' }} />

            {/* Domains */}
            <ul className="space-y-2.5 mb-6">
              {agent.domains.map((domain) => (
                <li key={domain} className="flex items-start gap-3 text-sm text-[#D4CBB8]">
                  <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {domain}
                </li>
              ))}
            </ul>

            {/* Bio */}
            <p className="text-sm text-[#7C8099] leading-relaxed">{agent.bio}</p>

            {/* Watermark */}
            <div className="absolute bottom-4 right-6 text-2xl opacity-15 select-none pointer-events-none">
              &#x1F451;&#x1F99E;
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: `linear-gradient(180deg, ${accent.dim} 0%, rgba(5,9,20,0.97) 100%)`,
        border: `1px solid ${accent.border}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 ${accent.glow}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = `0 20px 50px ${accent.glow}, 0 0 60px ${accent.glow}, inset 0 1px 0 ${accent.glow}`
        el.style.borderColor = accent.color
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = ''
        el.style.boxShadow = `0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 ${accent.glow}`
        el.style.borderColor = accent.border
      }}
    >
      {/* Top edge highlight */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{
        background: `linear-gradient(90deg, transparent, ${accent.glow}, transparent)`
      }} />

      {/* Portrait */}
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={agent.portrait}
          alt={agent.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          placeholder="empty"
        />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to bottom, transparent 45%, rgba(5,9,20,0.97) 100%)`
        }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
          background: `radial-gradient(ellipse at center top, ${accent.glow} 0%, transparent 60%)`
        }} />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{agent.emoji}</span>
          <h3 className="font-jakarta text-xl font-bold" style={{ color: accent.color }}>{agent.name}</h3>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-medium" style={{ color: accent.color, opacity: 0.55 }}>
          {agent.animal}
        </p>
        <p className="text-[#8B8FA8] text-sm mb-4 font-medium">{agent.role}</p>

        {/* Domains */}
        <ul className="space-y-1.5 mb-4">
          {agent.domains.map((domain) => (
            <li key={domain} className="flex items-start gap-2 text-xs text-[#D4CBB8]/70">
              <span className="mt-0.5 flex-shrink-0 text-[9px]" style={{ color: accent.color }}>◆</span>
              {domain}
            </li>
          ))}
        </ul>

        {/* Bio */}
        <p className="text-xs text-[#7C8099] leading-relaxed">{agent.bio}</p>
      </div>
    </div>
  )
}
