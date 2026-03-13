import { generateMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { localBusinessSchema } from '@/lib/schema'
import { ContactForm } from '@/components/ui/ContactForm'
import { SectionTransition } from '@/components/effects/SectionTransition'

export const metadata = generateMeta({
  title: 'Contact Simple Inc | Web Development Agency Mumbai',
  description:
    'Get in touch with Simple Inc for web applications, SaaS development, websites, or AI integration. Mumbai-based. Fast response guaranteed.',
  path: '/contact',
})

const nextSteps = [
  'You fill the form',
  'We review your brief and reply within 24 hours',
  'We schedule a 30-minute call to align on scope',
  'You receive a proposal within 48 hours',
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <section className="pt-32 md:pt-40 pb-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-16">Let&apos;s Build Together</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: info */}
            <div>
              <div className="space-y-4 mb-10">
                <p>
                  <a href="mailto:darshan@simpleinc.in" className="text-sky-500 hover:text-sky-600 font-medium">
                    darshan@simpleinc.in
                  </a>
                </p>
                <p className="text-[#a3a3a3]">Mumbai, Maharashtra, India</p>
                <p className="text-[#a3a3a3]">We reply within 24 hours on weekdays.</p>
                <p className="text-sm font-medium text-sky-400 bg-sky-500/10 inline-block px-3 py-1 rounded-full">
                  Currently accepting new projects
                </p>
              </div>

              <h3 className="text-lg font-bold text-[#f5f5f5] mb-4">What happens next</h3>
              <ol className="space-y-3">
                {nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-[#a3a3a3]">
                    <span className="w-6 h-6 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Right: form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
