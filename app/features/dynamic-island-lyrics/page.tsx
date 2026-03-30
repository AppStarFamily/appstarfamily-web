import type { Metadata } from 'next'
import FeatureLandingLayout from '@/components/FeatureLandingLayout'

export const metadata: Metadata = {
  title: 'Dynamic Island Lyrics — Live Lyrics in Dynamic Island | Lyrical',
  description:
    'Lyrical surfaces your current lyric line in the Dynamic Island — the most premium, native way to experience music on iPhone 14 Pro and later.',
  keywords: ['Dynamic Island lyrics', 'iOS lyrics Dynamic Island', 'iPhone lyrics', 'Dynamic Island music app'],
}

export default function DynamicIslandLyricsPage() {
  return (
    <FeatureLandingLayout
      chip="Dynamic Island"
      headline={
        <>
          Your lyrics,{' '}
          <span className="text-gradient-purple">right where</span>
          <br />
          they belong.
        </>
      }
      subheadline="On iPhone 14 Pro and newer, Lyrical shows your current lyric line in the Dynamic Island — always visible, always current, without taking up screen space."
      sections={[
        {
          title: 'What it does',
          body: "On iPhone 14 Pro and newer, the Dynamic Island sits at the top of your screen. Lyrical uses it to show the line being sung right now while you use other apps. Scroll through Instagram, the lyrics stay at the top. Reply to a text, the lyrics stay at the top. Check a recipe, the lyrics stay at the top. It's not a widget you have to open. It's not a notification you have to check. The lyrics just live there.",
        },
        {
          title: 'Cooking',
          body: "You're following a recipe, hands covered in flour, and your favorite song comes on. You want to sing along but can't touch your phone. The Dynamic Island shows the lyrics at the top of your screen while the recipe app fills the rest. You cook, you sing, you don't miss a word.",
        },
        {
          title: 'Commuting',
          body: "On the train, you're reading the news, checking email, browsing social media. Music plays in your headphones. Without looking away from what you're doing, you see the current lyric in the Dynamic Island. You stay connected to your music without disconnecting from your tasks.",
        },
        {
          title: 'Working out',
          body: "Your workout app tracks your run. Your music motivates you. The Dynamic Island shows lyrics without switching apps mid-stride. You maintain pace, you maintain focus, you still sing along in your head. Tap the Dynamic Island to jump back to Lyrical instantly. Long press to see more context about the current song.",
        },
        {
          title: 'Only in Lyrical',
          body: "As of early 2026, Lyrical is the only music lyrics app with full Dynamic Island integration. Musixmatch, Apple Music, and Spotify don't offer it. Lyrical built for it from the start. Dynamic Island and Live Activities work together — when music is playing, the current lyric appears in the Dynamic Island and on the Lock Screen simultaneously.",
        },
      ]}
      relatedLinks={[
        { href: '/features/romanized-lyrics',  label: 'Romanized Lyrics' },
        { href: '/features/carplay-lyrics',     label: 'CarPlay Lyrics' },
        { href: '/features/karaoke-lyrics',     label: 'Karaoke Mode' },
      ]}
    />
  )
}
