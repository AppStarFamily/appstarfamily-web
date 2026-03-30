import type { Metadata } from 'next'
import FeatureLandingLayout from '@/components/FeatureLandingLayout'

export const metadata: Metadata = {
  title: 'K-Pop Lyrics App — The Best K-Pop Lyrics Experience on iPhone | Lyrical',
  description:
    'Lyrical is the best K-pop lyrics app for iPhone. See Korean Hangul, romanized translations, and word-level sync for all your favorite K-pop songs on Apple Music.',
  keywords: ['K-pop lyrics app', 'Korean lyrics iPhone', 'Hangul lyrics', 'K-pop Apple Music lyrics', 'Korean music lyrics app', 'BTS lyrics app', 'IVE lyrics app'],
}

export default function KpopLyricsAppPage() {
  return (
    <FeatureLandingLayout
      chip="K-Pop Lyrics"
      headline={
        <>
          The K-pop lyrics app{' '}
          <span className="text-gradient-pink">every fan needs.</span>
        </>
      }
      subheadline="Lyrical was built specifically for K-pop fans. Korean Hangul and romanization side by side, word-level sync, Dynamic Island, CarPlay — every feature addresses a real frustration you experience daily."
      sections={[
        {
          title: 'The problem K-pop fans face',
          body: "You found a new BTS track. The beat hits, the chorus swells, and you want to sing along. But you don't speak Korean. You open a lyrics website, but the romanization is messy, inconsistent, or missing entirely. You try to follow along, but the lyrics don't sync with the music. By the time you find your place, the song has moved on. Existing solutions fall short. Standard lyrics apps treat K-pop as an afterthought. Romanization, when available, uses inconsistent systems. The timing is off. The experience feels broken.",
        },
        {
          title: 'Hangul and romanization side by side',
          body: "Every lyric displays in Korean Hangul with accurate romanization directly beneath. You see the original writing and the pronunciation guide simultaneously — no more switching between apps or websites, no more guessing how a word sounds. The romanization follows the Revised Romanization of Korean, the standard system used in South Korea. It's accurate, consistent, and designed for readability.",
        },
        {
          title: 'Word-level sync',
          body: "Lyrical highlights each word as it plays in the song. You know exactly where you are. When the singer moves to the next line, the highlight moves with them. This precision matters when you're learning — you connect the sound you hear with the word you see. The timing is accurate to within milliseconds.",
        },
        {
          title: 'Dynamic Island, CarPlay, and StandBy',
          body: "The lyrics follow you everywhere. On iPhone 14 Pro and newer, current lyrics appear in the Dynamic Island while you use other apps. Cooking with flour-covered hands? The lyrics sit at the top of your screen. In the car, CarPlay integration puts lyrics on your dashboard. For iOS 17 users, StandBy mode turns your charging iPhone into a dedicated lyrics display.",
        },
        {
          title: 'Works with Apple Music and Spotify',
          body: "Lyrical connects to your existing music library. No need to rebuild playlists or switch services. It works with Apple Music through native MusicKit integration and with Spotify through their SDK. Your music, your service, better lyrics.",
        },
        {
          title: 'Supports all the artists you love',
          body: "Lyrical supports all major K-pop artists and most smaller acts — BTS, BLACKPINK, TWICE, Stray Kids, SEVENTEEN, NewJeans, IVE, aespa, NCT, TXT, and thousands more. New releases are added within days. If you love K-pop, the database has you covered.",
        },
      ]}
      relatedLinks={[
        { href: '/features/romanized-lyrics', label: 'Romanized Lyrics' },
        { href: '/features/karaoke-lyrics',   label: 'Karaoke Mode' },
        { href: '/features/carplay-lyrics',   label: 'CarPlay Lyrics' },
      ]}
    />
  )
}
