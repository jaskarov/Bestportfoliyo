# Asqarov Javohirbek — Portfolio

A modern dark-mode portfolio for a full-stack engineer and AI product developer.

This version is set up for real lead generation: contact form, booking flow, Telegram alerts, EmailJS/Formspree, and webhook-based CRM/Google Sheets integration.

---

## Quick start

```bash
npm install
npm run dev
```

---

## Lead capture integrations

The project supports these real channels:

1. Telegram bot notifications
2. Formspree submissions
3. EmailJS email delivery
4. Google Sheets / CRM webhook forwarding
5. Mail fallback if no service is configured

---

## Environment setup

Copy the example file:

```bash
copy .env.example .env
```

Then fill in your credentials:

```env
VITE_CONTACT_EMAIL=salomh46@gmail.com
VITE_EMAIL_PROVIDER=formspree
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_TELEGRAM_BOT_TOKEN=
VITE_TELEGRAM_CHAT_ID=
VITE_BOOKING_URL=https://cal.com/your-username
VITE_GOOGLE_SHEET_WEBHOOK_URL=
VITE_CRM_WEBHOOK_URL=
```

Notes:
- Do not commit `.env` to Git
- Keep `.env.example` as the template
- Vite only exposes variables starting with `VITE_`

---

## Telegram bot setup

1. Open Telegram and create a bot with BotFather
2. Copy the token
3. Open a chat with your bot and send `/start`
4. Get your chat ID using a bot like `@userinfobot`
5. Add to `.env`:

```env
VITE_TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
VITE_TELEGRAM_CHAT_ID=YOUR_CHAT_ID
```

---

## Formspree setup

1. Create a form at https://formspree.io
2. Copy the endpoint URL
3. Add it:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

---

## EmailJS setup

1. Register at https://www.emailjs.com
2. Create an email service and template
3. Add keys:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

---

## Google Sheets / CRM webhook setup

You can use:
- Apps Script
- Make.com
- Zapier
- a direct webhook endpoint

Example environment variables:

```env
VITE_GOOGLE_SHEET_WEBHOOK_URL=https://example.com/webhook
VITE_CRM_WEBHOOK_URL=https://example.com/crm
```

The webhook payload contains:
- name
- email
- message
- source
- bookingDate
- bookingTime
- timestamp

---

## Booking flow

The booking modal is wired to the same lead-pipeline. It can send a request to Telegram, EmailJS, Formspree, or a CRM/webhook. If no provider is configured, it falls back to `mailto:`.

To connect a real calendar, set:

```env
VITE_BOOKING_URL=https://cal.com/your-username
```

and replace the local modal flow with a real scheduler as needed.

---

## Build and deploy

```bash
npm run build
```

Deploy the generated `dist` folder to:
- Netlify
- Vercel
- GitHub Pages
- any static hosting service

---

## Project structure

```text
.
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── AIChatWidget.tsx
│   │   ├── BookingModal.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── UISoundEngine.tsx
│   │   └── WorkProcessSection.tsx
│   ├── data/
│   │   └── projects.ts
│   ├── localization.tsx
│   ├── main.tsx
│   ├── index.css
│   └── utils/
│       ├── cn.ts
│       └── leadCapture.ts
└── dist/
```

---

## Notes

- The contact form and booking flow are now integration-ready
- The fallback keeps the site working even when external services are not configured yet
- Real email / booking / CRM actions should be configured in production environment variables

---

## Contact

- Phone: +998 90 508-33-02
- Telegram: @Dr_eviluz
- Email: salomh46@gmail.com
- Location: Tashkent, Uzbekistan

© 2026 Asqarov Javohirbek. All rights reserved.
