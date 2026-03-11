import Image from 'next/image'

interface IPhoneMockupProps {
  screenshot: string
  alt?: string
  width?: number
  style?: React.CSSProperties
  className?: string
}

/**
 * CSS-based iPhone 15 Pro mockup.
 * Pass a screenshot path and desired pixel width; height is auto-calculated.
 */
export default function IPhoneMockup({
  screenshot,
  alt = 'App screenshot',
  width = 220,
  style = {},
  className = '',
}: IPhoneMockupProps) {
  const h  = Math.round(width * 2.115)     // overall phone height
  const r  = Math.round(width * 0.188)     // body border-radius
  const sr = Math.round(width * 0.148)     // screen border-radius
  const si = Math.round(width * 0.031)     // screen inset (body → screen)
  const dw = Math.round(width * 0.345)     // dynamic island width
  const dh = Math.round(width * 0.098)     // dynamic island height
  const dt = Math.round(width * 0.042)     // dynamic island top offset (inside screen)

  return (
    <div
      className={className}
      style={{
        width,
        height: h,
        position: 'relative',
        flexShrink: 0,
        ...style,
      }}
    >
      {/* ─── Phone Body ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: r,
          background: `
            linear-gradient(
              155deg,
              #3e3e42 0%,
              #2d2d30 25%,
              #1e1e20 55%,
              #161618 80%,
              #111113 100%
            )
          `,
          boxShadow: [
            '0 0 0 0.75px rgba(255,255,255,0.14)',   // outer rim
            'inset 0 0 0 0.5px rgba(0,0,0,0.6)',      // inner rim
            '0 40px 90px rgba(0,0,0,0.85)',            // deep shadow
            '0 15px 35px rgba(0,0,0,0.55)',
          ].join(', '),
        }}
      >
        {/* ─── Screen ─────────────────────────────────────────────── */}
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
          {/* Screenshot fills the screen */}
          <Image
            src={screenshot}
            alt={alt}
            fill
            className="object-cover object-top"
            placeholder="empty"
            sizes={`${width}px`}
          />

          {/* ─── Dynamic Island (floating pill over screenshot) ─── */}
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

          {/* Subtle status-bar darkening at the very top */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: Math.round(width * 0.19),
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Home-indicator bar */}
          <div
            style={{
              position: 'absolute',
              bottom: Math.round(width * 0.038),
              left: '50%',
              transform: 'translateX(-50%)',
              width: '34%',
              height: 4,
              background: 'rgba(255,255,255,0.3)',
              borderRadius: 2,
              zIndex: 20,
            }}
          />

          {/* Glass sheen on screen */}
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

        {/* ─── Side buttons ──────────────────────────────────────── */}
        {/* Power / Sleep-Wake (right) */}
        <div
          style={{
            position: 'absolute',
            right: -2.5,
            top: '36%',
            width: 3,
            height: '14%',
            background: 'linear-gradient(to right, #404044, #555558)',
            borderRadius: '0 2px 2px 0',
            boxShadow: '1px 0 3px rgba(0,0,0,0.6)',
          }}
        />

        {/* Mute switch (left) */}
        <div
          style={{
            position: 'absolute',
            left: -2.5,
            top: '18%',
            width: 3,
            height: '5%',
            background: 'linear-gradient(to left, #404044, #555558)',
            borderRadius: '2px 0 0 2px',
            boxShadow: '-1px 0 3px rgba(0,0,0,0.6)',
          }}
        />

        {/* Volume Up (left) */}
        <div
          style={{
            position: 'absolute',
            left: -2.5,
            top: '26%',
            width: 3,
            height: '9%',
            background: 'linear-gradient(to left, #404044, #555558)',
            borderRadius: '2px 0 0 2px',
            boxShadow: '-1px 0 3px rgba(0,0,0,0.6)',
          }}
        />

        {/* Volume Down (left) */}
        <div
          style={{
            position: 'absolute',
            left: -2.5,
            top: '37%',
            width: 3,
            height: '9%',
            background: 'linear-gradient(to left, #404044, #555558)',
            borderRadius: '2px 0 0 2px',
            boxShadow: '-1px 0 3px rgba(0,0,0,0.6)',
          }}
        />

        {/* Subtle highlight on top edge of body */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            right: '20%',
            height: 1,
            background: 'rgba(255,255,255,0.16)',
            borderRadius: r,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
