import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://appstarfamily.com'),
  title: {
    default: 'App Star Family — Home of the Pruttius Empire',
    template: '%s | App Star Family',
  },
  description: 'AI-powered iOS app studio from South East Asia. 12 apps, 7 autonomous AI agents, infinite ambition. Home of the Pruttius Empire.',
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '64x64', type: 'image/png' },
      { url: '/images/logo.png', sizes: '128x128', type: 'image/png' },
      { url: '/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/logo.png',
  },
  openGraph: {
    siteName: 'App Star Family',
    images: ['/images/dream_team.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AppstarFamily',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-jakarta bg-navy text-[#E8E0D0] min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
