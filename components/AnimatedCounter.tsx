'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  /** Animation duration in ms (default 1400) */
  duration?: number
  /** Delay before counter starts (ms, default 0) */
  delay?: number
}

/**
 * Counts up from 0 to `target` with an ease-out cubic curve
 * when it enters the viewport.  Uses rAF for smooth rendering.
 */
export default function AnimatedCounter({
  target,
  duration = 1400,
  delay = 0,
}: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(spanRef, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    const timer = setTimeout(() => {
      let startTime: number | null = null

      const tick = (timestamp: number) => {
        if (startTime === null) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, target, duration, delay])

  return <span ref={spanRef}>{count}</span>
}
