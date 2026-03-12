import { generateMeta } from '@/lib/metadata'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata = generateMeta({
  title: 'AI-Powered Features & Integrations in Mumbai',
  description:
    'Add AI capabilities to your products. Chatbots, content generation, intelligent search, and automation. OpenAI, Claude, and custom ML integrations by experienced developers.',
  path: '/services/ai-development',
})

const deliverables = [
  'AI feature integration into existing products',
  'Custom chatbots and conversational interfaces',
  'Intelligent search and recommendation systems',
  'Content generation and automation tools',
  'Document analysis and extraction',
  'API integration with OpenAI, Claude, and other providers',
  'Prompt engineering and optimization',
  'Usage monitoring and cost management',
]

const targetClients = [
  'Startups adding AI features to differentiate their product',
  'Businesses automating repetitive knowledge work',
  'Companies building AI-powered customer support',
  'Teams needing intelligent document processing',
  'Agencies wanting AI tools for their workflows',
]

const processSteps = [
  {
    title: 'Use Case Analysis',
    description:
      'We identify where AI can add real value to your product or workflow. Not every problem needs AI — we focus on high-impact applications.',
  },
  {
    title: 'Proof of Concept',
    description:
      'We build a working prototype to validate the approach. You see results before committing to full development.',
  },
  {
    title: 'Production Integration',
    description:
      'We integrate the AI features into your existing system with proper error handling, fallbacks, and monitoring.',
  },
  {
    title: 'Optimization & Handover',
    description:
      'We optimize prompts for cost and quality, set up usage monitoring, and document everything for your team.',
  },
]

const pricing =
  'AI integration projects typically range from Rs 75,000 to Rs 3,00,000 depending on complexity. Simple chatbot integrations start lower. Custom AI features with fine-tuning cost more. We always start with a paid discovery phase to define scope.'

const faqs = [
  {
    question: 'Which AI providers do you work with?',
    answer:
      'We integrate with OpenAI (GPT-4), Anthropic (Claude), Google (Gemini), and open-source models. We recommend the best fit based on your use case, budget, and data privacy requirements.',
  },
  {
    question: 'Can you add AI to our existing application?',
    answer:
      'Yes. Most of our AI work involves adding intelligent features to existing products. We integrate via APIs without requiring major changes to your architecture.',
  },
  {
    question: 'How do you handle data privacy with AI?',
    answer:
      'We follow best practices for data privacy. This includes using API providers with enterprise data agreements, avoiding sending sensitive data when possible, and implementing data anonymization where needed.',
  },
  {
    question: 'What about AI costs and usage limits?',
    answer:
      'We build with cost monitoring from day one. This includes usage dashboards, rate limiting, and optimization to reduce token usage. You never get surprised by a massive API bill.',
  },
  {
    question: 'Do you build custom AI models?',
    answer:
      'For most business applications, we use existing foundation models with custom prompts and fine-tuning. Building custom models from scratch is rarely cost-effective unless you have very specific requirements and significant training data.',
  },
  {
    question: 'How long does an AI integration project take?',
    answer:
      'A simple chatbot or content generation feature can be live in 2-4 weeks. More complex integrations with custom workflows take 4-8 weeks. We always start with a proof of concept.',
  },
]

export default function AIDevelopmentPage() {
  return (
    <ServicePageTemplate
      title="AI-Powered Features & Integrations"
      intro="We help businesses add AI capabilities that actually work. Chatbots that understand context, search that finds what users need, automation that saves hours of manual work. Built on proven APIs, integrated into your existing systems."
      deliverables={deliverables}
      targetClients={targetClients}
      processSteps={processSteps}
      pricing={pricing}
      faqs={faqs}
    />
  )
}
