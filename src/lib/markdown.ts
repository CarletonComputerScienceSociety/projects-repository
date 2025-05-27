import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type Project = {
  id: string
  title: string
  description: string
  author: string
  year: string
  tags: string[]
  hasUI: boolean
  image?: string
  githubUrl: string
  liveUrl?: string
  type: string
}

const projectRoot = path.join(process.cwd(), "content/projects")

export function getProjectSlugs(): string[] {
  return fs.readdirSync(projectRoot)
}

export function getProjectBySlug(slug: string): Project {
  const filePath = path.join(projectRoot, slug, "index.md")
  const file = fs.readFileSync(filePath, "utf-8")
  const { data } = matter(file)

  return {
    ...data,
    id: slug,
    image: data.image ? `/projects/${slug}/${data.image.replace("./", "")}` : undefined,
  } as Project
}

export function getAllProjects(): Project[] {
    const slugs = getProjectSlugs()

    if (slugs.length === 0) return []
    const project = getProjectBySlug(slugs[0])

    // TEMPORARY: Return a fixed number of projects for testing
    return Array(20).fill(project)
}
