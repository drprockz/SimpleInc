import { generateMeta } from '@/lib/metadata'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata = generateMeta({
  title: 'SaaS & Web App Development in Mumbai | React + NestJS | Simple Inc',
  description:
    'Build your SaaS product with an experienced developer in Mumbai. Multi-tenant architecture, NestJS APIs, React dashboards and Prisma/PostgreSQL backends.',
  path: '/services/web-app-development',
})

const deliverables = [
  'Custom React frontend with TypeScript',
  'NestJS or Node.js backend API',
  'PostgreSQL database with Prisma ORM',
  'Authentication and role-based access control',
  'API documentation (OpenAPI/Swagger)',
  'Docker deployment setup',
  'CI/CD pipeline configuration',
  '30 days post-launch support',
]

const targetClients = [
  'Startups building their first product',
  'Businesses replacing spreadsheets with custom tools',
  'Companies needing internal admin panels or CRMs',
  'Agencies seeking white-label development partners',
  'Teams migrating legacy systems to modern stacks',
]

const processSteps = [
  {
    title: 'Discovery',
    description:
      'We discuss your requirements, user flows, and technical constraints. You get a detailed proposal within 48 hours.',
  },
  {
    title: 'Architecture Proposal',
    description:
      'We design the system architecture, database schema, and API structure. You review and approve before we write code.',
  },
  {
    title: 'Sprint-Based Build',
    description:
      'We build in 2-week sprints with demos at the end of each. You see progress and can request changes throughout.',
  },
  {
    title: 'Launch & Handover',
    description:
      'We deploy to your infrastructure, document everything, and provide 30 days of support to ensure a smooth transition.',
  },
]

const pricing =
  'Custom web applications typically range from Rs 1,00,000 to Rs 5,00,000+ depending on complexity, integrations, and timeline. We provide fixed-price quotes after the discovery call. No hourly billing surprises.'

const faqs = [
  {
    question: 'Do you build multi-tenant SaaS applications?',
    answer:
      'Yes. Multi-tenant architecture is one of our specialties. We build SaaS platforms where each customer gets isolated data while sharing the same codebase. This includes features like tenant-specific subdomains, custom branding per tenant, and tiered subscription management.',
  },
  {
    question: 'Do you handle DevOps and deployment?',
    answer:
      'Yes. We set up your deployment pipeline, Docker containers, and infrastructure on AWS, DigitalOcean, or Vercel depending on your needs. Every project includes CI/CD configuration so your team can deploy with confidence.',
  },
  {
    question: 'Can you work with an existing codebase?',
    answer:
      'Absolutely. Many of our projects involve improving or extending existing applications. We can audit your current codebase, identify issues, and incrementally improve it without a full rewrite.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Yes. We sign NDAs before any detailed discussions if required. Your ideas and business logic remain confidential.',
  },
  {
    question: 'What technologies do you use for web apps?',
    answer:
      'Our primary stack is React with TypeScript for frontends, NestJS or Node.js for backends, PostgreSQL with Prisma for databases, and Redis for caching. We also use Next.js for apps that need SSR or static generation.',
  },
  {
    question: 'How long does a typical web app take to build?',
    answer:
      'A minimum viable product (MVP) typically takes 6-12 weeks. A full-featured application with complex integrations can take 12-24 weeks. We provide realistic timelines during the discovery phase.',
  },
]

export default function WebAppDevelopmentPage() {
  return (
    <ServicePageTemplate
      title="Custom Web Application Development"
      intro="We build production-grade web applications — SaaS platforms, admin dashboards, CRMs, and internal tools. React frontend, NestJS backend, PostgreSQL database. Designed to scale with your business."
      deliverables={deliverables}
      targetClients={targetClients}
      processSteps={processSteps}
      pricing={pricing}
      faqs={faqs}
    />
  )
}
