'use client'

import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { createFaqSchema } from '@/lib/schema'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { SectionTransition } from '@/components/effects/SectionTransition'

type ServicePageProps = {
  title: string
  intro: string
  deliverables: string[]
  targetClients: string[]
  processSteps: { title: string; description: string }[]
  pricing: string
  faqs: { question: string; answer: string }[]
}

export function ServicePageTemplate({
  title,
  intro,
  deliverables,
  targetClients,
  processSteps,
  pricing,
  faqs,
}: ServicePageProps) {
  return (
    <>
      <JsonLd data={createFaqSchema(faqs)} />

      <SectionWrapper className="pt-32 md:pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedChild>
            <h1 className="mb-8">{title}</h1>
          </AnimatedChild>

          <AnimatedChild>
            <p className="text-lg text-[#a3a3a3] leading-relaxed mb-12">
              {intro}
            </p>
          </AnimatedChild>

          {/* What We Deliver */}
          <AnimatedChild className="mb-12">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-6">
              What We Deliver
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-sky-500 mt-1 flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-[#a3a3a3]">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedChild>

          {/* Who This Is For */}
          <AnimatedChild className="mb-12">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-6">
              Who This Is For
            </h2>
            <ul className="space-y-3">
              {targetClients.map((client, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-sky-500 flex-shrink-0">
                    <svg
                      className="w-5 h-5 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                  <span className="text-[#a3a3a3]">{client}</span>
                </li>
              ))}
            </ul>
          </AnimatedChild>

          {/* Our Process */}
          <AnimatedChild className="mb-12">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-6">
              Our Process
            </h2>
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#f5f5f5] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#a3a3a3]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedChild>

          {/* Pricing */}
          <AnimatedChild className="mb-12">
            <div className="bg-[#111111] rounded-lg p-6">
              <h2 className="text-2xl font-bold text-[#f5f5f5] mb-4">
                Pricing
              </h2>
              <p className="text-[#a3a3a3]">{pricing}</p>
            </div>
          </AnimatedChild>

          {/* FAQs */}
          <AnimatedChild className="mb-12">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion items={faqs} />
          </AnimatedChild>

          {/* CTA */}
          <AnimatedChild className="text-center">
            <Button href="/contact">Get a Quote</Button>
          </AnimatedChild>
        </div>
      </SectionWrapper>
    </>
  )
}
