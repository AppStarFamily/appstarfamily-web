import type { ReactNode } from 'react'

interface IPhoneMockupProps {
  /** Content rendered inside the screen area — pass animated slides here */
  children?: ReactNode
  width?: number
  style?: React.CSSProperties
  className?: string
}

/**
 * CSS-based iPhone 15 Pro mockup.
 * `children` renders inside the screen frame — use AnimatePresence + motion.div
 * inside for a smooth screenshot carousel.
 */
export default function IPhoneMockup({
  children,
  width = 220,
  style = {},
  className = '',
}: IPhoneMockupProps) {
  const h  = Math.round(width * 2.115)    // overall height
  const r  = Math.round(width * 0.188)    // body border-radius
  const sr = Math.round(width * 0.148)    // screen border-radius
  const si = Math.round(width * 0.031)    // screen inset from body edge
  const dw = Math.round(width * 0.345)    // Dynamic Island width
  const dh = Math.round(width * 0.098)    // Dynamic Island height
  const dt = Math.round(width * 0.042)    // Dynamic Island top offset

  return (
    <div
      className={className}
      style={{ width, height: h, position: 'relative', flexShrink: 0, ...style }}
    >
      {/* ─── Phone body ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: r,
          background: `linear-gradient(
            155deg,
            #3e3e42 0%,
            #2c2c2e 28%,
            #1e1e20 55%,
            #161618 80%,
            #111113 100%
          )`,
          boxShadow: [
            '0 0 0 0.75px rgba(255,255,255,0.14)',
            'inset 0 0 0 0.5px rgba(0,0,0,0.65)',
            '0 55px 110px rgba(0,0,0,0.88)',
            '0 20px 45px rgba(0,0,0,0.55)',
          ].join(', '),
        }}
      >
        {/* ─── Screen ────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: si,
            borderRadius: sr,
            overflow: 'hidden',
            background: '#000',
            boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.9)',
          }}
        >
          {/* Carousel / screenshot content */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {children}
          </div>

          {/* Dynamic Island — floats above screenshot */}
          <div
            style={{
              position: 'absolute',
              top: dt,
              left: '50%',
              transform: 'translateX(-50%)',
              width: dw,
              height: dh,
              background: '#000',
              borderRadius: 999,
              zIndex: 20,
            }}
          />

          {/* Status-bar gradient — slightly darkens very top of screenshot */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: Math.round(width * 0.19),
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Home indicator bar */}
          <div
            style={{
              position: 'absolute',
              bottom: Math.round(width * 0.038),
              left: '50%',
              transform: 'translateX(-50%)',
              width: '34%',
              height: 4,
              background: 'rgba(255,255,255,0.28)',
              borderRadius: 2,
              zIndex: 20,
            }}
          />

          {/* Glass sheen — top-left corner */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '38%',
              height: '55%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 65%)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />
        </div>

        {/* ─── Side hardware buttons ──────────────────────────────── */}

        {/* Power / Sleep-Wake (right) */}
        <div style={{
          position: 'absolute', right: -2.5, top: '36%',
          width: 3, height: '14%',
          background: 'linear-gradient(to right, #3c3c3f, #555558)',
          borderRadius: '0 2px 2px 0',
          boxShadow: '1.5px 0 3px rgba(0,0,0,0.65)',
        }} />

        {/* Mute switch (left, top) */}
        <div style={{
          position: 'absolute', left: -2.5, top: '18%',
          width: 3, height: '5%',
          background: 'linear-gradient(to left, #3c3c3f, #555558)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1.5px 0 3px rgba(0,0,0,0.65)',
        }} />

        {/* Volume Up (left) */}
        <div style={{
          position: 'absolute', left: -2.5, top: '26%',
          width: 3, height: '9%',
          background: 'linear-gradient(to left, #3c3c3f, #555558)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1.5px 0 3px rgba(0,0,0,0.65)',
        }} />

        {/* Volume Down (left) */}
        <div style={{
          position: 'absolute', left: -2.5, top: '37%',
          width: 3, height: '9%',
          background: 'linear-gradient(to left, #3c3c3f, #555558)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1.5px 0 3px rgba(0,0,0,0.65)',
        }} />

        {/* Subtle top-edge specular highlight on body */}
        <div style={{
          position: 'absolute',
          top: 0, left: '18%', right: '18%', height: 1,
          background: 'rgba(255,255,255,0.17)',
          borderRadius: r,
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}
