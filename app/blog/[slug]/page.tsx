import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
  }
}

// Simple MDX-like renderer for raw markdown content
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-3xl font-bold mt-12 mb-4 font-jakarta text-gold">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-2xl font-semibold mt-8 mb-3 text-gold-light">
          {line.slice(4)}
        </h3>
      )
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      elements.push(
        <p key={i} className="mb-6 leading-relaxed text-[17px]" style={{ lineHeight: 1.8 }}>
          {line}
        </p>
      )
    }
    i++
  }
  return elements
}

// Extract h2 headings for table of contents
function extractHeadings(content: string): string[] {
  return content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.slice(3))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)

  const tagColors: Record<string, string> = {
    PouchOut: 'bg-green-500/10 text-green-400 border-green-500/20',
    HypnoBirthing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Lyrical: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    Empire: 'bg-gold/10 text-gold border-gold/20',
    Growth: 'bg-cyan/10 text-cyan border-cyan/20',
  }

  return (
    <div className="pt-28 pb-20 sm:pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          {/* Main content */}
          <article className="flex-1 max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="text-sm text-[#8B8FA8] hover:text-gold transition-colors mb-8 inline-block"
            >
              &larr; Back to Blog
            </Link>

            {/* Hero */}
            <h1 className="font-jakarta text-gold-light text-4xl sm:text-5xl font-bold mb-4">
              {post.meta.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-8 text-sm">
              <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${tagColors[post.meta.tag] || 'bg-gold/10 text-gold border-gold/20'}`}>
                {post.meta.tag}
              </span>
              <span className="text-[#5A5E70]">{post.meta.date}</span>
              <span className="text-[#5A5E70]">{post.meta.readingTime}</span>
            </div>

            {/* Content */}
            <div className="mdx-content">
              {renderContent(post.content)}
            </div>
          </article>

          {/* Sidebar — TOC */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h4 className="text-xs uppercase tracking-wider text-[#5A5E70] mb-4 font-semibold">
                  On this page
                </h4>
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <p key={heading} className="text-sm text-[#8B8FA8] hover:text-gold-light transition-colors cursor-pointer">
                      {heading}
                    </p>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
