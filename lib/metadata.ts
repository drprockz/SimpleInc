import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.simpleinc.in'

export function generateMeta({
  title,
  description,
  path = '',
  ogImage = '/og-image.jpg',
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteUrl}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Simple Inc',
      images: [{ url: `${siteUrl}${ogImage}`, width: 1200, height: 630 }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}${ogImage}`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
