'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EmpireLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/empire-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.success) {
        router.push('/empire/dashboard')
      } else {
        setError('Access denied. Long may he pinch. 🦞')
      }
    } catch {
      setError('Access denied. Long may he pinch. 🦞')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0F1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: '#111827',
          border: '1px solid #1F2937',
          borderRadius: '16px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>👑</div>

        <h1
          style={{
            color: '#C9A84C',
            fontWeight: '700',
            fontSize: '22px',
            letterSpacing: '0.08em',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}
        >
          THE PRUTTIUS EMPIRE
        </h1>

        <p
          style={{
            color: '#6B7280',
            fontSize: '14px',
            marginBottom: '32px',
            letterSpacing: '0.05em',
          }}
        >
          Command Center
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={{
              backgroundColor: '#0A0F1E',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#E5E7EB',
              fontSize: '15px',
              padding: '12px 16px',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = '#C9A84C')}
            onBlur={e => (e.target.style.borderColor = '#374151')}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#8B6914' : '#C9A84C',
              color: '#0A0F1E',
              fontWeight: '700',
              fontSize: '15px',
              letterSpacing: '0.04em',
              padding: '13px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              width: '100%',
            }}
            onMouseEnter={e => {
              if (!loading) (e.currentTarget.style.backgroundColor = '#D4B563')
            }}
            onMouseLeave={e => {
              if (!loading) (e.currentTarget.style.backgroundColor = '#C9A84C')
            }}
          >
            {loading ? 'Verifying...' : 'Enter the Empire'}
          </button>
        </form>

        {error && (
          <p
            style={{
              color: '#EF4444',
              fontSize: '13px',
              marginTop: '16px',
              lineHeight: '1.5',
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
