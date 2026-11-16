export type LeadSource = 'contact' | 'booking';

export type LeadPayload = {
  name: string;
  email: string;
  message?: string;
  source: LeadSource;
  bookingDate?: string;
  bookingTime?: string;
};

// 1. Secure Serverless Endpoint (Vercel /api/contact - Zero Secret Leakage)
const maybeSendServerless = async (lead: LeadPayload): Promise<boolean> => {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });

    if (res.ok) {
      const data = await res.json();
      return !!data.success;
    }
  } catch {
    // If running in local preview or serverless is unavailable, gracefully fall through
  }
  return false;
};

// 2. Formspree fallback
const maybeSendFormspree = async (lead: LeadPayload): Promise<boolean> => {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  if (!endpoint) return false;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        message: lead.message || '',
        source: lead.source,
        bookingDate: lead.bookingDate || '',
        bookingTime: lead.bookingTime || '',
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
};

// 3. EmailJS fallback
const maybeSendEmailjs = async (lead: LeadPayload): Promise<boolean> => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) return false;

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: lead.name,
          email: lead.email,
          message: lead.message || 'No message provided',
          source: lead.source,
          booking_date: lead.bookingDate || 'N/A',
          booking_time: lead.bookingTime || 'N/A',
        },
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
};

export const sendLead = async (lead: LeadPayload): Promise<boolean> => {
  // First try secure serverless function (which delivers to Telegram + Webhook safely)
  const serverlessSuccess = await maybeSendServerless(lead);
  if (serverlessSuccess) {
    return true;
  }

  // Next try external form endpoints
  const fallbackResults = await Promise.allSettled([
    maybeSendFormspree(lead),
    maybeSendEmailjs(lead),
  ]);

  const anyFallbackSuccess = fallbackResults.some(
    (res) => res.status === 'fulfilled' && res.value === true
  );

  if (anyFallbackSuccess) {
    return true;
  }

  // Final fallback to mailto if all API channels fail
  const fallbackMailto = `mailto:salomh46@gmail.com?subject=${encodeURIComponent(
    lead.source === 'booking' ? 'New Booking Request' : 'New Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${lead.name}\nEmail: ${lead.email}\n\nMessage:\n${lead.message || 'No message provided'}\n\nBooking Date: ${lead.bookingDate || 'N/A'}\nBooking Time: ${lead.bookingTime || 'N/A'}`
  )}`;

  window.location.href = fallbackMailto;
  return false;
};
