# CLAUDE.md — simpleinc.in Website

## Project Overview

**Project:** Simple Inc — Web development agency website
**Owner:** Darshan Parmar
**Domain:** simpleinc.in
**Domain age:** 2021 (established — good for SEO)
**Email:** darshan@simpleinc.in
**Location:** Mumbai, India
**Goal:** Custom-coded, SEO-optimised agency site that converts cold email recipients, warm referrals, and organic search visitors into paying clients

This is not a template job. This is a real agency website coded from scratch. Every decision — copy, structure, meta tags, schema, page speed — must serve both conversion and search ranking.

---

## Owner Profile (Critical Context)

- **Name:** Darshan Parmar
- **Role:** Founder & Lead Developer, 5+ years experience
- **Current stack:** React, Vue, NestJS, Node.js, WordPress, PHP, Shopify Liquid, headless CMS, multi-tenant SaaS
- **Agency:** Simple Inc (simpleinc.in) — full-service web development agency
- **Positioning:** Development agency building production-grade web systems for startups and growing businesses
- **Target clients:** Mumbai SMBs, startups needing custom web apps, e-commerce businesses, agencies needing white-label dev
- **Differentiator:** Builds the same stack used by funded startups — React/Next.js, NestJS, headless CMS — with direct communication and fast turnaround
- **Price range:** ₹25,000–₹5,00,000 per project depending on scope
- **Tone:** Professional but direct. No jargon. No corporate fluff. Results-focused.

---

## Tech Stack for the Website Itself

- **Framework:** Next.js 14 (App Router) — required for SEO, SSG, and Core Web Vitals
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion — moderate animations with page transitions, section reveals, and card hovers
- **CMS:** None required — content is hardcoded, managed via code
- **Contact form:** Formspree (via NEXT_PUBLIC_FORMSPREE_ENDPOINT)
- **Deployment:** Vercel (free tier, excellent for Next.js)
- **Analytics:** Google Analytics 4 + Google Search Console
- **Schema:** JSON-LD structured data on every page

Do NOT use WordPress, Webflow, Wix, or any template platform. The site itself must be proof of the work we sell.

---

## Site Architecture

```
simpleinc.in/
├── /                                → Home (primary landing page)
├── /services/                       → Services overview
├── /services/web-app-development    → Custom web applications & SaaS
├── /services/website-development    → Business websites & landing pages
├── /services/ai-development         → AI integration & automation
├── /services/cms-ecommerce          → WordPress, Shopify, headless CMS
├── /work/                           → Portfolio / case studies
├── /work/[slug]                     → Individual case study
├── /about/                          → About Simple Inc + Darshan
├── /contact/                        → Contact page
├── /blog/                           → Blog index (SEO content)
├── /blog/[slug]                     → Blog post
└── /hire-us/                        → Dedicated "hire a web development agency" landing page
```

---

## Target Keywords (Primary + Secondary)

### Tier 1 — High intent, Mumbai-local (target for homepage + hire-us page)
- `web development agency Mumbai`
- `web development company Mumbai`
- `custom web application development Mumbai`
- `software development company Mumbai`
- `hire web developers Mumbai`

### Tier 2 — Service-specific (target for service pages)
- `custom web app development India`
- `SaaS development company Mumbai`
- `React development agency India`
- `Next.js development company`
- `AI integration services India`
- `WordPress development agency Mumbai`
- `Shopify development company Mumbai`
- `headless CMS development India`
- `NestJS development company`

### Tier 3 — Long-tail blog targets (1 post per keyword)
- `how much does a web app cost in India`
- `custom web application vs off-the-shelf software`
- `how to hire a web development agency in India`
- `headless CMS vs traditional CMS India`
- `best tech stack for startups India 2025`
- `React vs Vue for enterprise applications`
- `how long does it take to build a web app`
- `AI integration cost for business India`

### LSI / supporting terms (use naturally in copy)
- custom software development
- full-stack development agency
- enterprise web development
- responsive web design Mumbai
- scalable web applications
- white-label development
- Mumbai tech company

---

## Page-by-Page SEO Specifications

### / (Homepage)

**Title tag:** `Web Development Agency Mumbai | Custom Apps & Websites | Simple Inc`
**Meta description:** `Simple Inc is a web development agency in Mumbai building custom web applications, business websites, and AI-powered solutions. Fast delivery. Direct communication.`
**H1:** `We Build Web Applications That Drive Business Growth`
**H2s:**
- What We Build
- Our Services
- Featured Work
- Why Simple Inc
- What Clients Say
- Our Process
- Ready to Start?

**Schema:** LocalBusiness + Organization + WebSite
**CTA above fold:** "Start Your Project" → /contact
**Secondary CTA:** "View Our Work" → /work

---

### /hire-us (Dedicated landing page)

**Title tag:** `Hire a Web Development Agency in Mumbai | Simple Inc`
**Meta description:** `Looking to hire a web development agency in Mumbai? Simple Inc delivers production-ready web applications, websites, and AI solutions. Direct communication, no middlemen.`
**H1:** `Hire a Web Development Agency in Mumbai`
**Content structure:**
1. Who we are and what we offer (150 words)
2. What types of projects we take (with ₹ ranges)
3. Our process (4 steps)
4. FAQs (10 Q&As — critical for Google's People Also Ask)
5. CTA form

**Schema:** FAQPage + Organization + LocalBusiness

---

### /services/ (Services Overview)

**Title tag:** `Web Development Services | Custom Apps, Websites & AI | Simple Inc`
**Meta description:** `Explore our web development services: custom web applications, business websites, AI integration, and CMS/e-commerce solutions. Built in Mumbai, delivered worldwide.`
**H1:** `Our Services`

---

### /services/web-app-development

**Title tag:** `Custom Web App Development in Mumbai | SaaS & Dashboards | Simple Inc`
**Meta description:** `Custom web application development in Mumbai. We build SaaS products, admin dashboards, and internal tools using React, Next.js, NestJS, and PostgreSQL.`
**H1:** `Web Application Development`

---

### /services/website-development

**Title tag:** `Website Development in Mumbai | Business Sites & Landing Pages | Simple Inc`
**Meta description:** `Professional website development in Mumbai. Fast, SEO-optimised business websites and landing pages built with Next.js for maximum performance and conversions.`
**H1:** `Website Development`

---

### /services/ai-development

**Title tag:** `AI Integration & Development Services Mumbai | Simple Inc`
**Meta description:** `AI integration and development services in Mumbai. We build AI-powered chatbots, automation tools, and intelligent features using OpenAI, Claude, and custom models.`
**H1:** `AI Development & Integration`

---

### /services/cms-ecommerce

**Title tag:** `CMS & E-commerce Development Mumbai | WordPress, Shopify | Simple Inc`
**Meta description:** `CMS and e-commerce development in Mumbai. WordPress, Shopify, WooCommerce, and headless CMS solutions. Custom themes and seamless integrations.`
**H1:** `CMS & E-commerce Development`

---

### /about

**Title tag:** `About Simple Inc | Web Development Agency Mumbai`
**Meta description:** `Simple Inc is a web development agency founded by Darshan Parmar. Based in Mumbai, we build custom web applications and websites for startups and businesses.`
**H1:** `About Simple Inc`

---

### /contact

**Title tag:** `Contact Simple Inc | Web Development Agency Mumbai`
**Meta description:** `Get in touch with Simple Inc for web development, custom applications, or AI solutions. Based in Mumbai. Fast response guaranteed.`
**H1:** `Let's Work Together`

---

### /work

**Title tag:** `Our Work | Web Development Portfolio | Simple Inc`
**Meta description:** `View our portfolio of web applications, websites, and e-commerce projects. Case studies from Simple Inc, a web development agency in Mumbai.`
**H1:** `Our Work`

---

### /blog

**Title tag:** `Blog | Web Development Insights | Simple Inc`
**Meta description:** `Web development insights, tutorials, and industry analysis from Simple Inc. Learn about React, Next.js, AI integration, and building successful web products.`
**H1:** `Blog`

---

## Design System

### Color Palette

**Primary accent:** `sky-500` (#0ea5e9)
**Neutral base:** Zinc scale (zinc-50 through zinc-950)
**Background:** zinc-50 (light sections), white (cards)
**Text primary:** zinc-900
**Text secondary:** zinc-600
**Borders:** zinc-200

### Typography

**Display font:** Playfair Display (serif) — used for H1s and key headlines
**Body font:** Inter (sans-serif) — used for body text, navigation, and UI
**Mono font:** JetBrains Mono — used for code and technical content

Font loading: Self-hosted via `next/font` with CSS variable assignment.

### Animation System

**Library:** Framer Motion

**Page transitions:**
```typescript
pageTransition: {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}
```

**Section reveals:**
```typescript
fadeInUp: {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
```

**Stagger containers:** Children stagger at 0.1s intervals

**Card hovers:** y: -4 on hover with 0.2s transition

**Animation philosophy:** Moderate, purposeful animations that enhance UX without being distracting. Every animation should have a reason.

---

## Structured Data (JSON-LD) — Required on Every Page

### LocalBusiness (homepage + contact)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Simple Inc",
  "url": "https://www.simpleinc.in",
  "logo": "https://www.simpleinc.in/logo.png",
  "image": "https://www.simpleinc.in/og-image.jpg",
  "description": "Web development agency in Mumbai building custom web applications, SaaS products, dashboards, business websites, and AI-powered solutions.",
  "email": "darshan@simpleinc.in",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.0760",
    "longitude": "72.8777"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "₹₹",
  "sameAs": [
    "https://linkedin.com/in/darshan-parmar",
    "https://github.com/darshanparmar"
  ]
}
```

### Organization (homepage + about)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Simple Inc",
  "url": "https://www.simpleinc.in",
  "logo": "https://www.simpleinc.in/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Darshan Parmar"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  }
}
```

### Person (about page)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Darshan Parmar",
  "jobTitle": "Founder & Lead Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Simple Inc",
    "url": "https://www.simpleinc.in"
  },
  "url": "https://www.simpleinc.in/about",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "knowsAbout": ["React", "Next.js", "Node.js", "NestJS", "WordPress", "Shopify", "SaaS Development", "PostgreSQL", "AI Integration"]
}
```

### FAQPage (/hire-us)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a web application cost in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A basic web application starts at ₹1,50,000–₹3,00,000. A full-featured SaaS product or enterprise application typically ranges from ₹3,00,000–₹10,00,000+ depending on features, integrations, and timeline."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a web application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A basic business website takes 2–4 weeks. A custom web application takes 6–12 weeks. A full SaaS product with authentication, payments, and dashboards takes 12–20 weeks depending on scope."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with clients outside Mumbai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Most projects are handled fully remotely. Clients across India, the UAE, UK, and USA have worked with Simple Inc without in-person meetings."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies do you use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our primary stack is React, Next.js, Node.js, NestJS, PostgreSQL, and Prisma for custom applications. For content sites, WordPress with ACF. For e-commerce, Shopify or WooCommerce. For AI, OpenAI and Claude APIs."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer ongoing maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Monthly maintenance retainers start at ₹10,000/month covering updates, backups, performance monitoring, and minor changes."
      }
    },
    {
      "@type": "Question",
      "name": "Can you work with our existing team or agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. White-label development for agencies is available. You handle the client, Simple Inc handles the build."
      }
    }
  ]
}
```

### Article (blog posts + case studies)
Used via `createArticleSchema()` function with headline, description, dates, author, and publisher.

### BreadcrumbList (blog posts + case studies)
Used via `createBreadcrumbSchema()` function for navigation hierarchy.

---

## Core Web Vitals Requirements

Every page must pass Google's Core Web Vitals thresholds:

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Page Speed Score (Mobile) | > 90 |
| Page Speed Score (Desktop) | > 95 |

**Implementation rules:**
- All images: WebP format, explicit width/height attributes, `next/image` with lazy loading
- Hero image: eager load with priority prop
- Fonts: `next/font` with `display: swap`, self-hosted, preloaded
- No render-blocking scripts
- CSS: Tailwind purge enabled, no unused styles
- No layout shift: reserve space for images and dynamic content before load
- Third-party scripts (GA4, Hotjar): load with `strategy="afterInteractive"`

---

## On-Page SEO Rules (Apply to Every Page)

1. **Title tag:** 50–60 characters. Primary keyword near the front. Brand name at end.
2. **Meta description:** 140–155 characters. Include a CTA verb. Include location when relevant.
3. **H1:** One per page. Contains primary keyword naturally.
4. **H2s:** Contain secondary keywords. Used for logical section breaks, not decoration.
5. **H3s:** Used inside sections only. Do not skip heading levels.
6. **URL slugs:** lowercase, hyphenated, keyword-rich, short. No underscores. No numbers unless necessary.
7. **Image alt text:** Descriptive, keyword-adjacent. Never empty on meaningful images. Decorative images: `alt=""`.
8. **Internal links:** Every page links to at least 2 other pages. Use descriptive anchor text.
9. **Canonical tag:** Self-referencing canonical on every page.
10. **Robots:** `index, follow` on all public pages. `noindex` on thank-you pages and admin routes.
11. **Open Graph:** og:title, og:description, og:image (1200x630px), og:url, og:type on every page.
12. **Twitter Card:** summary_large_image on every page.
13. **Sitemap:** Auto-generated at /sitemap.xml via next-sitemap. Submit to Google Search Console.
14. **Robots.txt:** Allow all, disallow /api/ routes.
15. **404 page:** Custom, links back to homepage and /services.

---

## Content Rules

- **Reading level:** Write for a business owner, not a developer. Avoid jargon unless explaining it.
- **Sentence length:** Mostly under 20 words. Never over 30.
- **Paragraph length:** 2–4 sentences max.
- **Keyword density:** 1–2% for primary keyword. Use LSI terms naturally. Never stuff.
- **Copy voice:** Confident, direct, specific. Use "we" voice (agency perspective). Never vague ("We build amazing websites"). Always specific ("We build web applications that handle 50,000 daily users and integrate with 10+ third-party APIs").
- **Numbers:** Use real numbers wherever possible. Project counts, client count, years, turnaround time, prices.
- **Social proof:** Testimonial quotes must be attributed (name + company type minimum). Never anonymous.
- **CTAs:** Every page has one primary CTA above the fold and one at the bottom. Use action verbs: "Start Your Project", "Get a Quote", "Book a Call".

---

## File Structure

```
/
├── app/
│   ├── layout.tsx              → Root layout with metadata, fonts, GA4
│   ├── template.tsx            → Page transition wrapper
│   ├── page.tsx                → Homepage
│   ├── not-found.tsx           → Custom 404 page
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── hire-us/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── web-app-development/page.tsx
│   │   ├── website-development/page.tsx
│   │   ├── ai-development/page.tsx
│   │   └── cms-ecommerce/page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MotionProvider.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Work.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Process.tsx
│   │   ├── CTA.tsx
│   │   └── ServicePageTemplate.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── StatCounter.tsx
│   │   ├── Accordion.tsx
│   │   ├── ContactForm.tsx
│   │   └── SectionWrapper.tsx
│   └── seo/
│       └── JsonLd.tsx          → Renders JSON-LD schema
├── content/
│   ├── work/                   → JSON case studies
│   └── blog/                   → MDX blog posts
├── lib/
│   ├── metadata.ts             → Reusable metadata factory function
│   ├── schema.ts               → All JSON-LD schema objects
│   ├── animations.ts           → Framer Motion variants
│   ├── blog.ts                 → Blog utilities (MDX parsing)
│   └── work.ts                 → Work/portfolio utilities
├── public/
│   ├── images/
│   ├── og-image.jpg            → 1200x630 OG image
│   └── logo.png
├── next.config.js
├── next-sitemap.config.js
└── tailwind.config.ts
```

---

## Metadata Factory Pattern

Use this pattern for every page. Never hardcode metadata — always use the factory.

```typescript
// lib/metadata.ts
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

Usage in any page:
```typescript
export const metadata = generateMeta({
  title: 'Web Development Agency Mumbai | Custom Apps & Websites | Simple Inc',
  description: 'Simple Inc is a web development agency in Mumbai building custom web applications, business websites, and AI-powered solutions.',
  path: '/',
})
```

---

## Blog Content Calendar (First 6 Posts)

Each post targets one long-tail keyword. Write 1,200–2,000 words. Include: intro, 4–6 H2 sections, conclusion, CTA to /contact.

| Post | Target Keyword | Slug |
|------|---------------|------|
| 1 | how much does a web app cost in India | `/blog/web-app-cost-india` |
| 2 | custom web application vs off-the-shelf | `/blog/custom-vs-off-the-shelf` |
| 3 | how to hire a web development agency India | `/blog/hire-web-development-agency` |
| 4 | headless CMS vs traditional CMS | `/blog/headless-cms-vs-traditional` |
| 5 | best tech stack for startups India | `/blog/best-tech-stack-startups-india` |
| 6 | AI integration for business India | `/blog/ai-integration-business-india` |

Post 1 must go live on launch day. One post per month minimum after that.

---

## Launch Checklist

Before going live, verify all of the following:

**SEO**
- [ ] All title tags 50–60 chars, unique per page
- [ ] All meta descriptions 140–155 chars, unique per page
- [ ] H1 on every page, contains primary keyword
- [ ] Self-referencing canonical on every page
- [ ] JSON-LD schema validates at schema.org/SchemaApp
- [ ] OG image renders correctly (test at opengraph.xyz)
- [ ] Sitemap at /sitemap.xml, submitted to Search Console
- [ ] Robots.txt live at /robots.txt
- [ ] Google Analytics 4 tracking verified (Realtime view)
- [ ] Google Search Console ownership verified

**Performance**
- [ ] PageSpeed Insights Mobile > 90
- [ ] PageSpeed Insights Desktop > 95
- [ ] All images WebP, explicit dimensions
- [ ] No render-blocking resources
- [ ] Fonts preloaded and self-hosted

**Technical**
- [ ] HTTPS live, HTTP redirects to HTTPS
- [ ] www redirects to non-www (or vice versa, consistent)
- [ ] 404 page is custom
- [ ] Contact form sends and delivers correctly
- [ ] All internal links work
- [ ] No broken images

**Directories (submit same day as launch)**
- [ ] Google Business Profile created and verified
- [ ] Listed on Clutch (clutch.co)
- [ ] Listed on GoodFirms (goodfirms.co)
- [ ] Listed on The Manifest (themanifest.com)
- [ ] Listed on DesignRush (designrush.com)
- [ ] Listed on Bark.com
- [ ] Sulekha business listing created

---

## Environment Variables

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.simpleinc.in
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/XXXXXXXX
CONTACT_EMAIL=darshan@simpleinc.in
```

---

## Deployment

**Platform:** Vercel
**Build command:** `next build`
**Domain config:** Add simpleinc.in as custom domain in Vercel dashboard. Set DNS A record to Vercel's IP. Vercel handles SSL automatically.

**next-sitemap config:**
```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.simpleinc.in',
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

---

## Key Decisions & Rationale

| Decision | Why |
|----------|-----|
| Next.js 14 App Router | SSG for SEO + RSC for performance. Best Core Web Vitals of any React framework. |
| Vercel hosting | Zero-config Next.js, global CDN, automatic HTTPS, preview deployments |
| No WordPress for own site | Selling dev work — the site itself must prove the skill |
| /hire-us as dedicated page | "hire web development agency" is a transactional keyword — it deserves a standalone page |
| JSON-LD on every page | Google uses structured data for rich results. LocalBusiness + FAQPage = featured snippets |
| Blog from day one | Long-tail blog posts rank within 3–6 months. Each post is a client acquisition asset that runs forever |
| Self-hosted fonts | Eliminates render-blocking third-party font requests. Improves LCP |
| next-sitemap | Auto-generates sitemap including blog posts — zero manual work |
| Framer Motion | Provides smooth page transitions and section animations without heavy bundle size |
| Agency positioning | "We" voice positions Simple Inc as a professional agency, not a solo freelancer |
