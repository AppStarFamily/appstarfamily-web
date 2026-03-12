'use client'

/**
 * AgentAmbience — per-agent ambient overlay layers.
 *
 * Each overlay is absolutely-positioned (inset:0), pointer-events:none,
 * and uses Framer Motion + CSS to create a visible living atmosphere
 * around the agent portrait.
 */

import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   SCRIPTOR  —  Raven · Victorian scholar · amber/gold
   Candlelight flicker + rising ink sparks
───────────────────────────────────────────────────────────── */
function ScriptorAmbience() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Primary candlelight — warm amber glow from lower-left */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 22% 100%, rgba(212,168,67,0.55) 0%, rgba(212,168,67,0.25) 28%, transparent 60%)',
        }}
        animate={{ opacity: [0.55, 1, 0.65, 0.90, 0.42, 0.82, 0.55] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          times: [0, 0.15, 0.32, 0.52, 0.68, 0.84, 1],
          ease: 'easeInOut',
        }}
      />
      {/* Secondary candlelight — right side counter-flicker */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 82% 95%, rgba(212,168,67,0.28) 0%, transparent 48%)',
        }}
        animate={{ opacity: [0.4, 0.85, 0.3, 0.72, 0.4] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Rising ink sparks — ✦ glyphs drifting upward */}
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="absolute select-none font-bold"
          style={{
            fontSize: 11,
            color: '#D4A843',
            textShadow: '0 0 6px rgba(212,168,67,0.8)',
            left: `${20 + i * 28}%`,
            bottom: '25%',
            opacity: 0,
          }}
          animate={{ y: [0, -24, -52], opacity: [0, 0.75, 0] }}
          transition={{
            duration: 2.8 + i * 0.6,
            repeat: Infinity,
            delay: i * 1.1,
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
   Animated graph line + pulsing data points + blue inset glow
───────────────────────────────────────────────────────────── */
function CrescentiusAmbience() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Glowing wolf eyes — positioned at Crescentius's eye locations */}
      {[
        { left: '35%', top: '37%' },
        { left: '61%', top: '37%' },
      ].map((pos, i) => (
        <motion.div
          key={`eye-${i}`}
          className="absolute rounded-full"
          style={{
            width: 7,
            height: 7,
            left: pos.left,
            top: pos.top,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(96,165,250,1) 0%, rgba(96,165,250,0.55) 45%, transparent 75%)',
            boxShadow:
              '0 0 6px 2px rgba(96,165,250,0.7), 0 0 14px 4px rgba(96,165,250,0.35)',
          }}
          animate={{
            opacity: [0.55, 1, 0.55],
            scale: [0.88, 1.18, 0.88],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: i * 0.18,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* SVG graph line — draws itself on loop */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 300"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.35 }}
      >
        <motion.polyline
          points="5,260 45,210 85,230 125,170 160,148 195,125"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="2"
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
            r="5"
            fill="#60A5FA"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.65,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>
      {/* Blue inset glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: [
            'inset 0 0 0px rgba(96,165,250,0)',
            'inset 0 0 50px rgba(96,165,250,0.22)',
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
   Floating social glyphs + coral radial pulse
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
            fontSize: 13,
            color: '#FB923C',
            textShadow: '0 0 8px rgba(251,146,60,0.8)',
            left: `${12 + i * 20}%`,
            bottom: '22%',
            opacity: 0,
          }}
          animate={{
            y: [0, -28, -60],
            x: [0, i % 2 === 0 ? 7 : -7, 0],
            opacity: [0, 0.82, 0],
          }}
          transition={{
            duration: 2.4 + i * 0.45,
            repeat: Infinity,
            delay: i * 0.72,
            ease: 'easeOut',
          }}
        >
          {glyph}
        </motion.span>
      ))}
      {/* Coral centre radial pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(251,146,60,0) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(251,146,60,0.22) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(251,146,60,0) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FABRICIUS  —  Badger · iOS Dev · orange #F97316
   Drifting code fragments + terminal scanline flicker
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
            fontSize: 11,
            color: '#F97316',
            textShadow: '0 0 7px rgba(249,115,22,0.8)',
            left: `${7 + i * 22}%`,
            bottom: '20%',
            letterSpacing: '0.03em',
            opacity: 0,
          }}
          animate={{ y: [0, -35, -75], opacity: [0, 0.78, 0] }}
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
      {/* Terminal scanline flicker — quick flash */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0, 0.09, 0, 0.05, 0] }}
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
   DESIGNIUS  —  Chameleon · Visual Creative · emerald #34D399
   Iridescent colour-cycling aura + rising paint drops + design glyphs
───────────────────────────────────────────────────────────── */
const PAINT_DROPS = [
  '#34D399', '#F59E0B', '#F87171', '#60A5FA', '#A78BFA', '#FB923C',
]
const DESIGN_GLYPHS = ['◉', '⬟', '▲', '◈']

function DesigniusAmbience() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Iridescent colour-cycling glow — the chameleon's shifting skin */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(52,211,153,0.20) 0%, transparent 65%)',
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(96,165,250,0.17) 0%, transparent 65%)',
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(167,139,250,0.17) 0%, transparent 65%)',
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(251,146,60,0.14) 0%, transparent 65%)',
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(52,211,153,0.20) 0%, transparent 65%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Rising paint drops — multi-colour palette splatters */}
      {PAINT_DROPS.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 5,
            height: 5,
            background: color,
            boxShadow: `0 0 6px 2px ${color}99`,
            left: `${10 + i * 14}%`,
            bottom: '18%',
            opacity: 0,
          }}
          animate={{
            y: [0, -30, -65],
            x: [0, i % 2 === 0 ? 6 : -6, 0],
            opacity: [0, 0.9, 0],
            scale: [0.6, 1.3, 0.4],
          }}
          transition={{
            duration: 2.6 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.55,
            ease: 'easeOut',
          }}
        />
      ))}
      {/* Floating design glyphs */}
      {DESIGN_GLYPHS.map((glyph, i) => (
        <motion.span
          key={`g-${i}`}
          className="absolute select-none"
          style={{
            fontSize: 10,
            color: '#34D399',
            textShadow: '0 0 8px rgba(52,211,153,0.9)',
            left: `${18 + i * 18}%`,
            bottom: '32%',
            opacity: 0,
          }}
          animate={{ y: [0, -22, -48], opacity: [0, 0.72, 0] }}
          transition={{
            duration: 3.2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.9 + 0.3,
            ease: 'easeOut',
          }}
        >
          {glyph}
        </motion.span>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   TRANSLATIUS  —  Owl · Multilingual Scholar · violet #A78BFA
   Glowing amber eyes + dual candlelight flicker + floating lang chars
───────────────────────────────────────────────────────────── */
const LANG_CHARS = ['ä', 'ñ', 'å', '日', 'α', 'ę']

function TranslatiusAmbience() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Glowing amber owl eyes */}
      {[
        { left: '37%', top: '34%' },
        { left: '58%', top: '34%' },
      ].map((pos, i) => (
        <motion.div
          key={`eye-${i}`}
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            left: pos.left,
            top: pos.top,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(251,146,60,0.6) 45%, transparent 75%)',
            boxShadow:
              '0 0 8px 3px rgba(251,191,36,0.65), 0 0 18px 6px rgba(251,146,60,0.28)',
          }}
          animate={{ opacity: [0.65, 1, 0.65], scale: [0.88, 1.14, 0.88] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: i * 0.22,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Candlelight — left candle flicker */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 8% 72%, rgba(251,191,36,0.28) 0%, transparent 42%)',
        }}
        animate={{ opacity: [0.5, 0.95, 0.52, 0.84, 0.38, 0.78, 0.5] }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          times: [0, 0.12, 0.3, 0.5, 0.65, 0.82, 1],
          ease: 'easeInOut',
        }}
      />
      {/* Candlelight — right candle counter-flicker */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 90% 78%, rgba(251,191,36,0.22) 0%, transparent 38%)',
        }}
        animate={{ opacity: [0.38, 0.82, 0.28, 0.70, 0.38] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      {/* Floating multilingual characters */}
      {LANG_CHARS.map((char, i) => (
        <motion.span
          key={i}
          className="absolute select-none font-serif"
          style={{
            fontSize: 12,
            color: '#A78BFA',
            textShadow: '0 0 8px rgba(167,139,250,0.9)',
            left: `${8 + i * 15}%`,
            bottom: '20%',
            opacity: 0,
          }}
          animate={{ y: [0, -26, -55], opacity: [0, 0.82, 0] }}
          transition={{
            duration: 3.0 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeOut',
          }}
        >
          {char}
        </motion.span>
      ))}
      {/* Violet scholarly glow pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(167,139,250,0) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(167,139,250,0.17) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(167,139,250,0) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PRUTTIUS MAXIMUS  —  BACKGROUND LAYER  (renders BEHIND portrait)
   Golden aura only — halo rings removed per user feedback.
───────────────────────────────────────────────────────────── */
export function PruttiusAmbienceBg() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {/* Deep golden aura — enormous soft radial behind him */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 18%, rgba(201,146,42,0.22) 0%, rgba(201,146,42,0.08) 48%, transparent 75%)',
        }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PRUTTIUS MAXIMUS  —  FOREGROUND LAYER  (renders IN FRONT of portrait)
   Light rays from above + staff glow + rising dust motes.
───────────────────────────────────────────────────────────── */
export function PruttiusAmbienceFg() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>

      {/* Heavenly light rays from above */}
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

      {/* Staff / sceptre golden energy point at ≈ (17%, 62%) */}
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

      {/* Rising golden dust motes */}
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
   COMBINED — backward-compat; EmperorSection uses Bg+Fg directly
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
    case 'designius':   return <DesigniusAmbience />
    case 'translatius': return <TranslatiusAmbience />
    case 'pruttius':    return <PruttiusAmbience />
    default:            return null
  }
}
