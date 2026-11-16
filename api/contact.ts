import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message, source, bookingDate, bookingTime } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const title = source === 'booking' ? '📅 Yangi Uchrashuv So‘rovi (Booking)' : '📩 Yangi Portfolio Xabari';
    const lines = [
      title,
      `👤 Ism: ${name}`,
      `✉️ Email: ${email}`,
    ];

    if (message) lines.push(`💬 Xabar: ${message}`);
    if (bookingDate) lines.push(`📅 Sana: ${bookingDate}`);
    if (bookingTime) lines.push(`⏰ Vaqt: ${bookingTime}`);
    lines.push(`🌐 Manba: bestportfoliyo.vercel.app`);
    lines.push(`🕒 Vaqt: ${new Date().toISOString()}`);

    const text = lines.join('\n');

    // Read server-side secret tokens (never exposed to client browser)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    let telegramSent = false;

    if (botToken && chatId) {
      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          disable_web_page_preview: true,
        }),
      });

      if (tgRes.ok) {
        telegramSent = true;
      }
    }

    // Optional webhook forwarding (CRM / Google Sheets)
    const webhookUrl = process.env.CRM_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: message || '',
          source: source || 'contact',
          bookingDate: bookingDate || '',
          bookingTime: bookingTime || '',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null);
    }

    return res.status(200).json({
      success: true,
      telegramSent,
      message: 'Lead captured securely on server.',
    });
  } catch (err: any) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err?.message || 'Failed to process lead',
    });
  }
}
