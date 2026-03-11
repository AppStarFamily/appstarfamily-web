'use client'

import {
  useState, useEffect, useRef, useCallback,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import IPhoneMockup from './IPhoneMockup'
import type { App } from '@/data/apps'

/* ── Slide animation variants ───────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

const SLIDE_DURATION = 0.38
const SLIDE_EASE = [0.25, 0.46, 0.45, 0.94] as const
const AUTO_ADVANCE_MS = 3800

/* ─────────────────────────────────────────────────────────────
   CAROUSEL BUTTON
───────────────────────────────────────────────────────────── */
function CarouselButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={direction === 'prev' ? 'Previous screenshot' : 'Next screenshot'}
      style={{
        width: 34,
        height: 34,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        lineHeight: 1,
        cursor: 'pointer',
        border: hov
          ? '1px solid rgba(201,146,42,0.5)'
          : '1px solid rgba(255,255,255,0.1)',
        background: hov
          ? 'rgba(201,146,42,0.1)'
          : 'rgba(255,255,255,0.045)',
        backdropFilter: 'blur(8px)',
        color: hov ? '#F0C060' : 'rgba(255,255,255,0.45)',
        transform: hov ? 'scale(1.08)' : 'scale(1)',
        transition: 'all 0.2s ease',
        outline: 'none',
        userSelect: 'none',
      }}
    >
      {direction === 'prev' ? '‹' : '›'}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────
   DOT INDICATORS
───────────────────────────────────────────────────────────── */
function DotIndicators({
  count,
  current,
  goTo,
}: {
  count: number
  current: number
  goTo: (i: number) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to screenshot ${i + 1}`}
          style={{
            width: i === current ? 20 : 5,
            height: 5,
            borderRadius: 2.5,
            background:
              i === current
                ? 'rgba(201,146,42,0.95)'
                : 'rgba(255,255,255,0.18)',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            outline: 'none',
            transition: 'width 0.3s ease, background 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FEATURED APP SHOWCASE
   Full-width cinematic block with interactive screenshot carousel.
───────────────────────────────────────────────────────────── */
export default function FeaturedAppShowcase({ app }: { app: App }) {
  const screenshots = app.screenshots ?? []
  const hasScreenshots = screenshots.length > 0
  const multipleScreenshots = screenshots.length > 1

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  /* Auto-advance */
  useEffect(() => {
    if (isHovered || !multipleScreenshots) return
    const id = setInterval(() => {
      setDirection(1)
      setCurrent(i => (i + 1) % screenshots.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [isHovered, multipleScreenshots, screenshots.length])

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current],
  )

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(i => (i - 1 + screenshots.length) % screenshots.length)
  }, [screenshots.length])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(i => (i + 1) % screenshots.length)
  }, [screenshots.length])

  /* Touch swipe handlers */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY)
    if (Math.abs(dx) > 38 && Math.abs(dx) > dy) {
      dx > 0 ? next() : prev()
    }
  }

  /* Keyboard support when focused */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(201,146,42,0.07) 0%, rgba(6,10,24,0.98) 45%, rgba(4,8,20,0.99) 100%)',
        border: '1px solid rgba(201,146,42,0.28)',
        boxShadow:
          '0 8px 60px rgba(0,0,0,0.65), inset 0 1px 0 rgba(201,146,42,0.12)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── Blurred background screenshot (cinematic depth) ─────── */}
      {hasScreenshots && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={`bg-${current}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={screenshots[current]}
                alt=""
                fill
                className="object-cover"
                style={{
                  filter: 'blur(52px)',
                  transform: 'scale(1.5)',
                  opacity: 0.2,
                }}
                placeholder="empty"
                aria-hidden
              />
            </motion.div>
          </AnimatePresence>
          {/* Dark wash over blurred bg */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(5,8,20,0.82)' }}
          />
        </div>
      )}

      {/* ─── Decorative borders ──────────────────────────────────── */}
      {/* Top shimmer edge */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,146,42,0.55) 32%, rgba(201,146,42,0.32) 68%, transparent)',
        }}
      />
      {/* Top-left corner accent */}
      <div className="absolute top-0 left-0 w-28 h-px bg-gradient-to-r from-gold/60 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-px h-28 bg-gradient-to-b from-gold/60 to-transparent pointer-events-none" />
      {/* Bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-gold/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-gold/15 to-transparent pointer-events-none" />

      {/* ─── Main layout ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 sm:p-12 lg:p-14">

        {/* ── LEFT: iPhone carousel ─────────────────────────────── */}
        <div className="flex-shrink-0 flex flex-col items-center">

          {/* Phone with subtle hover lift */}
          <motion.div
            className="relative"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' as const }}
          >
            {/* Dynamic glow beneath phone — changes colour with screenshot */}
            <AnimatePresence mode="sync">
              <motion.div
                key={`glow-${current}`}
                className="absolute pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                style={{
                  bottom: -38,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 210,
                  height: 110,
                  background:
                    'radial-gradient(ellipse at top, rgba(201,146,42,0.38) 0%, transparent 72%)',
                  filter: 'blur(22px)',
                  zIndex: 0,
                }}
              />
            </AnimatePresence>

            {/* The iPhone frame with animated carousel inside */}
            <IPhoneMockup width={244} style={{ position: 'relative', zIndex: 1 }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: SLIDE_DURATION,
                    ease: SLIDE_EASE,
                  }}
                  style={{ position: 'absolute', inset: 0 }}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  onKeyDown={onKeyDown}
                  tabIndex={0}
                >
                  {screenshots[current] ? (
                    <Image
                      src={screenshots[current]}
                      alt={`${app.name} — screen ${current + 1}`}
                      fill
                      className="object-cover object-top"
                      placeholder="empty"
                      sizes="244px"
                      priority={current === 0}
                    />
                  ) : (
                    /* Fallback: app icon centred in screen */
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: '#111' }}
                    >
                      <Image
                        src={app.icon}
                        alt={app.name}
                        width={88}
                        height={88}
                        className="rounded-2xl"
                        placeholder="empty"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </IPhoneMockup>
          </motion.div>

          {/* ── Carousel controls ─────────────────────────────── */}
          {multipleScreenshots && (
            <div
              className="flex items-center gap-3 mt-6"
              style={{ userSelect: 'none' }}
            >
              <CarouselButton direction="prev" onClick={prev} />
              <DotIndicators
                count={screenshots.length}
                current={current}
                goTo={goTo}
              />
              <CarouselButton direction="next" onClick={next} />
            </div>
          )}

          {/* Subtle hint text */}
          {multipleScreenshots && (
            <p
              className="mt-3 text-center"
              style={{
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.18)',
              }}
            >
              {isHovered
                ? `${current + 1} / ${screenshots.length} · paused`
                : 'swipe or tap arrows'}
            </p>
          )}
        </div>

        {/* ── RIGHT: App details ────────────────────────────────── */}
        <div className="flex-1 text-left">

          {/* App icon + badges */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-shrink-0">
              {/* Icon glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'rgba(201,146,42,0.5)',
                  borderRadius: 18,
                  filter: 'blur(18px)',
                  transform: 'scale(0.85) translateY(5px)',
                  opacity: 0.7,
                }}
              />
              <Image
                src={app.icon}
                alt={app.name}
                width={72}
                height={72}
                className="rounded-2xl relative z-10"
                placeholder="empty"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="category-pill">{app.category}</span>
                {app.status === 'live' && (
                  <span className="status-live">Live</span>
                )}
              </div>
              {app.markets &&
                app.markets.length > 0 &&
                app.markets[0] !== 'Global' && (
                  <p
                    className="uppercase font-medium mt-1.5"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.1em',
                      color: '#4B5060',
                    }}
                  >
                    {app.markets.slice(0, 5).join(' · ')}
                  </p>
                )}
            </div>
          </div>

          {/* App name */}
          <h3
            className="font-jakarta font-bold text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(24px, 3.8vw, 40px)' }}
          >
            PouchOut
            <span style={{ color: 'rgba(201,146,42,0.55)', fontWeight: 300 }}>
              {' '}— Quit Zyn
            </span>
          </h3>

          {/* Tagline */}
          <p
            className="leading-relaxed mb-4"
            style={{ color: '#C0B8A8', fontSize: 'clamp(15px, 1.5vw, 18px)' }}
          >
            {app.tagline}
          </p>

          {/* Thin gold divider */}
          <div
            className="mb-6"
            style={{
              height: 1,
              maxWidth: 280,
              background:
                'linear-gradient(to right, rgba(201,146,42,0.45), transparent)',
            }}
          />

          {/* Description */}
          <p
            className="leading-relaxed mb-8"
            style={{ color: '#6E7480', fontSize: 14, maxWidth: 420 }}
          >
            {app.description}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              '9 Languages',
              '7 Markets',
              'Smart Tracking',
              'Milestones',
            ].map(f => (
              <span
                key={f}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.03em',
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                App Store ↗
              </a>
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
