'use client'

import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'

const reasons = [
  {
    icon: '💬',
    title: 'No Middlemen',
    description: 'Talk directly to the engineers building your product. No account managers. No hand-offs.',
  },
  {
    icon: '✅',
    title: 'Production-Ready Code',
    description: 'Clean, documented, deployable. Not a prototype you will need to rebuild later.',
  },
  {
    icon: '🔧',
    title: 'Full-Stack In-House',
    description: 'Frontend, backend, database, DevOps, and AI — one team, one engagement.',
  },
  {
    icon: '📍',
    title: 'Mumbai-Based, India-Wide',
    description: 'Available IST hours. Clients across Mumbai, India, UAE, and the UK.',
  },
]

export function WhyUs() {
  return (
    <SectionWrapper className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="text-center mb-12">Why Teams Choose Simple Inc</h2>
        </AnimatedChild>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason) => (
            <AnimatedChild key={reason.title}>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{reason.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </AnimatedChild>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
