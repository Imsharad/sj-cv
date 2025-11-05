import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ProjectDetail, ProjectFrontmatter } from '@/lib/types/project'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
  const fullPath = path.join(projectsDirectory, slug, 'index.mdx')
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const frontmatter = data as Partial<ProjectFrontmatter>

  // Ensure required fields exist
  if (!frontmatter.title || !frontmatter.summary || !frontmatter.techStack) {
    console.warn(`Project ${slug} is missing required frontmatter fields`)
    return null
  }

  return {
    slug,
    title: frontmatter.title,
    summary: frontmatter.summary,
    techStack: Array.isArray(frontmatter.techStack) ? frontmatter.techStack : [],
    role: frontmatter.role,
    timeframe: frontmatter.timeframe,
    githubUrl: frontmatter.githubUrl,
    liveUrl: frontmatter.liveUrl,
    heroImage: frontmatter.heroImage,
    highlightMetric: frontmatter.highlightMetric,
    content,
  }
}

export function getAllProjects(): ProjectDetail[] {
  const slugs = getAllProjectSlugs()
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is ProjectDetail => project !== null)
  
  return projects
}
