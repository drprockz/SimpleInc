const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.simpleinc.in'

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Simple Inc',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  description:
    'Web development agency in Mumbai building custom web applications, SaaS products, dashboards, business websites, and AI-powered solutions.',
  email: 'darshan@simpleinc.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '19.0760',
    longitude: '72.8777',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '₹₹',
  sameAs: [
    'https://linkedin.com/in/darshan-parmar',
    'https://github.com/darshanparmar',
  ],
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Simple Inc',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  founder: {
    '@type': 'Person',
    name: 'Darshan Parmar',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Darshan Parmar',
  jobTitle: 'Founder & Lead Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Simple Inc',
    url: siteUrl,
  },
  url: `${siteUrl}/about`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'WordPress',
    'Shopify',
    'SaaS Development',
    'PostgreSQL',
    'AI Integration',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Simple Inc',
  url: siteUrl,
}

export function createFaqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function createArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  section,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  section: 'blog' | 'work'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteUrl}/${section}/${slug}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: 'Darshan Parmar',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Simple Inc',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
  }
}

export function createBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
