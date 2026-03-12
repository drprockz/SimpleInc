import { generateMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { personSchema, organizationSchema } from '@/lib/schema'
import { Button } from '@/components/ui/Button'

export const metadata = generateMeta({
  title: 'About Darshan Parmar — Full-Stack Developer, Mumbai',
  description: 'Darshan Parmar is a full-stack developer based in Mumbai with 5+ years building React, Next.js, Shopify, WordPress and SaaS projects for clients across India.',
  path: '/about',
})

const techStack = [
  { category: 'Frontend', items: 'React, Next.js, Vue.js, Tailwind CSS, Framer Motion' },
  { category: 'Backend', items: 'Node.js, NestJS, Express, PHP, REST APIs, WebSockets' },
  { category: 'AI', items: 'OpenAI API, Claude API, LLM integration, automation pipelines' },
  { category: 'CMS & E-Commerce', items: 'WordPress, Shopify, Wix, Headless CMS, ACF' },
  { category: 'Database', items: 'PostgreSQL, MySQL, Prisma ORM, Redis' },
  { category: 'DevOps', items: 'Docker, PM2, Nginx, Vercel, CI/CD' },
]

const capabilities = [
  'Web applications and SaaS products that handle real users at scale',
  'Business websites that load fast and rank on Google',
  'AI-powered features that automate workflows and add intelligence',
  'CMS and e-commerce stores that clients can manage themselves',
]

const workStyle = [
  {
    title: 'Fixed-price proposals',
    description: 'Every project starts with a clear scope, timeline, and price. No hourly billing surprises. No scope creep without a conversation.',
  },
  {
    title: 'Regular updates',
    description: 'You see progress weekly — not just at the end. Demos, screenshots, and staging links keep you in the loop throughout the build.',
  },
  {
    title: 'Direct access',
    description: 'You communicate with the developers building your product over WhatsApp or Slack. No account managers. No telephone game.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={organizationSchema} />

      <section className="pt-32 md:pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">About Simple Inc</h1>

          {/* Intro */}
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed mb-16">
            <p>
              Simple Inc is a web development agency based in Mumbai, founded by Darshan Parmar. We specialise in building custom web applications, SaaS products, business websites, and AI-powered features for startups and growing businesses across India.
            </p>
            <p>
              Darshan brings over 5 years of full-stack development experience spanning React, Next.js, NestJS, WordPress, Shopify, and PHP. Before starting Simple Inc, he worked on multi-tenant SaaS platforms, e-commerce systems, and enterprise dashboards. Every project at Simple Inc gets direct involvement from a senior developer — not a junior team behind an account manager.
            </p>
          </div>

          {/* Tech Stack */}
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {techStack.map((tech) => (
              <div key={tech.category} className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{tech.category}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tech.items}</p>
              </div>
            ))}
          </div>

          {/* What We Build */}
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What We Build</h2>
          <ul className="space-y-4 mb-16">
            {capabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-sky-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                <span className="text-slate-600 leading-relaxed">{cap}</span>
              </li>
            ))}
          </ul>

          {/* How We Work */}
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How We Work</h2>
          <div className="space-y-8 mb-16">
            {workStyle.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button href="/contact">Start a Conversation</Button>
          </div>
        </div>
      </section>
    </>
  )
}
