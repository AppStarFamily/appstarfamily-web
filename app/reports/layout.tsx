import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reports — App Star Family',
  robots: { index: false, follow: false },
}

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      maxWidth: '820px',
      margin: '0 auto',
      padding: '3rem 1.5rem 5rem',
    }}>
      {children}
    </div>
  )
}
