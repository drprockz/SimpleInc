import Link from 'next/link'
import { generateMeta } from '@/lib/metadata'
import { getAllProjects } from '@/lib/work'
import { Badge } from '@/components/ui/Badge'

export const metadata = generateMeta({
  title: 'Our Work — Case Studies',
  description:
    'Explore case studies from Simple Inc: custom web applications, SaaS platforms, e-commerce stores, and AI integrations built for businesses across India.',
  path: '/work',
})

export default function WorkPage() {
  const projects = getAllProjects()

  return (
    <section className="pt-32 md:pt-40 pb-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">
          Our Work
        </h1>
        <p className="text-lg text-[#a3a3a3] max-w-2xl mb-12">
          Case studies from real projects. See how we&apos;ve helped businesses
          across India build custom web applications, automate workflows, and
          grow online.
        </p>

        {projects.length === 0 ? (
          <p className="text-[#525252]">No projects yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="block bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-sky-500/15 to-indigo-500/10" />
                <div className="p-6">
                  <h2 className="text-lg font-bold text-[#f5f5f5] mb-2">
                    {project.title.split(' — ')[0]}
                  </h2>
                  <p className="text-sm text-[#a3a3a3] mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
