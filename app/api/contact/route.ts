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
  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
  }

  try {
    const { name, email, topic, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: 'Imperial Comms <noreply@appstarfamily.net>',
      to: ['info@appstarfamily.net'],
      replyTo: email,
      subject: `[${topic}] Message from ${escapeHtml(name)}`,
      html: `
        <div style="background:#0a0f1e;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:560px;margin:0 auto;">

            <!-- Header -->
            <div style="border-bottom:1px solid #1e2a40;padding-bottom:24px;margin-bottom:28px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;color:#C9922A;text-transform:uppercase;">AppStar Family · Imperial Comms</p>
              <h1 style="margin:0;font-size:22px;font-weight:600;color:#F0E8D8;">New Incoming Message</h1>
            </div>

            <!-- Topic badge -->
            <div style="margin-bottom:24px;">
              <span style="display:inline-block;background:#1a1f30;border:1px solid #C9922A44;color:#C9922A;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:5px 14px;border-radius:4px;">${escapeHtml(topic)}</span>
            </div>

            <!-- Fields -->
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #1e2a40;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#5a6a88;width:90px;vertical-align:middle;">From</td>
                <td style="padding:12px 0;border-bottom:1px solid #1e2a40;font-size:15px;color:#F0E8D8;font-weight:500;vertical-align:middle;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #1e2a40;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#5a6a88;vertical-align:middle;">Reply to</td>
                <td style="padding:12px 0;border-bottom:1px solid #1e2a40;vertical-align:middle;"><a href="mailto:${escapeHtml(email)}" style="color:#C9922A;font-size:15px;text-decoration:none;">${escapeHtml(email)}</a></td>
              </tr>
            </table>

            <!-- Message body -->
            <div style="background:#0d1425;border:1px solid #1e2a40;border-left:3px solid #C9922A;border-radius:6px;padding:20px 22px;margin-bottom:32px;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5a6a88;">Message</p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#D0C8B8;">${escapeHtml(message)}</p>
            </div>

            <!-- Footer -->
            <p style="margin:0;font-size:11px;color:#2a3448;text-align:center;">Sent via <a href="https://appstarfamily.net/contact" style="color:#3a4a60;text-decoration:none;">appstarfamily.net</a> contact form</p>

          </div>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend API error:', JSON.stringify(error))
      return NextResponse.json({ error: `Send failed: ${error.message}` }, { status: 500 })
    }

    console.log('[contact] Email sent, id:', data?.id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[contact] Unexpected error:', msg)
    return NextResponse.json({ error: `Unexpected error: ${msg}` }, { status: 500 })
  }
}
