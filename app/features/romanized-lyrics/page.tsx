import type { Metadata } from 'next'
import FeatureLandingLayout from '@/components/FeatureLandingLayout'

export const metadata: Metadata = {
  title: 'Romanized Lyrics — See Any Song in the Latin Alphabet | Lyrical',
  description:
    'Lyrical shows romanized lyrics for Korean, Japanese, Thai, and more — so you can sing along to any song even without knowing the original script.',
  keywords: ['romanized lyrics', 'Korean romanized', 'Japanese romanization', 'sing along Korean', 'K-pop romanized lyrics'],
}

export default function RomanizedLyricsPage() {
  return (
    <FeatureLandingLayout
      chip="Romanized Lyrics"
      headline={
        <>
          Sing along to{' '}
          <span className="text-gradient-pink">any song.</span>
          <br />
          In any language.
        </>
      }
      subheadline="Lyrical displays accurate romanization beneath non-Latin scripts — Korean, Japanese, Chinese, Hindi, Thai — so you can sing along from day one, no language study required."
      sections={[
        {
          title: 'What romanization is and why it matters',
          body: "Romanization converts non-Latin scripts into the Latin alphabet. For K-pop fans, it's the bridge between the Korean you hear and the pronunciation you can read. The problem is consistency — different websites use different systems, some outdated, some invented. Lyrical uses Revised Romanization of Korean, the official system used in South Korea. It's what Koreans learn in school. It's accurate.",
        },
        {
          title: 'Korean',
          body: "Korean uses Hangul, an alphabet designed for the Korean language. It's phonetic and logical, but unfamiliar to English speakers. Lyrical displays Hangul with Revised Romanization beneath every line. Every syllable is clear. The system handles Korean phonology accurately, including sounds that don't exist in English.",
        },
        {
          title: 'Japanese',
          body: "Japanese combines three writing systems: hiragana, katakana, and kanji. For lyrics, Lyrical focuses on the phonetic readings. Kanji characters display with furigana (small pronunciation guides) and Hepburn romanization. This lets you sing J-pop and anime openings with confidence.",
        },
        {
          title: 'Chinese, Hindi, and Thai',
          body: "Mandarin Chinese uses characters that represent meaning, not sound. Lyrical displays pinyin romanization beneath Chinese lyrics, with tone marks included. Hindi support uses IAST romanization for Bollywood music. Thai support follows the Royal Thai General System of Transcription. The focus is on accuracy — each language uses the official standard for that script.",
        },
        {
          title: 'The Lyrical difference',
          body: "Most lyrics apps treat romanization as an afterthought. Lyrical treats it as part of the experience. The visual hierarchy puts the original script first, romanization second, but both are prominent — you never squint, you never hunt. Word-level sync ties it together. When the singer hits a word, it highlights in both scripts simultaneously. You learn without trying to learn.",
        },
      ]}
      relatedLinks={[
        { href: '/features/dynamic-island-lyrics', label: 'Dynamic Island Lyrics' },
        { href: '/features/karaoke-lyrics',        label: 'Karaoke Mode' },
        { href: '/features/kpop-lyrics-app',       label: 'K-Pop Lyrics App' },
      ]}
    />
  )
}
