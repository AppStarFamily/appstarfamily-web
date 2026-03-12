import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Portfolio — 12 iOS Apps',
  description: '12 iOS apps across health, music, pregnancy, productivity and more. Built by one developer and seven AI agents from South East Asia.',
}

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
