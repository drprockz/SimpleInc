'use client'

import { motion } from 'framer-motion'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'

const steps = [
  { num: 1, title: 'Discovery', description: 'We learn your goals, users, and constraints in a 30-minute call.' },
  { num: 2, title: 'Proposal', description: 'Fixed-price proposal with scope, timeline, and deliverables within 48 hours.' },
  { num: 3, title: 'Build', description: 'Weekly updates and demos. You see progress, not silence.' },
  { num: 4, title: 'Launch', description: 'Deployment, handover, and 30 days of post-launch support included.' },
]

export function Process() {
  return (
    <SectionWrapper className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="text-center mb-16">How We Work</h2>
        </AnimatedChild>
        <div className="relative max-w-2xl mx-auto">
          {/* Connecting line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-sky-200 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <div className="space-y-12">
            {steps.map((step) => (
              <AnimatedChild key={step.num} className="relative flex gap-6">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 z-10">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </AnimatedChild>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
