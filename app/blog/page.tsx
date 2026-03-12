import Link from 'next/link'
import { generateMeta } from '@/lib/metadata'
import { getAllPosts } from '@/lib/blog'

export const metadata = generateMeta({
  title: 'Blog — Web Development Insights | Simple Inc',
  description:
    'Articles on web development, SaaS building, AI integration, and running a development agency in India. By Darshan Parmar.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="pt-32 md:pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Blog
        </h1>
        <p className="text-lg text-slate-600 mb-12">
          Insights on building web applications, SaaS products, and running a
          development agency in Mumbai.
        </p>

        {posts.length === 0 ? (
          <p className="text-slate-500">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-slate-200 pb-8"
              >
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-500 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 mb-3">{post.description}</p>
                  <time className="text-sm text-slate-400">
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
