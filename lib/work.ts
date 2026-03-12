import fs from 'fs'
import path from 'path'

export type Project = {
  slug: string
  title: string
  client: string
  stack: string[]
  duration: string
  summary: string
  problem: string
  solution: string
  result: string
  metaTitle: string
  metaDescription: string
}

const workDirectory = path.join(process.cwd(), 'content/work')

export function getAllProjects(): Project[] {
  const fileNames = fs.readdirSync(workDirectory)
  return fileNames
    .filter((name) => name.endsWith('.json'))
    .map((name) => {
      const filePath = path.join(workDirectory, name)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContents) as Project
    })
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects()
  return projects.find((p) => p.slug === slug)
}
