'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { StatCounter } from '@/components/ui/StatCounter'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { GradientOrbs } from '@/components/effects/GradientOrbs'
import { TextReveal } from '@/components/interactive/TextReveal'
import { MagneticButton } from '@/components/interactive/MagneticButton'

const ParticleGrid = dynamic(
  () => import('@/components/effects/ParticleGrid').then(mod => ({ default: mod.ParticleGrid })),
  { ssr: false }
)

export function Hero() {
  return (
    <SectionWrapper className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0a0a0a] bg-dot-grid relative">
      <GradientOrbs variant="hero" />
      <ParticleGrid />

      <div className="relative z-10">
        <AnimatedChild>
          <Image src="/logo.png" alt="Simple Inc" width={180} height={54} className="brightness-0 invert mb-6" />
        </AnimatedChild>

        <AnimatedChild>
          <TextReveal
            text="We Build Web Apps That Scale"
            as="h1"
            mode="word"
            highlightLastWords={1}
            highlightClassName="text-sky-500"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          />
        </AnimatedChild>

        <AnimatedChild className="mt-6 max-w-2xl">
          <p className="text-lg text-[#a3a3a3] leading-relaxed">
            Simple Inc is a Mumbai-based development agency specialising in custom
            web applications, SaaS platforms, dashboards, and business websites.
          </p>
        </AnimatedChild>

        <AnimatedChild className="mt-8 flex flex-wrap gap-4">
          <MagneticButton>
            <Button href="/contact">Start a Project</Button>
          </MagneticButton>
          <Button href="/work" variant="outline">
            See Our Work
          </Button>
        </AnimatedChild>

        <AnimatedChild className="mt-16 flex gap-12 md:gap-20">
          <StatCounter target={5} suffix="+" label="Years Experience" />
          <StatCounter target={35} suffix="+" label="Projects Delivered" />
          <StatCounter target={50} suffix="+" label="Clients Served" />
        </AnimatedChild>
      </div>
    </SectionWrapper>
  )
}
