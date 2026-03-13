'use client'

import { Button } from '@/components/ui/Button'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { GradientOrbs } from '@/components/effects/GradientOrbs'
import { MagneticButton } from '@/components/interactive/MagneticButton'

export function CTA() {
  return (
    <SectionWrapper className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      <GradientOrbs variant="cta" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedChild>
          <h2 className="text-white mb-4">Ready to Build Something?</h2>
        </AnimatedChild>
        <AnimatedChild>
          <p className="text-[#a3a3a3] text-lg mb-8">
            Tell us what you are working on. We will send a proposal within 48 hours.
          </p>
        </AnimatedChild>
        <AnimatedChild>
          <MagneticButton>
            <Button href="/contact">Start the Conversation</Button>
          </MagneticButton>
        </AnimatedChild>
      </div>
    </SectionWrapper>
  )
}
