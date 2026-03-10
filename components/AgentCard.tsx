import Image from 'next/image'
import type { Agent } from '@/data/agents'

interface AgentCardProps {
  agent: Agent
  variant?: 'ceo' | 'specialist'
}

export default function AgentCard({ agent, variant = 'specialist' }: AgentCardProps) {
  if (variant === 'ceo') {
    return (
      <div className="relative bg-navy-card border border-gold/30 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Portrait — left side */}
          <div className="relative md:w-[40%] aspect-square md:aspect-auto">
            <Image
              src={agent.portrait}
              alt={agent.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info — right side */}
          <div className="p-6 md:p-8 md:w-[60%] flex flex-col justify-center">
            <div className="text-3xl mb-2">{agent.emoji}</div>
            <h3 className="font-jakarta text-gold-light text-3xl md:text-4xl font-bold">
              {agent.name}
            </h3>
            <p className="text-[#8B8FA8] text-sm mt-1 uppercase tracking-wider">
              {agent.subtitle}
            </p>

            {/* Gold divider */}
            <div className="w-16 h-px bg-gold/30 my-4" />

            {/* Domains */}
            <ul className="space-y-2 mb-6">
              {agent.domains.map((domain) => (
                <li key={domain} className="flex items-start gap-2 text-sm text-[#E8E0D0]">
                  <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {domain}
                </li>
              ))}
            </ul>

            {/* Bio */}
            <p className="text-sm text-[#8B8FA8] leading-relaxed">{agent.bio}</p>

            {/* Watermark */}
            <div className="absolute bottom-4 right-6 text-2xl opacity-20 select-none">
              &#x1F451;&#x1F99E;
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-navy-card border border-gold/20 rounded-2xl overflow-hidden
                    hover:border-cyan/40 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(0,229,255,0.1)]
                    transition-all duration-300">
      {/* Portrait */}
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={agent.portrait}
          alt={agent.name}
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{agent.emoji}</span>
          <h3 className="font-jakarta text-white text-xl font-bold">{agent.name}</h3>
        </div>
        <p className="text-gold/70 text-xs uppercase tracking-wider mb-1">{agent.animal}</p>
        <p className="text-[#8B8FA8] text-sm mb-3">{agent.role}</p>

        {/* Domains */}
        <ul className="space-y-1.5 mb-4">
          {agent.domains.map((domain) => (
            <li key={domain} className="flex items-start gap-2 text-xs text-[#E8E0D0]/80">
              <svg className="w-3.5 h-3.5 text-gold/60 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {domain}
            </li>
          ))}
        </ul>

        {/* Bio */}
        <p className="text-xs text-[#8B8FA8] leading-relaxed">{agent.bio}</p>
      </div>
    </div>
  )
}
