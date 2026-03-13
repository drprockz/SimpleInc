import { generateMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { localBusinessSchema } from '@/lib/schema'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Work } from '@/components/sections/Work'
import { WhyUs } from '@/components/sections/WhyUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { Process } from '@/components/sections/Process'
import { CTA } from '@/components/sections/CTA'
import { SectionTransition } from '@/components/effects/SectionTransition'

export const metadata = generateMeta({
  title: 'Web Application & SaaS Development Agency in Mumbai',
  description:
    'Simple Inc is a Mumbai-based development agency building custom web applications, SaaS products, dashboards, and business websites. React, Next.js, NestJS, AI. Direct access to engineers.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Hero />
      <SectionTransition from="#0a0a0a" to="#111111" />
      <Services />
      <SectionTransition from="#111111" to="#0a0a0a" />
      <Work />
      <SectionTransition from="#0a0a0a" to="#111111" />
      <WhyUs />
      <SectionTransition from="#111111" to="#0a0a0a" />
      <Testimonials />
      <SectionTransition from="#0a0a0a" to="#111111" />
      <Process />
      <SectionTransition from="#111111" to="#0a0a0a" />
      <CTA />
    </>
  )
}
