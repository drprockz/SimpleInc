import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { generateMeta } from '@/lib/metadata'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { JsonLd } from '@/components/seo/JsonLd'
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/schema'
import { Button } from '@/components/ui/Button'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return generateMeta({
    title: `${post.title} | Simple Inc`,
    description: post.description,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.simpleinc.in'

  const articleSchema = createArticleSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    datePublished: post.date,
    section: 'blog',
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: post.title, url: `${siteUrl}/blog/${post.slug}` },
  ])

  // Parse MDX content into sections
  const sections = parseContent(post.content)

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="pt-32 md:pt-40 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <Link href="/" className="text-slate-500 hover:text-slate-700">
              Home
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link href="/blog" className="text-slate-500 hover:text-slate-700">
              Blog
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">
              {post.title.length > 30
                ? `${post.title.substring(0, 30)}...`
                : post.title}
            </span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mb-12">
            <time className="text-slate-500">
              {new Date(post.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">By {post.author}</span>
          </div>

          {/* Content */}
          <div className="prose prose-slate prose-lg max-w-none mb-16">
            {sections.map((section, i) => (
              <ContentSection key={i} section={section} />
            ))}
          </div>

          {/* Author */}
          <div className="bg-slate-50 rounded-lg p-6 mb-12">
            <p className="text-sm text-slate-600">
              Written by <strong>{post.author}</strong>, founder of Simple Inc,
              Mumbai. Building custom web applications, SaaS products, and
              AI-powered solutions for businesses across India.
            </p>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Related Articles
              </h2>
              <div className="space-y-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="block p-4 border border-slate-200 rounded-lg hover:border-sky-500 transition-colors"
                  >
                    <h3 className="font-bold text-slate-900">{related.title}</h3>
                    <p className="text-sm text-slate-600">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8">
            <p className="text-lg text-slate-700 mb-4">
              Need help building your web application?
            </p>
            <Button href="/contact">Get in Touch</Button>
          </div>
        </div>
      </article>
    </>
  )
}

type ContentSection = {
  type: 'heading' | 'paragraph' | 'list' | 'table'
  level?: number
  content: string
  items?: string[]
  rows?: string[][]
}

function parseContent(content: string): ContentSection[] {
  const lines = content.split('\n')
  const sections: ContentSection[] = []
  let currentParagraph: string[] = []
  let inTable = false
  let tableRows: string[][] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim()
      if (text) {
        sections.push({ type: 'paragraph', content: text })
      }
      currentParagraph = []
    }
  }

  const flushTable = () => {
    if (tableRows.length > 0) {
      sections.push({ type: 'table', content: '', rows: tableRows })
      tableRows = []
      inTable = false
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Skip empty lines
    if (!trimmed) {
      flushParagraph()
      if (inTable) flushTable()
      continue
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      if (inTable) flushTable()
      sections.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2],
      })
      continue
    }

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushParagraph()
      // Skip separator rows
      if (trimmed.match(/^\|[\s-:|]+\|$/)) {
        continue
      }
      inTable = true
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim())
      tableRows.push(cells)
      continue
    }

    // List items
    if (trimmed.match(/^[-*]\s+/)) {
      flushParagraph()
      if (inTable) flushTable()
      const listContent = trimmed.replace(/^[-*]\s+/, '')
      // Check if last section is a list, add to it
      if (sections.length > 0 && sections[sections.length - 1].type === 'list') {
        sections[sections.length - 1].items!.push(listContent)
      } else {
        sections.push({ type: 'list', content: '', items: [listContent] })
      }
      continue
    }

    // Regular paragraph content
    if (inTable) flushTable()
    currentParagraph.push(trimmed)
  }

  flushParagraph()
  if (inTable) flushTable()

  return sections
}

function ContentSection({ section }: { section: ContentSection }) {
  switch (section.type) {
    case 'heading':
      if (section.level === 2) {
        return (
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            {section.content}
          </h2>
        )
      }
      if (section.level === 3) {
        return (
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
            {section.content}
          </h3>
        )
      }
      return <h4 className="text-lg font-bold text-slate-900 mt-6 mb-2">{section.content}</h4>

    case 'paragraph':
      return (
        <p className="text-slate-600 leading-relaxed mb-4">
          {formatInlineContent(section.content)}
        </p>
      )

    case 'list':
      return (
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600">
          {section.items?.map((item, i) => (
            <li key={i}>{formatInlineContent(item)}</li>
          ))}
        </ul>
      )

    case 'table':
      if (!section.rows || section.rows.length === 0) return null
      const [header, ...body] = section.rows
      return (
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100">
                {header.map((cell, i) => (
                  <th
                    key={i}
                    className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-900"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border border-slate-200 px-4 py-2 text-slate-600"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    default:
      return null
  }
}

function formatInlineContent(text: string): React.ReactNode {
  // Handle bold text with **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      )
    }
    // Handle links [text](url)
    const linkParts = part.split(/(\[[^\]]+\]\([^)]+\))/g)
    return linkParts.map((linkPart, j) => {
      const linkMatch = linkPart.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch) {
        return (
          <Link
            key={`${i}-${j}`}
            href={linkMatch[2]}
            className="text-sky-500 hover:text-sky-600 underline"
          >
            {linkMatch[1]}
          </Link>
        )
      }
      return linkPart
    })
  })
}
