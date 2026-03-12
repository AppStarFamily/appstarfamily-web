'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AppCard from '@/components/AppCard'
import FilterTabs from '@/components/FilterTabs'
import { apps } from '@/data/apps'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// Derive categories dynamically from the data
const allCategories = Array.from(new Set(apps.map(a => a.category)))
const categories = ['All', ...allCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1))]

const liveCount = apps.filter((a) => a.status === 'live').length
const comingSoonCount = apps.filter((a) => a.status === 'coming-soon').length

export default function AppsPage() {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All'
    ? apps
    : apps.filter((app) => app.category.toLowerCase() === activeTab.toLowerCase())

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="font-jakarta text-gold-light text-5xl sm:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The Portfolio
          </motion.h1>
          <motion.p
            className="text-[#8B8FA8] text-base max-w-xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            iOS apps across health, pregnancy, productivity, education and more.
            Built by one developer and seven AI agents from South East Asia.
          </motion.p>
          <motion.p
            className="text-xs text-[#5A5E70] uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {apps.length} apps &middot; {liveCount} live &middot; {comingSoonCount} coming soon
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <FilterTabs
              tabs={categories}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTab}
          >
            {filtered.map((app) => (
              <motion.div key={app.slug} variants={itemVariants}>
                <AppCard app={app} variant="full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
