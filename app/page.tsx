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
      <Services />
      <Work />
      <WhyUs />
      <Testimonials />
      <Process />
      <CTA />
    </>
  )
}
