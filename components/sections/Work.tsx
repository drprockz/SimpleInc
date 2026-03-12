'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { cardHover } from '@/lib/animations'

const projects = [
  {
    slug: 'tailoring-shop-erp',
    title: 'Tailoring Shop ERP',
    summary: 'Custom order management system replacing WhatsApp chaos with digital tracking.',
    stack: ['Next.js', 'PostgreSQL', 'Prisma', 'WhatsApp API'],
  },
  {
    slug: 'mechanical-keyboard-ecommerce',
    title: 'Keyboard E-Commerce Store',
    summary: 'Shopify store with automated social media content pipeline.',
    stack: ['Shopify', 'Node.js', 'Meta Graph API'],
  },
  {
    slug: 'saas-membership-platform',
    title: 'SaaS Membership Platform',
    summary: 'Multi-tenant platform for sports club membership management.',
    stack: ['React', 'NestJS', 'PostgreSQL', 'Docker'],
  },
]

export function Work() {
  return (
    <SectionWrapper className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="mb-12">Recent Work</h2>
        </AnimatedChild>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <AnimatedChild key={project.slug}>
              <motion.div whileHover={cardHover}>
                <Link
                  href={`/work/${project.slug}`}
                  className="block bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Placeholder thumbnail */}
                  <div className="h-40 bg-gradient-to-br from-sky-100 to-sky-200" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatedChild>
          ))}
        </div>

        <AnimatedChild className="mt-10">
          <Link
            href="/work"
            className="text-sky-500 font-medium hover:text-sky-600 transition-colors"
          >
            See all projects →
          </Link>
        </AnimatedChild>
      </div>
    </SectionWrapper>
  )
}
