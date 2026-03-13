import { generateMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { localBusinessSchema, createFaqSchema } from '@/lib/schema'
import { Accordion } from '@/components/ui/Accordion'
import { ContactForm } from '@/components/ui/ContactForm'
import { Button } from '@/components/ui/Button'
import { SectionTransition } from '@/components/effects/SectionTransition'

export const metadata = generateMeta({
  title: 'Hire a Web Development Agency in Mumbai',
  description:
    'Hire Simple Inc for production-ready web applications, SaaS platforms, websites, and AI integrations. Mumbai-based. Direct access to engineers. Fixed pricing.',
  path: '/hire-us',
})

const pricingTable = [
  { service: 'Business Website', price: '₹50,000', timeline: '2-4 weeks' },
  { service: 'E-Commerce Store', price: '₹75,000', timeline: '3-5 weeks' },
  { service: 'Web Application', price: '₹1,00,000', timeline: '6-12 weeks' },
  { service: 'SaaS Platform', price: '₹2,00,000+', timeline: '8-16 weeks' },
]

const hiringSteps = [
  {
    step: 1,
    title: 'Send us your brief',
    description: 'Via the form below or darshan@simpleinc.in',
  },
  {
    step: 2,
    title: 'Discovery call (30 min)',
    description: 'Scope, timeline, budget alignment',
  },
  {
    step: 3,
    title: 'Proposal sent within 48 hours',
    description: 'Fixed price, clear scope, no surprises',
  },
  {
    step: 4,
    title: 'Development begins',
    description: 'Weekly updates, WhatsApp/Slack access',
  },
  {
    step: 5,
    title: 'Launch + handover',
    description: 'Deployment, training, 30-day support',
  },
]

const faqs = [
  {
    question: 'How much does a web application cost?',
    answer:
      'A basic web application starts at ₹1,00,000. Complex web apps with user authentication, dashboards, integrations, and admin panels typically range from ₹1,50,000 to ₹5,00,000 depending on features. A full SaaS product with multi-tenancy, billing, and scale considerations starts at ₹2,00,000 and can go higher based on scope.',
  },
  {
    question: 'How long does it take to build a web app?',
    answer:
      'A standard business website takes 2-4 weeks. A Shopify or WooCommerce store takes 3-5 weeks. A custom web application takes 6-12 weeks. A full SaaS platform typically takes 8-16 weeks depending on scope, features, and integrations required.',
  },
  {
    question: 'Do you work with clients outside Mumbai?',
    answer:
      'Yes. Most projects are handled fully remotely. Clients across India, the UAE, and the UK have worked with Simple Inc without in-person meetings. We use WhatsApp, Slack, and video calls to stay in sync.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'The primary stack is React, Next.js, Node.js, NestJS, PostgreSQL, and Prisma for custom applications. For content sites, WordPress with ACF and REST API. For e-commerce, Shopify with custom Liquid themes or WooCommerce. For AI features, OpenAI and Claude APIs.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer:
      'Yes. Monthly maintenance retainers start at ₹5,000/month covering updates, backups, performance monitoring, and minor changes. For SaaS products, we offer dedicated support agreements based on your scale and requirements.',
  },
  {
    question: 'Can you work with our existing team or agency?',
    answer:
      'Yes. White-label development for agencies is available. You handle the client relationship, Simple Inc handles the build. We also work alongside in-house teams as a specialist resource for frontend, backend, or AI work.',
  },
  {
    question: 'Are you available for urgent projects?',
    answer:
      'It depends on current workload. For urgent projects with tight deadlines, we charge a 25-50% rush fee depending on scope. Contact us with your timeline and we will let you know availability within 24 hours.',
  },
  {
    question: 'Do you work on hourly or fixed-price basis?',
    answer:
      'We prefer fixed-price for most projects. It gives you cost certainty and keeps us focused on delivering outcomes, not billing hours. For ongoing retainers or R&D work where scope is unclear, we offer hourly or weekly arrangements.',
  },
  {
    question: 'What is your payment structure?',
    answer:
      'Standard payment structure is 40% upfront to begin work, 30% at midpoint milestone, and 30% on delivery. For projects under ₹50,000, we may work with 50% upfront and 50% on delivery. All payments are via bank transfer or UPI.',
  },
  {
    question: 'How do we start?',
    answer:
      'Fill the form on this page or email us at darshan@simpleinc.in with a brief about your project. Include what you want to build, your timeline, and your budget range. We will reply within 24 hours with next steps.',
  },
]

export default function HireUsPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={createFaqSchema(faqs)} />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-8">
            Hire a Web Development Agency in Mumbai
          </h1>

          {/* Intro Copy */}
          <div className="space-y-6 text-lg text-[#a3a3a3] leading-relaxed">
            <p>
              When you hire Simple Inc, you get direct access to the engineers building your product.
              No account managers. No hand-offs between teams. No waiting days for a status update.
              You message us on WhatsApp or Slack and get a reply the same day.
            </p>
            <p>
              We are a Mumbai-based web development agency with over 5 years of experience building
              custom web applications, SaaS platforms, business websites, and AI-powered features.
              Our clients range from local Mumbai businesses to startups across India, the UAE, and
              the UK. Over 50 clients have trusted us to build production-grade software — not
              prototypes, not templates, but real systems that run their businesses.
            </p>
            <p>
              Whether you need a business website, a Shopify store, a custom dashboard, or a full
              SaaS product, we handle everything in-house: frontend, backend, database, DevOps, and
              AI. One team. One point of contact. Fixed pricing with no surprises.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button href="#contact-form">Get a Free Quote</Button>
          </div>
        </div>
      </section>

      <SectionTransition from="#0a0a0a" to="#111111" />

      {/* Pricing Table */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#f5f5f5] mb-8">Pricing</h2>
          <div className="bg-[#1a1a1a] rounded-xl shadow-sm overflow-hidden border border-[#262626]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#262626] bg-[#111111]">
                  <th className="text-left py-4 px-6 font-semibold text-[#f5f5f5]">Service</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#f5f5f5]">Starting Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#f5f5f5]">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {pricingTable.map((row, index) => (
                  <tr
                    key={row.service}
                    className={index !== pricingTable.length - 1 ? 'border-b border-[#1a1a1a]' : ''}
                  >
                    <td className="py-4 px-6 text-[#f5f5f5] font-medium">{row.service}</td>
                    <td className="py-4 px-6 text-sky-400 font-semibold">{row.price}</td>
                    <td className="py-4 px-6 text-[#a3a3a3]">{row.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#525252] mt-4">
            Prices are indicative. Final quote depends on scope, features, and integrations required.
          </p>
        </div>
      </section>

      <SectionTransition from="#111111" to="#0a0a0a" />

      {/* How Hiring Works */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#f5f5f5] mb-10">How Hiring Works</h2>
          <div className="space-y-6">
            {hiringSteps.map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="w-10 h-10 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[#f5f5f5] mb-1">{item.title}</h3>
                  <p className="text-[#a3a3a3]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#0a0a0a" to="#111111" />

      {/* FAQ Section */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#f5f5f5] mb-8">Frequently Asked Questions</h2>
          <div className="bg-[#1a1a1a] rounded-xl p-6 md:p-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <SectionTransition from="#111111" to="#0a0a0a" />

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#f5f5f5] mb-6">Start Your Project</h2>
              <p className="text-[#a3a3a3] mb-6 leading-relaxed">
                Tell us what you want to build. Include your timeline and budget range if you have
                them. We will get back to you within 24 hours with next steps.
              </p>
              <div className="space-y-4">
                <p>
                  <span className="text-[#525252]">Email:</span>{' '}
                  <a
                    href="mailto:darshan@simpleinc.in"
                    className="text-sky-500 hover:text-sky-600 font-medium"
                  >
                    darshan@simpleinc.in
                  </a>
                </p>
                <p className="text-[#a3a3a3]">Mumbai, Maharashtra, India</p>
                <p className="text-sm font-medium text-sky-400 bg-sky-500/10 inline-block px-3 py-1 rounded-full">
                  Currently accepting new projects
                </p>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
