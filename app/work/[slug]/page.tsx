import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { generateMeta } from '@/lib/metadata'
import { getAllProjects, getProjectBySlug } from '@/lib/work'
import { JsonLd } from '@/components/seo/JsonLd'
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/schema'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return generateMeta({
    title: project.metaTitle,
    description: project.metaDescription,
    path: `/work/${project.slug}`,
  })
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const articleSchema = createArticleSchema({
    title: project.title,
    description: project.summary,
    slug: project.slug,
    datePublished: '2024-01-01',
    section: 'work',
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.simpleinc.in' },
    { name: 'Work', url: 'https://www.simpleinc.in/work' },
    {
      name: project.title.split(' — ')[0],
      url: `https://www.simpleinc.in/work/${project.slug}`,
    },
  ])

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="pt-32 md:pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <Link href="/" className="text-slate-500 hover:text-slate-700">
              Home
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link href="/work" className="text-slate-500 hover:text-slate-700">
              Work
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">
              {project.title.split(' — ')[0]}
            </span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {project.title}
          </h1>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
            <span>
              <strong>Client:</strong> {project.client}
            </span>
            <span>
              <strong>Duration:</strong> {project.duration}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-12">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {/* The Problem */}
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Problem
          </h2>
          <p className="text-slate-600 leading-relaxed mb-12">
            {project.problem}
          </p>

          {/* The Solution */}
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Solution
          </h2>
          <p className="text-slate-600 leading-relaxed mb-12">
            {project.solution}
          </p>

          {/* The Result */}
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Result</h2>
          <p className="text-slate-600 leading-relaxed mb-12">
            {project.result}
          </p>

          {/* CTA */}
          <div className="bg-slate-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Need something similar?
            </h3>
            <p className="text-slate-600 mb-6">Let&apos;s discuss your project.</p>
            <Button href="/contact">Start a Conversation</Button>
          </div>
        </div>
      </section>
    </>
  )
}
