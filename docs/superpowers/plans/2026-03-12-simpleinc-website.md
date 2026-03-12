# Simple Inc Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Simple Inc agency website — a production-grade, SEO-optimised Next.js 14 site with scroll-driven animations, page transitions, and comprehensive on-page SEO.

**Architecture:** Next.js 14 App Router with SSG for all pages. Tailwind CSS for styling, Framer Motion for animations and page transitions. Content is file-based (JSON for case studies, MDX for blog). Formspree for contact forms. JSON-LD structured data on every page.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, Playfair Display + Inter + JetBrains Mono (self-hosted via next/font), Formspree, next-sitemap, Google Analytics 4

**Spec:** `docs/superpowers/specs/2026-03-12-simpleinc-website-design.md`

---

## Chunk 1: Project Scaffolding & Foundation

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.js`, `next-sitemap.config.js`, `tailwind.config.js`, `tsconfig.json`, `.env.local`
- Create: `app/layout.tsx`, `app/page.tsx` (placeholder)

- [ ] **Step 1: Create Next.js 14 App Router project**

```bash
cd /home/darshanparmar/Projects/SimpleInc
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

If prompted about existing files, accept overwrite for config files only.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion next-sitemap sharp @next/bundle-analyzer
npm install -D @types/node
```

- [ ] **Step 3: Create next-sitemap.config.js**

```js
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.simpleinc.in',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/thank-you'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/thank-you'] },
    ],
  },
}
```

- [ ] **Step 4: Add postbuild script to package.json**

Add `"postbuild": "next-sitemap"` to the `scripts` section.

- [ ] **Step 5: Create .env.local**

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.simpleinc.in
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/XXXXXXXX
CONTACT_EMAIL=darshan@simpleinc.in
```

- [ ] **Step 6: Configure next.config.js**

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

- [ ] **Step 7: Create folder structure**

Create all directories that will be needed:

```bash
mkdir -p app/{about,contact,hire-us,services/{web-app-development,website-development,ai-development,cms-ecommerce},work/\[slug\],blog/\[slug\]}
mkdir -p components/{layout,sections,ui,seo}
mkdir -p content/{work,blog}
mkdir -p lib
mkdir -p public/images
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts at localhost:3000 without errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with dependencies and folder structure"
```

---

### Task 2: Design System Foundation — Fonts, Metadata, Schema, Animations

**Files:**
- Create: `lib/metadata.ts`
- Create: `lib/schema.ts`
- Create: `lib/animations.ts`
- Create: `components/seo/JsonLd.tsx`

- [ ] **Step 1: Create metadata factory — `lib/metadata.ts`**

```typescript
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
```

- [ ] **Step 2: Create JSON-LD schemas — `lib/schema.ts`**

```typescript
const siteUrl = 'https://www.simpleinc.in'

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
```

- [ ] **Step 3: Create shared animation variants — `lib/animations.ts`**

```typescript
import { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

export const cardHover = {
  y: -4,
  transition: { duration: 0.2, ease: 'easeOut' },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}
```

- [ ] **Step 4: Create JsonLd component — `components/seo/JsonLd.tsx`**

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add lib/ components/seo/
git commit -m "feat: add metadata factory, JSON-LD schemas, animation variants, and JsonLd component"
```

---

### Task 3: Root Layout — Fonts, GA4, Page Transitions

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/layout/PageTransition.tsx`
- Create: `app/template.tsx`

- [ ] **Step 1: Build root layout — `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { JsonLd } from '@/components/seo/JsonLd'
import { websiteSchema } from '@/lib/schema'
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
        {children}
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
```

- [ ] **Step 2: Create ReducedMotion provider**

Wraps the app in Framer Motion's `MotionConfig` to respect `prefers-reduced-motion` at the JS animation level (the CSS media query in globals.css only handles CSS animations, not Framer Motion).

```tsx
// components/layout/MotionProvider.tsx
'use client'

import { MotionConfig } from 'framer-motion'

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

Then wrap `{children}` in `app/layout.tsx` with `<MotionProvider>`:

```tsx
<body className="font-sans text-slate-800 bg-white antialiased">
  <MotionProvider>
    {children}
  </MotionProvider>
  {/* GA4 scripts */}
</body>
```

- [ ] **Step 3: Create page transition wrapper — `app/template.tsx`**

Next.js App Router's `template.tsx` re-mounts on navigation, making it the right place for page transitions.

```tsx
'use client'

import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/animations'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Update `tailwind.config.ts` to include font variables**

Extend the theme to map CSS variables to Tailwind font families:

```ts
// In tailwind.config.ts theme.extend:
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  display: ['var(--font-playfair)', 'Georgia', 'serif'],
  mono: ['var(--font-jetbrains)', 'monospace'],
},
```

- [ ] **Step 4: Update `app/globals.css`**

Keep Tailwind directives. Add base heading styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1, h2 {
    @apply font-display;
  }
  h1 {
    @apply text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight;
  }
  h2 {
    @apply text-3xl md:text-4xl font-bold text-slate-900;
  }
  h3 {
    @apply text-xl md:text-2xl font-bold text-slate-900 font-sans;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Verify dev server renders the layout**

```bash
npm run dev
```

Visit localhost:3000 — should see default Next.js page with Inter font applied. Check DevTools Network tab: no external Google Fonts requests (fonts self-hosted via next/font).

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/template.tsx app/globals.css tailwind.config.ts
git commit -m "feat: root layout with self-hosted fonts, GA4, page transitions, and Tailwind font config"
```

---

## Chunk 2: Layout Components

### Task 4: Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Build Navbar component**

The navbar must:
- Show "Simple" (black, font-bold) + "inc" (sky-500) as logo wordmark
- Nav links: Services, Work, Blog, About, Contact
- CTA button: "Start a Project" → /contact (sky-500 filled)
- Mobile: hamburger with Framer Motion animated menu
- Sticky on scroll: transparent at top, white bg + backdrop-blur when scrolled
- Active link highlighted with sky-500

```tsx
// components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-baseline">
          <span className="text-xl font-black text-slate-900">Simple</span>
          <span className="text-xl font-semibold text-sky-500">inc</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? 'text-sky-500'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-slate-900"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-slate-900"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-slate-900"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-2 ${
                    pathname.startsWith(link.href)
                      ? 'text-sky-500'
                      : 'text-slate-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-sky-500 text-white text-center font-semibold py-3 rounded-lg mt-2"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2: Verify in browser**

Import Navbar into layout.tsx, render above `{children}`. Check:
- Logo renders with sky-500 "inc"
- Links appear on desktop
- Hamburger works on mobile (resize browser)
- Scroll → navbar gains white bg + blur

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx app/layout.tsx
git commit -m "feat: add sticky Navbar with mobile menu, scroll blur, and active link highlighting"
```

---

### Task 5: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Build Footer component**

3-column layout: Services (links), Navigation (links), Contact (email, location). Social: LinkedIn, GitHub. Copyright. Dark background (slate-900).

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'

const serviceLinks = [
  { href: '/services/web-app-development', label: 'Web Applications' },
  { href: '/services/website-development', label: 'Websites' },
  { href: '/services/ai-development', label: 'AI Development' },
  { href: '/services/cms-ecommerce', label: 'CMS & E-Commerce' },
]

const navLinks = [
  { href: '/work', label: 'Our Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/hire-us', label: 'Hire Us' },
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-baseline mb-4">
              <span className="text-xl font-black text-white">Simple</span>
              <span className="text-xl font-semibold text-sky-500">inc</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Web development agency in Mumbai building web applications, SaaS products, and business websites.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/in/darshan-parmar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-sky-500 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/darshanparmar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-400 hover:text-sky-500 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:darshan@simpleinc.in"
                  className="hover:text-white transition-colors"
                >
                  darshan@simpleinc.in
                </a>
              </li>
              <li>Mumbai, Maharashtra, India</li>
              <li>Mon–Fri, 9 AM – 6 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Simple Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add Footer to layout.tsx**

Import and render below `{children}` in root layout.

- [ ] **Step 3: Verify footer renders correctly on all viewport sizes**

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx app/layout.tsx
git commit -m "feat: add Footer with service links, nav, contact info, and social links"
```

---

### Task 6: Shared UI Components

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/StatCounter.tsx`
- Create: `components/ui/Accordion.tsx`
- Create: `components/ui/SectionWrapper.tsx`

- [ ] **Step 1: Create Button component**

```tsx
// components/ui/Button.tsx
import Link from 'next/link'

type ButtonProps = {
  href: string
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
}

export function Button({
  href,
  variant = 'primary',
  children,
  className = '',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200'
  const variants = {
    primary: 'bg-sky-500 hover:bg-sky-600 text-white',
    outline: 'border-2 border-slate-200 hover:border-slate-300 text-slate-900',
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
```

- [ ] **Step 2: Create Badge component**

```tsx
// components/ui/Badge.tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-sky-100 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-md">
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Create StatCounter component**

```tsx
// components/ui/StatCounter.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type StatCounterProps = {
  target: number
  suffix?: string
  label: string
}

export function StatCounter({ target, suffix = '', label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 1500
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      start = Math.floor(eased * target)
      setCount(start)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  )
}
```

- [ ] **Step 4: Create Accordion component**

```tsx
// components/ui/Accordion.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AccordionItem = {
  question: string
  answer: string
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-slate-200">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-5 text-left"
          >
            <span className="text-base md:text-lg font-semibold text-slate-900 pr-4">
              {item.question}
            </span>
            <span className="text-sky-500 text-xl flex-shrink-0">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-slate-600 leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Create SectionWrapper component**

A reusable wrapper that applies `whileInView` fade-up animation to any section.

```tsx
// components/ui/SectionWrapper.tsx
'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

type SectionWrapperProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export function AnimatedChild({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/
git commit -m "feat: add shared UI components — Button, Badge, StatCounter, Accordion, SectionWrapper"
```

---

## Chunk 3: Homepage

### Task 7: Homepage Sections — Hero, Services, Work

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `components/sections/Services.tsx`
- Create: `components/sections/Work.tsx`

- [ ] **Step 1: Build Hero section**

```tsx
// components/sections/Hero.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { StatCounter } from '@/components/ui/StatCounter'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'

export function Hero() {
  return (
    <SectionWrapper className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AnimatedChild>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          We Build Web Apps &amp; SaaS{' '}
          <br className="hidden md:block" />
          Products That{' '}
          <span className="text-sky-500">Scale</span>
        </h1>
      </AnimatedChild>

      <AnimatedChild className="mt-6 max-w-2xl">
        <p className="text-lg text-slate-600 leading-relaxed">
          Simple Inc is a Mumbai-based development agency specialising in custom
          web applications, SaaS platforms, dashboards, and business websites.
        </p>
      </AnimatedChild>

      <AnimatedChild className="mt-8 flex flex-wrap gap-4">
        <Button href="/contact">Start a Project</Button>
        <Button href="/work" variant="outline">
          See Our Work
        </Button>
      </AnimatedChild>

      <AnimatedChild className="mt-16 flex gap-12 md:gap-20">
        <StatCounter target={5} suffix="+" label="Years Experience" />
        <StatCounter target={35} suffix="+" label="Projects Delivered" />
        <StatCounter target={50} suffix="+" label="Clients Served" />
      </AnimatedChild>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Build Services section**

```tsx
// components/sections/Services.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { cardHover } from '@/lib/animations'

const services = [
  {
    title: 'SaaS & Web Applications',
    description:
      'Multi-tenant platforms, CRMs, dashboards, and admin panels. Built with React, NestJS, and PostgreSQL.',
    href: '/services/web-app-development',
    icon: '⚡',
  },
  {
    title: 'Custom Websites',
    description:
      'Fast, SEO-optimised business websites built with Next.js, WordPress, or PHP.',
    href: '/services/website-development',
    icon: '🌐',
  },
  {
    title: 'AI-Powered Solutions',
    description:
      'Intelligent features, automation, and AI integrations built into your existing or new products.',
    href: '/services/ai-development',
    icon: '🤖',
  },
  {
    title: 'CMS & E-Commerce',
    description:
      'WordPress, Shopify, Wix — content-managed sites and online stores that convert.',
    href: '/services/cms-ecommerce',
    icon: '🛒',
  },
]

export function Services() {
  return (
    <SectionWrapper className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="text-center mb-12">What We Build</h2>
        </AnimatedChild>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <AnimatedChild key={service.href}>
              <motion.div whileHover={cardHover}>
                <Link
                  href={service.href}
                  className="block bg-white border border-slate-200 rounded-lg p-6 h-full hover:border-l-4 hover:border-l-sky-500 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-xl mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-block mt-4 text-sky-500 text-sm font-medium">
                    Learn more →
                  </span>
                </Link>
              </motion.div>
            </AnimatedChild>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Create case study data files**

Create 3 JSON files in `content/work/`:

**`content/work/tailoring-shop-erp.json`:**
```json
{
  "slug": "tailoring-shop-erp",
  "title": "Tailoring Shop ERP — Custom Order & Customer Management System",
  "client": "Independent tailoring business, Mumbai",
  "stack": ["Next.js 14", "PostgreSQL", "Prisma", "BullMQ", "WhatsApp API"],
  "duration": "8 weeks",
  "summary": "Built a full ERP for a tailoring shop replacing WhatsApp chaos and paper notebooks with a digital order tracking, measurement, and notification system.",
  "problem": "The client was managing 200+ active orders via WhatsApp messages and paper. Orders got lost. Delivery dates were missed. Customers had to call to check status. The owner spent 3+ hours daily just on follow-ups and status checks.",
  "solution": "We built a custom ERP with order management, customer profiles, measurement storage, automated WhatsApp and SMS status updates via BullMQ job queues, and a real-time dashboard showing the complete order pipeline. Each order moves through stages (received → measured → cutting → stitching → ready → delivered) with automatic customer notifications at each transition.",
  "result": "Zero missed orders since launch. Customer satisfaction measurably improved with real-time status updates. The owner spends 2 hours less per day on manual follow-ups. Repeat customer rate increased as the system now sends automated reminders for seasonal orders.",
  "metaTitle": "Tailoring Shop ERP Case Study | Next.js + WhatsApp API | Simple Inc",
  "metaDescription": "How Simple Inc built a custom order management ERP for a Mumbai tailoring business using Next.js, PostgreSQL, and WhatsApp automation."
}
```

**`content/work/mechanical-keyboard-ecommerce.json`:**
```json
{
  "slug": "mechanical-keyboard-ecommerce",
  "title": "Mechanical Keyboard E-Commerce — Shopify Store with Social Media Automation",
  "client": "Mumbai-based keyboard retailer",
  "stack": ["Shopify Liquid", "Node.js", "Meta Graph API", "Stable Diffusion"],
  "duration": "4 weeks",
  "summary": "Built a Shopify store and an automated content pipeline that generates and posts product content across Instagram and Facebook from a single product photo set.",
  "problem": "The client had 20 product photos and no bandwidth to create social content daily. The store was live but getting no organic traffic from social media. Creating individual posts, captions, and scheduling them manually was taking hours every week.",
  "solution": "We built a custom Shopify theme optimised for mobile performance and conversion, plus a Node.js automation pipeline. The pipeline uses Stable Diffusion to generate lifestyle product image variants and Claude API to write platform-specific captions, then auto-posts via Meta Graph API on a schedule.",
  "result": "560 unique post combinations generated from 20 original photos. 3 months of scheduled content ready on day one. The client now spends zero time on social media content creation while maintaining a consistent posting schedule.",
  "metaTitle": "Shopify + Social Media Automation Case Study | Simple Inc Mumbai",
  "metaDescription": "How Simple Inc built a Shopify store and automated social media content pipeline for a Mumbai keyboard retailer using Node.js and Meta Graph API."
}
```

**`content/work/saas-membership-platform.json`:**
```json
{
  "slug": "saas-membership-platform",
  "title": "SaaS Platform — Multi-Tenant Web Application for Membership Management",
  "client": "Sports club, Mumbai",
  "stack": ["React", "NestJS", "PostgreSQL", "Prisma", "Docker"],
  "duration": "Ongoing",
  "summary": "Building a multi-tenant SaaS platform allowing sports clubs to manage memberships, bookings, payments and reporting from a single dashboard.",
  "problem": "The client was managing 500+ members via spreadsheets. No online booking, no automated renewals, no reporting. Staff spent hours on manual data entry and reconciliation. Members had no way to self-serve.",
  "solution": "We are building a multi-tenant NestJS backend with a React dashboard. Each club gets its own isolated data environment with role-based access control. Features include member management, booking calendar, Stripe payment integration for dues and renewals, automated email reminders, and exportable reports.",
  "result": "In active development. First tenant onboarded and providing feedback. Member self-service portal has reduced front-desk queries by an estimated 60% in the pilot phase.",
  "metaTitle": "Multi-Tenant SaaS Development Case Study | NestJS + React | Simple Inc",
  "metaDescription": "Case study: Simple Inc building a multi-tenant SaaS platform for sports club management using React, NestJS and PostgreSQL."
}
```

- [ ] **Step 4: Build Work section**

```tsx
// components/sections/Work.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { cardHover } from '@/lib/animations'

const projects = [
  {
    slug: 'tailoring-shop-erp',
    title: 'Tailoring Shop ERP',
    summary: 'Custom order management system replacing WhatsApp chaos with digital tracking.',
    stack: ['Next.js', 'PostgreSQL', 'Prisma', 'WhatsApp API'],
  },
  {
    slug: 'mechanical-keyboard-ecommerce',
    title: 'Keyboard E-Commerce Store',
    summary: 'Shopify store with automated social media content pipeline.',
    stack: ['Shopify', 'Node.js', 'Meta Graph API'],
  },
  {
    slug: 'saas-membership-platform',
    title: 'SaaS Membership Platform',
    summary: 'Multi-tenant platform for sports club membership management.',
    stack: ['React', 'NestJS', 'PostgreSQL', 'Docker'],
  },
]

export function Work() {
  return (
    <SectionWrapper className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="mb-12">Recent Work</h2>
        </AnimatedChild>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <AnimatedChild key={project.slug}>
              <motion.div whileHover={cardHover}>
                <Link
                  href={`/work/${project.slug}`}
                  className="block bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Placeholder thumbnail */}
                  <div className="h-40 bg-gradient-to-br from-sky-100 to-sky-200" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatedChild>
          ))}
        </div>

        <AnimatedChild className="mt-10">
          <Link
            href="/work"
            className="text-sky-500 font-medium hover:text-sky-600 transition-colors"
          >
            See all projects →
          </Link>
        </AnimatedChild>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx components/sections/Services.tsx components/sections/Work.tsx content/work/
git commit -m "feat: add Hero, Services, and Work homepage sections with case study data"
```

---

### Task 8: Homepage Sections — WhyUs, Testimonials, Process, CTA

**Files:**
- Create: `components/sections/WhyUs.tsx`
- Create: `components/sections/Testimonials.tsx`
- Create: `components/sections/Process.tsx`
- Create: `components/sections/CTA.tsx`

- [ ] **Step 1: Build WhyUs section**

```tsx
// components/sections/WhyUs.tsx
'use client'

import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'

const reasons = [
  {
    icon: '💬',
    title: 'No Middlemen',
    description: 'Talk directly to the engineers building your product. No account managers. No hand-offs.',
  },
  {
    icon: '✅',
    title: 'Production-Ready Code',
    description: 'Clean, documented, deployable. Not a prototype you will need to rebuild later.',
  },
  {
    icon: '🔧',
    title: 'Full-Stack In-House',
    description: 'Frontend, backend, database, DevOps, and AI — one team, one engagement.',
  },
  {
    icon: '📍',
    title: 'Mumbai-Based, India-Wide',
    description: 'Available IST hours. Clients across Mumbai, India, UAE, and the UK.',
  },
]

export function WhyUs() {
  return (
    <SectionWrapper className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="text-center mb-12">Why Teams Choose Simple Inc</h2>
        </AnimatedChild>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason) => (
            <AnimatedChild key={reason.title}>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{reason.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </AnimatedChild>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Build Testimonials section**

```tsx
// components/sections/Testimonials.tsx
'use client'

import { motion } from 'framer-motion'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'
import { slideInLeft } from '@/lib/animations'

// IMPORTANT: Replace with real testimonials before launch. Do not ship placeholder quotes.
const testimonials = [
  {
    quote: 'Simple Inc rebuilt our entire order management system in 8 weeks. The result cut our daily admin time in half. Communication was direct and updates were weekly — exactly what we needed.',
    name: 'Rahul M.',
    company: 'Retail Business, Mumbai',
  },
  {
    quote: 'We needed a Shopify store and social media automation on a tight timeline. They delivered both ahead of schedule. The automated content pipeline alone saved us 10 hours a week.',
    name: 'Priya S.',
    company: 'E-Commerce Startup, Mumbai',
  },
  {
    quote: 'Working with Simple Inc felt like having a senior developer on the team. No account managers, no delays. Just clear communication and production-ready code.',
    name: 'Amit K.',
    company: 'SaaS Founder, Bangalore',
  },
]

export function Testimonials() {
  return (
    <SectionWrapper className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="mb-12">What Clients Say</h2>
        </AnimatedChild>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-4 border-sky-500 bg-slate-50 rounded-r-lg p-6"
            >
              <p className="text-slate-700 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-500">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Build Process section**

```tsx
// components/sections/Process.tsx
'use client'

import { motion } from 'framer-motion'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'

const steps = [
  { num: 1, title: 'Discovery', description: 'We learn your goals, users, and constraints in a 30-minute call.' },
  { num: 2, title: 'Proposal', description: 'Fixed-price proposal with scope, timeline, and deliverables within 48 hours.' },
  { num: 3, title: 'Build', description: 'Weekly updates and demos. You see progress, not silence.' },
  { num: 4, title: 'Launch', description: 'Deployment, handover, and 30 days of post-launch support included.' },
]

export function Process() {
  return (
    <SectionWrapper className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedChild>
          <h2 className="text-center mb-16">How We Work</h2>
        </AnimatedChild>
        <div className="relative max-w-2xl mx-auto">
          {/* Connecting line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-sky-200 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <div className="space-y-12">
            {steps.map((step) => (
              <AnimatedChild key={step.num} className="relative flex gap-6">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 z-10">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </AnimatedChild>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 4: Build CTA section**

```tsx
// components/sections/CTA.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { SectionWrapper, AnimatedChild } from '@/components/ui/SectionWrapper'

export function CTA() {
  return (
    <SectionWrapper className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedChild>
          <h2 className="text-white mb-4">Ready to Build Something?</h2>
        </AnimatedChild>
        <AnimatedChild>
          <p className="text-slate-300 text-lg mb-8">
            Tell us what you are working on. We will send a proposal within 48 hours.
          </p>
        </AnimatedChild>
        <AnimatedChild>
          <Button href="/contact">Start the Conversation</Button>
        </AnimatedChild>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/
git commit -m "feat: add WhyUs, Testimonials, Process, and CTA homepage sections"
```

---

### Task 9: Assemble Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Build homepage page.tsx**

Import all section components. Add metadata via `generateMeta`. Add `LocalBusiness` JSON-LD via `JsonLd` component.

```tsx
// app/page.tsx
import { generateMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { localBusinessSchema } from '@/lib/schema'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Work } from '@/components/sections/Work'
import { WhyUs } from '@/components/sections/WhyUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { Process } from '@/components/sections/Process'
import { CTA } from '@/components/sections/CTA'

export const metadata = generateMeta({
  title: 'Web Application & SaaS Development Agency in Mumbai | Simple Inc',
  description:
    'Simple Inc is a Mumbai-based development agency building custom web applications, SaaS products, dashboards, and business websites. React, Next.js, NestJS, AI. Direct access to engineers.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Hero />
      <Services />
      <Work />
      <WhyUs />
      <Testimonials />
      <Process />
      <CTA />
    </>
  )
}
```

- [ ] **Step 2: Verify homepage in browser**

Run `npm run dev`. Check:
- All 7 sections render
- Scroll animations work (sections fade in)
- Stat counters animate
- Service cards hover correctly
- Mobile responsive
- Page transitions work when clicking nav links

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage with all 7 sections, metadata, and LocalBusiness schema"
```

---

## Chunk 4: Contact Form & Contact Page

### Task 10: ContactForm Component + Contact Page

**Files:**
- Create: `components/ui/ContactForm.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Build ContactForm component**

```tsx
// components/ui/ContactForm.tsx
'use client'

import { useState, FormEvent } from 'react'

const projectTypes = [
  'Web Application',
  'SaaS',
  'Website',
  'AI Integration',
  'CMS & E-Commerce',
  'Other',
]

const budgetRanges = [
  'Under ₹25,000',
  '₹25,000–₹75,000',
  '₹75,000–₹2,00,000',
  '₹2,00,000+',
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    if (!endpoint) {
      setStatus('error')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Message sent</h3>
        <p className="text-slate-600">We will be in touch within 24 hours.</p>
      </div>
    )
  }

  const inputBase =
    'w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors duration-150'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input name="name" type="text" required placeholder="Your name" className={inputBase} />
      </div>
      <div>
        <input name="email" type="email" required placeholder="Email address" className={inputBase} />
      </div>
      <div>
        <input name="phone" type="tel" placeholder="+91 98XXXXXXXX (optional)" className={inputBase} />
      </div>
      <div>
        <select name="projectType" required defaultValue="" className={inputBase}>
          <option value="" disabled>Project type</option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <select name="budget" required defaultValue="" className={inputBase}>
          <option value="" disabled>Budget range</option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          name="message"
          required
          minLength={30}
          rows={4}
          placeholder="Tell us what you are building..."
          className={inputBase}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Email us directly at{' '}
          <a href="mailto:darshan@simpleinc.in" className="underline">
            darshan@simpleinc.in
          </a>
        </p>
      )}
    </form>
  )
}
```

- [ ] **Step 2: Build Contact page**

```tsx
// app/contact/page.tsx
import { generateMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { localBusinessSchema } from '@/lib/schema'
import { ContactForm } from '@/components/ui/ContactForm'

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
      <section className="pt-32 md:pt-40 pb-20">
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
                <p className="text-slate-600">Mumbai, Maharashtra, India</p>
                <p className="text-slate-600">We reply within 24 hours on weekdays.</p>
                <p className="text-sm font-medium text-sky-600 bg-sky-50 inline-block px-3 py-1 rounded-full">
                  Currently accepting new projects
                </p>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-4">What happens next</h3>
              <ol className="space-y-3">
                {nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-slate-600">
                    <span className="w-6 h-6 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
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
```

- [ ] **Step 3: Verify form submits correctly**

Set a real Formspree endpoint in `.env.local` (or test with a dummy one). Check success/error states render. Check form validation (required fields, min length).

- [ ] **Step 4: Commit**

```bash
git add components/ui/ContactForm.tsx app/contact/page.tsx
git commit -m "feat: add ContactForm component and Contact page with Formspree integration"
```

---

## Chunk 5: Service Pages

### Task 11: Service Page Template + 4 Service Pages + Services Overview

**Files:**
- Create: `components/sections/ServicePageTemplate.tsx`
- Create: `app/services/page.tsx`
- Create: `app/services/web-app-development/page.tsx`
- Create: `app/services/website-development/page.tsx`
- Create: `app/services/ai-development/page.tsx`
- Create: `app/services/cms-ecommerce/page.tsx`

- [ ] **Step 1: Build ServicePageTemplate component**

A reusable layout component that accepts props for all service page sections: title, intro, deliverables, targetClients, process steps, pricing, FAQs. Renders the full page with correct heading hierarchy, animations, and FAQ accordion with FAQPage JSON-LD.

- [ ] **Step 2: Build Services overview page (`app/services/page.tsx`)**

Metadata from spec. H1: "Our Services". Brief intro paragraph. Reuses the Services section component (same 4 cards from homepage). CTA at bottom.

- [ ] **Step 3: Build Web App Development page**

Pass to ServicePageTemplate with this content:

**FAQs:**
1. Q: "What does multi-tenant mean?" A: "Multi-tenant means one codebase serves multiple organisations, each with isolated data. It is the architecture behind tools like Slack, Notion, and Zoho."
2. Q: "Do you handle DevOps and deployment?" A: "Yes. Docker, PM2, Nginx, VPS setup, and CI/CD pipelines are part of the engagement."
3. Q: "Can you work on an existing codebase?" A: "Yes. Auditing, refactoring, and adding features to existing Node.js or React codebases is a common engagement type."
4. Q: "Do you sign NDAs?" A: "Yes. An NDA can be signed before any technical discussion."

**Process steps:**
1. Technical Discovery — We map your requirements, user flows, and data model.
2. Architecture Proposal — Fixed-price proposal with tech stack, milestones, and timeline.
3. Sprint-Based Build — 2-week sprints with demos. You test each feature as it ships.
4. Launch & Handover — Deployment, documentation, training, and 30-day support.

- [ ] **Step 4: Build Website Development page**

**FAQs:**
1. Q: "Will the website be SEO-friendly?" A: "Yes. All sites include semantic HTML, meta tags, structured data, sitemap, and Core Web Vitals optimisation."
2. Q: "What if I need changes after launch?" A: "30 days of minor revisions are included. Ongoing changes are available on a monthly retainer."
3. Q: "Can you work with my existing designer?" A: "Yes. We implement designs from Figma, XD, or any format directly into code."
4. Q: "Do you build mobile apps too?" A: "No. We focus exclusively on web — websites, web apps, and e-commerce. This focus means deeper expertise."

**Process steps:**
1. Brief & Goals — We learn what your business needs from the website.
2. Design & Structure — Sitemap, wireframes, and visual direction.
3. Development — Mobile-first build with weekly progress demos.
4. Launch & SEO — Deployment, Google setup, and 30 days of post-launch support.

- [ ] **Step 5: Build AI Development page**

**FAQs:**
1. Q: "What AI capabilities can you add?" A: "Intelligent search, content generation, document processing, chatbots, automation pipelines, and recommendation engines using OpenAI, Claude, or open-source models."
2. Q: "Can you add AI to our existing product?" A: "Yes. Most AI engagements are integrations into existing web applications — adding a smart feature without rebuilding the product."
3. Q: "How much data do we need?" A: "For LLM-based features, often none — the model brings its own knowledge. For custom models or fine-tuning, we will assess your data during discovery."
4. Q: "Is our data secure?" A: "Yes. We follow best practices for data handling. API calls can be routed through your own infrastructure. We sign NDAs."

**Process steps:**
1. Use Case Definition — We identify where AI adds real value in your product.
2. Proof of Concept — Working prototype in 1-2 weeks to validate the approach.
3. Production Integration — Build, test, and deploy into your live application.
4. Monitor & Improve — Post-launch monitoring with iterative improvement.

- [ ] **Step 6: Build CMS & E-Commerce page**

**FAQs:**
1. Q: "Can you migrate my existing store to Shopify?" A: "Yes. Product migration, customer data, and order history can all be transferred."
2. Q: "Will you use page builders like Elementor?" A: "For simple sites, yes. For performance-sensitive projects, custom theme development is recommended."
3. Q: "Can I manage the site myself after launch?" A: "Absolutely. We train your team on the CMS and hand over a simple management guide."
4. Q: "Can you integrate Indian payment gateways?" A: "Yes. Razorpay, PayU, CCAvenue, and PayPal integrations are all supported."

**Process steps:**
1. Platform Selection — We recommend the right CMS based on your needs and budget.
2. Design & Customisation — Custom theme, branding, and content structure.
3. Content & Integration — Product setup, payment gateway, shipping, and SEO.
4. Launch & Training — Go live, team training, and 30-day support.

- [ ] **Step 7: Verify all 5 service pages render correctly**

Check each page: metadata, H1, all sections, FAQ accordion, CTA, mobile responsive.

- [ ] **Step 8: Commit**

```bash
git add components/sections/ServicePageTemplate.tsx app/services/
git commit -m "feat: add service page template and all 5 service pages with FAQPage schema"
```

---

## Chunk 6: Hire Us + About Pages

### Task 12: Hire Us Page

**Files:**
- Create: `app/hire-us/page.tsx`

- [ ] **Step 1: Build Hire Us page**

This is the most important SEO landing page. Structure from spec:
1. H1: "Hire a Web Development Agency in Mumbai"
2. Intro copy (second-person, agency voice):

"When you hire Simple Inc, you get direct access to the engineers building your product. No account managers. No hand-offs between teams. No waiting days for a status update. You message us on WhatsApp or Slack and get a reply the same day."

"We are a Mumbai-based web development agency with over 5 years of experience building custom web applications, SaaS platforms, business websites, and AI-powered features. Our clients range from local Mumbai businesses to startups across India, the UAE, and the UK. Over 50 clients have trusted us to build production-grade software — not prototypes, not templates, but real systems that run their businesses."

"Whether you need a business website, a Shopify store, a custom dashboard, or a full SaaS product, we handle everything in-house: frontend, backend, database, DevOps, and AI. One team. One point of contact. Fixed pricing with no surprises."

3. Pricing table (4 rows — responsive: stacked cards on mobile, table on desktop)
4. "How Hiring Works" — 5 animated steps:
   1. Send us your brief → via the form below or darshan@simpleinc.in
   2. Discovery call (30 min) → scope, timeline, budget alignment
   3. Proposal sent within 48 hours → fixed price, clear scope, no surprises
   4. Development begins → weekly updates, WhatsApp/Slack access
   5. Launch + handover → deployment, training, 30-day support
5. FAQ — 10 Q&As using Accordion component + FAQPage JSON-LD
6. Embedded ContactForm component

Metadata and JSON-LD (FAQPage + LocalBusiness) from spec.

- [ ] **Step 2: Write the 10 FAQ Q&As**

All in agency voice ("we"):

1. Q: "How much does a web application cost?" A: "A business website starts at ₹25,000. A custom web application or SaaS product typically ranges from ₹1,00,000–₹5,00,000+ depending on features, integrations, and timeline."
2. Q: "How long does it take to build a web app?" A: "A standard business website takes 2–4 weeks. A Shopify or WordPress store takes 3–5 weeks. A custom SaaS or web application takes 6–16 weeks depending on scope."
3. Q: "Do you work with clients outside Mumbai?" A: "Yes. Most projects are handled fully remotely. Clients across India, the UAE, and the UK have worked with Simple Inc without in-person meetings."
4. Q: "What technologies do you use?" A: "React, Next.js, Node.js, NestJS, PostgreSQL, and Prisma for custom applications. WordPress and Shopify for content and e-commerce sites. OpenAI and Claude APIs for AI features."
5. Q: "Do you offer ongoing maintenance?" A: "Yes. Monthly maintenance retainers start at ₹5,000/month covering updates, backups, performance monitoring, and minor changes."
6. Q: "Can you work with our existing team or agency?" A: "Yes. White-label development for agencies is available. Your team handles the client, Simple Inc handles the build."
7. Q: "Are you available for urgent projects?" A: "Depending on current workload, rush timelines are possible with a 25% rush fee. Contact us to check availability."
8. Q: "Do you work on hourly or fixed-price basis?" A: "Fixed-price for projects. Hourly (₹2,500–₹4,000/hr) for retainer or advisory work."
9. Q: "What is your payment structure?" A: "50% upfront, 50% on delivery for projects under ₹1,00,000. Milestone-based payments for larger projects."
10. Q: "How do we start?" A: "Fill the form below or email darshan@simpleinc.in. You will hear back within 24 hours."

- [ ] **Step 3: Verify page renders with all sections and embedded form**

- [ ] **Step 4: Commit**

```bash
git add app/hire-us/
git commit -m "feat: add Hire Us landing page with pricing table, 10 FAQs, and embedded contact form"
```

---

### Task 13: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Build About page**

Metadata from spec. Person + Organization JSON-LD.

**Opening copy (render as 2 paragraphs):**

"Simple Inc is a web development agency based in Mumbai, founded by Darshan Parmar. We specialise in building custom web applications, SaaS products, business websites, and AI-powered features for startups and growing businesses across India."

"Darshan brings over 5 years of full-stack development experience spanning React, Next.js, NestJS, WordPress, Shopify, and PHP. Before starting Simple Inc, he worked on multi-tenant SaaS platforms, e-commerce systems, and enterprise dashboards. Every project at Simple Inc gets direct involvement from a senior developer — not a junior team behind an account manager."

**"Our Stack"** — two-column tech grid (6 categories from spec):
- Frontend: React, Next.js, Vue.js, Tailwind CSS, Framer Motion
- Backend: Node.js, NestJS, Express, PHP, REST APIs, WebSockets
- AI: OpenAI API, Claude API, LLM integration, automation pipelines
- CMS & E-Commerce: WordPress, Shopify, Wix, Headless CMS, ACF
- Database: PostgreSQL, MySQL, Prisma ORM, Redis
- DevOps: Docker, PM2, Nginx, Vercel, CI/CD

**"What We Build"** — 4 statements:
1. Web applications and SaaS products that handle real users at scale
2. Business websites that load fast and rank on Google
3. AI-powered features that automate workflows and add intelligence
4. CMS and e-commerce stores that clients can manage themselves

**"How We Work"** — 3 paragraphs:
1. "Fixed-price proposals. Every project starts with a clear scope, timeline, and price. No hourly billing surprises. No scope creep without a conversation."
2. "Regular updates. You see progress weekly — not just at the end. Demos, screenshots, and staging links keep you in the loop throughout the build."
3. "Direct access. You communicate with the developers building your product over WhatsApp or Slack. No account managers. No telephone game."

CTA → /contact

- [ ] **Step 2: Verify page renders correctly**

- [ ] **Step 3: Commit**

```bash
git add app/about/
git commit -m "feat: add About page with tech stack, capabilities, and Person/Organization schema"
```

---

## Chunk 7: Portfolio Pages

### Task 14: Work Index + Dynamic Case Study Pages

**Files:**
- Create: `app/work/page.tsx`
- Create: `app/work/[slug]/page.tsx`
- Create: `lib/work.ts` (helper to read case study JSON files)

- [ ] **Step 1: Create work data helper — `lib/work.ts`**

Reads JSON files from `content/work/`, exports `getAllProjects()` and `getProjectBySlug(slug)`. Also exports the TypeScript type for a project.

- [ ] **Step 2: Build Work index page**

Grid of project cards (3 columns desktop, 2 tablet, 1 mobile). Each card: gradient thumbnail, H2 project name, description, tech badges, "View Case Study" link. Metadata from spec. Staggered fade-in animation.

- [ ] **Step 3: Build dynamic case study page**

`generateStaticParams` reads all slugs from `content/work/`. Page structure: Breadcrumb → H1 → Meta bar (client, stack badges, duration) → The Problem → The Solution → The Result → CTA.

Include Article JSON-LD and BreadcrumbList JSON-LD.

Dynamic metadata via `generateMetadata` function using metaTitle and metaDescription from the JSON file.

- [ ] **Step 4: Verify all 3 case studies render at their URLs**

- `/work` — grid with 3 cards
- `/work/tailoring-shop-erp`
- `/work/mechanical-keyboard-ecommerce`
- `/work/saas-membership-platform`

- [ ] **Step 5: Commit**

```bash
git add lib/work.ts app/work/
git commit -m "feat: add Work portfolio page and dynamic case study pages with Article/Breadcrumb schema"
```

---

## Chunk 8: Blog Infrastructure

### Task 15: Blog System + First Post

**Files:**
- Create: `lib/blog.ts` (helper to read MDX frontmatter)
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `content/blog/web-app-cost-india.mdx`

- [ ] **Step 1: Install MDX dependencies**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
npm install -D @types/mdx
```

Update `next.config.js` to handle MDX if needed, or use `gray-matter` + manual MDX compilation.

- [ ] **Step 2: Create blog data helper — `lib/blog.ts`**

Reads MDX files from `content/blog/`, parses frontmatter with `gray-matter`. Exports `getAllPosts()` (sorted by date, newest first) and `getPostBySlug(slug)`. Returns title, description, date, slug, content.

- [ ] **Step 3: Build blog index page**

Post list: title, date, excerpt, "Read more →". Metadata from spec. Numbered pagination at 10+ posts (build the pagination component but it won't be visible with <10 posts).

- [ ] **Step 4: Build blog post page**

Dynamic route. `generateStaticParams` from all blog slugs. Renders MDX content. Includes: Article JSON-LD, author box ("Written by Darshan Parmar, founder of Simple Inc, Mumbai."), related posts section (show 2 other posts by date, excluding current — simple query from `getAllPosts()`), CTA to /contact.

Dynamic metadata via `generateMetadata`.

- [ ] **Step 5: Write first blog post — `content/blog/web-app-cost-india.mdx`**

Target keyword: "how much does a web app cost in India"
Word count: 1,400–1,800 words.

Frontmatter:
```yaml
---
title: "How Much Does a Web App Cost in India? (2026 Pricing Guide)"
description: "A transparent breakdown of web application development costs in India — from business websites to custom SaaS products. Real prices from a Mumbai agency."
slug: web-app-cost-india
date: 2026-03-12
author: Darshan Parmar
---
```

Structure: Intro → Why Prices Vary → Pricing Breakdown (table) → Agency vs Freelancer → What Drives Cost Up → What to Budget → How to Get a Quote → Conclusion with CTA.

Internal links to: /services/web-app-development, /services/website-development, /hire-us, /contact.

- [ ] **Step 6: Verify blog renders**

- `/blog` — shows post list with first post
- `/blog/web-app-cost-india` — renders full post with correct formatting

- [ ] **Step 7: Commit**

```bash
git add lib/blog.ts app/blog/ content/blog/ next.config.js package.json package-lock.json
git commit -m "feat: add blog infrastructure with MDX support and first post on web app costs"
```

---

## Chunk 9: Technical SEO, 404, & CLAUDE.md Update

### Task 16: Custom 404 Page

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Build custom 404 page**

H1: "Page Not Found". Body: "The page you're looking for doesn't exist or has moved." Two links: "Go Home" → / and "View Services" → /services. Clean design, uses Button component. `noIndex: true` in metadata (handled by Next.js automatically for not-found).

- [ ] **Step 2: Verify 404 renders at a non-existent URL**

Visit `localhost:3000/this-does-not-exist` — should show custom 404.

- [ ] **Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add custom 404 page"
```

---

### Task 17: Build Verification & Sitemap

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. All pages are statically generated.

- [ ] **Step 2: Verify sitemap generation**

After build, check that `public/sitemap-0.xml` and `public/robots.txt` exist and contain correct URLs.

- [ ] **Step 3: Start production server and spot-check pages**

```bash
npm run start
```

Spot-check 5 pages: `/`, `/hire-us`, `/services/web-app-development`, `/work/tailoring-shop-erp`, `/blog/web-app-cost-india`. Verify metadata in page source (title, meta description, canonical, OG tags, JSON-LD).

- [ ] **Step 4: Commit any fixes**

---

### Task 18: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md to reflect agency positioning**

The existing CLAUDE.md uses freelancer positioning ("I", /hire-me, Shopify-first). Update to match the approved design spec:
- Change voice from "I" to "we" (agency)
- Update site architecture to match spec (Section 4)
- Update keyword targets to match spec (Section 6.1)
- Update page-by-page SEO specifications to match spec (Section 5)
- Update service pages: remove /services/shopify and /services/wordpress, add /services/web-app-development, /services/ai-development, /services/website-development, /services/cms-ecommerce
- Replace /hire-me with /hire-us
- Update structured data schemas to match spec (Section 6.3)
- Update file structure to match spec (Section 7)
- Update blog calendar to match spec (Section 5.7)
- Update owner profile: positioning as "Agency" not "freelance/agency hybrid"
- Add design system section: color palette (sky-500 accent), typography (Playfair Display + Inter), animation system
- Update content rules: "we" voice, agency tone

Keep the following sections mostly unchanged (still accurate):
- Tech stack for the website itself (add Framer Motion note about moderate animations + page transitions)
- Core Web Vitals requirements
- Environment variables (update FORMSPREE_ENDPOINT to NEXT_PUBLIC_FORMSPREE_ENDPOINT)
- Deployment instructions
- On-page SEO rules
- Launch checklist

- [ ] **Step 2: Verify CLAUDE.md is internally consistent**

Read through the updated file. Confirm no leftover "I" language, no /hire-me references, no Shopify-as-primary-service references.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to reflect agency positioning, new services, and design system"
```

---

### Task 19: Final Verification

- [ ] **Step 1: Run full build one more time**

```bash
npm run build
```

Expected: Clean build, all pages statically generated, no warnings.

- [ ] **Step 2: Verify internal links**

Manually click through every internal link on the site (or write a quick script). Every link should resolve to a real page. No 404s except the custom 404 page.

- [ ] **Step 3: Verify SEO checklist items**

Check in page source for each page:
- Title tag present and unique
- Meta description present and unique
- Self-referencing canonical
- OG tags (title, description, image, url)
- Twitter card tags
- JSON-LD script tag with valid schema

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final build verification and cleanup"
```
