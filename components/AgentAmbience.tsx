'use client'

/**
 * AgentAmbience — per-agent ambient overlay layers.
 *
 * Each overlay is absolutely-positioned (inset:0), pointer-events:none,
 * and uses Framer Motion + CSS to create a subtle living atmosphere
 * around the agent portrait.
 */

import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   SCRIPTOR  —  Raven · Victorian scholar · amber/gold
   Candlelight flicker + rising ink sparks + parchment vignette
───────────────────────────────────────────────────────────── */
function ScriptorAmbience() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Candlelight — warm amber glow from lower-left, flickering */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 25% 95%, rgba(212,168,67,0.22) 0%, rgba(212,168,67,0.10) 30%, transparent 65%)',
        }}
        animate={{ opacity: [0.55, 1, 0.65, 0.90, 0.45, 0.80, 0.55] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          times: [0, 0.15, 0.32, 0.52, 0.68, 0.84, 1],
          ease: 'easeInOut',
        }}
      />
      {/* Secondary candlelight — right side, slower flicker */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 90%, rgba(212,168,67,0.10) 0%, transparent 50%)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.3, 0.7, 0.4] }}
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Rising ink sparks — ✦ glyphs drifting upward */}
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="absolute select-none font-bold"
          style={{
            fontSize: 7,
            color: '#D4A843',
            left: `${22 + i * 26}%`,
            bottom: '28%',
            opacity: 0,
          }}
          animate={{ y: [0, -18, -38], opacity: [0, 0.45, 0] }}
          transition={{
            duration: 2.8 + i * 0.6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: 'easeOut',
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CRESCENTIUS  —  Wolf · Data / Ads · blue #60A5FA
   Animated graph lines + pulsing data points + blue inner pulse
───────────────────────────────────────────────────────────── */
function CrescentiusAmbience() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* SVG graph line — draws itself on loop */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 300"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.14 }}
      >
        <motion.polyline
          points="5,260 45,210 85,230 125,170 160,148 195,125"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="440"
          initial={{ strokeDashoffset: 440 }}
          animate={{ strokeDashoffset: [440, 0, 0, 440] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.45, 0.7, 1],
            ease: 'easeInOut',
          }}
        />
        {/* Data-point pulses */}
        {([45, 85, 125, 160] as const).map((cx, i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={[210, 230, 170, 148][i]}
            r="3"
            fill="#60A5FA"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.2, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.65,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>
      {/* Blue inner pulse — inset box-shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: [
            'inset 0 0 0px rgba(96,165,250,0)',
            'inset 0 0 40px rgba(96,165,250,0.09)',
            'inset 0 0 0px rgba(96,165,250,0)',
          ],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SOCIALIS  —  Fox · TikTok / Social · coral #FB923C
   Floating social symbols + coral radial pulse
───────────────────────────────────────────────────────────── */
const SOCIAL_GLYPHS = ['♪', '◈', '★', '◆']

function SocialisAmbience() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Floating social glyphs */}
      {SOCIAL_GLYPHS.map((glyph, i) => (
        <motion.span
          key={i}
          className="absolute select-none font-bold"
          style={{
            fontSize: 9,
            color: '#FB923C',
            left: `${14 + i * 20}%`,
            bottom: '25%',
            opacity: 0,
          }}
          animate={{
            y: [0, -22, -50],
            x: [0, i % 2 === 0 ? 5 : -5, 0],
            opacity: [0, 0.55, 0],
          }}
          transition={{
            duration: 2.4 + i * 0.45,
            repeat: Infinity,
            delay: i * 0.75,
            ease: 'easeOut',
          }}
        >
          {glyph}
        </motion.span>
      ))}
      {/* Coral centre pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 30%, rgba(251,146,60,0) 0%, transparent 70%)',
            'radial-gradient(ellipse at 50% 30%, rgba(251,146,60,0.10) 0%, transparent 70%)',
            'radial-gradient(ellipse at 50% 30%, rgba(251,146,60,0) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FABRICIUS  —  Badger · iOS Dev · orange #F97316
   Drifting code fragments + subtle terminal scanline flicker
───────────────────────────────────────────────────────────── */
const CODE_FRAGS = ['</>', '{ }', '//', '( )']

function FabriciusAmbience() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Drifting code fragments */}
      {CODE_FRAGS.map((frag, i) => (
        <motion.span
          key={i}
          className="absolute select-none font-mono font-bold"
          style={{
            fontSize: 8,
            color: '#F97316',
            left: `${8 + i * 22}%`,
            bottom: '22%',
            letterSpacing: '0.03em',
            opacity: 0,
          }}
          animate={{ y: [0, -30, -65], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 2.2 + i * 0.35,
            repeat: Infinity,
            delay: i * 0.65,
            ease: 'linear',
          }}
        >
          {frag}
        </motion.span>
      ))}
      {/* Terminal scanline flicker */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0, 0.045, 0, 0.025, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.08, 0.18, 0.5, 1],
          ease: 'easeInOut',
        }}
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(249,115,22,1) 3px, rgba(249,115,22,1) 4px)',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PRUTTIUS MAXIMUS  —  BACKGROUND LAYER  (renders BEHIND portrait)
   Halo circle correctly positioned behind the crown, NOT the face.
   The circle is 78% of container width, centered at 50% / 30%
   so its top edge is slightly above the portrait frame — making the
   lower arc disappear behind the emperor just like religious icon art.
───────────────────────────────────────────────────────────── */
export function PruttiusAmbienceBg() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>

      {/* ── 1. Deep golden aura — enormous soft radial behind him ──── */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 18%, rgba(201,146,42,0.22) 0%, rgba(201,146,42,0.08) 48%, transparent 75%)',
        }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── 2. Primary imperial halo ring — behind the crown ─────────
           width: 78% of container, aspectRatio 1:1 → perfect circle
           top: -4%  means the ring starts slightly ABOVE the image edge
           left: 11% → horizontally centred (11 + 39 = 50%)
           This places the circle centre at ≈ (50%, 33%) of the portrait
           which aligns with the crown at the top of the painting.
      ────────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{
          width: '78%',
          aspectRatio: '1 / 1',
          top: '-4%',
          left: '11%',
          borderRadius: '50%',
          border: '1.5px solid rgba(201,146,42,0.48)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            '0 0 28px rgba(201,146,42,0.10), inset 0 0 28px rgba(201,146,42,0.05)',
            '0 0 65px rgba(201,146,42,0.32), inset 0 0 45px rgba(201,146,42,0.16)',
            '0 0 28px rgba(201,146,42,0.10), inset 0 0 28px rgba(201,146,42,0.05)',
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── 3. Outer secondary ring — wider, very faint, slower ──────── */}
      <motion.div
        className="absolute"
        style={{
          width: '93%',
          aspectRatio: '1 / 1',
          top: '-9%',
          left: '3.5%',
          borderRadius: '50%',
          border: '1px solid rgba(201,146,42,0.18)',
        }}
        animate={{ opacity: [0.15, 0.42, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PRUTTIUS MAXIMUS  —  FOREGROUND LAYER  (renders IN FRONT of portrait)
   Light rays, staff glow, dust particles — layered over the image
   for the cinematic temple / sacred painting atmosphere.
───────────────────────────────────────────────────────────── */
export function PruttiusAmbienceFg() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>

      {/* ── 1. Heavenly light rays from above ─────────────────────────
           Three descending radial gradients anchored to the top edge.
           The painting already has painted-in light — these subtly
           reinforce it.
      ────────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 22% 62% at 50% 0%, rgba(255,215,80,0.07) 0%, transparent 100%)',
            'radial-gradient(ellipse 12% 42% at 30% 0%, rgba(255,215,80,0.04) 0%, transparent 100%)',
            'radial-gradient(ellipse 12% 42% at 70% 0%, rgba(255,215,80,0.04) 0%, transparent 100%)',
          ].join(', '),
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* ── 2. Staff / sceptre golden energy point ────────────────────
           The eagle-topped sceptre sits at roughly (17%, 63%) in the image
      ────────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 30,
          height: 30,
          left: '17%',
          top: '62%',
          background: 'radial-gradient(circle, rgba(201,146,42,0.80) 0%, rgba(201,146,42,0.25) 40%, transparent 70%)',
          filter: 'blur(4px)',
        }}
        animate={{ opacity: [0.2, 0.65, 0.2], scale: [0.85, 1.25, 0.85] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── 3. Rising golden dust motes ────────────────────────────── */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2.5,
            height: 2.5,
            background: '#E0A830',
            boxShadow: '0 0 4px rgba(224,168,48,0.8)',
            left: `${14 + i * 16}%`,
            bottom: '16%',
            opacity: 0,
          }}
          animate={{
            y: [0, -65, -130],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0, 0.80, 0],
          }}
          transition={{
            duration: 4.2 + i * 0.55,
            repeat: Infinity,
            delay: i * 0.85,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   COMBINED — keeps backwards-compat; not used in EmperorSection
   (which uses Bg+Fg split directly for correct z-layering)
───────────────────────────────────────────────────────────── */
export function PruttiusAmbience() {
  return (
    <>
      <PruttiusAmbienceBg />
      <PruttiusAmbienceFg />
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   DEFAULT EXPORT — agent ID → component
───────────────────────────────────────────────────────────── */
export default function AgentAmbience({ agentId }: { agentId: string }) {
  switch (agentId) {
    case 'scriptor':    return <ScriptorAmbience />
    case 'crescentius': return <CrescentiusAmbience />
    case 'socialis':    return <SocialisAmbience />
    case 'fabricius':   return <FabriciusAmbience />
    case 'pruttius':    return <PruttiusAmbience />
    default:            return null
  }
}
