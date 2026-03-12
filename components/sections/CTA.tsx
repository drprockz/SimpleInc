'use client'

import { Button } from '@/components/ui/Button'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'

export function CTA() {
  return (
    <SectionWrapper className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedChild>
          <h2 className="text-white mb-4">Ready to Build Something?</h2>
        </AnimatedChild>
        <AnimatedChild>
          <p className="text-slate-300 text-lg mb-8">
            Tell us what you are working on. We will send a proposal within 48 hours.
          </p>
        </AnimatedChild>
        <AnimatedChild>
          <Button href="/contact">Start the Conversation</Button>
        </AnimatedChild>
      </div>
    </SectionWrapper>
  )
}
