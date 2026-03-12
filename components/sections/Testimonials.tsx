'use client'

import { motion } from 'framer-motion'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
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
    <SectionWrapper className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="border-l-4 border-sky-500 bg-slate-50 rounded-r-lg p-6"
            >
              <p className="text-slate-700 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-500">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
