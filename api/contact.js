'use strict';

const { Resend } = require('resend');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, message } = req.body || {};

  if (!name || !company || !message || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Send email (primary)
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: 'Nexopack <noreply@nexopack.io>',
      to: 'info@nexopack.io',
      subject: `New Message from ${name} (${company})`,
      text: [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
      ].join('\n')
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email' });
  }

  // Send Telegram (best-effort — failure does not affect response)
  try {
    const text = [
      '\uD83D\uDCE9 New Message \u2014 Nexopack',
      '',
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      '',
      'Message:',
      message
    ].join('\n');

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text })
      }
    );
  } catch (_) {
    // Non-fatal
  }

  return res.status(200).json({ ok: true });
};
