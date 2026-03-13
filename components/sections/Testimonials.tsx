'use client'

import { motion } from 'framer-motion'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { GradientOrbs } from '@/components/effects/GradientOrbs'
import { slideInLeft } from '@/lib/animations'

// IMPORTANT: Replace with real testimonials before launch. Do not ship placeholder quotes.
const testimonials = [
  {
    quote: 'Simple Inc rebuilt our entire order management system in 8 weeks. The result cut our daily admin time in half. Communication was direct and updates were weekly — exactly what we needed.',
    name: 'Rahul M.',
    company: 'Retail Business, Mumbai',
  },
  {
    quote: 'We needed a Shopify store and social media automation on a tight timeline. They delivered both ahead of schedule. The automated content pipeline alone saved us 10 hours a week.',
    name: 'Priya S.',
    company: 'E-Commerce Startup, Mumbai',
  },
  {
    quote: 'Working with Simple Inc felt like having a senior developer on the team. No account managers, no delays. Just clear communication and production-ready code.',
    name: 'Amit K.',
    company: 'SaaS Founder, Bangalore',
  },
]

export function Testimonials() {
  return (
    <SectionWrapper className="py-20 bg-[#0a0a0a] bg-dot-grid relative">
      <GradientOrbs variant="testimonials" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="mb-12">What Clients Say</h2>
        </AnimatedChild>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={
                i % 2 === 0
                  ? 'border-l-4 border-sky-500 bg-[#111111] rounded-r-lg p-6 border border-[#262626]'
                  : 'border-l-4 border-indigo-500 bg-[#111111] rounded-r-lg p-6 border border-[#262626]'
              }
            >
              <p className="text-[#a3a3a3] leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-[#f5f5f5]">{t.name}</div>
                <div className="text-sm text-[#525252]">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
