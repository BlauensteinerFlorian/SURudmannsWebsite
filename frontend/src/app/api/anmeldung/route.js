import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Send email via SMTP
    const nodemailer = require('nodemailer')
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const mailOptions = {
      from: 'noreply@surudmanns.at',
      to: 'info@surudmanns.at',
      subject: 'Neue Pfingstturnier Anmeldung',
      text: `
Neue Anmeldung für das Pfingstturnier 2026:

Name: ${data.contactname}
Team: ${data.teamname}
E-Mail: ${data.email}
Telefon: ${data.phone}
Nachricht: ${data.message || 'Keine'}
      `,
      html: `
<h2>Neue Anmeldung für das Pfingstturnier 2026</h2>
<p><strong>Name:</strong> ${data.contactname}</p>
<p><strong>Team:</strong> ${data.teamname}</p>
<p><strong>E-Mail:</strong> ${data.email}</p>
<p><strong>Telefon:</strong> ${data.phone}</p>
<p><strong>Nachricht:</strong> ${data.message || 'Keine'}</p>
      `
    }

    await transporter.sendMail(mailOptions)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
