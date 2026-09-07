'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type ConsentState = 'pending' | 'accepted' | 'rejected'

const STORAGE_KEY = 'appstarfamily-cookie-consent'

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('pending')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'accepted' || stored === 'rejected') {
        setConsent(stored)
      }
    } catch {
      // localStorage unavailable, treat as pending
    }
  }, [])

  const handleAccept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // ignore storage errors
    }
    setConsent('accepted')
  }

  const handleReject = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'rejected')
    } catch {
      // ignore storage errors
    }
    setConsent('rejected')
  }

  // No analytics or tracking libraries are currently active on this site.
  // When one is added (for example Google Analytics, Vercel Analytics, or
  // PostHog), wrap its component here inside this same condition so it only
  // loads after the visitor accepts:
  //
  // {consent === 'accepted' && (
  //   <>
  //     <SomeAnalyticsComponent />
  //   </>
  // )}

  return (
    <>
      {mounted && consent === 'pending' && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div
            className="mx-auto max-w-3xl rounded-2xl border p-4 sm:p-5 shadow-lg backdrop-blur-md"
            style={{
              background: 'rgba(4, 11, 22, 0.92)',
              borderColor: 'rgba(201,146,42,0.25)',
            }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed" style={{ color: '#8B8FA8' }}>
                We use cookies for analytics to understand how visitors use this site.
                You can accept or reject non-essential cookies. See our{' '}
                <Link
                  href="/privacy-policy"
                  className="underline"
                  style={{ color: '#C9922A' }}
                >
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
              <div className="flex flex-shrink-0 gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleReject}
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    borderColor: 'rgba(201,146,42,0.3)',
                    color: '#8B8FA8',
                  }}
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  style={{ background: '#C9922A', color: '#040B16' }}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
