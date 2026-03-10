'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AgentCard from '@/components/AgentCard'
import { agents } from '@/data/agents'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const ceo = agents.find((a) => a.isCEO)!
const specialists = agents.filter((a) => !a.isCEO)

export default function EmpirePage() {
  return (
    <>
      {/* Hero — dream_team banner */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/dream_team.png"
          alt="The Pruttius Empire"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(10,15,30,1) 0%, rgba(10,15,30,0.4) 50%, rgba(10,15,30,0.2) 100%)',
        }} />
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-jakarta text-gold-light text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide">
              THE PRUTTIUS EMPIRE
            </h1>
            <p className="font-jakarta italic text-gold text-xl mt-2">
              Long may he pinch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro section */}
      <section className="py-16 sm:py-20">
        <motion.div
          className="max-w-[720px] mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="font-jakarta text-gold-light text-3xl sm:text-4xl font-bold mb-6">
            Five agents. One mission.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#8B8FA8] text-base leading-relaxed">
            The Pruttius Empire is not a metaphor. It is a real multi-agent AI system
            built to run the content, growth, social, and development operations of
            App Star Family &mdash; autonomously, around the clock, from a dedicated Ubuntu VPS.
            Each agent has a name, a role, a portrait, and a workspace directory.
            They report to Pruttius Maximus, who reports to JJ, who is usually on a beach.
          </motion.p>
        </motion.div>
      </section>

      {/* CEO Panel */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AgentCard agent={ceo} variant="ceo" />
          </motion.div>
        </div>
      </section>

      {/* Specialist Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {specialists.map((agent) => (
              <motion.div key={agent.id} variants={itemVariants}>
                <AgentCard agent={agent} variant="specialist" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lore footer */}
      <section className="pb-20 border-t border-gold/10 pt-12">
        <div className="max-w-[560px] mx-auto px-4 text-center">
          <p className="font-jakarta italic text-gold text-xl mb-3">
            &ldquo;Long may he pinch.&rdquo; &#x1F451;&#x1F99E;
          </p>
          <p className="text-[#8B8FA8] text-sm mb-4">
            Established March 8, 2026.
          </p>
          <p className="text-[#5A5E70] text-xs">
            Fabricius scored 0/5 identifying agent portraits. His SwiftUI remains flawless.
          </p>
        </div>
      </section>
    </>
  )
}
