'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import StarField from '@/components/StarField'
import { agents } from '@/data/agents'

/* ── Data ── */
const socialis = agents.find(a => a.id === 'socialis')!

/* ── Animation primitives ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}

const TOPICS = [
  'General Inquiry',
  'Support',
  'Partnership',
  'Press',
  'Other',
]

/* ── Floating dust particles (pure CSS animation) ── */
const PARTICLES = [
  { left: '8%',  top: '20%', size: 2.5, dur: 7.2,  delay: 0    },
  { left: '18%', top: '65%', size: 2,   dur: 9.8,  delay: 1.4  },
  { left: '32%', top: '40%', size: 3,   dur: 8.1,  delay: 0.7  },
  { left: '52%', top: '15%', size: 2,   dur: 11.4, delay: 2.1  },
  { left: '68%', top: '55%', size: 2.5, dur: 7.6,  delay: 3.3  },
  { left: '80%', top: '30%', size: 3,   dur: 10.2, delay: 0.4  },
  { left: '92%', top: '75%', size: 2,   dur: 8.9,  delay: 1.9  },
  { left: '45%', top: '82%', size: 2.5, dur: 12.1, delay: 5.0  },
  { left: '73%', top: '12%', size: 2,   dur: 6.8,  delay: 2.7  },
]

/* ════════════════════════════════════════════════════════════════
   CONTACT PAGE
═════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', topic: 'General Inquiry', message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    const subject = encodeURIComponent(`[${form.topic}] Message from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:info@appstarfamily.net?subject=${subject}&body=${body}`
    setTimeout(() => { setSending(false); setSent(true) }, 800)
  }

  function resetForm() {
    setSent(false)
    setForm({ name: '', email: '', topic: 'General Inquiry', message: '' })
  }

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[52vh] flex flex-col items-center justify-end pb-20 sm:pb-24 overflow-hidden pt-32"
        style={{ background: 'linear-gradient(175deg, #010507 0%, #030916 52%, #060D20 100%)' }}
      >
        {/* Star field */}
        <StarField />

        {/* Atmospheric gold haze */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 75% at 50% 0%, rgba(201,146,42,0.11) 0%, transparent 60%)',
        }} />
        {/* Fox-orange accent — Socialis presence */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 45% 55% at 78% 65%, rgba(251,146,60,0.07) 0%, transparent 65%)',
        }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent, #040B16)',
        }} />

        {/* Floating dust motes */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              background: 'rgba(201,146,42,0.55)',
              boxShadow: `0 0 ${p.size * 3}px rgba(201,146,42,0.4)`,
            }}
            animate={{ y: [0, -28, 0], opacity: [0, 0.7, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Arch light ray from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
          width: '60%',
          height: '50%',
          background: 'conic-gradient(from 270deg at 50% 0%, transparent 75deg, rgba(201,146,42,0.055) 90deg, rgba(201,146,42,0.02) 105deg, transparent 120deg)',
          filter: 'blur(2px)',
        }} />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="overline-chip">
              <motion.span
                className="overline-chip-dot"
                style={{ background: '#FB923C' }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              Imperial Communications
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-jakarta font-bold text-gold-light leading-none tracking-tight mb-5"
            style={{ fontSize: 'clamp(44px, 9vw, 96px)' }}
          >
            Contact the Empire
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/25" />
            <span className="text-gold/35 text-[10px] tracking-[0.4em]">◆</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/25" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-[#8B8FA8] text-base sm:text-lg mb-4 max-w-xl mx-auto leading-relaxed"
          >
            Messages to the Pruttius Empire are received by the Imperial Communications Office.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: 'rgba(251,146,60,0.7)' }}
          >
            Handled by Socialis &nbsp;·&nbsp; Social &amp; Communications
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 section-divider-gold" />
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 + 3 — SOCIALIS INTRO + CONTACT FORM
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #040B16 0%, #06091A 100%)' }}
      >
        {/* Fox-orange atmosphere from portrait side */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 55% 75% at 10% 55%, rgba(251,146,60,0.065) 0%, transparent 62%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 35% 50% at 90% 20%, rgba(201,146,42,0.04) 0%, transparent 60%)',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14 items-start">

            {/* ── LEFT: Socialis Portrait Card ── */}
            <motion.div
              initial={{ opacity: 0, x: -36, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: 'easeOut' as const }}
              className="rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(251,146,60,0.28)',
                boxShadow: '0 8px 48px rgba(251,146,60,0.1), 0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {/* Portrait */}
              <div className="relative h-[460px] sm:h-[520px] overflow-hidden">
                {/* Slow ambient zoom — pure CSS */}
                <div
                  className="absolute inset-0 animate-portrait-zoom"
                  style={{ transformOrigin: 'top center' }}
                >
                  <Image
                    src={socialis.portrait}
                    alt={socialis.name}
                    fill
                    className="object-cover object-top"
                    placeholder="empty"
                    priority
                  />
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'linear-gradient(to top, rgba(4,11,22,1) 0%, rgba(4,11,22,0.6) 35%, transparent 60%)',
                }} />
                {/* Orange ambient glow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse 60% 40% at 65% 90%, rgba(251,146,60,0.18) 0%, transparent 65%)',
                }} />

                {/* Name plate at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-3xl mb-2 select-none">{socialis.emoji}</div>
                  <h2
                    className="font-jakarta font-bold text-2xl sm:text-3xl mb-1 leading-none"
                    style={{ color: '#FB923C' }}
                  >
                    {socialis.name}
                  </h2>
                  <p
                    className="text-[10px] uppercase tracking-[0.25em] mb-4"
                    style={{ color: 'rgba(251,146,60,0.55)' }}
                  >
                    {socialis.animal}
                  </p>
                  <div
                    className="h-px mb-4"
                    style={{ background: 'linear-gradient(to right, rgba(251,146,60,0.45), transparent)' }}
                  />
                  <p className="font-jakarta font-semibold text-sm text-white/80">
                    Social &amp; Communications
                  </p>
                </div>
              </div>

              {/* Bio panel */}
              <div className="p-6" style={{ background: 'rgba(4,10,20,0.98)' }}>
                <p className="text-[#8B8FA8] text-sm leading-relaxed mb-5">
                  Socialis manages the empire&apos;s external channels, press inquiries, partnerships,
                  and community communication. Messages sent below are received by her and routed
                  to the appropriate agent.
                </p>

                {/* Domain tags */}
                <div className="flex flex-wrap gap-2">
                  {['TikTok Strategy', 'Press Inquiries', 'Partnerships', 'Community'].map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider"
                      style={{
                        background: 'rgba(251,146,60,0.08)',
                        border: '1px solid rgba(251,146,60,0.2)',
                        color: 'rgba(251,146,60,0.65)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: 'easeOut' as const, delay: 0.1 }}
              className="lg:sticky lg:top-24"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(201,146,42,0.2)',
                  background: 'rgba(4,9,20,0.92)',
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(201,146,42,0.09)',
                }}
              >
                {/* Panel header bar */}
                <div
                  className="flex items-center justify-between px-7 py-4 border-b"
                  style={{ borderColor: 'rgba(201,146,42,0.1)', background: 'rgba(201,146,42,0.02)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <motion.span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: '#4ade80', boxShadow: '0 0 7px rgba(74,222,128,0.9)' }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.6 }}
                    />
                    <span
                      className="text-[10px] uppercase tracking-[0.26em] font-semibold"
                      style={{ color: 'rgba(201,146,42,0.6)' }}
                    >
                      Imperial Comms · Secure Channel
                    </span>
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: 'rgba(201,146,42,0.25)' }}>
                    ENC_128
                  </span>
                </div>

                <div className="p-7">
                  {sent ? (
                    /* ── Success state ── */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-14"
                    >
                      <div className="text-5xl mb-5 select-none">📱</div>
                      <h3 className="font-jakarta font-bold text-xl text-white mb-3">
                        Message Received
                      </h3>
                      <p className="text-[#8B8FA8] text-sm leading-relaxed max-w-xs mx-auto mb-8">
                        Socialis has received your transmission. The empire will respond
                        within 24 hours.
                      </p>
                      <div
                        className="h-px mx-8 mb-8"
                        style={{ background: 'linear-gradient(to right, transparent, rgba(201,146,42,0.3), transparent)' }}
                      />
                      <button
                        onClick={resetForm}
                        className="text-xs text-gold hover:text-gold-light transition-colors uppercase tracking-[0.2em]"
                      >
                        Send another message →
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Form ── */
                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* Name */}
                      <FormField label="Your Name">
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="form-input"
                        />
                      </FormField>

                      {/* Email */}
                      <FormField label="Your Contact Email">
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="form-input"
                        />
                      </FormField>

                      {/* Topic */}
                      <FormField label="Topic">
                        <div className="relative">
                          <select
                            name="topic"
                            value={form.topic}
                            onChange={handleChange}
                            className="form-input appearance-none pr-10 cursor-pointer"
                            style={{ background: 'rgba(4,9,20,0.8)' }}
                          >
                            {TOPICS.map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                          {/* Chevron */}
                          <div
                            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'rgba(201,146,42,0.5)' }}
                          >
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                              <path
                                d="M1 1L5.5 5.5L10 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </FormField>

                      {/* Message */}
                      <FormField label="Message">
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          placeholder="Write your message to the empire..."
                          rows={5}
                          className="form-input resize-none"
                        />
                      </FormField>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={sending}
                        className="w-full btn-primary text-center py-4 text-sm font-semibold tracking-wider mt-1"
                        whileHover={{ y: -2, filter: 'drop-shadow(0 8px 24px rgba(201,146,42,0.45))' }}
                        transition={{ duration: 0.18 }}
                      >
                        {sending ? 'Transmitting…' : 'Send Message to the Empire'}
                      </motion.button>

                      <p className="text-center text-[10px] uppercase tracking-wider" style={{ color: '#3A3E50' }}>
                        Average response time: 24 hours
                      </p>

                    </form>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        <div className="mt-24 section-divider-gold" />
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 + 5 — OTHER CHANNELS + IMPERIAL HQ
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 sm:py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050A16 0%, #060C1A 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 100%, rgba(201,146,42,0.04) 0%, transparent 65%)',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* ── Other Communication Channels ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.div variants={fadeUp} className="mb-2">
                <span className="overline-chip">
                  <span className="overline-chip-dot" />
                  Reach Out
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-jakarta font-bold text-white text-xl sm:text-2xl mb-7 mt-4"
              >
                Other Communication Channels
              </motion.h2>

              <div className="space-y-4">
                {[
                  {
                    icon: '✉️',
                    label: 'Imperial Inbox',
                    value: 'info@appstarfamily.net',
                    href: 'mailto:info@appstarfamily.net',
                    isExternal: false,
                    accent: 'rgba(201,146,42',
                  },
                  {
                    icon: '📱',
                    label: 'Social Channel',
                    value: '@AppStarFamily',
                    href: 'https://twitter.com/AppstarFamily',
                    isExternal: true,
                    accent: 'rgba(0,229,255',
                  },
                ].map(ch => (
                  <motion.a
                    key={ch.label}
                    href={ch.href}
                    target={ch.isExternal ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    variants={fadeUp}
                    className="flex items-center gap-4 rounded-xl p-5 group block"
                    style={{
                      background: `${ch.accent},0.04)`,
                      border: `1px solid ${ch.accent},0.16)`,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                      transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = `${ch.accent},0.09)`
                      el.style.borderColor = `${ch.accent},0.38)`
                      el.style.boxShadow = `0 4px 24px ${ch.accent},0.12)`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = `${ch.accent},0.04)`
                      el.style.borderColor = `${ch.accent},0.16)`
                      el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)'
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${ch.accent},0.09)` }}
                    >
                      {ch.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#5A5E70] mb-1">
                        {ch.label}
                      </div>
                      <div className="font-jakarta font-semibold text-sm text-gold-light truncate">
                        {ch.value}
                      </div>
                    </div>
                    <div className="text-gold/35 group-hover:text-gold transition-colors flex-shrink-0 text-sm">
                      →
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ── Imperial Headquarters ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="mb-2">
                <span className="overline-chip">
                  <span className="overline-chip-dot" />
                  Location
                </span>
              </div>

              <h2 className="font-jakarta font-bold text-white text-xl sm:text-2xl mb-7 mt-4">
                Imperial Headquarters
              </h2>

              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(201,146,42,0.2)',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
                }}
              >
                {/* Embedded map with imperial styling */}
                <div className="relative h-52 overflow-hidden">
                  <iframe
                    title="Empire HQ — Singapore"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=103.8266%2C1.2910%2C103.8366%2C1.2960&layer=mapnik&marker=1.2935%2C103.8316"
                    className="absolute inset-0 w-full h-full border-0"
                    style={{
                      filter: 'saturate(0.25) sepia(0.5) brightness(0.55) hue-rotate(185deg)',
                    }}
                  />
                  {/* Gold overlay atmosphere */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse 50% 60% at 52% 48%, rgba(201,146,42,0.18) 0%, transparent 70%)',
                  }} />
                  {/* Top and bottom fade */}
                  <div className="absolute inset-x-0 top-0 h-6 pointer-events-none" style={{
                    background: 'linear-gradient(to bottom, rgba(4,11,22,0.6), transparent)',
                  }} />
                  <div className="absolute inset-x-0 bottom-0 h-6 pointer-events-none" style={{
                    background: 'linear-gradient(to top, rgba(4,10,20,0.8), transparent)',
                  }} />
                  {/* HQ marker badge */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="px-3.5 py-2 rounded-lg text-xs font-semibold backdrop-blur-sm flex items-center gap-2"
                      style={{
                        background: 'rgba(4,11,22,0.85)',
                        border: '1px solid rgba(201,146,42,0.5)',
                        color: '#F0C060',
                        boxShadow: '0 0 20px rgba(201,146,42,0.2)',
                      }}
                    >
                      <span>🏛️</span>
                      <span>Empire HQ</span>
                    </div>
                  </div>
                </div>

                {/* Address panel */}
                <div className="p-6" style={{ background: 'rgba(4,9,20,0.97)' }}>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#5A5E70] mb-3">
                    Registered Address
                  </div>
                  <p className="font-jakarta font-semibold text-white text-sm mb-1">
                    App Star Family PTE. LTD.
                  </p>
                  <p className="text-[#8B8FA8] text-sm">111 Somerset Road #08-10A</p>
                  <p className="text-[#8B8FA8] text-sm mb-4">238164 Singapore</p>
                  <a
                    href="https://maps.google.com/?q=111+Somerset+Road+Singapore+238164"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: 'rgba(201,146,42,0.55)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C9922A')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(201,146,42,0.55)')}
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Imperial seal footer ── */}
          <motion.div
            className="text-center mt-20 pt-10 border-t"
            style={{ borderColor: 'rgba(201,146,42,0.1)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-3xl mb-3 opacity-25 select-none">👑🦞</div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#3A3E50]">
              Seal of the Pruttius Empire &nbsp;·&nbsp; Established 2026
            </p>
          </motion.div>

        </div>
      </section>

    </div>
  )
}

/* ── Reusable form field wrapper ── */
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.2em] mb-1.5" style={{ color: '#5A5E70' }}>
        {label}
      </label>
      {children}
    </div>
  )
}
