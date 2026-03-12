'use client'

import { Button } from '@/components/ui/Button'
import { StatCounter } from '@/components/ui/StatCounter'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'

export function Hero() {
  return (
    <SectionWrapper className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AnimatedChild>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          We Build Web Apps &amp; SaaS{' '}
          <br className="hidden md:block" />
          Products That{' '}
          <span className="text-sky-500">Scale</span>
        </h1>
      </AnimatedChild>

      <AnimatedChild className="mt-6 max-w-2xl">
        <p className="text-lg text-slate-600 leading-relaxed">
          Simple Inc is a Mumbai-based development agency specialising in custom
          web applications, SaaS platforms, dashboards, and business websites.
        </p>
      </AnimatedChild>

      <AnimatedChild className="mt-8 flex flex-wrap gap-4">
        <Button href="/contact">Start a Project</Button>
        <Button href="/work" variant="outline">
          See Our Work
        </Button>
      </AnimatedChild>

      <AnimatedChild className="mt-16 flex gap-12 md:gap-20">
        <StatCounter target={5} suffix="+" label="Years Experience" />
        <StatCounter target={35} suffix="+" label="Projects Delivered" />
        <StatCounter target={50} suffix="+" label="Clients Served" />
      </AnimatedChild>
    </SectionWrapper>
  )
}
