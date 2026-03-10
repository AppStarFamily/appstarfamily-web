import Image from 'next/image'
import type { App } from '@/data/apps'

interface AppCardProps {
  app: App
  variant?: 'featured' | 'full'
}

function AppIcon({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative w-16 h-16">
      <Image
        src={src}
        alt={name}
        width={64}
        height={64}
        className="rounded-2xl"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const placeholder = target.nextElementSibling as HTMLElement
          if (placeholder) placeholder.style.display = 'flex'
        }}
      />
      <div
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-cyan/10 border border-gold/25 items-center justify-center text-gold/70 font-bold text-lg hidden absolute inset-0"
      >
        {name.charAt(0)}
      </div>
    </div>
  )
}

export default function AppCard({ app, variant = 'featured' }: AppCardProps) {
  const isLive = app.status === 'live'

  return (
    <div
      className="group relative rounded-2xl overflow-hidden h-full flex flex-col"
      style={{
        background: 'linear-gradient(160deg, rgba(201,146,42,0.04) 0%, rgba(4,9,26,0.97) 100%)',
        border: '1px solid rgba(201,146,42,0.15)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = '0 16px 48px rgba(201,146,42,0.12), 0 0 64px rgba(201,146,42,0.06)'
        el.style.borderColor = 'rgba(201,146,42,0.4)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = ''
        el.style.boxShadow = ''
        el.style.borderColor = 'rgba(201,146,42,0.15)'
      }}
    >
      {/* Corner accent lines — top left */}
      <div className="absolute top-0 left-0 w-10 h-px bg-gradient-to-r from-gold/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-px h-10 bg-gradient-to-b from-gold/40 to-transparent pointer-events-none" />

      {/* Status badge */}
      <div className="absolute top-4 right-4 z-10">
        {isLive ? (
          <span className="status-live">Live</span>
        ) : (
          <span className="status-coming-soon">Soon</span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Icon */}
        <div className="mb-5">
          <AppIcon src={app.icon} name={app.name} />
        </div>

        {/* Category pill */}
        <div className="mb-3">
          <span className="category-pill">{app.category}</span>
        </div>

        {/* Name */}
        <h3 className="font-jakarta font-bold text-white text-lg leading-tight pr-14 mb-1.5">
          {app.name}
        </h3>

        {/* Tagline */}
        <p className="text-[#8B8FA8] text-sm leading-snug mb-4">{app.tagline}</p>

        {/* Description — full variant only */}
        {variant === 'full' && (
          <p className="text-[#6B7280] text-xs leading-relaxed mb-4 line-clamp-2">
            {app.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'linear-gradient(to right, rgba(201,146,42,0.2), transparent)' }} />

        {/* CTA row */}
        <div className="flex items-center justify-between">
          {isLive && app.appStoreUrl ? (
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold hover:text-gold-light transition-colors font-medium flex items-center gap-1"
            >
              App Store <span className="text-xs opacity-70">↗</span>
            </a>
          ) : (
            <span className="text-xs text-[#4B5060] uppercase tracking-wider">Coming Soon</span>
          )}

          {variant === 'full' && app.websiteUrl && (
            <a
              href={app.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan/60 hover:text-cyan transition-colors"
            >
              Website ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
