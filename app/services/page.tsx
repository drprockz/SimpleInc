import { generateMeta } from '@/lib/metadata'
import { Services } from '@/components/sections/Services'
import { CTA } from '@/components/sections/CTA'
import { SectionTransition } from '@/components/effects/SectionTransition'

export const metadata = generateMeta({
  title: 'Web Development Services in Mumbai',
  description:
    'Custom web application development, SaaS platforms, business websites, AI integration, and CMS solutions. Mumbai-based agency serving clients across India.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Our Services</h1>
          <p className="text-lg text-[#a3a3a3] max-w-2xl">
            We build custom web applications, SaaS products, business websites,
            and AI-powered features. Every project gets direct access to senior
            developers.
          </p>
        </div>
      </section>
      <SectionTransition from="#0a0a0a" to="#111111" />
      <Services />
      <SectionTransition from="#111111" to="#0a0a0a" />
      <CTA />
    </>
  )
}
