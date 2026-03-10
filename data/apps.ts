export type App = {
  slug: string
  name: string
  tagline: string
  description: string
  category: 'health' | 'music' | 'pregnancy' | 'productivity' | 'fun' | 'education'
  status: 'live' | 'coming-soon'
  appStoreUrl?: string
  websiteUrl?: string
  icon: string
  featured: boolean
  markets?: string[]
}

export const apps: App[] = [
  {
    slug: 'pouchout',
    name: 'PouchOut — Quit Zyn',
    tagline: 'Your quit journey, one pouch at a time.',
    description: 'PouchOut helps you break free from nicotine pouches with smart craving tracking, milestone celebrations, and a no-judgment approach built for real Zyn and snus users. Available in 9 languages across 7 markets.',
    category: 'health',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/us/app/pouchout-quit-zyn/id6759019907',
    websiteUrl: 'https://pouchoutapp.com',
    icon: '/images/apps/pouchout.webp',
    featured: true,
    markets: ['USA', 'Sweden', 'Norway', 'Poland', 'Germany', 'Italy', 'Estonia'],
  },
  {
    slug: 'hypnobirthing',
    name: 'HypnoBirthing+',
    tagline: 'Calm, confident birth preparation through hypnosis.',
    description: 'HypnoBirthing+ uses guided hypnosis and breathing techniques to break the fear-tension-pain cycle. 30 expert sessions covering labour preparation, partner support, sleep, and affirmations. Free to start.',
    category: 'pregnancy',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/us/app/hypnobirthing/id6755898425',
    websiteUrl: 'https://hypnobirthing.plus',
    icon: '/images/apps/hypnobirthing.webp',
    featured: true,
    markets: ['Global'],
  },
  {
    slug: 'contraction-timer',
    name: 'Contraction Timer+',
    tagline: 'Know exactly when it\'s time to go.',
    description: 'The calmest contraction timer in the App Store. Track frequency, duration and intensity with one tap. Share a live link with your birth partner so they can follow along in real time.',
    category: 'pregnancy',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/app/id6755898425',
    icon: '/images/apps/contraction-timer.webp',
    featured: true,
    markets: ['Global'],
  },
  {
    slug: 'hypnos-flow',
    name: 'Hypnos Flow',
    tagline: 'Rewire your mind. One session at a time.',
    description: 'A modern hypnosis app for stress, sleep, confidence and focus. Deep, science-backed guided sessions designed for people who think they can\'t be hypnotised. They always can.',
    category: 'health',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/app/id6755898425',
    icon: '/images/apps/hypnos-flow.webp',
    featured: true,
    markets: ['Global'],
  },
  {
    slug: 'constellation-star-finder',
    name: 'The Constellation Star Finder',
    tagline: 'Point your phone at the sky. Understand it.',
    description: 'Real-time AR star and constellation identification. Point your phone at any part of the night sky and instantly see named stars, constellations, planets and deep-sky objects. No subscription required.',
    category: 'education',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/app/id6755898425',
    icon: '/images/apps/constellation-star-finder.webp',
    featured: true,
    markets: ['Global'],
  },
  {
    slug: 'dog-translator',
    name: 'Dog Translator',
    tagline: 'Finally understand what your dog is saying.',
    description: 'Dog Translator analyses barks, whines and howls and translates them into human emotions. Scientifically inspired. Deeply unserious. Endlessly fun.',
    category: 'fun',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/app/id6755898425',
    icon: '/images/apps/dog-translator.webp',
    featured: true,
    markets: ['Global'],
  },
  {
    slug: 'focus-quest',
    name: 'Focus Quest — Pomodoro Timer',
    tagline: 'Turn your to-do list into a quest.',
    description: 'Focus Quest gamifies deep work with a Pomodoro timer wrapped in RPG mechanics. Complete focus sessions to level up your character, unlock achievements, and actually finish what you started.',
    category: 'productivity',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/app/id6755898425',
    icon: '/images/apps/focus-quest.webp',
    featured: false,
    markets: ['Global'],
  },
  {
    slug: 'shift-work-calendar',
    name: 'Shift Work Calendar',
    tagline: 'Scheduling built for shift workers and their partners.',
    description: 'The only calendar app that understands shift work. Sync your rotating roster with your partner, plan around your days off, and stop the endless "are you working?" texts.',
    category: 'productivity',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/app/id6755898425',
    icon: '/images/apps/shift-work-calendar.webp',
    featured: false,
    markets: ['Global'],
  },
  {
    slug: 'family-tree',
    name: 'Family Tree',
    tagline: 'Your family story, beautifully mapped.',
    description: 'Build and explore your family tree with an interface so intuitive your grandparents can use it. Add photos, stories, dates and connections. Share with family and grow it together across generations.',
    category: 'fun',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/app/id6755898425',
    icon: '/images/apps/family-tree.webp',
    featured: false,
    markets: ['Global'],
  },
]
