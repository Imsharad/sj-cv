import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/mdx-loader'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, Github, Target, AlertTriangle, CheckCircle, Settings, TrendingUp, Lightbulb, Award, BarChart3, Users, Zap } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

// Helper function to extract metrics from project content
function extractKeyMetrics(content: string) {
  const metrics: Array<{metric: string, description: string, icon: string}> = []

  // Look for percentage metrics
  const percentageMatches = content.match(/(\d+)%[^.]*?([^.]+)/g) || []
  percentageMatches.slice(0, 2).forEach(match => {
    const [, percentage] = match.match(/(\d+)%/) || []
    const description = match.replace(`${percentage}%`, '').trim()
    if (percentage && description) {
      metrics.push({
        metric: `${percentage}%`,
        description: description.substring(0, 50) + '...',
        icon: '📈'
      })
    }
  })

  // Look for multiplier metrics (10x, 5x, etc.)
  const multiplierMatches = content.match(/(\d+)x[^.]*?([^.]+)/g) || []
  multiplierMatches.slice(0, 1).forEach(match => {
    const [, multiplier] = match.match(/(\d+)x/) || []
    const description = match.replace(`${multiplier}x`, '').trim()
    if (multiplier && description) {
      metrics.push({
        metric: `${multiplier}x`,
        description: description.substring(0, 50) + '...',
        icon: '⚡'
      })
    }
  })

  // Look for numerical achievements (1000+, 500+, etc.)
  const numberMatches = content.match(/(\d+)\+[^.]*?([^.]+)/g) || []
  numberMatches.slice(0, 1).forEach(match => {
    const [, number] = match.match(/(\d+)\+/) || []
    const description = match.replace(`${number}+`, '').trim()
    if (number && description) {
      metrics.push({
        metric: `${number}+`,
        description: description.substring(0, 50) + '...',
        icon: '🎯'
      })
    }
  })

  return metrics.slice(0, 3) // Return top 3 metrics
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Sharad Jain`,
    description: project.summary,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const keyMetrics = extractKeyMetrics(project.content)

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-4xl space-y-8 bg-white print:space-y-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/#projects' },
            { label: project.title },
          ]}
        />

        {/* Hero Section */}
        <div className="space-y-6">
          {/* Project Title & Info */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {project.title}
            </h1>
            {(project.role || project.timeframe) && (
              <p className="text-muted-foreground font-mono text-sm">
                {project.role && <span>{project.role}</span>}
                {project.role && project.timeframe && <span> • </span>}
                {project.timeframe && <span>{project.timeframe}</span>}
              </p>
            )}
          </div>

          {/* Key Metrics Dashboard */}
          {keyMetrics.length > 0 && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Key Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {keyMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-2xl">{metric.icon}</span>
                      <div>
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                          {metric.metric}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {metric.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Tech Stack */}
          <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                🛠️ Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => {
                  // Color coding for different tech types
                  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary"
                  let extraClasses = ""

                  if (tech.toLowerCase().includes('ai') || tech.toLowerCase().includes('llm') || tech.toLowerCase().includes('claude')) {
                    variant = "default"
                    extraClasses = "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200"
                  } else if (tech.toLowerCase().includes('lang') || tech.toLowerCase().includes('graph') || tech.toLowerCase().includes('chain')) {
                    extraClasses = "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200"
                  } else if (tech.toLowerCase().includes('api') || tech.toLowerCase().includes('sql') || tech.toLowerCase().includes('vertex')) {
                    extraClasses = "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
                  } else if (tech.toLowerCase().includes('agent') || tech.toLowerCase().includes('multi')) {
                    extraClasses = "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200"
                  }

                  return (
                    <Badge
                      key={tech}
                      variant={variant}
                      className={`
                        ${extraClasses}
                        hover:scale-105 transition-transform duration-200
                        font-medium shadow-sm hover:shadow-md
                        animation-delay-${index * 100}
                      `}
                    >
                      {tech}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 size-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="outline" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 size-4" />
                  View Live
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <Section>
          <div className="space-y-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children, ...props }) => {
                  const text = children?.toString().toLowerCase() || ''
                  let sectionClass = "border-l-4 pl-4 py-3 rounded-r-lg"
                  let iconClass = "w-5 h-5 inline-block mr-2"
                  let icon = null

                  if (text.includes('overview')) {
                    sectionClass += " border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                    icon = <Target className={iconClass + " text-blue-600"} />
                  } else if (text.includes('problem')) {
                    sectionClass += " border-red-500 bg-red-50 dark:bg-red-950/20"
                    icon = <AlertTriangle className={iconClass + " text-red-600"} />
                  } else if (text.includes('solution')) {
                    sectionClass += " border-green-500 bg-green-50 dark:bg-green-950/20"
                    icon = <CheckCircle className={iconClass + " text-green-600"} />
                  } else if (text.includes('technical')) {
                    sectionClass += " border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                    icon = <Settings className={iconClass + " text-purple-600"} />
                  } else if (text.includes('results')) {
                    sectionClass += " border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                    icon = <TrendingUp className={iconClass + " text-orange-600"} />
                  } else if (text.includes('learnings')) {
                    sectionClass += " border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                    icon = <Lightbulb className={iconClass + " text-yellow-600"} />
                  } else {
                    sectionClass += " border-gray-300 bg-gray-50 dark:bg-gray-800/20"
                  }

                  return (
                    <Card className="mb-6">
                      <CardContent className="pt-4">
                        <div className={sectionClass}>
                          <h2 className="text-2xl font-bold mb-4 flex items-center" {...props}>
                            {icon}
                            {children}
                          </h2>
                        </div>
                      </CardContent>
                    </Card>
                  )
                },
                h3: ({ children, ...props }) => (
                  <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200" {...props}>
                    {children}
                  </h3>
                ),
                p: ({ children, ...props }) => {
                  // Special handling for Challenge/Resolution paragraphs
                  const text = children?.toString() || ''
                  if (text.includes('Challenge:') && text.includes('Resolution:')) {
                    const parts = text.split('Resolution:')
                    const challenge = parts[0].replace('Challenge:', '').trim()
                    const resolution = parts[1].trim()

                    return (
                      <div className="grid md:grid-cols-2 gap-4 mb-6" {...props}>
                        <Card className="p-4 border-red-200 bg-red-50 dark:bg-red-950/20">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Challenge</h4>
                              <p className="text-red-700 dark:text-red-300 text-sm">{challenge}</p>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4 border-green-200 bg-green-50 dark:bg-green-950/20">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Resolution</h4>
                              <p className="text-green-700 dark:text-green-300 text-sm">{resolution}</p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )
                  }

                  return (
                    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props}>
                      {children}
                    </p>
                  )
                },
                ul: ({ children, ...props }) => {
                  // Check if this is in a Results section by looking at previous h2
                  const isResultsList = typeof window !== 'undefined' && document.querySelector('h2[data-results="true"]')

                  if (isResultsList) {
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {children}
                      </div>
                    )
                  }

                  return (
                    <ul className="mb-4 space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300" {...props}>
                      {children}
                    </ul>
                  )
                },
                li: ({ children, ...props }) => {
                  // Enhanced list items for Results section
                  const childText = children?.toString() || ''
                  const hasMetrics = /\d+%|\d+x|\d+\+/.test(childText)

                  if (hasMetrics) {
                    // Extract metrics and create card layout
                    const metricMatch = childText.match(/(\d+%|\d+x|\d+\+)/)
                    const metric = metricMatch ? metricMatch[1] : ''
                    const description = childText.replace(metric, '').trim()

                    let icon = <BarChart3 className="w-6 h-6 text-blue-600" />
                    if (childText.toLowerCase().includes('satisfaction') || childText.toLowerCase().includes('user')) {
                      icon = <Users className="w-6 h-6 text-green-600" />
                    } else if (childText.toLowerCase().includes('reduction') || childText.toLowerCase().includes('faster')) {
                      icon = <Zap className="w-6 h-6 text-orange-600" />
                    } else if (childText.toLowerCase().includes('accuracy') || childText.toLowerCase().includes('success')) {
                      icon = <Award className="w-6 h-6 text-purple-600" />
                    }

                    return (
                      <Card className="p-4 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-start space-x-3">
                          {icon}
                          <div className="flex-1">
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                              {metric}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {description}
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  }

                  return (
                    <li className="ml-4 flex items-start space-x-2" {...props}>
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{children}</span>
                    </li>
                  )
                },
                strong: ({ children, ...props }) => (
                  <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>
                    {children}
                  </strong>
                ),
              }}
            >
              {project.content}
            </ReactMarkdown>
          </div>
        </Section>
      </section>
    </main>
  )
}
