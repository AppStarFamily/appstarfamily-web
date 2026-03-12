'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import StarField from '@/components/StarField'
import AppCard from '@/components/AppCard'
import FeaturedAppShowcase from '@/components/FeaturedAppShowcase'
import AgentAmbience, { PruttiusAmbienceBg, PruttiusAmbienceFg } from '@/components/AgentAmbience'
import AnimatedCounter from '@/components/AnimatedCounter'
import { apps } from '@/data/apps'
import { agents } from '@/data/agents'

/* ── Animation primitives ── */
const fadeUp = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/* ── Per-agent accent palette ── */
const agentAccents: Record<string, { color: string; glow: string; border: string; dim: string; topGlow: string }> = {
  pruttius:    { color: '#C9922A', glow: 'rgba(201,146,42,0.22)',  border: 'rgba(201,146,42,0.35)',  dim: 'rgba(201,146,42,0.05)', topGlow: 'rgba(201,146,42,0.15)' },
  scriptor:    { color: '#D4A843', glow: 'rgba(212,168,67,0.2)',   border: 'rgba(212,168,67,0.3)',   dim: 'rgba(212,168,67,0.04)', topGlow: 'rgba(212,168,67,0.12)' },
  crescentius: { color: '#60A5FA', glow: 'rgba(96,165,250,0.22)',  border: 'rgba(96,165,250,0.32)',  dim: 'rgba(96,165,250,0.05)', topGlow: 'rgba(96,165,250,0.14)' },
  socialis:    { color: '#FB923C', glow: 'rgba(251,146,60,0.22)',  border: 'rgba(251,146,60,0.32)',  dim: 'rgba(251,146,60,0.05)', topGlow: 'rgba(251,146,60,0.13)' },
  fabricius:   { color: '#F97316', glow: 'rgba(249,115,22,0.22)',  border: 'rgba(249,115,22,0.32)',  dim: 'rgba(249,115,22,0.05)', topGlow: 'rgba(249,115,22,0.13)' },
  designius:   { color: '#34D399', glow: 'rgba(52,211,153,0.22)',  border: 'rgba(52,211,153,0.32)',  dim: 'rgba(52,211,153,0.05)', topGlow: 'rgba(52,211,153,0.13)' },
  translatius: { color: '#A78BFA', glow: 'rgba(167,139,250,0.22)', border: 'rgba(167,139,250,0.32)', dim: 'rgba(167,139,250,0.05)', topGlow: 'rgba(167,139,250,0.13)' },
}

/* ── Data ── */
const emperor = agents.find(a => a.isCEO)!
const specialists = agents.filter(a => !a.isCEO)
const featuredApps = apps.filter(a => a.featured)
const heroApp = featuredApps[0]
const gridApps = featuredApps.slice(1)

const commandMetrics: {
  label: string; value: string; numericTarget: number | null; sub: string; accent: string
}[] = [
  { label: 'Agents Online',   value: '5',     numericTarget: 5,    sub: 'Active',    accent: '#4ade80' },
  { label: 'Apps Deployed',   value: '12',    numericTarget: 12,   sub: '9 Live',    accent: '#C9922A' },
  { label: 'Markets Reached', value: '7',     numericTarget: 7,    sub: 'Countries', accent: '#00E5FF' },
  { label: 'Languages',       value: '9',     numericTarget: 9,    sub: 'Localised', accent: '#60A5FA' },
  { label: 'Last Brief',      value: '08:00', numericTarget: null, sub: 'Daily',     accent: '#C9922A' },
  { label: 'Status',          value: 'LIVE',  numericTarget: null, sub: 'Building',  accent: '#4ade80' },
]

const agentActivities: Record<string, { activity: string; progress: number }> = {
  pruttius:    { activity: 'Commanding',  progress: 95 },
  scriptor:    { activity: 'Publishing',  progress: 72 },
  crescentius: { activity: 'Analysing',   progress: 85 },
  socialis:    { activity: 'Posting',     progress: 68 },
  fabricius:   { activity: 'Building',    progress: 91 },
}

const principles = [
  { icon: '⚡', title: 'AI-Powered',   desc: 'Five specialist agents working in parallel — content, growth, social, code — around the clock.' },
  { icon: '◆',  title: 'Taste-Led',    desc: 'Premium product design guided by real users, not trend decks or agency templates.' },
  { icon: '→',  title: 'Ships Fast',   desc: 'From idea to live App Store listing in weeks. Velocity is a product feature.' },
  { icon: '◉',  title: 'Built Global', desc: '9 languages. 7 markets. Localised for discovery and conversion from day one.' },
]

/* ══════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ManifestoSection />
      <EmperorSection />
      <CouncilSection />
      <CommandSection />
      <PortfolioSection />
      <PhilosophySection />
      <ClosingSection />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTION 1 — HERO  (4-layer parallax)
   Layer 1: Star field         — slowest  (y += 20% on scroll)
   Layer 2: Empire nebula      — medium   (y += 12%)
   Layer 3: Sacred halo        — faster   (y +=  7%)
   Layer 4: Content            — no parallax
══════════════════════════════════════════════════════════ */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Positive y = layer drifts DOWN within section as user scrolls → appears to move up SLOWER than content
  const starY   = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const nebulaY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const haloY   = useTransform(scrollYProgress, [0, 1], ['0%', '7%'])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(175deg, #010507 0%, #030916 55%, #060D20 100%)' }}
    >
      {/* ── Layer 1: Star field — slowest parallax ────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ y: starY, top: '-8%', left: 0, right: 0, bottom: '-8%' }}
      >
        <StarField />
      </motion.div>

      {/* ── Layer 2: Empire nebula / atmospheric painting ─────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: nebulaY }}
      >
        {/* Horizon band — warm gold at mid-section */}
        <div style={{
          position: 'absolute', top: '35%', left: 0, right: 0, height: '30%',
          background: 'linear-gradient(to bottom, transparent, rgba(201,146,42,0.042) 35%, rgba(201,146,42,0.058) 52%, rgba(201,146,42,0.028) 72%, transparent)',
          filter: 'blur(28px)',
        }} />
        {/* Left gold nebula cloud */}
        <div style={{
          position: 'absolute', top: '12%', left: 0, width: '45%', height: '50%',
          background: 'radial-gradient(ellipse at 18% 45%, rgba(201,146,42,0.048) 0%, transparent 68%)',
          filter: 'blur(55px)',
        }} />
        {/* Right cyan nebula */}
        <div style={{
          position: 'absolute', top: '8%', right: 0, width: '38%', height: '40%',
          background: 'radial-gradient(ellipse at 70% 30%, rgba(0,229,255,0.022) 0%, transparent 68%)',
          filter: 'blur(48px)',
        }} />
        {/* Lower gold wisp */}
        <div style={{
          position: 'absolute', bottom: '22%', left: '22%', width: '48%', height: '28%',
          background: 'radial-gradient(ellipse, rgba(201,146,42,0.032) 0%, transparent 65%)',
          filter: 'blur(65px)',
        }} />
      </motion.div>

      {/* ── Layer 3: Sacred halo behind logo — faster ─────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ y: haloY }}
      >
        {/* Primary gold sacred halo */}
        <div style={{
          width: '58vmin', height: '58vmin',
          background: 'radial-gradient(circle, rgba(201,146,42,0.12) 0%, rgba(201,146,42,0.05) 38%, transparent 70%)',
          filter: 'blur(6px)',
          borderRadius: '50%',
          marginTop: '-8vmin', // align with logo vertical position
        }} />
        {/* Subtle cyan accent counter-glow */}
        <div style={{
          position: 'absolute',
          width: '40vmin', height: '40vmin',
          top: '55%', right: '15%',
          background: 'radial-gradient(ellipse, rgba(0,229,255,0.038) 0%, transparent 65%)',
          filter: 'blur(30px)',
          borderRadius: '50%',
        }} />
      </motion.div>

      {/* ── Layer 4: Content — normal scroll ──────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Overline chip */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="overline-chip">
            <span className="overline-chip-dot" />
            Premium iOS App Studio
          </span>
        </motion.div>

        {/* Logo — sacred imperial insignia */}
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <div className="relative">
            {/* Gold halo behind logo */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at center, rgba(201,146,42,0.35) 0%, rgba(201,146,42,0.12) 45%, transparent 72%)',
              transform: 'scale(1.6)',
              filter: 'blur(16px)',
              borderRadius: '50%',
            }} />
            <Image
              src="/images/logo.png"
              alt="App Star Family"
              width={192}
              height={192}
              className="animate-float relative z-10"
              placeholder="empty"
              priority
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-jakarta font-bold leading-none tracking-tight text-gold-light mb-5"
          style={{ fontSize: 'clamp(48px, 10vw, 112px)' }}
        >
          App Star Family
        </motion.h1>

        {/* Ornamental divider */}
        <motion.div variants={fadeIn} className="flex items-center gap-4 mb-5">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/30" />
          <span className="text-gold/40 text-[10px] tracking-[0.4em]">◆</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>

        {/* Sublines */}
        <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg sm:text-xl mb-2 tracking-wide">
          Home of the Pruttius Empire.
        </motion.p>
        <motion.p variants={fadeUp} className="font-jakarta italic text-gold text-xl sm:text-2xl mb-12 tracking-wide">
          Long may he pinch.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
          <Link href="/apps" className="btn-primary">Explore the Apps</Link>
          <Link href="/empire" className="btn-secondary">Meet the Empire</Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="w-6 h-9 rounded-full flex justify-center pt-1.5"
          style={{ border: '1px solid rgba(201,146,42,0.2)' }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <div className="w-0.5 h-2.5 rounded-full bg-gold/50 animate-scroll-dot" />
        </motion.div>
      </div>

      {/* Bottom haze */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #040C1C)' }} />
      <div className="absolute bottom-0 left-0 right-0 section-divider-gold" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTION 2 — EMPIRE MANIFESTO
══════════════════════════════════════════════════════════ */
function ManifestoSection() {
  return (
    <section
      className="relative py-28 sm:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #040C1C 0%, #06101E 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 55% at 50% 80%, rgba(201,146,42,0.055) 0%, transparent 65%)'
      }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>

          <motion.div variants={fadeUp} className="mb-7">
            <span className="overline-chip">
              <span className="overline-chip-dot" />
              The Pruttius Empire
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-jakarta font-bold text-white mb-8 leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(38px, 6vw, 76px)' }}
          >
            Five agents.<br />
            <span className="text-gold-light">One mission.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[#8B8FA8] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-16"
          >
            The Pruttius Empire is not a metaphor. It is a real multi-agent AI system built to run
            the content, growth, social, and development operations of App Star Family —
            autonomously, around the clock, from a dedicated Ubuntu VPS. Five specialist agents report
            to one emperor, who reports to JJ, who is usually on a beach.
          </motion.p>

          {/* Imperial stats */}
          <motion.div
            variants={staggerFast}
            className="flex flex-wrap justify-center items-stretch"
          >
            {[
              { num: '12', label: 'Apps' },
              { num: '5',  label: 'AI Agents' },
              { num: '9',  label: 'Languages' },
              { num: '7',  label: 'Markets' },
              { num: '1',  label: 'Motto' },
            ].map((stat, i, arr) => (
              <motion.div key={stat.label} variants={fadeUp} className="flex items-stretch">
                <div className="text-center px-7 sm:px-10 py-4">
                  <div
                    className="font-bold text-gold-light mb-1.5"
                    style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-[11px] text-[#5A5E70] uppercase tracking-[0.18em]">{stat.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px self-stretch bg-gold/12 my-2" />
                )}
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      <div className="mt-20 section-divider-gold" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTION 3 — THE EMPEROR
   Cinematic improvements:
   - Halo positioned BEHIND crown (not the face) via z-layering
   - PruttiusAmbienceBg renders before portrait image
   - PruttiusAmbienceFg renders after (light rays, staff glow, dust)
   - Nested motion.div for vertical drift (15s) + CSS zoom (12s)
   - Portrait entrance: blur-to-sharp sharpen-in
   - Copy panel: faint marble texture background
   - Button: glow + lift on hover
══════════════════════════════════════════════════════════ */
function EmperorSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #040B16 0%, #060A1A 100%)' }}
    >
      {/* Wide gold atmospheric emanating from portrait side */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 90% at 22% 50%, rgba(201,146,42,0.08) 0%, transparent 65%)'
      }} />

      <div className="relative max-w-7xl mx-auto">
        {/* lg:min-h so mobile flex-col doesn't add dead space */}
        <div className="flex flex-col lg:flex-row lg:min-h-[680px]">

          {/* ── PORTRAIT COLUMN ──────────────────────────────────────── */}
          <motion.div
            className="relative lg:w-[45%] min-h-[480px] lg:min-h-0"
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.6, ease: 'easeOut' as const }}
          >
            {/* Overflow clip — separate from blur entrance to avoid filter/stacking issues.
                 Clips zoom bleed (scale 1.04) and drift (±3px) to portrait bounds. */}
            <div className="absolute inset-0 overflow-hidden">

              {/* ─ Drift wrapper: image + aura move together ─ */}
              <motion.div
                className="absolute inset-[-6px]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' as const }}
              >
                {/* Aura locked to portrait — drifts with image */}
                <PruttiusAmbienceBg />

                <div
                  className="absolute inset-0 animate-portrait-zoom"
                  style={{ transformOrigin: 'top center' }}
                >
                  <Image
                    src={emperor.portrait}
                    alt={emperor.name}
                    fill
                    className="object-cover object-top"
                    placeholder="empty"
                    priority
                  />
                </div>
              </motion.div>

              {/* ─ Gradient overlays — fixed within clip, cover any drift/zoom edge ─ */}
              {/* Right-side fade into copy panel */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(to right, transparent 50%, rgba(4,11,22,1) 100%)'
              }} />
              {/* Bottom fade */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(to top, rgba(4,10,20,1) 0%, transparent 30%)'
              }} />

            </div>

            {/* ─ Light rays, staff glow, dust — outside clip so they can bleed naturally ─ */}
            <PruttiusAmbienceFg />
          </motion.div>

          {/* ── COPY COLUMN ──────────────────────────────────────────── */}
          <motion.div
            className="relative lg:w-[55%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-28"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{
              /* Faint marble-warmth texture behind copy */
              background: 'radial-gradient(ellipse 90% 70% at 15% 50%, rgba(201,146,42,0.028) 0%, transparent 65%)',
            }}
          >
            <motion.div variants={fadeUp} className="mb-5">
              <span className="overline-chip">
                <span className="overline-chip-dot" />
                CEO &amp; Emperor
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="text-5xl mb-4 leading-none">{emperor.emoji}</motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-jakarta font-bold text-gold-light mb-3 leading-none tracking-tight"
              style={{ fontSize: 'clamp(34px, 5vw, 58px)' }}
            >
              {emperor.name}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.22em] text-gold/55 mb-7">
              {emperor.animal} &middot; {emperor.role}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mb-8 h-px"
              style={{ background: 'linear-gradient(to right, rgba(201,146,42,0.4), transparent)' }}
            />

            <motion.ul variants={stagger} className="space-y-3 mb-8">
              {emperor.domains.map(domain => (
                <motion.li key={domain} variants={fadeUp} className="flex items-start gap-3 text-[#D4CBB8] text-sm">
                  <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {domain}
                </motion.li>
              ))}
            </motion.ul>

            <motion.p variants={fadeUp} className="text-[#7C8099] text-sm leading-relaxed mb-10">
              {emperor.bio}
            </motion.p>

            {/* Button — glow lift on hover */}
            <motion.div variants={fadeUp}>
              <motion.div
                className="inline-block"
                whileHover={{
                  y: -4,
                  filter: 'drop-shadow(0 8px 28px rgba(201,146,42,0.55))',
                }}
                transition={{ duration: 0.22, ease: 'easeOut' as const }}
              >
                <Link href="/empire" className="btn-primary inline-flex">
                  Enter the Throne Room
                </Link>
              </motion.div>
            </motion.div>

            {/* Watermark */}
            <div className="absolute bottom-6 right-8 text-3xl opacity-10 select-none pointer-events-none">
              &#x1F451;&#x1F99E;
            </div>
          </motion.div>

        </div>
      </div>

      <div className="section-divider-gold" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTION 4 — AGENT COUNCIL
══════════════════════════════════════════════════════════ */
function CouncilSection() {
  return (
    <section
      className="relative py-28 sm:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050A16 0%, #060C1A 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 35% at 50% 100%, rgba(0,229,255,0.03) 0%, transparent 70%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="mb-5">
            <span className="overline-chip">
              <span className="overline-chip-dot" />
              The Council
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-jakarta font-bold text-white mb-4 tracking-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Meet Your Agents
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#8B8FA8] text-base max-w-md mx-auto">
            Seven specialist AI agents. Each with a domain, a name, and a mission.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {specialists.map(agent => {
            const accent = agentAccents[agent.id] ?? agentAccents.pruttius
            return (
              <motion.div key={agent.id} variants={fadeUp}>
                <div
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: `linear-gradient(180deg, ${accent.dim} 0%, rgba(5,9,20,0.97) 100%)`,
                    border: `1px solid ${accent.border}`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 ${accent.topGlow}`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-8px)'
                    el.style.boxShadow = `0 20px 56px ${accent.glow}, 0 0 80px ${accent.glow}, inset 0 1px 0 ${accent.topGlow}`
                    el.style.borderColor = accent.color
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = ''
                    el.style.boxShadow = `0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 ${accent.topGlow}`
                    el.style.borderColor = accent.border
                  }}
                >
                  {/* Top edge highlight */}
                  <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{
                    background: `linear-gradient(90deg, transparent, ${accent.topGlow}, transparent)`
                  }} />

                  {/* Portrait */}
                  <div className="relative h-[300px] overflow-hidden">
                    {/* Slow-zoom wrapper (12 s ambient breathe) — pure CSS for instant image paint */}
                    <div
                      className="absolute inset-0 animate-portrait-zoom"
                      style={{ transformOrigin: 'top center' }}
                    >
                      <Image
                        src={agent.portrait}
                        alt={agent.name}
                        fill
                        className="object-cover object-top"
                        placeholder="empty"
                      />
                    </div>
                    {/* Bottom gradient fade */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: `linear-gradient(to bottom, transparent 45%, rgba(5,9,20,0.98) 100%)`
                    }} />
                    {/* Hover glow overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                      background: `radial-gradient(ellipse at center top, ${accent.glow} 0%, transparent 60%)`
                    }} />
                    {/* Per-agent ambient overlay */}
                    <AgentAmbience agentId={agent.id} />
                  </div>

                  {/* Info */}
                  <div className="p-5 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{agent.emoji}</span>
                      <h3 className="font-jakarta font-bold text-base" style={{ color: accent.color }}>
                        {agent.name}
                      </h3>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: accent.color, opacity: 0.55 }}>
                      {agent.animal}
                    </p>
                    <p className="text-[#8B8FA8] text-xs mb-4 font-medium">{agent.role}</p>
                    <ul className="space-y-1.5">
                      {agent.domains.slice(0, 3).map(d => (
                        <li key={d} className="flex items-start gap-2 text-xs text-[#D4CBB8]/65">
                          <span className="mt-0.5 flex-shrink-0 text-[9px]" style={{ color: accent.color }}>◆</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <Link href="/empire" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium">
            View the full Empire →
          </Link>
        </motion.div>

      </div>

      <div className="mt-28 section-divider-gold" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTION 5 — EMPIRE COMMAND CENTER
   Full mission-control redesign: animated counters,
   agent status bars, grid-pattern background, live indicators
══════════════════════════════════════════════════════════ */
function CommandSection() {
  const allAgents = agents // CEO + specialists, ordered as in data

  return (
    <section
      className="relative py-28 sm:py-36 overflow-hidden command-grid-bg"
      style={{ background: 'linear-gradient(180deg, #02060E 0%, #04090F 100%)' }}
    >
      {/* Cyan core atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,229,255,0.038) 0%, transparent 72%)'
      }} />
      {/* Gold corner accent */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 45% 40% at 0% 100%, rgba(201,146,42,0.04) 0%, transparent 60%)'
      }} />
      {/* Subtle horizontal scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.016]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,1) 3px, rgba(0,229,255,1) 4px)',
      }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="mb-5">
            <span className="overline-chip overline-chip-cyan inline-flex items-center gap-2">
              <motion.span
                className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.8)' }}
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
              Live Status
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-jakarta font-bold text-white mb-4 tracking-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Empire Command Center
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#5A6070] text-sm uppercase tracking-[0.2em]">
            Intelligence updated 08:00 daily &nbsp;·&nbsp; SEA Operations
          </motion.p>
        </motion.div>

        {/* ── Outer dashboard frame ──────────────────────────────── */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          style={{
            border: '1px solid rgba(0,229,255,0.14)',
            background: 'rgba(0,229,255,0.018)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 80px rgba(0,229,255,0.04), inset 0 1px 0 rgba(0,229,255,0.08)',
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-3 border-b"
            style={{ borderColor: 'rgba(0,229,255,0.1)', background: 'rgba(0,229,255,0.03)' }}
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.9)' }}
                animate={{ opacity: [1, 0.2, 1], scale: [1, 0.85, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: 'rgba(0,229,255,0.65)' }}>
                PRUTTIUS EMPIRE · OPERATIONAL
              </span>
            </div>
            <span className="text-[10px] font-mono" style={{ color: 'rgba(0,229,255,0.28)' }}>
              SYS_UPTIME: 99.9%
            </span>
          </div>

          {/* ── Metric grid ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px p-px" style={{ background: 'rgba(0,229,255,0.06)' }}>
            {commandMetrics.map((m, idx) => (
              <motion.div
                key={m.label}
                className="relative p-6 text-center overflow-hidden"
                style={{ background: 'rgba(2,6,14,0.9)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: 'easeOut' as const }}
              >
                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-10 h-px" style={{ background: `linear-gradient(to right, ${m.accent}, transparent)` }} />
                <div className="absolute top-0 left-0 w-px h-10" style={{ background: `linear-gradient(to bottom, ${m.accent}, transparent)` }} />

                {/* Value */}
                <div
                  className="font-jakarta font-bold mb-2 leading-none"
                  style={{ color: m.accent, fontSize: 'clamp(26px, 3.5vw, 42px)' }}
                >
                  {m.numericTarget !== null ? (
                    <AnimatedCounter target={m.numericTarget} delay={idx * 70} />
                  ) : m.label === 'Status' ? (
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <motion.span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: m.accent, boxShadow: `0 0 10px ${m.accent}` }}
                        animate={{ opacity: [1, 0.2, 1], scale: [1, 0.75, 1] }}
                        transition={{ repeat: Infinity, duration: 1.4 }}
                      />
                      {m.value}
                    </span>
                  ) : (
                    m.value
                  )}
                </div>

                <div className="text-white text-[11px] font-semibold mb-1 uppercase tracking-widest">{m.label}</div>
                <div className="text-[#384050] text-[10px] uppercase tracking-wider">{m.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* ── Agent status board ──────────────────────────────── */}
          <div className="px-6 pt-6 pb-5" style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-5">
              <span
                className="text-[10px] uppercase tracking-[0.28em] font-semibold"
                style={{ color: 'rgba(0,229,255,0.4)' }}
              >
                Agent Status
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(0,229,255,0.07)' }} />
            </div>

            <div className="space-y-3.5">
              {allAgents.map((agent, i) => {
                const accent = agentAccents[agent.id] ?? agentAccents.pruttius
                const act = agentActivities[agent.id] ?? { activity: 'Active', progress: 80 }
                return (
                  <motion.div
                    key={agent.id}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: 'easeOut' as const }}
                  >
                    {/* Emoji + name */}
                    <span className="text-base flex-shrink-0 w-5 text-center">{agent.emoji}</span>
                    <span
                      className="font-jakarta font-semibold text-xs flex-shrink-0 w-28 truncate"
                      style={{ color: accent.color }}
                    >
                      {agent.name}
                    </span>

                    {/* Progress bar */}
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.045)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${accent.color}, ${accent.color}cc)`,
                          boxShadow: `0 0 8px ${accent.glow}`,
                        }}
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${act.progress}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.3,
                          delay: 0.35 + i * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94] as const,
                        }}
                      />
                    </div>

                    {/* Activity label */}
                    <span className="text-[10px] font-mono flex-shrink-0 w-20 text-right uppercase tracking-wider" style={{ color: '#384050' }}>
                      {act.activity}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Quote ──────────────────────────────────────────────── */}
        <motion.p
          className="text-center font-jakarta italic text-gold text-lg sm:text-xl mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          &ldquo;Building while JJ sleeps.&rdquo;
        </motion.p>

      </div>

      <div className="mt-28 section-divider-cyan" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTION 6 — PORTFOLIO (CINEMATIC INTERACTIVE SHOWCASE)
══════════════════════════════════════════════════════════ */
function PortfolioSection() {
  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060D1C 0%, #070F1E 50%, #060C1A 100%)' }}
    >
      {/* Section atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(201,146,42,0.06) 0%, transparent 55%)'
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 40% at 15% 60%, rgba(201,146,42,0.03) 0%, transparent 55%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ───────────────────────────────────── */}
        <motion.div
          className="text-center mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div variants={fadeUp} className="mb-5">
            <span className="overline-chip">
              <span className="overline-chip-dot" />
              The Portfolio
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-jakarta font-bold text-white mb-5 tracking-tight"
            style={{ fontSize: 'clamp(34px, 5.5vw, 62px)' }}
          >
            Apps that solve{' '}
            <span className="text-gold-light">real problems.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[#8B8FA8] text-base sm:text-lg mb-10 max-w-lg mx-auto">
            Built fast. Designed with taste. Grown autonomously.
          </motion.p>

          {/* Stats pill row */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-0">
            {[
              { num: '12', label: 'Apps' },
              { num: '5',  label: 'AI Agents' },
              { num: '9',  label: 'Languages' },
              { num: '7',  label: 'Markets' },
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex items-center">
                <div className="px-5 sm:px-7 py-2 text-center">
                  <span className="font-jakarta font-bold text-gold-light text-lg sm:text-xl">{stat.num}</span>
                  <span className="text-[#5A5E70] text-sm ml-1.5 uppercase tracking-wider" style={{ fontSize: 11 }}>{stat.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-4 bg-gold/18 flex-shrink-0" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Featured App — interactive carousel showcase ──────── */}
        {heroApp && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
          >
            <FeaturedAppShowcase app={heroApp} />
          </motion.div>
        )}

        {/* ── App Grid ─────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {gridApps.map(app => (
            <motion.div key={app.slug} variants={fadeUp}>
              <AppCard app={app} variant="featured" />
            </motion.div>
          ))}
        </motion.div>

        {/* ── View All CTA ─────────────────────────────────────── */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium group"
          >
            <span>View all {apps.length} apps</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

      </div>

      <div className="mt-28 section-divider-gold" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTION 7 — PHILOSOPHY
══════════════════════════════════════════════════════════ */
function PhilosophySection() {
  return (
    <section
      className="relative py-28 sm:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060A18 0%, #07091C 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 70% at 0% 50%, rgba(201,146,42,0.05) 0%, transparent 55%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: editorial */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="overline-chip">
                <span className="overline-chip-dot" />
                Why We Exist
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-jakarta font-bold text-white mb-6 leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(32px, 4.5vw, 58px)' }}
            >
              Small studio.<br />
              <span className="text-gold-light">Imperial output.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#8B8FA8] text-base leading-relaxed mb-8 max-w-md">
              App Star Family is proof that one developer with the right AI system can out-create
              and out-ship entire agencies. We build premium products, grow them autonomously,
              and never apologise for having taste.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/apps" className="btn-primary inline-flex">See the Evidence</Link>
            </motion.div>
          </motion.div>

          {/* Right: principle cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {principles.map(p => (
              <motion.div key={p.title} variants={fadeUp}>
                <div
                  className="p-6 rounded-2xl h-full"
                  style={{
                    background: 'rgba(201,146,42,0.04)',
                    border: '1px solid rgba(201,146,42,0.14)',
                    boxShadow: 'inset 0 1px 0 rgba(201,146,42,0.08)',
                  }}
                >
                  <div className="text-2xl mb-3 text-gold">{p.icon}</div>
                  <h3 className="font-jakarta font-bold text-white text-sm mb-2 tracking-wide">{p.title}</h3>
                  <p className="text-[#8B8FA8] text-xs leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      <div className="mt-28 section-divider-gold" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTION 8 — CLOSING CTA
══════════════════════════════════════════════════════════ */
function ClosingSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden py-36 sm:py-44"
      style={{ background: 'linear-gradient(175deg, #060C18 0%, #030810 55%, #010407 100%)' }}
    >
      <StarField />
      {/* Strong gold ambient for this section */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 45%, rgba(201,146,42,0.11) 0%, transparent 65%)'
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 35% 35% at 72% 28%, rgba(0,229,255,0.04) 0%, transparent 55%)'
      }} />

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Logo — fix: use separate glow div to avoid yellow square from PNG background */}
        <motion.div variants={fadeUp} className="mb-10 flex justify-center">
          <div className="relative inline-flex items-center justify-center" style={{ width: 192, height: 192 }}>
            {/* Warm halo behind logo — masks any PNG background artifact */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at center, rgba(201,146,42,0.4) 0%, rgba(201,146,42,0.15) 40%, transparent 70%)',
              transform: 'scale(1.5)',
              filter: 'blur(18px)',
              borderRadius: '50%',
            }} />
            <Image
              src="/images/logo.png"
              alt="App Star Family"
              width={192}
              height={192}
              placeholder="empty"
              className="animate-float relative z-10"
            />
          </div>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-jakarta font-bold text-gold-light mb-5 tracking-tight"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
        >
          App Star Family
        </motion.h2>

        <motion.div variants={fadeIn} className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/25" />
          <span className="text-gold/35 text-[10px] tracking-[0.4em]">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/25" />
        </motion.div>

        <motion.p variants={fadeUp} className="text-[#8B8FA8] text-lg leading-relaxed mb-4 max-w-xl mx-auto">
          The home of products built with intelligence, taste, and ambition.
        </motion.p>
        <motion.p variants={fadeUp} className="font-jakarta italic text-gold text-xl sm:text-2xl mb-14">
          Long may he pinch. &#x1F451;&#x1F99E;
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/apps" className="btn-primary">Explore the Apps</Link>
          <Link href="/empire" className="btn-secondary">Enter the Empire</Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
