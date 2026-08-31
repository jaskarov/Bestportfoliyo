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
    title: 'AI Ops Dashboard',
    category: 'B2B SaaS / Internal Tools',
    description:
      'A data-heavy operations dashboard for teams managing API integrations, user activity, and AI workflow alerts in real time.',
    longDescription:
      'I designed and built a SaaS-style operations dashboard that brings together API health, usage analytics, automation events, and anomaly alerts in one place. The product helps product teams move faster by reducing manual monitoring and surfacing the right insights instantly.',
    icon: Braces,
    tags: ['React', 'Node.js', 'PostgreSQL', 'AI Monitoring'],
    color: '#D4AF37',
    features: [
      'Real-time system health monitoring',
      'Operational KPI dashboard with filters',
      'Automated alerting and event tracking',
      'Role-based access for internal teams',
      'API usage analytics and troubleshooting',
      'Clean, product-grade UX for client teams',
    ],
    stats: [
      { label: 'Faster issue triage', value: '3x' },
      { label: 'Active workflows', value: '40+' },
      { label: 'Saved ops hours', value: '120+' },
    ],
    repo: '#',
    demo: '#',
  },
  {
    id: 'health-ai',
    title: 'Smart Service Portal',
    category: 'AI-enabled Customer Experience',
    description:
      'A portal for automating service requests, prioritizing tasks, and delivering instant support with a smart knowledge layer.',
    longDescription:
      'This portal combines customer request intake, automated routing, and AI-assisted support workflows. It reduces manual team effort while making service and support interactions more transparent and faster for both clients and staff.',
    icon: HeartPulse,
    tags: ['Python', 'FastAPI', 'React', 'AI Support'],
    color: '#00F0FF',
    features: [
      'AI-assisted service triage',
      'Smart routing by client needs',
      'Ticket workflow and priority logic',
      'Support analytics and SLA tracking',
      'Role-based admin and client views',
      'Improved speed for non-technical users',
    ],
    stats: [
      { label: 'Response speed', value: '2x' },
      { label: 'Manual work reduced', value: '45%' },
      { label: 'Client satisfaction', value: '+31%' },
    ],
    repo: '#',
    demo: '#',
  },
  {
    id: 'marketing-ai',
    title: 'Growth AI Studio',
    category: 'AI Content & Automation',
    description:
      'An AI-driven content studio that turns a product brief into landing pages, campaign copy, and marketing ideas in minutes.',
    longDescription:
      'I built a content engine for marketing teams that transforms a short brief into polished campaign messaging, social content variations, product narratives, and launch-ready copy. It helps teams move from idea to execution without losing consistency or tone.',
    icon: Megaphone,
    tags: ['OpenAI API', 'Next.js', 'Tailwind CSS', 'Automation'],
    color: '#A855F7',
    features: [
      'Prompt-driven creative generation',
      'Multi-platform campaign variations',
      'Brand-safe tone customization',
      'Structured output for content teams',
      'Workflow automation for repeated tasks',
      'Campaign-ready copy at scale',
    ],
    stats: [
      { label: 'Content cycles', value: '10x faster' },
      { label: 'Brand consistency', value: 'High' },
      { label: 'Team output', value: '+42%' },
    ],
    repo: '#',
    demo: '#',
  },
];
