'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import StarField from '@/components/StarField'
import AppCard from '@/components/AppCard'
import { apps } from '@/data/apps'
import { agents } from '@/data/agents'

/* ── Animation primitives ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

/* ── Per-agent accent palette ── */
const agentAccents: Record<string, { color: string; glow: string; border: string; dim: string }> = {
  pruttius:    { color: '#C9922A', glow: 'rgba(201,146,42,0.22)',  border: 'rgba(201,146,42,0.35)',  dim: 'rgba(201,146,42,0.05)' },
  scriptor:    { color: '#D4A843', glow: 'rgba(212,168,67,0.2)',   border: 'rgba(212,168,67,0.3)',   dim: 'rgba(212,168,67,0.04)' },
  crescentius: { color: '#60A5FA', glow: 'rgba(96,165,250,0.2)',   border: 'rgba(96,165,250,0.3)',   dim: 'rgba(96,165,250,0.05)' },
  socialis:    { color: '#FB923C', glow: 'rgba(251,146,60,0.2)',   border: 'rgba(251,146,60,0.3)',   dim: 'rgba(251,146,60,0.04)' },
  fabricius:   { color: '#F97316', glow: 'rgba(249,115,22,0.2)',   border: 'rgba(249,115,22,0.3)',   dim: 'rgba(249,115,22,0.04)' },
}

/* ── Data ── */
const emperor = agents.find(a => a.isCEO)!
const specialists = agents.filter(a => !a.isCEO)
const featuredApps = apps.filter(a => a.featured)

const commandMetrics: { label: string; value: string; sub: string; accent: string }[] = [
  { label: 'Agents Online',   value: '5',     sub: 'Active',    accent: '#4ade80' },
  { label: 'Apps Deployed',   value: '12',    sub: '9 Live',    accent: '#C9922A' },
  { label: 'Markets Reached', value: '7',     sub: 'Countries', accent: '#00E5FF' },
  { label: 'Languages',       value: '9',     sub: 'Localised', accent: '#60A5FA' },
  { label: 'Last Brief',      value: '08:00', sub: 'Daily',     accent: '#C9922A' },
  { label: 'Status',          value: 'Live',  sub: 'Building',  accent: '#4ade80' },
]

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
   SECTION 1 — HERO
══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(175deg, #010507 0%, #030916 55%, #060D20 100%)' }}
    >
      <StarField />

      {/* Sacred spotlight — gold radial behind logo */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(201,146,42,0.1) 0%, transparent 70%)'
      }} />
      {/* Subtle cyan counter-glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 40% 35% at 80% 70%, rgba(0,229,255,0.04) 0%, transparent 60%)'
      }} />

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
        <motion.div variants={fadeUp} className="mb-8">
          <Image
            src="/images/logo.png"
            alt="App Star Family"
            width={192}
            height={192}
            className="animate-float"
            style={{
              filter: 'drop-shadow(0 0 56px rgba(201,146,42,0.4)) drop-shadow(0 0 120px rgba(201,146,42,0.15))'
            }}
            priority
          />
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

      {/* Premium scroll indicator */}
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
══════════════════════════════════════════════════════════ */
function EmperorSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050B18 0%, #06091A 100%)' }}
    >
      {/* Warm gold atmospheric — emanates from portrait */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 80% at 25% 50%, rgba(201,146,42,0.07) 0%, transparent 60%)'
      }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row min-h-[680px]">

          {/* Portrait */}
          <motion.div
            className="relative lg:w-[45%] min-h-[420px] lg:min-h-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: 'easeOut' as const }}
          >
            <Image
              src={emperor.portrait}
              alt={emperor.name}
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to right, transparent 55%, rgba(6,9,26,1) 100%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(5,11,24,1) 0%, transparent 35%)'
            }} />
          </motion.div>

          {/* Copy */}
          <motion.div
            className="relative lg:w-[55%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-28"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
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

            <motion.div variants={fadeUp}>
              <Link href="/empire" className="btn-primary inline-flex">Enter the Throne Room</Link>
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
            Four specialist AI agents. Each with a domain, a name, and a mission.
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
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-7px)'
                    el.style.boxShadow = `0 12px 48px ${accent.glow}, 0 0 80px ${accent.glow}`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = ''
                    el.style.boxShadow = ''
                  }}
                >
                  {/* Portrait */}
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={agent.portrait}
                      alt={agent.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(to bottom, transparent 45%, rgba(5,9,20,0.98) 100%)`
                    }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                      background: `radial-gradient(ellipse at center top, ${accent.glow} 0%, transparent 55%)`
                    }} />
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
   SECTION 5 — COMMAND CENTER
══════════════════════════════════════════════════════════ */
function CommandSection() {
  return (
    <section
      className="relative py-28 sm:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #03080F 0%, #050C17 100%)' }}
    >
      {/* Cyan atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)'
      }} />
      {/* Subtle scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,1) 3px, rgba(0,229,255,1) 4px)',
      }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
              Live Status
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-jakarta font-bold text-white mb-4 tracking-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}
          >
            The Empire is Operational.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#8B8FA8] text-base">
            Real-time status of the Pruttius Empire. Updated 08:00 daily.
          </motion.p>
        </motion.div>

        {/* Command grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {commandMetrics.map(m => (
            <motion.div key={m.label} variants={fadeUp}>
              <div
                className="relative rounded-xl p-6 text-center overflow-hidden"
                style={{
                  background: 'rgba(0,229,255,0.025)',
                  border: '1px solid rgba(0,229,255,0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-12 h-px" style={{ background: `linear-gradient(to right, ${m.accent}, transparent)` }} />
                <div className="absolute top-0 left-0 w-px h-12" style={{ background: `linear-gradient(to bottom, ${m.accent}, transparent)` }} />
                <div
                  className="font-bold mb-1.5 leading-none"
                  style={{ color: m.accent, fontSize: 'clamp(24px, 3.5vw, 40px)' }}
                >
                  {m.value}
                </div>
                <div className="text-white text-xs font-semibold mb-1 uppercase tracking-wider">{m.label}</div>
                <div className="text-[#5A5E70] text-xs">{m.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center font-jakarta italic text-gold text-lg sm:text-xl"
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
   SECTION 6 — PORTFOLIO
══════════════════════════════════════════════════════════ */
function PortfolioSection() {
  return (
    <section
      className="relative py-28 sm:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060D1C 0%, #08101E 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,146,42,0.05) 0%, transparent 60%)'
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
              The Portfolio
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-jakarta font-bold text-gold-light mb-4 tracking-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 58px)' }}
          >
            12 Apps. Built to Ship.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#8B8FA8] text-base max-w-xl mx-auto">
            Across health, music, pregnancy, productivity, and more. Each one shipped with speed,
            taste, and ambition.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {featuredApps.map(app => (
            <motion.div key={app.slug} variants={fadeUp}>
              <AppCard app={app} variant="featured" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <Link href="/apps" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium">
            View all 12 apps →
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
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(201,146,42,0.08) 0%, transparent 65%)'
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
        <motion.div variants={fadeUp} className="mb-10">
          <Image
            src="/images/logo.png"
            alt="App Star Family"
            width={192}
            height={192}
            className="mx-auto"
            style={{ filter: 'drop-shadow(0 0 56px rgba(201,146,42,0.4)) drop-shadow(0 0 120px rgba(201,146,42,0.15))' }}
          />
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
