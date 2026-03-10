import Link from 'next/link'

export interface BlogPost {
  slug: string
  title: string
  date: string
  tag: string
  readingTime: string
  excerpt: string
}

interface BlogCardProps {
  post: BlogPost
}

const tagColors: Record<string, string> = {
  PouchOut: 'bg-green-500/10 text-green-400 border-green-500/20',
  HypnoBirthing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Lyrical: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Empire: 'bg-gold/10 text-gold border-gold/20',
  Growth: 'bg-cyan/10 text-cyan border-cyan/20',
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group bg-navy-card border border-gold/20 rounded-2xl p-5
                      hover:border-gold/50 hover:-translate-y-1 hover:shadow-gold
                      transition-all duration-300 h-full">
        {/* Tag + reading time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${tagColors[post.tag] || 'bg-gold/10 text-gold border-gold/20'}`}>
            {post.tag}
          </span>
          <span className="text-xs text-[#5A5E70]">{post.readingTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-jakarta font-semibold text-white text-lg mb-2 group-hover:text-gold-light transition-colors">
          {post.title}
        </h3>

        {/* Date */}
        <p className="text-xs text-[#5A5E70] mb-3">{post.date}</p>

        {/* Excerpt */}
        <p className="text-sm text-[#8B8FA8] line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  )
}
