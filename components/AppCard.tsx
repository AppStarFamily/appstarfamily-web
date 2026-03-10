import Image from 'next/image'
import type { App } from '@/data/apps'

interface AppCardProps {
  app: App
  variant?: 'hero' | 'featured' | 'full'
}

function AppIcon({ src, name, size = 64 }: { src: string; name: string; size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size, flexShrink: 0 }}>
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-2xl"
        placeholder="empty"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const placeholder = target.nextElementSibling as HTMLElement
          if (placeholder) placeholder.style.display = 'flex'
        }}
      />
      <div
        className="rounded-2xl bg-gradient-to-br from-gold/20 to-cyan/10 border border-gold/25 items-center justify-center text-gold/70 font-bold text-lg hidden absolute inset-0"
        style={{ fontSize: size * 0.28 }}
      >
        {name.charAt(0)}
      </div>
    </div>
  )
}

export default function AppCard({ app, variant = 'featured' }: AppCardProps) {
  const isLive = app.status === 'live'

  /* ────────────────────────────────────────────────────
     HERO VARIANT — full-width premium showcase panel
  ──────────────────────────────────────────────────── */
  if (variant === 'hero') {
    return (
      <div
        className="group relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(201,146,42,0.09) 0%, rgba(6,10,22,0.98) 55%, rgba(4,8,18,0.99) 100%)',
          border: '1px solid rgba(201,146,42,0.3)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-4px)'
          el.style.boxShadow = '0 24px 64px rgba(201,146,42,0.16), 0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)'
          el.style.borderColor = 'rgba(201,146,42,0.5)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = ''
          el.style.boxShadow = '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
          el.style.borderColor = 'rgba(201,146,42,0.3)'
        }}
      >
        {/* Atmospheric gold glow — left side */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 45% 90% at 0% 50%, rgba(201,146,42,0.07) 0%, transparent 65%)'
        }} />
        {/* Top highlight edge */}
        <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,146,42,0.4) 30%, rgba(201,146,42,0.2) 70%, transparent 100%)'
        }} />
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-gold/60 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-gold/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-px bg-gradient-to-l from-gold/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-px h-12 bg-gradient-to-t from-gold/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 sm:p-10 items-start">
          {/* Icon — large with glow behind */}
          <div className="relative flex-shrink-0 self-start md:self-center">
            <div className="absolute inset-0 blur-2xl" style={{
              background: 'rgba(201,146,42,0.35)',
              borderRadius: '28px',
              transform: 'scale(0.85) translateY(4px)',
            }} />
            <AppIcon src={app.icon} name={app.name} size={96} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="category-pill">{app.category}</span>
              {isLive && <span className="status-live">Live</span>}
              {app.markets && app.markets.length > 0 && app.markets[0] !== 'Global' && (
                <span className="text-[11px] text-[#4B5060] uppercase tracking-wider font-medium">
                  {app.markets.slice(0, 5).join(' · ')}
                </span>
              )}
            </div>

            {/* App name */}
            <h3
              className="font-jakarta font-bold text-white leading-tight mb-2.5"
              style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}
            >
              {app.name}
            </h3>

            {/* Tagline */}
            <p className="text-[#C0B8A8] text-base sm:text-lg leading-relaxed mb-3">{app.tagline}</p>

            {/* Description */}
            <p className="text-[#6B7280] text-sm leading-relaxed mb-8 max-w-2xl line-clamp-2">{app.description}</p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3">
              {isLive && app.appStoreUrl ? (
                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  App Store ↗
                </a>
              ) : (
                <span className="text-xs text-[#4B5060] uppercase tracking-wider font-medium px-4 py-2 rounded-xl border border-[#1E2035]">
                  Coming Soon
                </span>
              )}
              {app.websiteUrl && (
                <a
                  href={app.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Website ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ────────────────────────────────────────────────────
     FEATURED + FULL VARIANT — premium grid card
  ──────────────────────────────────────────────────── */
  return (
    <div
      className="group relative rounded-2xl overflow-hidden h-full flex flex-col"
      style={{
        background: 'linear-gradient(160deg, rgba(201,146,42,0.055) 0%, rgba(5,9,20,0.98) 50%, rgba(4,8,18,0.99) 100%)',
        border: '1px solid rgba(201,146,42,0.16)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 50px rgba(201,146,42,0.14), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
        el.style.borderColor = 'rgba(201,146,42,0.38)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = ''
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)'
        el.style.borderColor = 'rgba(201,146,42,0.16)'
      }}
    >
      {/* Top edge highlight */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{
        background: 'linear-gradient(90deg, transparent, rgba(201,146,42,0.22) 50%, transparent)'
      }} />
      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-10 h-px bg-gradient-to-r from-gold/45 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-px h-10 bg-gradient-to-b from-gold/45 to-transparent pointer-events-none" />

      {/* Status badge */}
      <div className="absolute top-4 right-4 z-10">
        {isLive ? (
          <span className="status-live">Live</span>
        ) : (
          <span className="status-coming-soon">Soon</span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Icon with subtle glow behind */}
        <div className="relative mb-5 self-start">
          <div className="absolute inset-0 blur-xl opacity-60 pointer-events-none" style={{
            background: 'rgba(201,146,42,0.4)',
            borderRadius: '20px',
            transform: 'scale(0.75) translateY(6px)',
          }} />
          <AppIcon src={app.icon} name={app.name} size={64} />
        </div>

        {/* Category pill */}
        <div className="mb-3">
          <span className="category-pill">{app.category}</span>
        </div>

        {/* Name */}
        <h3 className="font-jakarta font-bold text-white text-lg leading-tight pr-14 mb-2">
          {app.name}
        </h3>

        {/* Tagline */}
        <p className="text-[#8B8FA8] text-sm leading-snug mb-4">{app.tagline}</p>

        {/* Description — full variant only */}
        {variant === 'full' && (
          <p className="text-[#6B7280] text-xs leading-relaxed mb-4 line-clamp-3">
            {app.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'linear-gradient(to right, rgba(201,146,42,0.2), transparent)' }} />

        {/* CTA row */}
        <div className="flex items-center justify-between gap-2">
          {isLive && app.appStoreUrl ? (
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all duration-200"
              style={{
                border: '1px solid rgba(201,146,42,0.35)',
                color: '#F0C060',
                background: 'rgba(201,146,42,0.07)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(201,146,42,0.16)'
                el.style.borderColor = 'rgba(201,146,42,0.55)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(201,146,42,0.07)'
                el.style.borderColor = 'rgba(201,146,42,0.35)'
              }}
            >
              App Store <span className="opacity-70">↗</span>
            </a>
          ) : (
            <span className="text-xs text-[#4B5060] uppercase tracking-wider font-medium">Coming Soon</span>
          )}

          {variant === 'full' && app.websiteUrl && (
            <a
              href={app.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan/55 hover:text-cyan transition-colors"
            >
              Website ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
