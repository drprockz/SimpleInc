import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  author: string
  content: string
}

const blogDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return []

  const fileNames = fs.readdirSync(blogDirectory)
  const posts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => {
      const filePath = path.join(blogDirectory, name)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug: data.slug || name.replace('.mdx', ''),
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author || 'Darshan Parmar',
        content,
      } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug)
}
