import type { LucideIcon } from 'lucide-react';
import { Braces, HeartPulse, Megaphone } from 'lucide-react';

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: 'api-explorer' | 'health-ai' | 'marketing-ai';
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
    id: 'api-explorer',
    title: 'API Explorer',
    category: 'Developer Tooling',
    description:
      'A comprehensive API testing and documentation platform built with FastAPI and SQLite. Features real-time request/response monitoring and automated documentation generation.',
    longDescription:
      'API Explorer is a full-featured REST client and auto-documentation hub designed for backend teams. It streams live request/response payloads, auto-generates OpenAPI specs, and keeps a versioned history of every call — cutting integration debugging time by more than half.',
    icon: Braces,
    tags: ['FastAPI', 'SQLite', 'React', 'TypeScript'],
    color: '#D4AF37',
    features: [
      'Real-time request / response monitoring',
      'Auto-generated OpenAPI documentation',
      'JWT & OAuth2 auth flow testing',
      'Versioned request history & collections',
      'Latency analytics dashboard',
      'One-click mock servers',
    ],
    stats: [
      { label: 'Avg. Response', value: '47ms' },
      { label: 'Endpoints Tested', value: '1.2k+' },
      { label: 'Dev Hours Saved', value: '300+' },
    ],
    repo: '#',
    demo: '#',
  },
  {
    id: 'health-ai',
    title: 'Health AI Medical System',
    category: 'AI Healthcare Platform',
    description:
      'AI-powered medical diagnosis platform leveraging machine learning for symptom analysis and health recommendations. Includes patient management and doctor consultation features.',
    longDescription:
      'Health AI is a clinical decision-support platform that combines a fine-tuned symptom-analysis model with a full patient-management suite. It triages cases by urgency, drafts consultation summaries, and gives physicians a clear probability-ranked differential — all under strict data-privacy controls.',
    icon: HeartPulse,
    tags: ['Python', 'TensorFlow', 'React', 'Node.js'],
    color: '#00F0FF',
    features: [
      'Symptom analysis with confidence scoring',
      'Urgency-based triage engine',
      'Patient records & history timelines',
      'Doctor consultation workspace',
      'Auto-drafted clinical summaries',
      'HIPAA-aligned data handling',
    ],
    stats: [
      { label: 'Triage Accuracy', value: '94%' },
      { label: 'Patients Served', value: '8k+' },
      { label: 'Consult Time Saved', value: '35%' },
    ],
    repo: '#',
    demo: '#',
  },
  {
    id: 'marketing-ai',
    title: 'Marketing Materials Generator',
    category: 'AI Content Studio',
    description:
      'AI Content Studio for automated marketing material generation. Creates social media posts, ad copy, and visual assets using advanced language models.',
    longDescription:
      'A brand-aware content engine that turns a one-line brief into ready-to-publish social posts, email campaigns, and product copy. Tone, audience, and platform presets let marketing teams ship consistent, on-brand material in seconds instead of hours.',
    icon: Megaphone,
    tags: ['OpenAI API', 'Next.js', 'Tailwind CSS', 'PostgreSQL'],
    color: '#A855F7',
    features: [
      'Brand voice & tone presets',
      'Multi-platform output (IG, X, LinkedIn)',
      'Email subject-line A/B variants',
      'One-line brief to full campaign',
      'Team approval workflows',
      'Performance analytics loop',
    ],
    stats: [
      { label: 'Assets Generated', value: '12k+' },
      { label: 'Content Output', value: '10x' },
      { label: 'Engagement Lift', value: '+42%' },
    ],
    repo: '#',
    demo: '#',
  },
];
