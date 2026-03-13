'use client'

import { motion } from 'framer-motion'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { GradientOrbs } from '@/components/effects/GradientOrbs'

const steps = [
  { num: 1, title: 'Discovery', description: 'We learn your goals, users, and constraints in a 30-minute call.' },
  { num: 2, title: 'Proposal', description: 'Fixed-price proposal with scope, timeline, and deliverables within 48 hours.' },
  { num: 3, title: 'Build', description: 'Weekly updates and demos. You see progress, not silence.' },
  { num: 4, title: 'Launch', description: 'Deployment, handover, and 30 days of post-launch support included.' },
]

const circleColors = ['bg-sky-500', 'bg-indigo-500', 'bg-violet-500', 'bg-sky-500']
const circleGlows = [
  'shadow-[0_0_15px_rgba(14,165,233,0.3)]',
  'shadow-[0_0_15px_rgba(99,102,241,0.3)]',
  'shadow-[0_0_15px_rgba(139,92,246,0.3)]',
  'shadow-[0_0_15px_rgba(14,165,233,0.3)]',
]

export function Process() {
  return (
    <SectionWrapper className="py-20 bg-[#111111] bg-dot-grid relative">
      <GradientOrbs variant="default" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="text-center mb-16">How We Work</h2>
        </AnimatedChild>
        <div className="relative max-w-2xl mx-auto">
          {/* Connecting line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-violet-500 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <div className="space-y-12">
            {steps.map((step, index) => (
              <AnimatedChild key={step.num} className="relative flex gap-6">
                <div
                  className={`w-12 h-12 ${circleColors[index]} ${circleGlows[index]} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 z-10`}
                >
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-[#f5f5f5] mb-1">{step.title}</h3>
                  <p className="text-[#a3a3a3] leading-relaxed">{step.description}</p>
                </div>
              </AnimatedChild>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
