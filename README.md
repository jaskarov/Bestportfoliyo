# Asqarov Javohirbek — Portfolio

A hyper-modern, dark-mode portfolio website for **Asqarov Javohirbek**, Senior Full-Stack & AI Engineer.

Built as an Awwwards-style single-page experience with cinematic glassmorphism, an interactive particle canvas, a multilingual interface, and several genuinely interactive client-facing tools.

**Live demo sections:** Hero → Quest Map → Tech Stack → Work Process → Projects → Testimonials → Budget Calculator → Contact

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack Used](#2-tech-stack-used)
3. [Step-by-Step Local Setup Guide](#3-step-by-step-local-setup-guide)
4. [Environment Variables](#4-environment-variables)
5. [Project Structure](#5-project-structure)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Project Overview

This is not a static template. Most sections are interactive and hold real state.

### Core Features

| Feature | What it does |
|---|---|
| **Multi-language (EN / UZ / RU)** | A language switcher in the header instantly translates the entire interface — navigation, headings, project descriptions, modals, the calculator, and the AI assistant. Your choice is saved in `localStorage` and restored on your next visit. |
| **"Javohir AI" Assistant** | A floating chat widget in the bottom-right corner. Visitors can ask about skills, experience, projects, pricing, availability, or process. It recognises questions in English, Uzbek, and Russian, and replies with conversion actions like "Book a Free Call". |
| **Budget Calculator** | Visitors select services (Frontend, Backend, AI Integration, Database, API, DevOps) and a complexity level. Estimated budget and timeline update live. Frontend + Backend + AI are pre-selected so a real number appears immediately. |
| **Interactive Project Demos** | Each project card opens a modal containing a *working* simulation:<br>• **API Explorer** — a live request console **plus an editable code sandbox** with a real terminal output panel<br>• **Health AI** — a clickable symptom checker with an animated triage engine<br>• **Marketing AI** — a content generator with typewriter output and copy-to-clipboard |
| **Booking Flow** | A Cal.com-style 3-step scheduler (Date → Time → Details → Confirmation) with locale-aware date formatting. |
| **Mobile Optimization** | Hamburger navigation with an animated overlay, fully stacked layouts with no horizontal scroll, 44px minimum touch targets, and **50% fewer canvas particles on screens ≤768px** for smoother scrolling and lower battery use. |
| **UI Sound Effects** | Subtle synthesized cyberpunk click sounds on buttons and modals, generated with the Web Audio API (no audio files). Toggle on/off from the header; the preference is remembered. |

### Accessibility & Performance Notes

- Respects `prefers-reduced-motion` — ambient sphere animations are disabled for users who request reduced motion.
- Canvas renders at ~30fps intentionally and thins out particle connections to keep the main thread free.
- All modals support `Escape` to close and lock body scroll while open.

---

## 2. Tech Stack Used

> **Important:** This project uses **Vite**, *not* Next.js. There is no `next.config.js`, no `pages/` or `app/` directory, and no server-side rendering. Everything runs client-side.

### Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19.2.6 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5.9.3 | Type safety |
| [Vite](https://vite.dev) | 7.3.2 | Dev server & build tool |
| [Tailwind CSS](https://tailwindcss.com) | 4.1.17 | Utility-first styling (v4, configured via the Vite plugin — there is **no** `tailwind.config.js`) |

### Libraries

| Library | Purpose |
|---|---|
| [Framer Motion](https://motion.dev) | All animations: scroll parallax, page transitions, modal springs, staggered reveals, animated counters |
| [Lucide React](https://lucide.dev) | Icon set used throughout the site |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class merging (see `src/utils/cn.ts`) |

### Build Plugins

| Plugin | Purpose |
|---|---|
| `@vitejs/plugin-react` | React Fast Refresh + JSX transform |
| `@tailwindcss/vite` | Tailwind CSS v4 integration |
| `vite-plugin-singlefile` | Inlines all JS and CSS into a **single self-contained `dist/index.html`** |

### Browser APIs (no library needed)

- **Canvas 2D API** — the interactive particle grid in the hero
- **Web Audio API** — synthesized UI sound effects
- **`localStorage`** — persists language and sound preferences
- **`MutationObserver`** — powers live DOM translation
- **`Intl.DateTimeFormat`** — locale-aware dates in the booking modal

> **Note on GSAP:** `gsap` and `@gsap/react` are present in `package.json` but are **not currently imported** anywhere in `src/`. All animation is handled by Framer Motion. You can safely remove them (see [Troubleshooting](#6-troubleshooting)) or keep them for future use.

---

## 3. Step-by-Step Local Setup Guide

Follow these steps exactly. No prior experience with this project is assumed.

### Step 1 — Install Node.js

This project requires **Node.js version 20.19 or higher** (or 22.12+). Vite 7 will refuse to start on older versions.

1. Go to **https://nodejs.org**
2. Download the **LTS** version for your operating system.
3. Run the installer and accept the defaults.
4. **Restart your terminal** (and VS Code) after installing.

Verify the installation by opening a terminal and running:

```bash
node --version
npm --version
```

You should see something like:

```
v22.14.0
10.9.2
```

If `node --version` shows anything below `v20.19`, please upgrade before continuing.

---

### Step 2 — Get the project files

**If you downloaded a ZIP file:**

Extract it to a folder you can find easily, for example `Documents/portfolio`.

**If you are cloning from Git:**

```bash
git clone <your-repository-url>
cd <project-folder-name>
```

---

### Step 3 — Open the project in VS Code

1. Open **VS Code**.
2. Go to **File → Open Folder…**
3. Select the project folder — the one that directly contains `package.json`.

> ⚠️ **Common mistake:** Make sure you open the folder containing `package.json`, not its parent folder. If you open the parent, all `npm` commands will fail with `ENOENT: no such file or directory, open 'package.json'`.

Now open the built-in terminal with **Ctrl + `** (backtick) on Windows/Linux, or **Cmd + `** on macOS.

Confirm you are in the right place:

```bash
ls
```

You should see `package.json`, `index.html`, `src`, and `vite.config.ts` in the output. (On Windows Command Prompt, use `dir` instead of `ls`.)

---

### Step 4 — Install dependencies

Run this once:

```bash
npm install
```

This reads `package.json` and downloads every library into a `node_modules` folder. It usually takes 30–60 seconds.

> You may see a few `npm warn` messages or a vulnerability notice. These are normal and will not stop the project from running. You do **not** need to run `npm audit fix --force` — doing so can break the build by upgrading packages to incompatible versions.

---

### Step 5 — Start the development server

```bash
npm run dev
```

You will see output similar to:

```
  VITE v7.3.2  ready in 412 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Now open **http://localhost:5173** in your browser.

The site supports **hot reloading** — save any file in `src/` and the browser updates instantly without a manual refresh.

**To stop the server:** press **Ctrl + C** in the terminal.

#### Testing on your phone (optional)

To preview on a real mobile device on the same Wi-Fi network:

```bash
npm run dev -- --host
```

Then open the **Network** URL shown in the terminal on your phone.

---

### Step 6 — Build for production

When you are ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder. Thanks to `vite-plugin-singlefile`, the entire site — HTML, CSS, and JavaScript — is bundled into **one file: `dist/index.html`**.

To preview the production build locally before deploying:

```bash
npm run preview
```

This serves the built site, usually at **http://localhost:4173**.

#### Deploying

Because the output is a single self-contained HTML file, deployment is trivial. You can:

- Drag and drop the `dist/` folder onto [Netlify Drop](https://app.netlify.com/drop)
- Deploy with [Vercel](https://vercel.com) (set the output directory to `dist`)
- Upload `dist/index.html` to any static host, shared hosting, or GitHub Pages

---

### Command Reference

| Command | What it does |
|---|---|
| `npm install` | Installs all dependencies (run once, first) |
| `npm run dev` | Starts the local dev server at `localhost:5173` |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the production build locally for testing |

---

## 4. Environment Variables

### ✅ No environment variables are required.

**You do not need to create a `.env.local` file to run this project.** Clone it, run `npm install`, run `npm run dev`, and everything works immediately — including the AI assistant and the booking flow.

This is intentional. Here is exactly how those two features currently work:

| Feature | Current implementation | Needs an API key? |
|---|---|---|
| **Javohir AI assistant** | A local, rule-based knowledge base in `src/components/AIChatWidget.tsx`. It matches keywords against pre-written multilingual answers. No network requests are made. | ❌ No |
| **Booking modal** | A self-contained UI simulation in `src/components/BookingModal.tsx`. It is styled to resemble Cal.com and displays "Scheduling powered by Cal.com", but no Cal.com SDK is loaded and no booking is actually created. | ❌ No |
| **Contact form** | Simulates submission with a timed delay, then shows a success state. No email is sent. | ❌ No |
| **Project demos** | All three demos run entirely in the browser against local mock data in `src/data/projects.ts`. The code sandbox parses supported `api.get()` / `api.post()` / `api.patch()` calls — it deliberately does **not** use `eval()`, so it is safe from code injection. | ❌ No |

> **Be aware before going live:** since the contact form and booking flow are front-end simulations, submissions are **not delivered anywhere**. Until you connect a real backend, direct visitors to the working contact links: Telegram `@Dr_eviluz`, email `salomh46@gmail.com`, or phone `+998 90 508-33-02`.

---

### Optional: Upgrading to real integrations

If you later want a genuine OpenAI-powered assistant or real Cal.com bookings, here is how to add environment variables to this Vite project.

#### How Vite handles env variables

Vite only exposes variables that begin with the `VITE_` prefix, and they are accessed via `import.meta.env` (**not** `process.env`, which is a Next.js/Node convention and will be `undefined` here).

#### Step 1 — Create the file

In the **project root**, next to `package.json`, create a file named `.env.local`:

```bash
# macOS / Linux
touch .env.local

# Windows (PowerShell)
New-Item .env.local
```

#### Step 2 — Add your variables

```env
# .env.local

# OpenAI — for a real AI assistant
VITE_OPENAI_API_KEY=sk-your-key-here

# Cal.com — for real scheduling
VITE_CALCOM_USERNAME=your-calcom-username
VITE_CALCOM_EVENT_SLUG=15min
```

#### Step 3 — Use them in code

```ts
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const calUser = import.meta.env.VITE_CALCOM_USERNAME;
```

#### Step 4 — Restart the dev server

Vite only reads `.env.local` at startup. Stop the server with **Ctrl + C** and run `npm run dev` again.

#### Step 5 — Never commit your keys

Add this to your `.gitignore`:

```gitignore
.env.local
.env
node_modules
dist
```

> 🔐 **Critical security warning:** Any variable prefixed with `VITE_` is **embedded in the built JavaScript and is publicly visible** to anyone who views your site's source. Never put a secret OpenAI key in a front-end variable on a public site — it can be extracted and used at your expense.
>
> The correct approach is to keep the secret key on a server and have the browser call your own backend endpoint (a serverless function on Vercel or Netlify works well). Your backend then calls OpenAI. Only truly public values — like a Cal.com username — are safe to expose with `VITE_`.

---

## 5. Project Structure

```
.
├── index.html                        # HTML entry point, loads Google Fonts
├── package.json                      # Dependencies and scripts
├── vite.config.ts                    # Vite plugins and the "@" → src/ alias
├── tsconfig.json                     # TypeScript configuration
└── src/
    ├── main.tsx                      # React root, mounts <App />
    ├── App.tsx                       # Main page: nav, hero, timeline, skills,
    │                                 #   projects, calculator, contact, footer
    ├── index.css                     # Design tokens, glassmorphism, sphere
    │                                 #   animations, mobile touch-target rules
    ├── localization.tsx              # EN/UZ/RU dictionaries + live DOM translator
    ├── data/
    │   └── projects.ts               # Project content, features, stats
    ├── components/
    │   ├── AIChatWidget.tsx          # "Javohir AI" assistant
    │   ├── ProjectModal.tsx          # Project modals + API sandbox + demos
    │   ├── BookingModal.tsx          # 3-step discovery-call scheduler
    │   ├── WorkProcessSection.tsx    # Interactive 4-phase process timeline
    │   ├── TestimonialsSection.tsx   # Metric counters + testimonial slider
    │   └── UISoundEngine.tsx         # Web Audio UI click sounds
    └── utils/
        └── cn.ts                     # clsx + tailwind-merge helper
```

### Where to edit common things

| I want to change… | Open this file |
|---|---|
| Name, job title, hero text | `src/App.tsx` → `HeroSection` |
| Work experience & education | `src/App.tsx` → `QuestMapSection` |
| Skill categories and percentages | `src/App.tsx` → `TechStackSection` |
| Project titles, demos, features | `src/data/projects.ts` |
| Service prices in the calculator | `src/App.tsx` → `BudgetCalculatorSection` |
| Phone, email, Telegram | `src/App.tsx` → `ContactSection` |
| AI assistant answers | `src/components/AIChatWidget.tsx` → `knowledgeBase` |
| Uzbek / Russian translations | `src/localization.tsx` |
| Colours (gold, cyan, background) | `src/index.css` → `:root` |

---

## 6. Troubleshooting

**`npm : command not found` / `'npm' is not recognized`**
Node.js is not installed, or your terminal was open before installing it. Install Node.js, then fully restart your terminal and VS Code.

**`ENOENT: no such file or directory, open 'package.json'`**
You are in the wrong folder. Run `ls` (or `dir` on Windows) — if you don't see `package.json`, use `cd your-folder-name` to move into the correct directory.

**`Port 5173 is already in use`**
Another dev server is still running. Either stop it with **Ctrl + C** in its terminal, or start this one on a different port:
```bash
npm run dev -- --port 3000
```

**The build fails, or you see strange dependency errors**
Delete the installed packages and reinstall cleanly:
```bash
rm -rf node_modules package-lock.json
npm install
```
On Windows PowerShell:
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

**Vite reports an unsupported Node.js version**
Run `node --version`. If it is below `v20.19`, install the current LTS from [nodejs.org](https://nodejs.org).

**UI sounds don't play**
Browsers block audio until the user interacts with the page. Click anywhere first. Also confirm the speaker icon in the header is not muted.

**Removing the unused GSAP packages (optional)**
```bash
npm uninstall gsap @gsap/react
```
Nothing in `src/` imports them, so the site will build and run exactly the same.

---

## Contact

**Asqarov Javohirbek** — Senior Full-Stack & AI Engineer

- 📱 Phone: +998 90 508-33-02
- ✈️ Telegram: [@Dr_eviluz](https://t.me/Dr_eviluz)
- ✉️ Email: salomh46@gmail.com
- 📍 Location: Tashkent, Uzbekistan (GMT+5)

---

© 2026 Asqarov Javohirbek. All rights reserved.
