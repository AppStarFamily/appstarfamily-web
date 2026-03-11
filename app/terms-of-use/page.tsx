import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for App Star Family and associated iOS applications.',
}

const sections = [
  {
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using the App Star Family website and associated iOS applications, you agree to be bound by these Terms of Use. If you do not agree, please do not use our services.',
    ],
  },
  {
    title: 'Use of Services',
    intro: 'Our apps and website are provided for personal, non-commercial use. You agree not to:',
    list: [
      'Use our services for any unlawful purpose',
      'Attempt to reverse-engineer or modify our applications',
      'Distribute or resell our apps or content without permission',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'All content, design, and code associated with App Star Family and its apps are the property of APP STAR FAMILY PTE. LTD. and are protected by applicable intellectual property laws.',
    ],
  },
  {
    title: 'Subscriptions & Purchases',
    content: [
      'In-app purchases and subscriptions are processed through the Apple App Store and are subject to Apple\'s terms and conditions. Refund requests should be directed to Apple.',
    ],
  },
  {
    title: 'Disclaimer',
    content: [
      'Our apps are provided "as is" without warranty of any kind. We do not guarantee uninterrupted or error-free service.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'APP STAR FAMILY PTE. LTD. shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.',
    ],
  },
  {
    title: 'Changes to Terms',
    content: [
      'We reserve the right to modify these Terms of Use at any time. Continued use of our services constitutes acceptance of the modified terms.',
    ],
  },
  {
    title: 'Contact',
    content: [
      'For questions about these Terms, contact us at info@appstarfamily.net or via @AppStarFamily on Twitter.',
    ],
  },
]

export default function TermsOfUsePage() {
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
            Terms of Use
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
