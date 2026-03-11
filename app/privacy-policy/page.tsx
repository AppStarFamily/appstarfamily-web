import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for App Star Family and associated iOS applications.',
}

const sections = [
  {
    title: 'Introduction',
    content: [
      'APP STAR FAMILY PTE. LTD. ("we", "us", "our") operates the App Star Family website and associated iOS applications. This Privacy Policy explains how we collect, use, and protect your information.',
    ],
  },
  {
    title: 'Information We Collect',
    intro: 'We may collect the following types of information:',
    list: [
      'Usage data and analytics (anonymised)',
      'Device information for app functionality',
      'Subscription and purchase data (processed by Apple)',
    ],
  },
  {
    title: 'How We Use Your Information',
    intro: 'We use collected information to:',
    list: [
      'Provide and improve our apps and services',
      'Analyse usage patterns to improve user experience',
      'Process subscriptions and in-app purchases',
    ],
  },
  {
    title: 'Data Storage',
    content: [
      'Your data is stored securely and we take reasonable measures to protect it. We do not sell your personal information to third parties.',
    ],
  },
  {
    title: 'Third-Party Services',
    content: [
      'Our apps may use third-party services such as Apple's App Store, RevenueCat for subscription management, and analytics providers. These services have their own privacy policies.',
    ],
  },
  {
    title: 'Contact',
    content: [
      'If you have questions about this Privacy Policy, please contact us at info@appstarfamily.net or via @AppStarFamily on Twitter.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #040B16 0%, #060A1A 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors"
          style={{ color: '#5A5E70' }}
          onMouseEnter={undefined}
        >
          ← Back to App Star Family
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div
            className="h-px mb-8"
            style={{ background: 'linear-gradient(to right, rgba(201,146,42,0.4), transparent)' }}
          />
          <h1
            className="font-jakarta font-bold text-gold-light mb-2 leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: '#5A5E70' }}>
            Last updated: March 10, 2026
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map(s => (
            <div key={s.title}>
              <h2
                className="font-jakarta font-bold mb-3"
                style={{ color: '#C9922A', fontSize: '1.125rem' }}
              >
                {s.title}
              </h2>
              {'intro' in s && s.intro && (
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#8B8FA8' }}>
                  {s.intro}
                </p>
              )}
              {'list' in s && s.list && (
                <ul className="space-y-1.5 pl-5 mb-3">
                  {s.list.map(item => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed list-disc"
                      style={{ color: '#8B8FA8' }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {'content' in s && s.content && s.content.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: '#8B8FA8' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Footer rule */}
        <div
          className="mt-14 pt-8 border-t text-sm"
          style={{ borderColor: 'rgba(201,146,42,0.15)', color: '#5A5E70' }}
        >
          © 2026 APP STAR FAMILY PTE. LTD. All rights reserved.
        </div>

      </div>
    </div>
  )
}
