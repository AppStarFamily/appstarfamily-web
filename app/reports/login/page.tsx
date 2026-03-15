'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ReportsLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/reports-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json().catch(() => ({ success: false }))

      if (data.success) {
        router.push('/reports')
        router.refresh()
      } else {
        setError('Access denied. Wrong password.')
      }
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0F1E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Logo + branding */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <Image
              src="/images/logo.png"
              alt="App Star Family"
              width={40}
              height={40}
              style={{ borderRadius: '8px' }}
            />
            <span style={{ color: '#E8E0D0', fontWeight: '600', fontSize: '16px', letterSpacing: '0.02em' }}>
              App Star Family
            </span>
          </div>
          <h1 style={{
            color: '#C9A84C',
            fontWeight: '700',
            fontSize: '22px',
            letterSpacing: '0.04em',
            margin: '0 0 8px',
          }}>
            Empire Intelligence
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>
            Research &amp; Reports
          </p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1F2937',
          borderRadius: '16px',
          padding: '32px',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#9CA3AF',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                Access Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoFocus
                style={{
                  width: '100%',
                  backgroundColor: '#0D1117',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#E5E7EB',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
                onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                onBlur={e => (e.target.style.borderColor = '#374151')}
              />
            </div>

            {error && (
              <div style={{
                color: '#EF4444',
                fontSize: '13px',
                marginBottom: '16px',
                padding: '10px 12px',
                backgroundColor: '#EF444411',
                borderRadius: '6px',
                border: '1px solid #EF444433',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: loading ? '#92742A' : '#C9A84C',
                color: '#0A0F1E',
                fontWeight: '700',
                fontSize: '14px',
                letterSpacing: '0.04em',
                padding: '13px',
                borderRadius: '8px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {loading ? 'Verifying...' : 'Access Reports →'}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: 'center',
          color: '#374151',
          fontSize: '11px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginTop: '24px',
        }}>
          App Star Family · Internal Use Only
        </p>
      </div>
    </div>
  )
}
