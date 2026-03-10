'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import BlogCard, { type BlogPost } from '@/components/BlogCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const filterTags = ['All', 'PouchOut', 'HypnoBirthing', 'Lyrical', 'Empire', 'Growth']

// Hardcoded posts for client component (avoids need for API route)
const allPosts: BlogPost[] = [
  {
    slug: 'building-the-pruttius-empire',
    title: 'Building the Pruttius Empire: From One Agent to Five',
    date: 'March 8, 2026',
    tag: 'Empire',
    readingTime: '6 min read',
    excerpt: 'How a single Claude agent evolved into a five-agent autonomous system running content, growth, social, and development operations 24/7.',
  },
  {
    slug: 'pouchout-launch-retrospective',
    title: 'PouchOut Launch Retrospective: 7 Markets in 7 Days',
    date: 'March 5, 2026',
    tag: 'PouchOut',
    readingTime: '4 min read',
    excerpt: 'The strategy behind launching PouchOut across 7 European and North American markets simultaneously, and what we learned.',
  },
]

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? allPosts
    : allPosts.filter((post) => post.tag === activeTag)

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
            Dispatches from the Empire
          </motion.h1>
          <motion.p
            className="text-[#8B8FA8] text-base max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Growth strategies, app launches, AI experiments,
            and notes from the build.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 ${
                  activeTag === tag
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-gold/10 text-[#8B8FA8] hover:text-gold hover:border-gold/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTag}
          >
            {filtered.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-[#5A5E70] text-sm mt-12">
              No posts in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
