import { Button } from '@/components/ui/Button'
import { GradientOrbs } from '@/components/effects/GradientOrbs'
import { MagneticButton } from '@/components/interactive/MagneticButton'

export default function NotFound() {
  return (
    <section className="pt-32 md:pt-40 pb-20 min-h-[60vh] flex items-center bg-[#0a0a0a] bg-dot-grid relative">
      <GradientOrbs variant="default" />
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="mb-4">Page Not Found</h1>
        <p className="text-lg text-[#a3a3a3] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton>
            <Button href="/">Go Home</Button>
          </MagneticButton>
          <Button href="/services" variant="outline">View Services</Button>
        </div>
      </div>
    </section>
  )
}
