import type { Metadata } from 'next'
import FeatureLandingLayout from '@/components/FeatureLandingLayout'

export const metadata: Metadata = {
  title: 'CarPlay Lyrics — See Lyrics on Your Car Display | Lyrical',
  description:
    'Lyrical brings synced lyrics to your CarPlay display in a safe, glanceable format. Perfect for singing along during your commute.',
  keywords: ['CarPlay lyrics', 'car lyrics app', 'Apple CarPlay music lyrics', 'sing in car', 'CarPlay Apple Music lyrics'],
}

export default function CarPlayLyricsPage() {
  return (
    <FeatureLandingLayout
      chip="CarPlay"
      headline={
        <>
          Lyrics in the car.{' '}
          <span className="text-gradient-pink">Eyes on the road.</span>
        </>
      }
      subheadline="Lyrical puts full lyrics on your CarPlay display — with romanization for K-pop and non-English music. Apple Music shows basic lyrics. Spotify shows nothing. Lyrical does it properly."
      sections={[
        {
          title: 'The CarPlay lyrics problem',
          body: "You're driving. Your favorite song comes on. You want to sing along, but you don't know all the words. You glance at your phone — dangerous, illegal in many places. Apple Music shows basic lyrics but no romanization for K-pop. Spotify shows no lyrics on CarPlay at all. Lyrical puts full lyrics on your dashboard display, with romanization beneath non-English songs.",
        },
        {
          title: 'What it shows',
          body: "Lyrical displays the current song title, artist, and album art at the top of your CarPlay screen. Below that, the current lyric line appears large and readable. For K-pop and other non-English music, romanization appears beneath the original script. You see everything you need to sing along.",
        },
        {
          title: 'Designed for in-car use',
          body: "The layout is built for driving. Large text, high contrast, minimal clutter. The current line is prominent. Previous and next lines are visible but subdued. Your eyes find what you need in a glance, then return to the road. Passengers can read continuously. Drivers should only glance.",
        },
        {
          title: 'Safety first',
          body: "Lyrical is designed with driving safety in mind. The lyrics are glanceable, not readable. Large text and clear layout make a one-second glance effective. If you're driving alone, use it for familiar songs you already know well. Don't try to learn new lyrics while driving. Safety matters more than perfect karaoke.",
        },
        {
          title: 'How to connect',
          body: "Plug your iPhone into your CarPlay-enabled vehicle using USB, or connect wirelessly if your car supports it. Launch Lyrical, select your music, begin playback. The Lyrical interface appears automatically on your car's display. Lyrics sync in real time. No additional setup required — if CarPlay works in your vehicle, Lyrical works with it.",
        },
      ]}
      relatedLinks={[
        { href: '/features/dynamic-island-lyrics', label: 'Dynamic Island Lyrics' },
        { href: '/features/romanized-lyrics',      label: 'Romanized Lyrics' },
        { href: '/features/kpop-lyrics-app',       label: 'K-Pop Lyrics App' },
      ]}
    />
  )
}
