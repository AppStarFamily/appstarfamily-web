import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tag: string
  readingTime: string
  excerpt: string
}

const contentDir = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(contentDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      tag: data.tag || 'General',
      readingTime: data.readingTime || '3 min read',
      excerpt: data.excerpt || '',
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): { meta: BlogPostMeta; content: string } | null {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: {
      slug,
      title: data.title || slug,
      date: data.date || '',
      tag: data.tag || 'General',
      readingTime: data.readingTime || '3 min read',
      excerpt: data.excerpt || '',
    },
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return []
  return fs.readdirSync(contentDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
