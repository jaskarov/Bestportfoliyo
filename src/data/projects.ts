import type { LucideIcon } from 'lucide-react';
import { CreditCard, Bot, Layout, Mic, Database, Activity } from 'lucide-react';

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: 'docupulse-ai' | 'dentamed-atelier' | 'voice2deal-ai' | 'uzpayment-sdk' | 'collabflow-canvas' | 'ai-code-reviewer';
  title: string;
  category: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  tags: string[];
  color: string;
  features: string[];
  stats: ProjectStat[];
  repo: string;
  demo: string;
}

export const projects: Project[] = [
  {
    id: 'docupulse-ai',
    title: 'DocuPulse AI — Enterprise Async RAG',
    category: 'Autonomous AI & Vector Search Engine',
    description:
      'High-throughput asynchronous RAG engine processing 100+ page documents with sub-250ms vector query latency via FastAPI, Redis, and Qdrant.',
    longDescription:
      'DocuPulse AI solves blocking I/O and gateway timeouts in enterprise document intelligence. Documents are immediately accepted with an async job ticket (< 2ms) while a Redis background worker swarm parses, chunks, and generates 768-dim Gemini embeddings stored in Qdrant HNSW vector indexes. Stress tested with k6 to sustain 177 req/s at 0% error rate.',
    icon: Database,
    tags: ['FastAPI', 'Redis Queue', 'Qdrant Vector DB', 'Gemini AI', 'Docker', 'k6 Stress Tested'],
    color: '#3B82F6',
    features: [
      'Non-blocking HTTP 202 async ingestion pipeline (< 2ms response)',
      'Redis 7 queue worker swarm for high-throughput parallel chunking',
      'Qdrant HNSW Cosine vector search with 38-130ms semantic lookup',
      'Page-precise citation highlighting with semantic overlap recovery',
      'Playwright E2E and k6 stress suite (177 req/s, P95 < 250ms)',
      'Enterprise Docker Compose with healthchecks and self-healing',
    ],
    stats: [
      { label: 'Ingest Latency', value: '< 2ms' },
      { label: 'k6 Throughput', value: '177 RPS' },
      { label: 'Vector Search', value: '42ms' },
    ],
    repo: 'https://github.com/jaskarov/docupulse-ai',
    demo: 'https://github.com/jaskarov/docupulse-ai#readme',
  },
  {
    id: 'dentamed-atelier',
    title: 'DentaMed Atelier — Clinic Ecosystem',
    category: 'MedTech SaaS & Telegram Mini App',
    description:
      'NextGen private dentistry & ENT clinic ecosystem featuring a 32-tooth interactive FDI anatomical arch, native haptics, and automated VIP ticketing.',
    longDescription:
      'DentaMed Atelier digitizes patient intake for premier dental and ENT clinics. Patients explore clinical services in an interactive Telegram Mini App, diagnose affected teeth on a 32-tooth interactive anatomical FDI model, pick appointment slots, and receive instant PIN-verified digital admission passes with zero reception wait time.',
    icon: Activity,
    tags: ['React 19', 'TypeScript', 'Telegram Mini App', 'FastAPI', 'Tailwind CSS', 'FDI Dentistry'],
    color: '#06B6D4',
    features: [
      '32-tooth interactive FDI anatomical model with 6 clinical states',
      'Telegram WebApp native haptic feedback and custom dialog flows',
      'Asynchronous FastAPI appointment router with doctor slot locking',
      'Automated Telegram patient voucher with unique 4-digit PIN access',
      'Bilingual clinical diagnosis and transparent procedure pricing',
      'Nginx reverse proxy, systemd daemon, and 1-click VPS deployment',
    ],
    stats: [
      { label: 'Booking Time', value: '< 30s' },
      { label: 'Reception Speed', value: '+70%' },
      { label: 'Interactive Teeth', value: '32 FDI' },
    ],
    repo: 'https://github.com/jaskarov/DentaMedKlinika_bot',
    demo: 'https://t.me/DentaMedKlinika_bot',
  },
  {
    id: 'voice2deal-ai',
    title: 'Voice2Deal AI — Speech Commerce ERP',
    category: 'Multimodal AI & Retail Automation',
    description:
      'Voice-driven retail POS, inventory tracker, and debt ledger Telegram SaaS powered by Gemini Multimodal AI with automated QR-receipt generation.',
    longDescription:
      'Voice2Deal AI transforms merchant operations into hands-free automation. Retail store owners record natural voice notes in Uzbek or Russian to instantly register sales, manage credit ledgers ("Nasiya"), update stock levels, and issue digital QR receipts, guarded by a 24/7 self-healing watchdog.',
    icon: Mic,
    tags: ['Google Gemini AI', 'Python', 'Aiogram 3', 'SQLite WAL', 'QR Receipts', 'Docker'],
    color: '#10B981',
    features: [
      'Natural voice-to-JSON transaction extraction with Gemini Flash',
      'Automated Nasiya debt ledger with WhatsApp/Telegram reminders',
      'High-resolution digital receipt generator with verification QR code',
      'SQLite WAL mode transaction locks preventing race conditions',
      'Self-healing watchdog process with 12h automated cloud backups',
      'Live Google Sheets and Excel sync for accountant auditing',
    ],
    stats: [
      { label: 'Audio Parsing', value: '< 1.5s' },
      { label: 'Extraction Accuracy', value: '99.2%' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
    repo: 'https://github.com/jaskarov/voice2deal-ai-bot',
    demo: 'https://t.me/Ovozli_SavdoBOT',
  },
  {
    id: 'uzpayment-sdk',
    title: 'UzPayment Multi-Provider SDK Monorepo',
    category: 'Fintech & Payment Infrastructure',
    description:
      'Universal, zero-dependency Node.js/TypeScript & async Python SDK integrating Click, Payme, Uzum Bank, and Paynet with strict HMAC security.',
    longDescription:
      'UzPayment SDK is an enterprise payment aggregation monorepo built for Uzbekistan fintech ecosystems. It standardizes disparate provider protocols into a single strongly-typed interface with automated signature generation, 100x tiyin/so\'m precision conversions, webhook verification, and state machine transaction idempotency.',
    icon: CreditCard,
    tags: ['TypeScript', 'Python 3.12+', 'Fintech', 'HMAC-SHA256', 'Monorepo', 'Zero-Dependency'],
    color: '#00F0FF',
    features: [
      'Single unified API for Click, Payme, Uzum Bank & Paynet',
      'Zero external runtime dependencies in Node.js (native crypto)',
      '100x tiyin/so\'m conversion locks preventing rounding errors',
      'Automated HMAC signature generation and webhook verification',
      'Idempotency & state machine transaction recovery',
      'Dual distribution: npm (@jasper/uzpayment) & PyPI (uzpayment-sdk)',
    ],
    stats: [
      { label: 'Test Coverage', value: '100%' },
      { label: 'Supported Gates', value: '4 Providers' },
      { label: 'Overhead', value: '< 1ms' },
    ],
    repo: 'https://github.com/jaskarov/uzpayment-monorepo',
    demo: 'https://github.com/jaskarov/uzpayment-monorepo#readme',
  },
  {
    id: 'collabflow-canvas',
    title: 'CollabFlow AI Canvas',
    category: 'Real-Time WebSockets & Generative UI',
    description:
      'Multiplayer collaborative infinite canvas with live cursor syncing and Google Gemini AI text-to-system architecture generator.',
    longDescription:
      'CollabFlow AI is a real-time collaborative workspace engineered with Next.js, WebSockets, HTML5 Canvas, and Gemini AI. Distributed engineering teams can brainstorm, draw diagrams, track peer cursors in sub-50ms latency, and generate complete microservice architectures from simple natural language prompts.',
    icon: Layout,
    tags: ['Next.js', 'React', 'WebSockets', 'HTML5 Canvas', 'Tailwind CSS', 'Gemini AI'],
    color: '#A855F7',
    features: [
      'Sub-50ms multiplayer cursor and object synchronization',
      'Natural Language to Architecture Diagrammer powered by Gemini AI',
      'Infinite zoom, pan, freehand drawing and smart geometric shapes',
      'Room-based WebSocket architecture with heartbeat reconnection',
      'Export to SVG, High-Res PNG, and JSON schema',
      'Optimistic UI state management with conflict resolution',
    ],
    stats: [
      { label: 'Sync Latency', value: '< 50ms' },
      { label: 'AI Gen Time', value: '< 2.5s' },
      { label: 'Concurrent Users', value: '1,000+' },
    ],
    repo: 'https://github.com/jaskarov/collabflow-ai-canvas',
    demo: 'https://github.com/jaskarov/collabflow-ai-canvas#readme',
  },
  {
    id: 'ai-code-reviewer',
    title: 'AI Code Reviewer & Security Auditor',
    category: 'AI Agents & DevOps CI/CD',
    description:
      'Google Gemini powered GitHub Action that automatically reviews Pull Requests, identifies OWASP vulnerabilities, and estimates latency.',
    longDescription:
      'An autonomous AI Code Reviewer action integrated into GitHub CI/CD pipelines. It parses git diffs, analyzes code against OWASP Top 10 vulnerabilities (SQLi, XSS, Secret Leaks, Insecure Deserialization), and posts formatted markdown feedback with line-by-line fix suggestions and complexity assessments.',
    icon: Bot,
    tags: ['Google Gemini AI', 'GitHub Action', 'TypeScript', 'OWASP Security', 'DevOps', 'CI/CD'],
    color: '#D4AF37',
    features: [
      'Automated Pull Request inline commentary & summary',
      'OWASP Top 10 & CWE security vulnerability scanning',
      'Algorithmic time/space complexity analysis (Big-O)',
      'Secret and token leakage detection before merge',
      'GitHub Action runner with intelligent token budgeting',
      'Zero-leakage secret handling adhering to GitHub security standards',
    ],
    stats: [
      { label: 'Review Speed', value: '< 4.5s' },
      { label: 'OWASP Scans', value: '100%' },
      { label: 'Dev Time Saved', value: '80%' },
    ],
    repo: 'https://github.com/jaskarov/ai-code-reviewer-action',
    demo: 'https://github.com/jaskarov/ai-code-reviewer-action#readme',
  },
];
