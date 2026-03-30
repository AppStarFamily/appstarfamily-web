import type { Metadata } from 'next'
import FeatureLandingLayout from '@/components/FeatureLandingLayout'

export const metadata: Metadata = {
  title: 'Karaoke Lyrics — Word-Level Sync for iPhone | Lyrical',
  description:
    "Lyrical highlights each word as it's sung for a true karaoke experience. Powered by word-level Apple Music sync, it's the most accurate karaoke app for iOS.",
  keywords: ['karaoke lyrics app', 'iPhone karaoke', 'word-by-word lyrics', 'karaoke mode iOS', 'Apple Music karaoke'],
}

export default function KaraokeLyricsPage() {
  return (
    <FeatureLandingLayout
      chip="Karaoke Mode"
      headline={
        <>
          Every word.{' '}
          <span className="text-gradient-pink">Perfectly timed.</span>
        </>
      }
      subheadline="Your music, your library, your services — with karaoke-style lyrics that actually work. Every word highlighted as it's sung, with romanization for K-pop and J-pop."
      sections={[
        {
          title: 'The karaoke problem on iPhone',
          body: "The App Store has two kinds of karaoke apps. Apps like StarMaker and Smule that use their own song libraries — your playlists don't matter. And Apple Music Sing, which works with your library but only for select songs, with no romanization and limited K-pop depth. Lyrical fills that gap. Your music, your library, your services, with karaoke-style lyrics that actually work.",
        },
        {
          title: 'Word-by-word highlighting',
          body: "Traditional karaoke shows a line at a time. Lyrical highlights each individual word as it's sung. You know exactly where you are. You never get lost. The timing is precise, synchronized to within milliseconds. When the singer moves to the next word, the highlight moves with them.",
        },
        {
          title: 'Romanization for K-pop and J-pop',
          body: "Singing along to Korean or Japanese songs requires knowing how to pronounce the words. Lyrical displays accurate romanization beneath the original script. You can sing along even if you don't read Hangul or kanji. The romanization follows official standards: Revised Romanization for Korean, Hepburn for Japanese.",
        },
        {
          title: 'Works with your existing library',
          body: "Lyrical connects to Apple Music and Spotify. Your playlists, your liked songs, your albums — everything you already have. No rebuilding, no re-uploading, no separate cloud storage. Your music needs a Spotify Premium account for full Spotify functionality. Apple Music integration is tighter through native MusicKit.",
        },
        {
          title: 'No scoring, no social, no pressure',
          body: "Lyrical doesn't judge your singing. No scores, no rankings, no shareable performances. There's no recording feature, no social network. It's a lyrics display for people who want to sing along to their own music. What you do with it is between you and the speaker.",
        },
      ]}
      relatedLinks={[
        { href: '/features/romanized-lyrics',      label: 'Romanized Lyrics' },
        { href: '/features/kpop-lyrics-app',       label: 'K-Pop Lyrics App' },
        { href: '/features/dynamic-island-lyrics', label: 'Dynamic Island Lyrics' },
      ]}
    />
  )
}
