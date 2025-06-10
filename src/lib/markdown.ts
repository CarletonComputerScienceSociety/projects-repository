import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type Project = {
  id: string
  title: string
  description: string
  author: string
  tags: string[]
  previewImageUrl?: string
  githubUrl: string
  liveUrl?: string
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
    previewImageUrl: data.previewImageUrl ? `/projects/${slug}/${data.previewImageUrl.replace("./", "")}` : undefined,
  } as Project
}

// export function getAllProjects(): Project[] {
//   const slugs = getProjectSlugs()
//   if (slugs.length < 2) return []

//   const project = getProjectBySlug(slugs[0])
//   const project2 = getProjectBySlug(slugs[1])

//   return Array.from({ length: 100 }, (_, i) => (i % 2 === 0 ? project : project2))
// }

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs()

  return slugs.map((slug) => getProjectBySlug(slug))
}
