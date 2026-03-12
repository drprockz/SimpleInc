import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="pt-32 md:pt-40 pb-20 min-h-[60vh] flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="mb-4">Page Not Found</h1>
        <p className="text-lg text-slate-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/">Go Home</Button>
          <Button href="/services" variant="outline">View Services</Button>
        </div>
      </div>
    </section>
  )
}
