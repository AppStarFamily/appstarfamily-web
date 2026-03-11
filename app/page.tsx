'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import StarField from '@/components/StarField'
import AppCard from '@/components/AppCard'
import IPhoneMockup from '@/components/IPhoneMockup'
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
const agentAccents: Record<string, { color: string; glow: string; border: string; dim: string; topGlow: string }> = {
  pruttius:    { color: '#C9922A', glow: 'rgba(201,146,42,0.22)',  border: 'rgba(201,146,42,0.35)',  dim: 'rgba(201,146,42,0.05)', topGlow: 'rgba(201,146,42,0.15)' },
  scriptor:    { color: '#D4A843', glow: 'rgba(212,168,67,0.2)',   border: 'rgba(212,168,67,0.3)',   dim: 'rgba(212,168,67,0.04)', topGlow: 'rgba(212,168,67,0.12)' },
  crescentius: { color: '#60A5FA', glow: 'rgba(96,165,250,0.22)',  border: 'rgba(96,165,250,0.32)',  dim: 'rgba(96,165,250,0.05)', topGlow: 'rgba(96,165,250,0.14)' },
  socialis:    { color: '#FB923C', glow: 'rgba(251,146,60,0.22)',  border: 'rgba(251,146,60,0.32)',  dim: 'rgba(251,146,60,0.05)', topGlow: 'rgba(251,146,60,0.13)' },
  fabricius:   { color: '#F97316', glow: 'rgba(249,115,22,0.22)',  border: 'rgba(249,115,22,0.32)',  dim: 'rgba(249,115,22,0.05)', topGlow: 'rgba(249,115,22,0.13)' },
}

/* ── Data ── */
const emperor = agents.find(a => a.isCEO)!
const specialists = agents.filter(a => !a.isCEO)
const featuredApps = apps.filter(a => a.featured)
const heroApp = featuredApps[0]
const gridApps = featuredApps.slice(1)

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
        background: 'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(201,146,42,0.11) 0%, transparent 70%)'
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
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <div className="relative">
            {/* Gold halo behind logo to mask any PNG background */}
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
              placeholder="empty"
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
            Five specialist AI agents. Each with a domain, a name, and a mission.
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
                    <Image
                      src={agent.portrait}
                      alt={agent.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      placeholder="empty"
                    />
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(to bottom, transparent 45%, rgba(5,9,20,0.98) 100%)`
                    }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{
                      background: `radial-gradient(ellipse at center top, ${accent.glow} 0%, transparent 60%)`
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
                  boxShadow: 'inset 0 1px 0 rgba(0,229,255,0.06)',
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
   SECTION 6 — PORTFOLIO (CINEMATIC PRODUCT SHOWCASE)
══════════════════════════════════════════════════════════ */
function PortfolioSection() {
  const liveCount = apps.filter(a => a.status === 'live').length
  const screenshots = heroApp?.screenshots ?? []

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

        {/* ── FEATURED APP — PouchOut (iPhone mockup showcase) ─── */}
        {heroApp && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
          >
            {/* Outer panel */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(201,146,42,0.08) 0%, rgba(6,10,24,0.98) 45%, rgba(4,8,20,0.99) 100%)',
                border: '1px solid rgba(201,146,42,0.28)',
                boxShadow: '0 8px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,146,42,0.12)',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-28 h-px bg-gradient-to-r from-gold/60 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 w-px h-28 bg-gradient-to-b from-gold/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-gold/18 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-gold/18 to-transparent pointer-events-none" />
              {/* Top edge shimmer */}
              <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{
                background: 'linear-gradient(90deg, transparent, rgba(201,146,42,0.5) 35%, rgba(201,146,42,0.3) 65%, transparent)'
              }} />

              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 sm:p-12 lg:p-14">

                {/* ── Left: iPhone Stack ───────────────────────── */}
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover="hover"
                  initial="rest"
                  style={{ width: 330, height: 520 }}
                >
                  {/* Warm gold halo under the phones */}
                  <div className="absolute pointer-events-none" style={{
                    bottom: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 280,
                    height: 140,
                    background: 'radial-gradient(ellipse at top, rgba(201,146,42,0.3) 0%, transparent 70%)',
                    filter: 'blur(24px)',
                    zIndex: 0,
                  }} />

                  {/* Back phone — screenshot 4 */}
                  {screenshots[3] && (
                    <motion.div
                      variants={{
                        rest:  { rotate: 10,  x: 130, y: 48, opacity: 0.38, filter: 'blur(2px)',   scale: 0.79 },
                        hover: { rotate: 14,  x: 162, y: 32, opacity: 0.55, filter: 'blur(1px)',   scale: 0.81 },
                      }}
                      transition={{ duration: 0.45, ease: 'easeOut' as const }}
                      style={{ position: 'absolute', left: 0, top: 0, zIndex: 1, transformOrigin: 'bottom center' }}
                    >
                      <IPhoneMockup screenshot={screenshots[3]} alt="PouchOut screen 4" width={210} />
                    </motion.div>
                  )}

                  {/* Mid phone — screenshot 3 */}
                  {screenshots[2] && (
                    <motion.div
                      variants={{
                        rest:  { rotate: 5.5, x: 72,  y: 26, opacity: 0.62, filter: 'blur(0.8px)', scale: 0.88 },
                        hover: { rotate: 8,   x: 90,  y: 14, opacity: 0.8,  filter: 'blur(0.3px)', scale: 0.9  },
                      }}
                      transition={{ duration: 0.45, ease: 'easeOut' as const }}
                      style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, transformOrigin: 'bottom center' }}
                    >
                      <IPhoneMockup screenshot={screenshots[2]} alt="PouchOut screen 3" width={225} />
                    </motion.div>
                  )}

                  {/* Front phone — screenshot 1 (MAIN) */}
                  <motion.div
                    variants={{
                      rest:  { rotate: 0, x: 0, y: 0,   scale: 1 },
                      hover: { rotate: -1.5, x: -6, y: -12, scale: 1.02 },
                    }}
                    transition={{ duration: 0.45, ease: 'easeOut' as const }}
                    style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}
                  >
                    <IPhoneMockup screenshot={screenshots[0]} alt="PouchOut screen 1" width={244} />
                  </motion.div>
                </motion.div>

                {/* ── Right: App info panel ────────────────────── */}
                <motion.div
                  className="flex-1 text-left"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Icon + badges row */}
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 blur-xl opacity-70" style={{
                        background: 'rgba(201,146,42,0.5)',
                        borderRadius: 18,
                        transform: 'scale(0.85) translateY(4px)',
                      }} />
                      <Image
                        src={heroApp.icon}
                        alt={heroApp.name}
                        width={72}
                        height={72}
                        className="rounded-2xl relative z-10"
                        placeholder="empty"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="category-pill">{heroApp.category}</span>
                        <span className="status-live">Live</span>
                      </div>
                      {heroApp.markets && heroApp.markets.length > 0 && heroApp.markets[0] !== 'Global' && (
                        <p className="text-[11px] text-[#4B5060] uppercase tracking-wider font-medium mt-1.5">
                          {heroApp.markets.slice(0, 5).join(' · ')}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* App name */}
                  <motion.h3
                    variants={fadeUp}
                    className="font-jakarta font-bold text-white leading-tight mb-3"
                    style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
                  >
                    PouchOut
                    <span className="text-gold/60 font-light"> — Quit Zyn</span>
                  </motion.h3>

                  {/* Tagline */}
                  <motion.p variants={fadeUp} className="text-[#C0B8A8] text-base sm:text-lg leading-relaxed mb-4">
                    {heroApp.tagline}
                  </motion.p>

                  {/* Gold divider */}
                  <motion.div variants={fadeUp} className="h-px mb-6 max-w-xs" style={{
                    background: 'linear-gradient(to right, rgba(201,146,42,0.4), transparent)'
                  }} />

                  {/* Description */}
                  <motion.p variants={fadeUp} className="text-[#6E7480] text-sm leading-relaxed mb-8 max-w-md">
                    {heroApp.description}
                  </motion.p>

                  {/* CTA buttons */}
                  <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                    {heroApp.appStoreUrl && (
                      <a
                        href={heroApp.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        App Store ↗
                      </a>
                    )}
                    {heroApp.websiteUrl && (
                      <a
                        href={heroApp.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        Website ↗
                      </a>
                    )}
                  </motion.div>

                  {/* Screenshot hint */}
                  {screenshots.length > 1 && (
                    <motion.p variants={fadeUp} className="mt-6 text-[11px] text-[#3B404E] uppercase tracking-widest">
                      {screenshots.length} screens · Hover to explore
                    </motion.p>
                  )}
                </motion.div>

              </div>
            </div>
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
