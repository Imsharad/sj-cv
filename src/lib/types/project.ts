export interface ProjectFrontmatter {
  title: string
  slug?: string
  summary: string
  techStack: string[]
  role?: string
  timeframe?: string
  githubUrl?: string
  liveUrl?: string
  heroImage?: {
    src: string
    alt: string
  }
  highlightMetric?: {
    label: string
    value: string
  }
}

export interface ProjectDetail extends ProjectFrontmatter {
  slug: string
  content: string
}
