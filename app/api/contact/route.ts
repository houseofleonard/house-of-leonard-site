import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'House of Leonard <onboarding@resend.dev>',
      to: 'hello@houseofleonard.com',
      replyTo: email,
      subject: `Message from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px; color: #231a08;">
          <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #9a9080; margin-bottom: 32px;">
            HOUSE OF LEONARD — CONTACT FORM
          </p>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>From:</strong> ${name}</p>
          <p style="font-size: 16px; margin-bottom: 24px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #060d2a;">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #e0d8c8; margin: 24px 0;" />
          <p style="font-size: 18px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
