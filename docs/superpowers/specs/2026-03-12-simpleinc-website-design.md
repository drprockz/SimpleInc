# Simple Inc Website — Design Specification

**Date:** 2026-03-12
**Owner:** Darshan Parmar
**Domain:** simpleinc.in
**Status:** Approved

---

## 1. Positioning

Simple Inc is a Mumbai-based web development agency. The site leads with SaaS and web application development but also serves website, AI integration, and CMS/e-commerce clients. The voice is agency-first ("we", not "I"). Darshan Parmar is mentioned as founder on the About page only.

**Target clients:**
- Startups building MVPs and SaaS products
- Businesses needing custom web applications (CRMs, dashboards, portals)
- Mumbai SMBs and growing businesses needing websites
- Companies wanting AI features integrated into products
- E-commerce businesses needing CMS-managed stores

**Price range:** ₹20,000–₹5,00,000+ per project depending on scope.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSG) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Fonts | Playfair Display (headings) + Inter (body) + JetBrains Mono (code) — all self-hosted via `next/font` |
| Contact form | Formspree |
| Deployment | Vercel |
| Analytics | Google Analytics 4 + Google Search Console |
| Schema | JSON-LD structured data on every page |
| Sitemap | next-sitemap (auto-generated) |

---

## 3. Design System

### 3.1 Color Palette

| Token | Value | Tailwind Class | Usage |
|-------|-------|---------------|-------|
| primary | `#0F172A` | slate-900 | Headings, dark sections, navbar |
| accent | `#0EA5E9` | sky-500 | Buttons, links, highlights |
| accent-light | `#E0F2FE` | sky-100 | Icon backgrounds, badges, hover states |
| accent-dark | `#0369A1` | sky-700 | Button hover state |
| bg | `#FFFFFF` | white | Page background |
| bg-alt | `#F8FAFC` | slate-50 | Alternating section backgrounds |
| text | `#1E293B` | slate-800 | Body text |
| muted | `#64748B` | slate-500 | Secondary text, captions |
| border | `#E2E8F0` | slate-200 | Card borders, dividers |

Accent color (`#0EA5E9`) is derived from the Simple Inc logo's cyan blue. It maps to Tailwind's built-in `sky` palette, giving access to sky-50 through sky-900 without custom configuration.

### 3.2 Typography

| Element | Font | Weight | Size (desktop) |
|---------|------|--------|----------------|
| H1 | Playfair Display | 700 | 56–64px |
| H2 | Playfair Display | 700 | 36–40px |
| H3 | Inter | 700 | 20–24px |
| Body | Inter | 400 | 16–18px |
| Small/Caption | Inter | 500 | 14px |
| Code | JetBrains Mono | 400 | 14px |

### 3.3 Visual Style

- Clean, premium agency aesthetic (Stripe/Basecamp reference)
- Full-width immersive layout with alternating white/slate-50 section backgrounds
- Left-aligned hero
- Cards with rounded-lg borders, subtle shadows on hover
- No gradients on text. Clean flat design.
- Dark sections (slate-900) for CTA banners and footer

### 3.4 Animation System (Framer Motion)

| Animation | Trigger | Duration | Details |
|-----------|---------|----------|---------|
| Section reveal | `whileInView` | 0.6s | Fade-up, staggered children (0.1s delay). `once: true`. |
| Stat counters | Viewport entry | 1.5s | Animate from 0 to target number with easing |
| Card hover | `whileHover` | 0.2s | `translateY(-4px)` + shadow deepens + sky-500 left border reveal |
| Page transitions | Route change | 0.3s | `AnimatePresence` fade + slight slide, wraps route children in layout.tsx |
| Navbar | Scroll position | 0.2s | Transparent at top → blur + white bg via `useScroll` |
| Process timeline | Scroll progress | Progressive | Connecting line draws as steps enter viewport |
| FAQ accordion | Click | 0.3s | Smooth expand/collapse |
| Form focus | Focus event | 0.15s | Border transitions to sky-500 |
| Submit button | Form submit | — | Loading spinner state, success checkmark animation |

**Performance guardrails:**
- All animations use `transform` and `opacity` only (GPU-composited, no layout thrash)
- `whileInView` with `once: true` — animations fire once, not on every scroll
- Page transitions under 300ms
- `prefers-reduced-motion` respected — no animation for users who opt out
- No cursor-tracking or `mousemove` listeners (protects mobile INP)

---

## 4. Site Architecture

```
simpleinc.in/
├── /                              → Home (agency landing page)
├── /services/                     → Services overview
├── /services/web-app-development  → SaaS, CRMs, dashboards, portals
├── /services/website-development  → Next.js, WordPress, PHP business sites
├── /services/ai-development       → AI integrations, automation, intelligent features
├── /services/cms-ecommerce        → WordPress, Shopify, Wix, WooCommerce
├── /work/                         → Portfolio / case studies
├── /work/[slug]                   → Individual case study
├── /about/                        → About Simple Inc + Darshan as founder
├── /contact/                      → Contact page (with embedded form)
├── /blog/                         → Blog index
├── /blog/[slug]                   → Blog post
└── /hire-us/                      → Dedicated SEO landing page
```

---

## 5. Page-by-Page Design

### 5.1 Homepage (`/`)

**SEO:**
- Title: `Web Application & SaaS Development Agency in Mumbai | Simple Inc`
- Meta: `Simple Inc is a Mumbai-based development agency building custom web applications, SaaS products, dashboards, and business websites. React, Next.js, NestJS, AI. Direct access to engineers.`
- H1 targets: "web apps", "SaaS products"
- JSON-LD: LocalBusiness + WebSite
- Canonical: `https://www.simpleinc.in`

**Section 1 — Hero** (bg: white)
- H1: "We Build Web Apps & SaaS Products That Scale" ("Scale" in sky-500)
- Subtitle: "Simple Inc is a Mumbai-based development agency specialising in custom web applications, SaaS platforms, dashboards, and business websites."
- CTAs: "Start a Project" (sky-500 filled) → /contact | "See Our Work" (outline) → /work
- Animated stat counters: 5+ Years | 35+ Projects | 50+ Clients
- No hero image — typographic hero for fastest LCP

**Section 2 — What We Build** (bg: slate-50)
- H2: "What We Build"
- 4 service cards (staggered fade-in, hover lift + shadow + sky-500 left border):
  1. SaaS & Web Applications — Multi-tenant platforms, CRMs, dashboards, admin panels. React, NestJS, PostgreSQL.
  2. Custom Websites — Fast, SEO-optimised business websites built with Next.js, WordPress, or PHP.
  3. AI-Powered Solutions — Intelligent features, automation, and AI integrations built into your existing or new products.
  4. CMS & E-Commerce — WordPress, Shopify, Wix — content-managed sites and online stores that convert.

**Section 3 — Recent Work** (bg: white)
- H2: "Recent Work"
- 3 project cards with gradient thumbnail, title, description, tech badges
- Staggered fade-up. Hover: thumbnail zoom + card lift.
- "See all projects →" link → /work

**Section 4 — Why Simple Inc** (bg: slate-50)
- H2: "Why Teams Choose Simple Inc"
- 2x2 grid:
  1. No Middlemen — Talk directly to the engineers building your product.
  2. Production-Ready Code — Clean, documented, deployable. Not a prototype.
  3. Full-Stack In-House — Frontend, backend, database, DevOps, and AI — one team.
  4. Mumbai-Based, India-Wide — IST hours. Clients across Mumbai, India, UAE, and the UK.

**Section 5 — Testimonials** (bg: white)
- H2: "What Clients Say"
- 2–3 testimonial cards with sky-500 left border. Quote, name, company type.
- Slide-in from left on scroll. Placeholder quotes initially.

**Section 6 — Process** (bg: slate-50)
- H2: "How We Work"
- 4 steps with vertical connecting line that draws on scroll:
  1. Discovery — We learn your goals, users, and constraints in a 30-minute call.
  2. Proposal — Fixed-price proposal with scope, timeline, and deliverables within 48 hours.
  3. Build — Weekly updates and demos. You see progress, not silence.
  4. Launch — Deployment, handover, and 30 days of post-launch support included.

**Section 7 — CTA Banner** (bg: slate-900, full-bleed)
- H2: "Ready to Build Something?"
- Body: "Tell us what you're working on. We'll send a proposal within 48 hours."
- CTA: "Start the Conversation" (sky-500) → /contact

---

### 5.2 Service Pages (x4)

All service pages share a common template structure:
1. H1 (primary keyword)
2. Intro paragraph (150–200 words, agency voice)
3. H2: "What's Included" — 6–8 deliverables (staggered fade-in with checkmarks)
4. H2: "Who This Is For" — 3–4 ideal client types
5. H2: "Our Process" — 4 steps specific to service
6. H2: "Pricing" — ₹ ranges in cards with hover lift
7. H2: "Frequently Asked Questions" — 4 Q&As, accordion animation, FAQPage JSON-LD
8. CTA section → /contact

#### `/services/web-app-development`
- Title: `Custom Web Application & SaaS Development in Mumbai | Simple Inc`
- Meta: `Build your SaaS product, CRM, dashboard, or web portal with Simple Inc — a Mumbai-based agency specialising in React, NestJS, and PostgreSQL. Production-ready, scalable.`
- H1: "Web Application & SaaS Development"
- Stack: React, Next.js, NestJS, PostgreSQL, Prisma, Docker, multi-tenant
- Pricing: ₹1,00,000–₹5,00,000+
- Clients: Startups building MVPs, businesses replacing spreadsheets, companies needing dashboards/portals

#### `/services/website-development`
- Title: `Website Development Agency in Mumbai | Next.js, WordPress & PHP | Simple Inc`
- Meta: `Professional website development in Mumbai. SEO-optimised, mobile-first business websites built with Next.js, WordPress, or PHP. Fast delivery, fixed pricing.`
- H1: "Website Development in Mumbai"
- Stack: Next.js, WordPress, PHP, Tailwind CSS
- Pricing: ₹25,000–₹2,00,000
- Clients: Mumbai SMBs, startups needing web presence, businesses redesigning outdated sites

#### `/services/ai-development`
- Title: `AI Development & Integration Services in Mumbai | Simple Inc`
- Meta: `Add AI-powered features to your product. Simple Inc builds intelligent automation, AI integrations, and machine learning features for web applications. Mumbai-based.`
- H1: "AI Development & Integration"
- Stack: OpenAI/Claude API, LLM-powered features, automation pipelines, intelligent search, AI agents
- Pricing: ₹75,000–₹3,00,000+
- Clients: Businesses wanting AI in existing products, startups building AI-first tools, companies automating manual processes

#### `/services/cms-ecommerce`
- Title: `CMS & E-Commerce Development in Mumbai | WordPress, Shopify, Wix | Simple Inc`
- Meta: `CMS and e-commerce development in Mumbai. WordPress, Shopify, Wix, WooCommerce — content-managed websites and online stores that convert. Custom themes and integrations.`
- H1: "CMS & E-Commerce Development"
- Stack: WordPress, Shopify Liquid, Wix, WooCommerce, ACF, headless CMS
- Pricing: ₹20,000–₹1,50,000
- Clients: E-commerce businesses, content-heavy sites, retailers going online

---

### 5.3 `/hire-us` (Primary SEO Landing Page)

- Title: `Hire a Web Development Agency in Mumbai | Simple Inc`
- Meta: `Looking for a web development agency in Mumbai? Simple Inc builds custom web apps, SaaS products, websites, and AI-powered solutions. Fixed pricing. Direct access to engineers.`
- H1: "Hire a Web Development Agency in Mumbai"
- JSON-LD: FAQPage + LocalBusiness
- Canonical: `https://www.simpleinc.in/hire-us`

**Sections:**
1. Intro (200 words, second-person, agency voice) — What it's like to work with Simple Inc. No account managers. Direct access to engineers. 5+ years, 50+ clients, India-wide.
2. H2: "What We Work On" — Pricing table:

| Project Type | Stack | Timeline | Starting From |
|---|---|---|---|
| Business Website | Next.js, WordPress, PHP | 2–4 weeks | ₹25,000 |
| CMS / E-Commerce | WordPress, Shopify, Wix | 3–5 weeks | ₹20,000 |
| Web Application / SaaS | React, NestJS, PostgreSQL | 6–16 weeks | ₹1,00,000 |
| AI Integration | LLM APIs, automation | 4–8 weeks | ₹75,000 |

3. H2: "How Hiring Works" — 5 steps (animated timeline)
4. H2: "Frequently Asked Questions" — 10 Q&As (agency voice, includes AI services)
5. Embedded contact form (same component as /contact)

---

### 5.4 `/about`

- Title: `About Simple Inc — Web Development Agency, Mumbai`
- Meta: `Simple Inc is a web development agency based in Mumbai, founded by Darshan Parmar. We build SaaS products, web applications, websites, and AI-powered solutions for clients across India.`
- H1: "About Simple Inc"
- JSON-LD: Person (Darshan Parmar) + Organization
- Canonical: `https://www.simpleinc.in/about`

**Sections:**
1. Opening (200 words) — Who Simple Inc is. Founded by Darshan Parmar. 5+ years experience. Full-stack background.
2. H2: "Our Stack" — Two-column tech grid:
   - Frontend: React, Next.js, Vue.js, Tailwind CSS, Framer Motion
   - Backend: Node.js, NestJS, Express, PHP, REST APIs, WebSockets
   - AI: OpenAI API, Claude API, LLM integration, automation pipelines
   - CMS & E-Commerce: WordPress, Shopify, Wix, Headless CMS, ACF
   - Database: PostgreSQL, MySQL, Prisma ORM, Redis
   - DevOps: Docker, PM2, Nginx, Vercel, CI/CD
3. H2: "What We Build" — 4 capability statements with icons
4. H2: "How We Work" — Fixed pricing, regular updates, direct access
5. CTA → /contact

---

### 5.5 `/contact`

- Title: `Contact Simple Inc | Web Development Agency Mumbai`
- Meta: `Get in touch with Simple Inc for web applications, SaaS development, websites, or AI integration. Mumbai-based. Fast response guaranteed.`
- H1: "Let's Build Together"
- JSON-LD: LocalBusiness
- Canonical: `https://www.simpleinc.in/contact`

**Layout:** Two-column on desktop.

**Left column:**
- darshan@simpleinc.in
- Mumbai, Maharashtra, India
- "We reply within 24 hours on weekdays."
- "Currently accepting new projects."
- What happens next: 4 numbered steps

**Right column — Form:**
- Name (required), Email (required), Phone (optional)
- Project Type (select): Web Application / SaaS / Website / AI Integration / CMS & E-Commerce / Other
- Budget Range (select): Under ₹25,000 / ₹25,000–₹75,000 / ₹75,000–₹2,00,000 / ₹2,00,000+
- Message (required, min 30 chars)
- Submit: "Send Message"
- Formspree integration. Success/error states inline (no redirect).

---

### 5.6 Portfolio (`/work` + `/work/[slug]`)

**`/work`**
- Title: `Our Work | Web Apps, SaaS & Website Projects | Simple Inc`
- Meta: `Browse Simple Inc's portfolio — custom web applications, SaaS products, dashboards, websites, and AI-powered solutions built for clients across India.`
- H1: "Our Work"
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Cards: gradient thumbnail, project name (H2), description, tech badges, "View Case Study"
- 3 initial case studies: Tailoring ERP, Keyboard Store, SaaS Platform

**`/work/[slug]`**
- Dynamic route reading from content/work/
- Breadcrumb with BreadcrumbList JSON-LD
- Structure: H1 → Meta bar → The Problem → The Solution → The Result → CTA
- Article JSON-LD on each

---

### 5.7 Blog (`/blog` + `/blog/[slug]`)

**`/blog`**
- Title: `Web Development Blog | SaaS, Web Apps & AI Insights | Simple Inc`
- Meta: `Tips, guides, and insights on web application development, SaaS, AI integration, and building for the Indian market — by Simple Inc, Mumbai.`
- H1: "Blog"
- Post list sorted by date. Pagination at 10+.

**`/blog/[slug]`**
- MDX rendering. Article JSON-LD with author, dates.
- Author box: "Written by Darshan Parmar, founder of Simple Inc, Mumbai."
- Related posts (2) + CTA to /contact

**Blog calendar (first 6 posts):**

| Post | Target Keyword | Slug |
|------|---------------|------|
| 1 | how much does a web app cost in India | /blog/web-app-cost-india |
| 2 | WordPress vs custom website for Indian businesses | /blog/wordpress-vs-custom-website-india |
| 3 | how to hire a web development agency in Mumbai | /blog/hire-web-development-agency-mumbai |
| 4 | best tech stack for SaaS India 2025 | /blog/best-tech-stack-saas-india |
| 5 | AI integration for business applications | /blog/ai-integration-business-apps-india |
| 6 | CRM development vs off-the-shelf solutions | /blog/custom-crm-vs-off-the-shelf |

---

## 6. SEO Strategy

### 6.1 Revised Keyword Targets

**Tier 1 — High intent, Mumbai-local (homepage + /hire-us):**
- web application development Mumbai
- SaaS development company Mumbai
- web development agency Mumbai
- hire web development agency Mumbai
- custom web app development Mumbai

**Tier 2 — Service-specific (service pages):**
- custom web app development India
- CRM development Mumbai
- dashboard development India
- React developer Mumbai
- NestJS developer India
- AI development agency Mumbai
- WordPress developer Mumbai
- Shopify developer Mumbai

**Tier 3 — Long-tail blog targets:**
- how much does a web app cost in India
- WordPress vs custom website India
- how to hire a web development agency in Mumbai
- best tech stack for SaaS India 2025
- AI integration for business applications India
- custom CRM vs off-the-shelf solutions

**LSI / supporting terms:**
- custom software development Mumbai
- full-stack development agency
- production-grade web applications
- startup development partner India
- white-label web development

### 6.2 On-Page SEO Rules (Every Page)

1. Title tag: 50–60 characters. Primary keyword near front. Brand at end.
2. Meta description: 140–155 characters. CTA verb. Location when relevant.
3. H1: One per page. Contains primary keyword naturally.
4. H2s: Secondary keywords. Logical section breaks.
5. H3s: Inside sections only. No skipped heading levels.
6. URL slugs: lowercase, hyphenated, keyword-rich, short.
7. Image alt text: Descriptive, keyword-adjacent. Decorative: `alt=""`.
8. Internal links: Every page links to at least 2 other pages. Descriptive anchor text.
9. Canonical: Self-referencing on every page.
10. Robots: `index, follow` on public pages. `noindex` on thank-you pages.
11. Open Graph: og:title, og:description, og:image (1200x630), og:url, og:type on every page.
12. Twitter Card: summary_large_image on every page.
13. Sitemap: Auto-generated at /sitemap.xml.
14. Robots.txt: Allow all, disallow /api/ and /thank-you.
15. Custom 404 page linking to / and /services.

### 6.3 Structured Data (JSON-LD)

- **LocalBusiness:** Homepage, /contact, /hire-us
- **Organization:** /about
- **Person (Darshan Parmar):** /about
- **WebSite (with SearchAction):** Homepage (layout.tsx)
- **FAQPage:** /hire-us, each service page
- **Article:** Each blog post, each case study
- **BreadcrumbList:** Case study pages, blog posts

### 6.4 Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| INP | < 100ms |
| CLS | < 0.1 |
| PageSpeed Mobile | > 90 |
| PageSpeed Desktop | > 95 |

---

## 7. File Structure

```
/
├── app/
│   ├── layout.tsx              → Root layout, fonts, GA4, page transitions
│   ├── page.tsx                → Homepage
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── hire-us/page.tsx
│   ├── not-found.tsx           → Custom 404
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
│   │   └── PageTransition.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Work.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Process.tsx
│   │   └── CTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── StatCounter.tsx
│   │   ├── Accordion.tsx
│   │   └── ContactForm.tsx
│   └── seo/
│       └── JsonLd.tsx
├── content/
│   ├── work/                   → JSON case studies
│   └── blog/                   → MDX blog posts
├── lib/
│   ├── metadata.ts             → Metadata factory function
│   ├── schema.ts               → All JSON-LD schema objects
│   └── animations.ts           → Shared Framer Motion variants
├── public/
│   ├── images/
│   ├── og-image.jpg            → 1200x630 OG image
│   └── logo.png
├── next.config.js
├── next-sitemap.config.js
└── tailwind.config.js
```

---

## 8. Environment Variables

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.simpleinc.in
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/XXXXXXXX
CONTACT_EMAIL=darshan@simpleinc.in
```

---

## 9. Key Decisions & Rationale

| Decision | Why |
|----------|-----|
| Agency positioning | Target higher-value clients (SaaS, web apps) while still serving website market |
| SaaS-first service ordering | Leads with highest-value offering; builds credibility for all other services |
| Sky-500 from logo | Brand consistency; maps to Tailwind palette for free |
| Playfair Display + Inter | Serif/sans pairing signals premium. Playfair for personality, Inter for readability. |
| Scroll-driven animations | Makes site feel interactive and intriguing without hurting Core Web Vitals |
| Page transitions | App-like feel that differentiates from static agency sites |
| No cursor effects | Protects mobile INP score; no performance cost |
| /hire-us as standalone page | "hire web development agency Mumbai" is transactional — needs its own page |
| AI as a service page | Differentiator in Mumbai market; growing demand signal |
| Embedded forms on /hire-us + /contact | Reduces friction on highest-intent pages |
| Blog from day one | Long-tail posts rank in 3–6 months; each is a permanent acquisition channel |
