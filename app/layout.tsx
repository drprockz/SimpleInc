import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { JsonLd } from '@/components/seo/JsonLd'
import { websiteSchema } from '@/lib/schema'
import { MotionProvider } from '@/components/layout/MotionProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.simpleinc.in'
  ),
  title: {
    default: 'Simple Inc — Web Development Agency in Mumbai',
    template: '%s | Simple Inc',
  },
  description:
    'Simple Inc is a Mumbai-based development agency building custom web applications, SaaS products, dashboards, and business websites.',
  openGraph: {
    siteName: 'Simple Inc',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd data={websiteSchema} />
      </head>
      <body className="font-sans text-slate-800 bg-white antialiased">
        <MotionProvider>
          {children}
        </MotionProvider>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
