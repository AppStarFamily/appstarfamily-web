import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Empire Intelligence — Reports',
  robots: { index: false, follow: false },
}

const REPORTS = [
  {
    available: true,
    emoji: '🇹🇭',
    title: 'Thailand Expat SEO Research Report',
    description: 'Full competitive analysis of the Thailand expat content market. 20 priority keywords, SERP ownership map, competitor deep dive, and 3-tier content strategy.',
    date: 'March 2026',
    href: '/reports/thailand',
    tag: 'SEO Research',
  },
  {
    available: false,
    emoji: '💊',
    title: 'PouchOut Market Research Report',
    description: 'Keyword landscape, competitor analysis, and ASO strategy for PouchOut in the nicotine pouch category.',
    date: 'Coming Soon',
    href: null,
    tag: 'Market Research',
  },
  {
    available: true,
    emoji: '🧠',
    title: 'HypnoFlow SEO & App Store Research Report',
    description: 'Full competitive analysis of the self-hypnosis app market. 201K+ monthly search volume identified, 6 goldmine keywords with zero competition, App Store landscape analysis, and 12-month content strategy.',
    date: 'March 2026',
    href: '/reports/hypnoflow',
    tag: 'SEO Research',
  },
  {
    available: true,
    emoji: '👆',
    title: 'Somatic Tapping Market Research Report',
    description: 'Full analysis of the EFT tapping and somatic therapy market. The Tapping Solution dominates with 24M+ sessions, but biometric + AI integration gap creates opportunity. $4.01B market growing 17.5% CAGR.',
    date: 'March 2026',
    href: '/reports/somatic-tapping',
    tag: 'Market Research',
  },
  {
    available: false,
    emoji: '🤰',
    title: 'Hypnobirthing+ Report',
    description: 'Reddit community analysis, keyword research, and content strategy for the hypnobirthing niche.',
    date: 'Coming Soon',
    href: null,
    tag: 'Market Research',
  },
]

export default function ReportsHubPage() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#C9A84C15',
          border: '1px solid #C9A84C33',
          borderRadius: '6px',
          padding: '4px 10px',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#C9A84C', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            🔐 Internal Access Only
          </span>
        </div>
        <h1 style={{
          color: '#C9A84C',
          fontWeight: '700',
          fontSize: '32px',
          letterSpacing: '0.02em',
          margin: '0 0 12px',
        }}>
          Empire Intelligence
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
          Research reports, keyword studies, and market analysis compiled by Scriptor and the OpenClaw research team.
        </p>
      </div>

      {/* Report cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {REPORTS.map((report) => (
          <div
            key={report.title}
            style={{
              backgroundColor: '#111827',
              border: `1px solid ${report.available ? '#C9A84C33' : '#1F2937'}`,
              borderRadius: '12px',
              padding: '24px',
              opacity: report.available ? 1 : 0.6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '22px' }}>{report.emoji}</span>
                  <span style={{
                    backgroundColor: '#1F2937',
                    color: '#6B7280',
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}>
                    {report.tag}
                  </span>
                  <span style={{ color: '#4B5563', fontSize: '12px' }}>{report.date}</span>
                </div>
                <h2 style={{
                  color: report.available ? '#E5E7EB' : '#6B7280',
                  fontWeight: '600',
                  fontSize: '17px',
                  margin: '0 0 8px',
                }}>
                  {report.title}
                </h2>
                <p style={{
                  color: '#6B7280',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {report.description}
                </p>
              </div>

              <div style={{ flexShrink: 0, paddingTop: '4px' }}>
                {report.available && report.href ? (
                  <Link
                    href={report.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#C9A84C',
                      color: '#0A0F1E',
                      fontWeight: '700',
                      fontSize: '13px',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    View Report →
                  </Link>
                ) : (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#1F2937',
                    color: '#4B5563',
                    fontWeight: '600',
                    fontSize: '13px',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                  }}>
                    🔒 Coming Soon
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid #1F2937',
        color: '#374151',
        fontSize: '12px',
        textAlign: 'center',
        letterSpacing: '0.04em',
      }}>
        EMPIRE INTELLIGENCE · COMPILED BY SCRIPTOR · OPENCLAW RESEARCH · INTERNAL USE ONLY
      </div>
    </div>
  )
}
