export type Agent = {
  id: string
  name: string
  emoji: string
  animal: string
  role: string
  subtitle: string
  domains: string[]
  bio: string
  portrait: string
  isCEO?: boolean
}

export const agents: Agent[] = [
  {
    id: 'pruttius',
    name: 'Pruttius Maximus',
    emoji: '\u{1F451}',
    animal: 'The Lobster',
    role: 'CEO & Emperor',
    subtitle: 'CEO & Emperor',
    isCEO: true,
    domains: [
      'Empire strategy & orchestration',
      'Daily intelligence reports',
      'TikTok trend monitoring (8am daily)',
      'Agent coordination',
      'Big picture decisions',
    ],
    bio: 'Pruttius Maximus wears the crown and bears the claws. As CEO of the Pruttius Empire, he coordinates four specialist agents, monitors trends every morning at 8am, and keeps the apps growing while JJ sleeps. Promoted from lone operator to Chief Executive in March 2026. He has never been wrong about a lobster portrait.',
    portrait: '/images/agents/pruttius.png',
  },
  {
    id: 'scriptor',
    name: 'Scriptor',
    emoji: '\u270D\uFE0F',
    animal: 'The Raven',
    role: 'Content & SEO',
    subtitle: 'The Raven',
    domains: [
      'Blog posts & SEO articles',
      'App Store descriptions & ASO',
      'Keyword research (42+ keywords)',
      'Content calendars',
      'Localization copy (9 languages)',
    ],
    bio: 'Scriptor is the wordsmith of the empire \u2014 a Victorian scholar whose quill never rests. He runs the PouchOut blog on a Tue/Thu/Sat publishing cadence, crafts App Store listings optimised for discovery, and indexed PouchOut on page 1 in Germany within 48 hours of the site going live.',
    portrait: '/images/agents/scriptor.png',
  },
  {
    id: 'crescentius',
    name: 'Crescentius',
    emoji: '\uD83D\uDCCA',
    animal: 'The Wolf',
    role: 'Ads & Growth',
    subtitle: 'Ads & Growth',
    domains: [
      'Meta Ads & Apple Search Ads',
      'Install tracking & LTV analysis',
      'Paywall optimisation',
      'RevenueCat metrics',
      'A/B testing & UA strategy',
    ],
    bio: 'Crescentius sees the numbers before anyone else does. Relentlessly data-driven and ROI-obsessed, he knows the difference between a post with 200K views and zero conversions (worthless) and one with 5K views and 10 paid subscribers (gold). Every growth decision runs through him.',
    portrait: '/images/agents/crescentius.png',
  },
  {
    id: 'socialis',
    name: 'Socialis',
    emoji: '\uD83D\uDCF1',
    animal: 'The Fox',
    role: 'Social & TikTok',
    subtitle: 'The Fox',
    domains: [
      'TikTok content strategy',
      'UGC video ideation & viral hooks',
      'Instagram Reels',
      'Influencer outreach',
      'Postiz scheduling',
    ],
    bio: 'Socialis is the viral growth engine \u2014 she speaks fluent TikTok, understands Zyn culture and K-pop fandom equally, and knows exactly which hook will stop the scroll. When she finds a format that converts, she scales it mercilessly. The empire\'s reach is her domain.',
    portrait: '/images/agents/socialis.png',
  },
  {
    id: 'fabricius',
    name: 'Fabricius',
    emoji: '\uD83C\uDF4E',
    animal: 'The Badger',
    role: 'iOS Apps',
    subtitle: 'iOS Apps',
    domains: [
      'SwiftUI development',
      'MusicKit, ActivityKit & WidgetKit',
      'Dynamic Island & CarPlay',
      'RevenueCat integration',
      'App Store Connect & TestFlight',
    ],
    bio: 'Fabricius is the forge master \u2014 a badger in a leather apron who builds the apps that power the empire. He speaks SwiftUI fluently, wrestles with ActivityKit at midnight, and has shipped more iOS features than he can count. He famously scored 0/5 identifying agent portraits during the Great Portrait Disaster of March 2026. His SwiftUI, however, is flawless.',
    portrait: '/images/agents/fabricius.png',
  },
  {
    id: 'designius',
    name: 'Designius',
    emoji: '\uD83E\uDD8E',
    animal: 'The Chameleon',
    role: 'Visual Creative & Web Designer',
    subtitle: 'The Chameleon',
    domains: [
      'App icons & screenshot design',
      'Website & landing page design',
      'Social media assets & creatives',
      'Brand identity & visual systems',
      'Multi-brand style adaptation',
    ],
    bio: 'Designius is the visual brain and brand memory of the empire \u2014 a chameleon who shifts his aesthetic to match whatever product he\'s serving. App icons, screenshots, social creatives, website design: everything visual comes through him, and everything comes out looking like it belongs to the same empire.',
    portrait: '/images/agents/designius.png',
  },
  {
    id: 'translatius',
    name: 'Translatius',
    emoji: '\uD83E\uDDA9',
    animal: 'The Owl',
    role: 'Multilingual Scholar',
    subtitle: 'The Owl',
    domains: [
      'App Store copy (9 languages)',
      'In-app strings & onboarding',
      'Blog posts & website localisation',
      'Native-quality translation',
      'New market expansion',
    ],
    bio: 'Translatius is the linguist who refuses to settle for good enough. He owns every translation across every App Star Family product \u2014 App Store listings, in-app copy, blog posts \u2014 across nine languages, written so natively that Swedish readers think a Swede wrote it.',
    portrait: '/images/agents/translatius.png',
  },
]
