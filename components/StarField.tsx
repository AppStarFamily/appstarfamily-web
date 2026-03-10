export default function StarField() {
  // Deterministic star field — 160 stars with varied sizes, colors, and depth
  const stars = Array.from({ length: 160 }, (_, i) => {
    const pseudo = (i * 2654435761) >>> 0  // Knuth multiplicative hash
    const x = (pseudo % 10000) / 100
    const y = ((pseudo >> 8) % 10000) / 100

    // Size tiers: 60% tiny (1px), 30% small (1.5px), 8% medium (2.5px), 2% large (3.5px)
    const tier = i % 50
    const size = tier < 30 ? 1 : tier < 45 ? 1.5 : tier < 49 ? 2.5 : 3.5

    // Color: mostly warm white, 15% cyan, 5% gold
    const colorSeed = i % 20
    const color = colorSeed === 0
      ? 'rgba(201,146,42,0.9)'   // gold
      : colorSeed <= 3
        ? 'rgba(0,229,255,0.85)' // cyan
        : 'rgba(232,224,208,0.9)' // warm white

    // For large stars, add a glow filter
    const hasGlow = size >= 2.5
    const glowColor = color.includes('201,146')
      ? 'rgba(201,146,42,0.5)'
      : color.includes('0,229')
        ? 'rgba(0,229,255,0.5)'
        : 'rgba(232,224,208,0.3)'

    const baseOpacity = size >= 3.5 ? 0.7 : size >= 2.5 ? 0.55 : 0.15 + (i % 7) * 0.07
    const duration = 3 + (i % 5)
    const delay = `${(i % 9) * 0.4}s`

    return { i, x, y, size, color, hasGlow, glowColor, baseOpacity, duration, delay }
  })

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {stars.map((star) => (
        <div
          key={star.i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: star.hasGlow
              ? `radial-gradient(circle, ${star.color}, transparent 70%)`
              : star.color,
            opacity: star.baseOpacity,
            filter: star.hasGlow ? `blur(0.4px) drop-shadow(0 0 ${star.size * 2}px ${star.glowColor})` : undefined,
            animation: `starTwinkle ${star.duration}s ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}

      {/* Nebula wisps — subtle atmospheric color clouds */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '15%', left: '10%', width: '300px', height: '150px',
          background: 'radial-gradient(ellipse, rgba(201,146,42,0.025) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '60%', right: '8%', width: '250px', height: '120px',
          background: 'radial-gradient(ellipse, rgba(0,229,255,0.02) 0%, transparent 70%)',
          filter: 'blur(18px)',
        }}
      />

      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: var(--tw-opacity, 0.3); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}
