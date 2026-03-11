import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br>')
}

export async function POST(req: Request) {
  try {
    const { name, email, topic, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'Imperial Comms <noreply@appstarfamily.net>',
      to: ['info@appstarfamily.net'],
      replyTo: email,
      subject: `[${topic}] Message from ${escapeHtml(name)}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#C9922A;margin-bottom:16px;">New Imperial Communication</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;width:80px;vertical-align:top;">Name</td><td style="padding:8px 0;color:#eee;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Email</td><td style="padding:8px 0;color:#eee;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Topic</td><td style="padding:8px 0;color:#eee;">${escapeHtml(topic)}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #333;margin:16px 0;">
          <p style="color:#888;margin-bottom:8px;">Message:</p>
          <p style="color:#eee;line-height:1.6;">${escapeHtml(message)}</p>
          <hr style="border:none;border-top:1px solid #333;margin-top:24px;">
          <p style="color:#555;font-size:12px;">Sent via appstarfamily.net contact form</p>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 })
  }
}
