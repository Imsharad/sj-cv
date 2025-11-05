import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function NotFound() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-4xl space-y-8 bg-white print:space-y-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/#projects' },
            { label: 'Not Found' },
          ]}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The project you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/#projects">Back to Projects</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
