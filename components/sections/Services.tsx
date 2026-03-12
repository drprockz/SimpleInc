'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { cardHover } from '@/lib/animations'

const services = [
  {
    title: 'SaaS & Web Applications',
    description:
      'Multi-tenant platforms, CRMs, dashboards, and admin panels. Built with React, NestJS, and PostgreSQL.',
    href: '/services/web-app-development',
    icon: '⚡',
  },
  {
    title: 'Custom Websites',
    description:
      'Fast, SEO-optimised business websites built with Next.js, WordPress, or PHP.',
    href: '/services/website-development',
    icon: '🌐',
  },
  {
    title: 'AI-Powered Solutions',
    description:
      'Intelligent features, automation, and AI integrations built into your existing or new products.',
    href: '/services/ai-development',
    icon: '🤖',
  },
  {
    title: 'CMS & E-Commerce',
    description:
      'WordPress, Shopify, Wix — content-managed sites and online stores that convert.',
    href: '/services/cms-ecommerce',
    icon: '🛒',
  },
]

export function Services() {
  return (
    <SectionWrapper className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="text-center mb-12">What We Build</h2>
        </AnimatedChild>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <AnimatedChild key={service.href}>
              <motion.div whileHover={cardHover}>
                <Link
                  href={service.href}
                  className="block bg-white border border-slate-200 rounded-lg p-6 h-full hover:border-l-4 hover:border-l-sky-500 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-xl mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-block mt-4 text-sky-500 text-sm font-medium">
                    Learn more →
                  </span>
                </Link>
              </motion.div>
            </AnimatedChild>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
