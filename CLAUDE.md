# CLAUDE.md — simpleinc.in Website

## Project Overview

**Project:** Simple Inc — Personal agency website rebuild  
**Owner:** Darshan Parmar  
**Domain:** simpleinc.in  
**Domain age:** 2021 (established — good for SEO)  
**Email:** darshan@simpleinc.in  
**Location:** Mumbai, India  
**Goal:** Replace the current Wize portfolio template with a custom-coded, SEO-optimised agency site that converts cold email recipients, warm referrals, and organic search visitors into paying clients

This is not a template job. You are coding a real agency website from scratch. Every decision — copy, structure, meta tags, schema, page speed — must serve both conversion and search ranking.

---

## Owner Profile (Critical Context)

- **Name:** Darshan Parmar
- **Role:** Full-stack developer, 5+ years experience
- **Current stack:** React, Vue, NestJS, Node.js, WordPress, PHP, Shopify Liquid, headless CMS, multi-tenant SaaS
- **Agency:** Simple Inc (simpleinc.in) — freelance/agency hybrid
- **Positioning:** Senior full-stack developer who builds production-grade web systems, not just websites
- **Target clients:** Mumbai SMBs, startups needing custom web apps, e-commerce businesses, agencies needing white-label dev
- **Differentiator:** Builds the same stack used by funded startups — React/Next.js, NestJS, headless CMS — at freelancer prices
- **Price range:** ₹25,000–₹3,00,000 per project depending on scope
- **Tone:** Professional but direct. No jargon. No corporate fluff. Results-focused.

---

## Tech Stack for the Website Itself

- **Framework:** Next.js 14 (App Router) — required for SEO, SSG, and Core Web Vitals
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (subtle, purposeful only)
- **CMS:** None required — content is hardcoded, managed via code
- **Contact form:** Formspree or Resend API (no backend needed)
- **Deployment:** Vercel (free tier, excellent for Next.js)
- **Analytics:** Google Analytics 4 + Google Search Console
- **Schema:** JSON-LD structured data on every page

Do NOT use WordPress, Webflow, Wix, or any template platform. The site itself must be proof of the work you sell.

---

## Site Architecture

```
simpleinc.in/
├── /                          → Home (primary landing page)
├── /services/                 → Services overview
├── /services/web-development  → Web development service page
├── /services/shopify          → Shopify development service page
├── /services/wordpress        → WordPress development service page
├── /services/saas-development → SaaS/web app development service page
├── /work/                     → Portfolio / case studies
├── /work/[slug]               → Individual case study
├── /about/                    → About Darshan + Simple Inc
├── /contact/                  → Contact page
├── /blog/                     → Blog index (SEO content)
├── /blog/[slug]               → Blog post
└── /hire-me/                  → Dedicated "hire a freelance developer Mumbai" landing page
```

---

## Target Keywords (Primary + Secondary)

### Tier 1 — High intent, Mumbai-local (target for homepage + hire-me page)
- `freelance web developer Mumbai`
- `web developer for hire Mumbai`
- `full stack developer Mumbai freelance`
- `hire web developer Mumbai`
- `web development company Mumbai`

### Tier 2 — Service-specific (target for service pages)
- `Shopify developer Mumbai`
- `WordPress developer Mumbai`
- `React developer freelance India`
- `NestJS developer India`
- `custom web app development Mumbai`
- `headless CMS development India`
- `SaaS development company Mumbai`
- `Next.js developer India`

### Tier 3 — Long-tail blog targets (1 post per keyword)
- `how much does a website cost in Mumbai`
- `WordPress vs Shopify for Indian businesses`
- `headless CMS vs WordPress India`
- `how to hire a web developer in Mumbai`
- `best tech stack for startups India 2025`
- `Shopify store setup cost India`
- `React vs Vue for web development`
- `how long does it take to build a website in India`

### LSI / supporting terms (use naturally in copy)
- freelance full-stack developer
- custom website development
- e-commerce development India
- responsive web design Mumbai
- affordable web development Mumbai
- white-label web development
- Mumbai startup developer

---

## Page-by-Page SEO Specifications

### / (Homepage)

**Title tag:** `Freelance Web Developer in Mumbai | Full-Stack & Shopify | Simple Inc`  
**Meta description:** `Hire Darshan Parmar — senior full-stack developer in Mumbai. React, Next.js, Shopify, WordPress & SaaS development. Fast delivery. Direct communication. No agency overhead.`  
**H1:** `Full-Stack Web Developer in Mumbai`  
**H2s:**
- What I Build
- Services
- Recent Work
- Why Simple Inc
- What Clients Say
- Ready to Start?

**Schema:** LocalBusiness + Person + WebSite  
**CTA above fold:** "Get a Free Quote" → /contact  
**Secondary CTA:** "See My Work" → /work

---

### /hire-me (Dedicated landing page — most important for ranking)

**Title tag:** `Hire a Freelance Web Developer in Mumbai | Simple Inc`  
**Meta description:** `Looking to hire a freelance web developer in Mumbai? Simple Inc delivers production-ready React, Next.js, Shopify and WordPress projects. Fast, reliable, no middlemen.`  
**H1:** `Hire a Freelance Web Developer in Mumbai`  
**Content structure:**
1. Who you are and what you offer (150 words)
2. What types of projects you take (with ₹ ranges)
3. Your process (4 steps)
4. FAQs (8–10 Q&As — critical for Google's People Also Ask)
5. CTA form

**Schema:** FAQPage + Person + LocalBusiness

---

### /services/web-development

**Title tag:** `Custom Web Development Services in Mumbai | Simple Inc`  
**Meta description:** `Professional web development in Mumbai using React, Next.js & Node.js. Custom-built, mobile-first, SEO-ready websites for startups and growing businesses.`  
**H1:** `Web Development Services in Mumbai`

---

### /services/shopify

**Title tag:** `Shopify Developer in Mumbai | Store Setup & Custom Themes | Simple Inc`  
**Meta description:** `Shopify development in Mumbai — custom themes, Liquid templates, app integrations and store optimisation. Launch your store fast with an expert Shopify developer.`  
**H1:** `Shopify Development in Mumbai`

---

### /services/wordpress

**Title tag:** `WordPress Developer in Mumbai | Custom Themes & WooCommerce | Simple Inc`  
**Meta description:** `Custom WordPress development in Mumbai. ACF, custom post types, WooCommerce, REST API, page builders and headless WordPress for modern businesses.`  
**H1:** `WordPress Development in Mumbai`

---

### /services/saas-development

**Title tag:** `SaaS & Web App Development in Mumbai | React + NestJS | Simple Inc`  
**Meta description:** `Build your SaaS product with an experienced developer in Mumbai. Multi-tenant architecture, NestJS APIs, React dashboards and Prisma/PostgreSQL backends.`  
**H1:** `SaaS & Web Application Development`

---

### /about

**Title tag:** `About Darshan Parmar — Full-Stack Developer, Mumbai | Simple Inc`  
**Meta description:** `Darshan Parmar is a full-stack developer based in Mumbai with 4+ years building React, Node.js, Shopify and WordPress projects for clients across India.`  
**H1:** `About Simple Inc`

---

### /contact

**Title tag:** `Contact Simple Inc | Hire a Web Developer in Mumbai`  
**Meta description:** `Get in touch with Simple Inc for web development, Shopify, WordPress or custom app projects. Based in Mumbai. Fast response guaranteed.`  
**H1:** `Let's Work Together`

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
  "description": "Full-stack web development agency in Mumbai offering React, Next.js, Shopify, WordPress and SaaS development services.",
  "telephone": "+91-XXXXXXXXXX",
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

### Person (about page)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Darshan Parmar",
  "jobTitle": "Full-Stack Web Developer",
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
  "knowsAbout": ["React", "Next.js", "Node.js", "NestJS", "Shopify", "WordPress", "SaaS Development", "PostgreSQL"]
}
```

### FAQPage (/hire-me)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a website cost in Mumbai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A basic business website starts at ₹25,000–₹50,000. A custom web application or e-commerce store typically ranges from ₹75,000–₹3,00,000 depending on features, integrations, and timeline."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard business website takes 2–4 weeks. A Shopify or WooCommerce store takes 3–6 weeks. A custom SaaS or web application takes 6–16 weeks depending on scope."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with clients outside Mumbai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Most projects are handled fully remotely. Clients across India, the UAE and the UK have worked with Simple Inc without in-person meetings."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies do you use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The primary stack is React, Next.js, Node.js, NestJS, PostgreSQL, and Prisma for custom applications. For content sites, WordPress with ACF and REST API. For e-commerce, Shopify with custom Liquid themes."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer ongoing maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Monthly maintenance retainers start at ₹5,000/month covering updates, backups, performance monitoring, and minor changes."
      }
    },
    {
      "@type": "Question",
      "name": "Can you work with my existing team or agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. White-label development for agencies is available. You handle the client, Simple Inc handles the build."
      }
    }
  ]
}
```

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
- **Copy voice:** Confident, direct, specific. Never vague ("I build amazing websites"). Always specific ("I build Shopify stores that load under 2 seconds and handle 10,000 monthly orders").
- **Numbers:** Use real numbers wherever possible. Project counts, client count, years, turnaround time, prices.
- **Social proof:** Testimonial quotes must be attributed (name + company type minimum). Never anonymous.
- **CTAs:** Every page has one primary CTA above the fold and one at the bottom. Use action verbs: "Get a Quote", "Start Your Project", "Book a Call".

---

## File Structure

```
/
├── app/
│   ├── layout.tsx              → Root layout with metadata, fonts, GA4
│   ├── page.tsx                → Homepage
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── hire-me/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── web-development/page.tsx
│   │   ├── shopify/page.tsx
│   │   ├── wordpress/page.tsx
│   │   └── saas-development/page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Work.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Process.tsx
│   │   └── CTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   └── seo/
│       ├── JsonLd.tsx          → Renders JSON-LD schema
│       └── OpenGraph.tsx
├── content/
│   ├── work/                   → MDX or JSON case studies
│   └── blog/                   → MDX blog posts
├── lib/
│   ├── metadata.ts             → Reusable metadata factory function
│   └── schema.ts               → All JSON-LD schema objects
├── public/
│   ├── images/
│   ├── og-image.jpg            → 1200x630 OG image
│   └── logo.png
├── next.config.js
├── next-sitemap.config.js
└── tailwind.config.js
```

---

## Metadata Factory Pattern

Use this pattern for every page. Never hardcode metadata — always use the factory.

```typescript
// lib/metadata.ts
import { Metadata } from 'next'

const siteUrl = 'https://www.simpleinc.in'

export function generateMeta({
  title,
  description,
  path = '',
  ogImage = '/og-image.jpg',
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
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
    robots: { index: true, follow: true },
  }
}
```

Usage in any page:
```typescript
export const metadata = generateMeta({
  title: 'Freelance Web Developer in Mumbai | Full-Stack & Shopify | Simple Inc',
  description: 'Hire Darshan Parmar — senior full-stack developer in Mumbai. React, Next.js, Shopify, WordPress & SaaS development. Fast delivery. Direct communication.',
  path: '/',
})
```

---

## Blog Content Calendar (First 6 Posts)

Each post targets one long-tail keyword. Write 1,200–2,000 words. Include: intro, 4–6 H2 sections, conclusion, CTA to /contact.

| Post | Target Keyword | Slug |
|------|---------------|------|
| 1 | how much does a website cost in Mumbai | `/blog/website-cost-mumbai` |
| 2 | WordPress vs Shopify for Indian businesses | `/blog/wordpress-vs-shopify-india` |
| 3 | how to hire a web developer in Mumbai | `/blog/hire-web-developer-mumbai` |
| 4 | headless CMS vs WordPress India | `/blog/headless-cms-vs-wordpress-india` |
| 5 | best tech stack for startups India | `/blog/best-tech-stack-startups-india` |
| 6 | Shopify store setup cost India | `/blog/shopify-store-cost-india` |

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
FORMSPREE_ENDPOINT=https://formspree.io/f/XXXXXXXX
# or
RESEND_API_KEY=re_XXXXXXXXXX
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
| /hire-me as dedicated page | "hire freelance web developer Mumbai" is a transactional keyword — it deserves a standalone page, not just a section |
| JSON-LD on every page | Google uses structured data for rich results. LocalBusiness + FAQPage = featured snippets |
| Blog from day one | Long-tail blog posts rank within 3–6 months. Each post is a client acquisition asset that runs forever |
| Self-hosted fonts | Eliminates render-blocking third-party font requests. Improves LCP |
| next-sitemap | Auto-generates sitemap including blog posts — zero manual work |
