import { generateMeta } from '@/lib/metadata'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata = generateMeta({
  title: 'CMS & E-Commerce Development in Mumbai | WordPress, Shopify',
  description:
    'WordPress, Shopify, and WooCommerce development in Mumbai. Custom themes, e-commerce stores, content-managed sites that convert visitors into customers.',
  path: '/services/cms-ecommerce',
})

const deliverables = [
  'Custom WordPress or Shopify theme',
  'E-commerce store setup and configuration',
  'Payment gateway integration',
  'Product catalog and inventory management',
  'SEO optimization for product and category pages',
  'Email marketing integration',
  'Training on CMS and store management',
  '30 days post-launch support',
]

const targetClients = [
  'Retail businesses launching online stores',
  'Content publishers needing easy updates',
  'Small businesses wanting to sell products online',
  'Companies migrating from older e-commerce platforms',
  'Agencies needing white-label CMS development',
]

const processSteps = [
  {
    title: 'Requirements & Platform Selection',
    description:
      'We assess your needs and recommend WordPress, Shopify, or WooCommerce based on your products, budget, and growth plans.',
  },
  {
    title: 'Design & Customization',
    description:
      'We design your store or site, customize themes, and set up your product catalog or content structure.',
  },
  {
    title: 'Integration & Testing',
    description:
      'We integrate payments, shipping, and third-party tools. Thorough testing ensures everything works before launch.',
  },
  {
    title: 'Launch & Training',
    description:
      'We launch your site, train you on managing content and orders, and provide ongoing support options.',
  },
]

const pricing =
  'WordPress websites start at Rs 40,000. Shopify stores start at Rs 60,000. WooCommerce stores with custom features range from Rs 75,000 to Rs 2,00,000. We provide detailed quotes after understanding your catalog size and integration needs.'

const faqs = [
  {
    question: 'Should I choose WordPress or Shopify for my store?',
    answer:
      'Shopify is better for pure e-commerce with simple products and fast setup. WordPress with WooCommerce offers more flexibility and lower ongoing costs but requires more technical management. We help you choose based on your specific situation.',
  },
  {
    question: 'Do you build custom WordPress themes?',
    answer:
      'Yes. We build custom themes from scratch using modern WordPress development practices — ACF, custom post types, REST API, and block editor support. No bloated page builders unless you specifically need them.',
  },
  {
    question: 'Can you migrate my existing store to a new platform?',
    answer:
      'Yes. We handle migrations from WooCommerce to Shopify, Magento to WooCommerce, or any other platform combination. This includes product data, customer accounts, and order history where possible.',
  },
  {
    question: 'Do you handle Shopify Liquid theme development?',
    answer:
      'Yes. We build custom Shopify themes using Liquid templating. This includes section-based themes, custom product pages, and app integrations.',
  },
  {
    question: 'What about ongoing maintenance and updates?',
    answer:
      'We offer monthly maintenance plans starting at Rs 5,000/month covering plugin updates, security monitoring, backups, and minor changes. For Shopify, this covers theme updates and app management.',
  },
  {
    question: 'Can you integrate with my existing inventory system?',
    answer:
      'Yes. We integrate e-commerce platforms with ERP systems, inventory management tools, and accounting software. Common integrations include Tally, Zoho, and custom inventory APIs.',
  },
]

export default function CMSEcommercePage() {
  return (
    <ServicePageTemplate
      title="CMS & E-Commerce Development"
      intro="We build content-managed websites and online stores that are easy to update and designed to convert. WordPress for flexibility, Shopify for simplicity, WooCommerce for control. Your choice, our expertise."
      deliverables={deliverables}
      targetClients={targetClients}
      processSteps={processSteps}
      pricing={pricing}
      faqs={faqs}
    />
  )
}
