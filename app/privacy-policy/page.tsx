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
      "Our apps may use third-party services such as Apple's App Store, RevenueCat for subscription management, and analytics providers. These services have their own privacy policies.",
    ],
  },
  {
    title: 'Cookies and Tracking Technologies',
    content: [
      `Our website and apps may use cookies, SDKs, and similar tracking technologies for analytics and performance measurement. Where required by applicable law, including the laws of the European Economic Area and the United Kingdom, we will request your consent before non-essential cookies or tracking technologies are activated, and you may withdraw that consent at any time.`,
    ],
  },
  {
    title: 'International Data Transfers',
    content: [
      `APP STAR FAMILY PTE. LTD. is based in Singapore, and our service providers are located in various countries, including the United States and the European Union. Where we transfer personal data originating from the European Economic Area, the United Kingdom, or Switzerland to a country that has not been recognized as providing an adequate level of data protection, we rely on appropriate safeguards permitted under applicable law, such as the European Commission's Standard Contractual Clauses or an equivalent mechanism.`,
    ],
  },
  {
    title: 'EU and UK Representative',
    content: [
      `For users in the European Economic Area and the United Kingdom, where applicable law requires the appointment of a local representative, contact information for our representative will be published here once designated. In the meantime, EEA and UK users may direct privacy inquiries to info@appstarfamily.net.`,
    ],
  },
  {
    title: 'Your Rights Under GDPR',
    intro: `If you are located in the European Economic Area, the United Kingdom, or another jurisdiction with similar data protection law, you may have the following rights regarding your personal data, subject to applicable legal exceptions:`,
    list: [
      `The right to access the personal data we hold about you`,
      `The right to request correction of inaccurate or incomplete data`,
      `The right to request deletion of your data`,
      `The right to request restriction of processing in certain circumstances`,
      `The right to data portability, where technically feasible`,
      `The right to object to certain processing, including processing based on legitimate interests or for direct marketing`,
      `The right to withdraw consent at any time where processing is based on consent`,
      `The right to lodge a complaint with your local data protection supervisory authority`,
    ],
  },
  {
    title: 'Your Rights Under GDPR (continued)',
    content: [
      `To exercise any of these rights, contact us at info@appstarfamily.net. We may need to verify your identity before responding to your request.`,
    ],
  },
  {
    title: 'California Privacy Rights (CCPA/CPRA)',
    intro: `If you are a California resident, you may have the following rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act:`,
    list: [
      `The right to know what personal information we have collected, used, and disclosed about you`,
      `The right to request deletion of your personal information, subject to certain exceptions`,
      `The right to correct inaccurate personal information`,
      `The right to opt out of the sale or sharing of your personal information`,
      `The right to limit the use of sensitive personal information, where applicable`,
      `The right to non-discrimination for exercising your privacy rights`,
    ],
  },
  {
    title: 'California Privacy Rights (continued)',
    content: [
      `We do not sell personal information for money. To exercise your California privacy rights, or to ask about sharing for advertising purposes, contact us at info@appstarfamily.net.`,
    ],
  },
  {
    title: 'Children',
    content: [
      `Our apps are not directed at children under the age of 13, and we do not knowingly collect personal information from children under 13. In the European Economic Area and the United Kingdom, the age at which a child can consent to data processing without parental authorization may be higher than 13, depending on the specific country. If you believe a child has provided personal information to us without appropriate consent, please contact us at info@appstarfamily.net.`,
    ],
  },
  {
    title: 'Contact',
    content: [
      'If you have questions about this Privacy Policy, please contact us at info@appstarfamily.net.',
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
            Last updated: September 6, 2026
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
