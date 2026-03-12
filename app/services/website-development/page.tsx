import { generateMeta } from '@/lib/metadata'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata = generateMeta({
  title: 'Custom Web Development Services in Mumbai',
  description:
    'Professional web development in Mumbai using React, Next.js and Node.js. Custom-built, mobile-first, SEO-ready websites for startups and growing businesses.',
  path: '/services/website-development',
})

const deliverables = [
  'Custom-designed, mobile-first website',
  'SEO-optimised pages with proper meta tags',
  'Fast loading speeds (90+ PageSpeed score)',
  'Contact forms with email notifications',
  'Google Analytics integration',
  'SSL certificate and security setup',
  'Content management training',
  '30 days post-launch support',
]

const targetClients = [
  'Startups needing a professional web presence',
  'Small businesses replacing outdated websites',
  'Consultants and freelancers building personal brands',
  'Companies launching new products or services',
  'Agencies needing white-label website development',
]

const processSteps = [
  {
    title: 'Discovery & Planning',
    description:
      'We understand your business, target audience, and goals. You receive a sitemap and content outline within a week.',
  },
  {
    title: 'Design & Content',
    description:
      'We create wireframes and visual designs. You provide content, or we help you write it. Design approval before coding begins.',
  },
  {
    title: 'Development',
    description:
      'We build your website with clean code, SEO best practices, and mobile responsiveness. You get a staging link to review.',
  },
  {
    title: 'Launch & Training',
    description:
      'We deploy to your domain, set up analytics, and train you on making updates. Ongoing support available.',
  },
]

const pricing =
  'Business websites typically range from Rs 50,000 to Rs 1,50,000 depending on the number of pages, custom features, and design complexity. We provide fixed-price quotes with no hidden fees.'

const faqs = [
  {
    question: 'How long does it take to build a business website?',
    answer:
      'A standard business website with 5-10 pages takes 2-4 weeks from start to launch. More complex sites with custom features or e-commerce integration can take 4-8 weeks.',
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer:
      'Yes. Every website we build is mobile-first and fully responsive. Over 60% of web traffic comes from mobile devices, so this is non-negotiable.',
  },
  {
    question: 'Do you help with content and copywriting?',
    answer:
      'We can guide you on content structure and provide copywriting recommendations. For full copywriting services, we work with trusted partners and can include this in your quote.',
  },
  {
    question: 'What about hosting and domain?',
    answer:
      'We recommend and set up hosting on Vercel or Netlify for static sites, or managed WordPress hosting for CMS sites. Domain registration is separate but we guide you through the process.',
  },
  {
    question: 'Can I update the website myself after launch?',
    answer:
      'Yes. For CMS-based sites, you get full access to add pages, edit content, and upload images. For code-based sites, we provide training or offer monthly maintenance plans.',
  },
  {
    question: 'Do you offer website maintenance?',
    answer:
      'Yes. Monthly maintenance retainers start at Rs 5,000/month covering updates, backups, security monitoring, and minor content changes. This ensures your site stays secure and up-to-date.',
  },
]

export default function WebsiteDevelopmentPage() {
  return (
    <ServicePageTemplate
      title="Business Website Development"
      intro="We build fast, professional websites that help businesses grow. Whether you need a simple landing page or a multi-page corporate site, we deliver clean design, solid code, and SEO that works."
      deliverables={deliverables}
      targetClients={targetClients}
      processSteps={processSteps}
      pricing={pricing}
      faqs={faqs}
    />
  )
}
