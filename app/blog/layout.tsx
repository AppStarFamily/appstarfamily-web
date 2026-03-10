import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dispatches from the Empire — Blog',
  description: 'Strategy, growth, and the occasional update from the throne room.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
