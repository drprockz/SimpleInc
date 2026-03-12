# Prompts.md — simpleinc.in Website

All prompts for Claude Code (or Claude chat) to build and maintain the Simple Inc website. Read CLAUDE.md fully before executing any prompt. These prompts are ordered — earlier ones create files that later ones depend on.

---

## How to Use This File

1. Open Claude Code in the project root
2. Read CLAUDE.md first: `cat CLAUDE.md`
3. Run prompts in order for a fresh build
4. Use individual prompts for isolated tasks or updates
5. Always test after each prompt: `npm run dev` and check in browser

---

## PROMPT 0 — Project Scaffolding

**Purpose:** Create the Next.js project with all required dependencies

```
You are building a production-grade agency website for Simple Inc (simpleinc.in) in Mumbai. 
Read CLAUDE.md for full context before writing any code.

Scaffold the Next.js 14 App Router project:

1. Run: npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

2. Install dependencies:
   npm install framer-motion next-sitemap sharp @next/bundle-analyzer

3. Install dev dependencies:
   npm install -D @types/node

4. Create the full folder structure defined in CLAUDE.md under "File Structure". 
   Create empty placeholder files so the structure is ready.

5. Create next.config.js with:
   - Image domains configured
   - Compression enabled
   - Headers for security (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

6. Create next-sitemap.config.js exactly as specified in CLAUDE.md.

7. Create .env.local with all variables from CLAUDE.md (with placeholder values).

8. Add to package.json scripts:
   "postbuild": "next-sitemap"

Do not create any page content yet. Only scaffold structure and config.
```

---

## PROMPT 1 — Global Layout, Fonts, Metadata Factory

**Purpose:** Root layout, navbar, footer, reusable metadata, SEO foundations

```
Read CLAUDE.md fully. You are building simpleinc.in with Next.js 14 App Router.

Build the global foundation:

TASK 1 — lib/metadata.ts
Implement the exact metadata factory function from CLAUDE.md. 
Export a generateMeta() function that accepts title, description, path, ogImage.
It must produce: title, description, alternates.canonical, openGraph (all fields), 
twitter card, and robots.

TASK 2 — lib/schema.ts  
Create and export the following JSON-LD schema objects from CLAUDE.md:
- localBusinessSchema (LocalBusiness)
- personSchema (Person — Darshan Parmar)
- faqSchema (FAQPage with all 6 Q&As from CLAUDE.md)
- websiteSchema (WebSite with SearchAction)
Each should be a plain JS object ready to pass to JSON.stringify().

TASK 3 — components/seo/JsonLd.tsx
A simple component that accepts a schema object and renders:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

TASK 4 — app/layout.tsx
Root layout with:
- next/font: Inter (body) + JetBrains Mono (code). Self-hosted. display: swap. Preloaded.
- Google Analytics 4 script loaded with strategy="afterInteractive" using NEXT_PUBLIC_GA_MEASUREMENT_ID
- Global metadata object (site name, description, OG defaults, twitter defaults)
- WebSite JSON-LD schema in <head>
- Consistent <html lang="en-IN">

TASK 5 — components/layout/Navbar.tsx
- Logo: "Simple Inc" wordmark in Inter, clean
- Nav links: Services, Work, Blog, About, Contact
- CTA button: "Get a Quote" → /contact (filled, primary colour)
- Mobile: hamburger menu with smooth Framer Motion open/close
- Sticky on scroll, subtle background blur
- Active link highlighted

TASK 6 — components/layout/Footer.tsx
- Simple Inc name + tagline
- 3-column layout: Services (links), Navigation (links), Contact (email, location: Mumbai)
- Social links: LinkedIn, GitHub
- Copyright: © 2024 Simple Inc. All rights reserved.
- No unnecessary clutter

Design system:
- Primary colour: #0F172A (slate-900, near-black)
- Accent: #6366F1 (indigo-500)
- Background: #FFFFFF
- Text: #1E293B (slate-800)
- Muted: #64748B (slate-500)
- Font scale: tight and professional
- Border radius: rounded-lg consistently
- No gradients on text (bad for accessibility). Clean flat design.
```

---

## PROMPT 2 — Homepage

**Purpose:** Full homepage — the primary conversion and ranking page

```
Read CLAUDE.md fully. Build app/page.tsx — the homepage for simpleinc.in.

Use the metadata from CLAUDE.md:
Title: "Freelance Web Developer in Mumbai | Full-Stack & Shopify | Simple Inc"
Description: "Hire Darshan Parmar — senior full-stack developer in Mumbai. React, Next.js, 
Shopify, WordPress & SaaS development. Fast delivery. Direct communication. No agency overhead."
Canonical: https://www.simpleinc.in

Include LocalBusiness JSON-LD schema using the JsonLd component.

Build each section as a separate component in components/sections/:

SECTION 1 — Hero (components/sections/Hero.tsx)
H1: "Full-Stack Web Developer in Mumbai"
Subheading (not an H tag): "I build production-grade websites, Shopify stores, and web 
applications for Mumbai businesses and startups across India."
Body copy (2 sentences): Lead with a specific result. Mention React, Next.js, Shopify, 
WordPress naturally. Do not use fluff words (amazing, incredible, passionate).
CTA 1 (primary): "Get a Free Quote" → /contact
CTA 2 (secondary, outline): "See My Work" → /work
Below CTAs: 3 trust indicators in a row — "4+ Years Experience", "Mumbai-based", 
"React · Next.js · Shopify · WordPress"
No hero image — full typographic hero. Clean. Fast.

SECTION 2 — What I Build (components/sections/Services.tsx)
H2: "What I Build"
4 service cards in a 2x2 grid (mobile: 1 column):
1. Web Development — React, Next.js, Node.js — custom web apps and business sites
2. Shopify Development — Custom Liquid themes, app integrations, store optimisation
3. WordPress Development — Custom themes, ACF, WooCommerce, REST API
4. SaaS & Web Apps — Multi-tenant systems, NestJS backends, dashboards
Each card: icon (Lucide or SVG), service name (H3), 2-line description, "Learn more" link to /services/[slug]

SECTION 3 — Recent Work (components/sections/Work.tsx)
H2: "Recent Work"
3 project cards in a row (mobile: stacked):
Use placeholder project data — you will fill real projects later. 
Each card: project name, 1-line description, tech badges (e.g. React, NestJS), 
"View Case Study" link.
Below grid: "See all projects →" link to /work

SECTION 4 — Why Simple Inc (components/sections/WhyMe.tsx)
H2: "Why Work with Simple Inc"
4 points as a 2x2 grid of icon + heading + 2-line text cards:
1. Direct Communication — You speak to the developer, not an account manager.
2. Production-Ready Code — Clean, documented, deployable. Not a prototype.
3. Full-Stack Capability — Frontend, backend, database and deployment in one engagement.
4. Mumbai-Based — Available IST hours. Understands the Indian market.

SECTION 5 — Testimonials (components/sections/Testimonials.tsx)
H2: "What Clients Say"
2–3 testimonial cards with placeholder copy. Each: quote, name, company type.
Add a subtle border-left accent on the quote.
NOTE: Add real testimonials once collected from clients.

SECTION 6 — Process (components/sections/Process.tsx)
H2: "How It Works"
4 numbered steps in a horizontal timeline (mobile: vertical):
1. Discovery — Brief call to understand your goals, budget, and timeline.
2. Proposal — Fixed-price proposal with scope, timeline, and deliverables.
3. Build — Regular updates. You see progress weekly, not just at the end.
4. Launch — Deployment, handover, and 30 days of post-launch support.

SECTION 7 — CTA Banner (components/sections/CTA.tsx)
H2: "Ready to Start Your Project?"
Body: "Tell me what you are building. I will send a proposal within 24 hours."
CTA button: "Start the Conversation" → /contact
Design: Dark background (#0F172A), white text, full-width

Performance rules:
- No images on homepage (pure type + icons = fastest possible LCP)
- Framer Motion: fade-in-up on scroll for sections only. No parallax. No complex animations.
- All section components use React.memo where appropriate
```

---

## PROMPT 3 — Service Pages

**Purpose:** 4 individual service pages, each targeting a specific keyword

```
Read CLAUDE.md. Build all 4 service pages. Each page is a standalone SEO document 
targeting a specific keyword cluster.

Use the exact title tags, meta descriptions, H1s, and canonical URLs from CLAUDE.md.

For each service page, the structure must be:
1. H1 (primary keyword)
2. Intro paragraph (150–200 words, naturally uses primary + secondary keywords)
3. "What's Included" — H2, bulleted list of 6–8 specific deliverables
4. "Who This Is For" — H2, 3–4 ideal client descriptions
5. "My Process" — H2, 4 numbered steps specific to this service
6. "Pricing" — H2, honest ₹ ranges (don't hide pricing)
7. "Frequently Asked Questions" — H2, 4 Q&As specific to this service with FAQPage JSON-LD
8. CTA section: "Ready to get started? →" button to /contact

---

BUILD: app/services/web-development/page.tsx
H1: "Web Development Services in Mumbai"
Stack focus: React, Next.js, Node.js, PostgreSQL
Pricing: ₹40,000–₹3,00,000 depending on scope
FAQs:
Q: Do you build mobile apps too?
A: No. I focus exclusively on web — websites, web apps, and e-commerce. This focus means 
deeper expertise than generalist shops.
Q: What if I need changes after launch?
A: 30 days of free minor revisions are included. Ongoing changes are available on a retainer.
Q: Can you work with my existing designer?
A: Yes. I can implement designs from Figma, XD, or any format directly into code.
Q: Will the website be SEO-friendly?
A: Yes. All sites include proper semantic HTML, meta tags, structured data, 
sitemap, and Core Web Vitals optimisation.

---

BUILD: app/services/shopify/page.tsx
H1: "Shopify Development in Mumbai"
Stack focus: Shopify Liquid, Dawn theme, custom sections, Shopify APIs, app integrations
Pricing: ₹25,000–₹1,50,000
FAQs:
Q: Can you migrate my existing store to Shopify?
A: Yes. Product migration, customer data, and order history can all be transferred.
Q: Do you build custom Shopify apps?
A: Basic custom apps and integrations yes. For complex private apps, scope is assessed 
case by case.
Q: Will my store load fast on mobile?
A: Yes. Mobile performance is a core deliverable. All stores are tested on real devices.
Q: Can I manage the store myself after launch?
A: Absolutely. I train you on Shopify admin and hand over a simple guide.

---

BUILD: app/services/wordpress/page.tsx
H1: "WordPress Development in Mumbai"
Stack focus: WordPress, ACF, WooCommerce, REST API, Gutenberg, headless WordPress
Pricing: ₹20,000–₹1,00,000
FAQs:
Q: Will you use page builders like Elementor?
A: For simple sites, Elementor is an option. For complex or performance-sensitive projects, 
custom theme development is recommended.
Q: Can you integrate WooCommerce with my payment gateway?
A: Yes. Razorpay, PayU, CCAvenue, and PayPal integrations are all supported.
Q: Is WordPress secure?
A: A properly hardened WordPress site with updated plugins, strong passwords, and a 
firewall is secure. Security hardening is included.
Q: Can you build a headless WordPress site?
A: Yes. WordPress as a CMS with a React or Next.js frontend is a specialty.

---

BUILD: app/services/saas-development/page.tsx
H1: "SaaS & Web Application Development"
Stack focus: NestJS, React, PostgreSQL, Prisma, multi-tenant architecture, Docker
Pricing: ₹1,00,000–₹5,00,000+
FAQs:
Q: What does multi-tenant mean?
A: Multi-tenant means one codebase serves multiple organisations, each with their own 
isolated data. It is the architecture behind tools like Slack, Notion, and Zoho.
Q: Do you handle DevOps and deployment?
A: Yes. Docker, PM2, Nginx, VPS setup, and CI/CD pipelines are part of the engagement.
Q: Can you work on an existing codebase?
A: Yes. Auditing, refactoring, and adding features to existing Node.js or React codebases 
is a common engagement type.
Q: Do you sign NDAs?
A: Yes. An NDA can be signed before any technical discussion.

Add FAQPage JSON-LD to each page using the service-specific Q&As above.
```

---

## PROMPT 4 — /hire-me Landing Page

**Purpose:** Most SEO-critical page. Targets "hire freelance web developer Mumbai" — a high-intent transactional keyword.

```
Read CLAUDE.md. Build app/hire-me/page.tsx.

This is the most important standalone SEO page on the site. 
It targets transactional keywords: "hire freelance web developer Mumbai", 
"hire full stack developer Mumbai", "freelance React developer India".

Metadata:
Title: "Hire a Freelance Web Developer in Mumbai | Simple Inc"
Description: "Looking to hire a freelance web developer in Mumbai? Simple Inc delivers 
production-ready React, Next.js, Shopify and WordPress projects. Fast, reliable, no middlemen."
Canonical: https://www.simpleinc.in/hire-me

Include both LocalBusiness and FAQPage JSON-LD schemas.

Page structure:

SECTION 1 — H1
"Hire a Freelance Web Developer in Mumbai"
Subtext: "Production-ready code. Fixed pricing. Direct communication with the developer."

SECTION 2 — About the engagement (prose, 200 words)
Write this in second-person, addressing the business owner directly.
Cover: What it is like to work with Simple Inc vs an agency. 
No account managers. No hand-offs. Direct Slack/WhatsApp access to the developer.
Mention: 4+ years experience, React, Next.js, Shopify, NestJS, Mumbai-based, 
works with clients across India and internationally.
Primary keyword "freelance web developer Mumbai" must appear naturally 2–3 times.

SECTION 3 — Project Types & Pricing
H2: "What I Work On"
Table or grid layout with 4 rows:
| Project Type | Stack | Timeline | Starting From |
|---|---|---|---|
| Business Website | Next.js, Tailwind | 2–3 weeks | ₹25,000 |
| Shopify Store | Shopify Liquid | 3–5 weeks | ₹30,000 |
| WordPress Site | WordPress, ACF | 2–4 weeks | ₹20,000 |
| Web Application / SaaS | React, NestJS, PostgreSQL | 6–16 weeks | ₹1,00,000 |

Note below table: "All projects include mobile responsiveness, SEO setup, and 30-day post-launch support."

SECTION 4 — The Process
H2: "How Hiring Works"
5 clean numbered steps:
1. Send me your brief → via the form below or darshan@simpleinc.in
2. Intro call (30 min) → scope, timeline, budget alignment
3. Proposal sent within 48 hours → fixed price, clear scope, no surprises
4. Development begins → weekly updates, Slack/WhatsApp access
5. Launch + handover → deployment, training, 30-day support

SECTION 5 — FAQ (full — 10 Q&As for maximum People Also Ask coverage)
H2: "Frequently Asked Questions"
Use all 6 Q&As from CLAUDE.md faqSchema, plus add:
Q7: Are you available for urgent projects?
A: Depending on current workload, rush timelines are possible with a 25% rush fee. 
Contact me to check availability.
Q8: Do you work on hourly or fixed-price basis?
A: Fixed-price for projects. Hourly (₹2,500–₹4,000/hr) for retainer or advisory work.
Q9: What is your payment structure?
A: 50% upfront, 50% on delivery for projects under ₹1,00,000. 
Milestone-based for larger projects.
Q10: How do I start?
A: Fill the form below or email darshan@simpleinc.in. You will hear back within 24 hours.

SECTION 6 — Contact Form (embedded directly on this page, not just a link)
H2: "Start a Project"
Fields: Name, Email, Phone (optional), Project Type (dropdown), Budget Range (dropdown), 
Brief description (textarea)
Submit button: "Send My Brief"
On submit: POST to Formspree endpoint from .env.local
Success state: "Received. I will reply within 24 hours."
Error state: "Something went wrong. Email me directly at darshan@simpleinc.in"

Design note: This page should feel like a direct, confident pitch — not a form dump. 
The copy does the selling. The form closes it.
```

---

## PROMPT 5 — Portfolio / Work Pages

**Purpose:** Case studies that prove the work and generate long-tail keyword traffic

```
Read CLAUDE.md. Build the portfolio section:
app/work/page.tsx and app/work/[slug]/page.tsx

Also create content/work/ directory with 3 placeholder MDX/JSON case study files.

---

BUILD: app/work/page.tsx
Title: "Web Development Portfolio | React, Shopify & WordPress Projects | Simple Inc"
Description: "Browse Simple Inc's portfolio of web development projects — custom web apps, 
Shopify stores, WordPress sites and SaaS products built for clients across India."
H1: "Work"
Subheading: "Projects built with React, Next.js, Shopify, WordPress and Node.js."

Grid of project cards (3 columns desktop, 2 tablet, 1 mobile).
Each card:
- Project name (H2 — important for SEO, use descriptive names not client names)
- 1-line description
- Tech stack badges
- Thumbnail image (placeholder for now — use a coloured rectangle with project initials)
- "View Case Study" link

---

BUILD: content/work/ — 3 placeholder case studies

Case study 1: tailorflow.json or tailorflow.mdx
{
  "slug": "tailoring-shop-erp",
  "title": "Tailoring Shop ERP — Custom Order & Customer Management System",
  "client": "Independent tailoring business, Mumbai",
  "stack": ["Next.js 14", "PostgreSQL", "Prisma", "BullMQ", "WhatsApp API"],
  "duration": "8 weeks",
  "summary": "Built a full ERP for a tailoring shop replacing WhatsApp chaos and paper notebooks with a digital order tracking, measurement, and notification system.",
  "problem": "The client was managing 200+ active orders via WhatsApp messages and paper. Orders got lost. Delivery dates were missed. Customers had to call to check status.",
  "solution": "Custom-built ERP with order management, customer profiles, measurement storage, automated WhatsApp and SMS status updates via BullMQ, and a dashboard showing real-time order pipeline.",
  "result": "Zero missed orders since launch. Customer satisfaction measurably improved. Owner spends 2 hours less per day on manual follow-ups.",
  "metaTitle": "Tailoring Shop ERP Case Study | Next.js + WhatsApp API | Simple Inc",
  "metaDescription": "How Simple Inc built a custom order management ERP for a Mumbai tailoring business using Next.js, PostgreSQL, and WhatsApp automation."
}

Case study 2: keyboard-shop.json
{
  "slug": "mechanical-keyboard-ecommerce",
  "title": "Mechanical Keyboard E-Commerce — Shopify Store with Social Media Automation",
  "client": "Mumbai-based keyboard retailer",
  "stack": ["Shopify Liquid", "Node.js", "Meta Graph API", "Stable Diffusion"],
  "duration": "4 weeks",
  "summary": "Built a Shopify store and an automated content pipeline that generates and posts product content across Instagram and Facebook from a single product photo set.",
  "problem": "The client had 20 product photos and no bandwidth to create social content daily. The store was live but getting no organic traffic.",
  "solution": "Custom Shopify theme optimised for performance + a Node.js pipeline that uses Stable Diffusion to generate variants and Claude API to write captions, then auto-posts via Meta Graph API.",
  "result": "560 post combinations generated from 20 photos. 3 months of scheduled content ready on day one.",
  "metaTitle": "Shopify + Social Media Automation Case Study | Simple Inc Mumbai",
  "metaDescription": "How Simple Inc built a Shopify store and automated social media content pipeline for a Mumbai keyboard retailer using Node.js and Meta Graph API."
}

Case study 3: placeholder.json
{
  "slug": "web-application-development-mumbai",
  "title": "SaaS Platform — Multi-Tenant Web Application for Membership Management",
  "client": "Sports club, Mumbai",
  "stack": ["React", "NestJS", "PostgreSQL", "Prisma", "Docker"],
  "duration": "Ongoing",
  "summary": "Building a multi-tenant SaaS platform allowing sports clubs to manage memberships, bookings, payments and reporting from a single dashboard.",
  "problem": "The client was managing 500+ members via spreadsheets. No online booking, no automated renewals, no reporting.",
  "solution": "Multi-tenant NestJS backend with React dashboard. Each club gets its own isolated data environment. Stripe integration for payments. Role-based access control.",
  "result": "In active development. First tenant onboarded.",
  "metaTitle": "Multi-Tenant SaaS Development Case Study | NestJS + React | Simple Inc",
  "metaDescription": "Case study: Simple Inc building a multi-tenant SaaS platform for sports club management using React, NestJS and PostgreSQL."
}

---

BUILD: app/work/[slug]/page.tsx
Dynamic route that reads from content/work/ and renders a case study.
Metadata: use metaTitle and metaDescription from the case study file.
Canonical: https://www.simpleinc.in/work/[slug]

Page structure:
1. Breadcrumb: Home → Work → [Project Name] (with BreadcrumbList JSON-LD)
2. H1: project title
3. Meta bar: Client type | Stack badges | Duration
4. H2: The Problem (from "problem" field)
5. H2: The Solution (from "solution" field)
6. H2: The Result (from "result" field)
7. CTA: "Have a similar project? →" button to /contact

Include Article JSON-LD schema on each case study page.
```

---

## PROMPT 6 — Blog Infrastructure

**Purpose:** Blog architecture and first post — the site's long-term SEO engine

```
Read CLAUDE.md. Build the blog system and first post.

BUILD: app/blog/page.tsx
Title: "Web Development Blog | React, Shopify & WordPress Insights | Simple Inc"
Description: "Tips, guides, and insights on web development, Shopify, WordPress and 
building for the Indian market — by Darshan Parmar, Simple Inc Mumbai."
H1: "Blog"

List all posts sorted by date (newest first).
Each post shows: title, date, 1-line excerpt, "Read more →" link.
Add pagination if posts exceed 10.

BUILD: app/blog/[slug]/page.tsx
Dynamic route rendering MDX blog posts.
Metadata from post frontmatter: title, description, date, slug.
Canonical: https://www.simpleinc.in/blog/[slug]
JSON-LD: Article schema with author (Darshan Parmar), datePublished, dateModified.

Include at the bottom of every post:
- Author box: "Written by Darshan Parmar, full-stack developer at Simple Inc, Mumbai."
- Related posts (2 manually curated)
- CTA: "Working on a similar project? Get a free quote →" linked to /contact

---

BUILD: content/blog/website-cost-mumbai.mdx
This is post 1. It must go live on launch day.

Frontmatter:
---
title: "How Much Does a Website Cost in Mumbai? (2025 Pricing Guide)"
description: "A transparent breakdown of website development costs in Mumbai — from a simple business site to custom web applications. Real prices, no vague estimates."
slug: website-cost-mumbai
date: 2025-01-15
author: Darshan Parmar
---

Write the full 1,400-word post targeting the keyword "how much does a website cost in Mumbai".

Structure:
H1 (from title)
Intro (150 words): Directly address the search intent. Acknowledge that most agencies 
don't publish prices and explain you will. Use "website cost in Mumbai" naturally.

H2: Why Website Prices Vary So Much
3–4 paragraphs. Cover: complexity, features, tech stack, developer experience, 
agency vs freelancer. Use the term "web development Mumbai" once naturally.

H2: Website Pricing Breakdown — Mumbai Market (2025)
Table:
| Type | What's Included | Price Range |
|---|---|---|
| Basic business site | 5 pages, contact form, mobile responsive, SEO setup | ₹15,000–₹40,000 |
| WordPress site | Custom theme, ACF, WooCommerce, blog | ₹25,000–₹80,000 |
| Shopify store | Custom theme, product setup, payment gateway, mobile | ₹30,000–₹1,20,000 |
| Custom web app | React/Next.js frontend, Node.js backend, database | ₹80,000–₹5,00,000+ |
| SaaS product | Multi-tenant, complex features, DevOps included | ₹2,00,000+ |

H2: Agency vs Freelancer — What's the Price Difference?
Compare honestly. Agencies in Mumbai charge 30–50% more for the same output due to 
overhead. Freelancers offer direct access and lower cost. Trade-off is capacity.

H2: What Drives the Cost Up
Bullet list with explanations: custom design, third-party integrations, 
complex features (search, payments, user auth), content migration, multilingual, SEO work.

H2: What You Should Actually Budget For
Practical advice for a Mumbai SMB. Recommended starting budget by business type.
Mention ₹ ranges. Be specific.

H2: How to Get an Accurate Quote
CTA paragraph. Tell them what info to prepare before contacting a developer 
(goals, timeline, features list, examples of sites they like). 
Link to /contact naturally.

Conclusion (100 words): Summarise. Use "website development cost Mumbai" once. 
End with a soft CTA linking to /hire-me.

SEO rules for this post:
- Primary keyword "how much does a website cost in Mumbai" in: title, first 100 words, 
  one H2, meta description
- Secondary keywords: "web development cost India", "freelance developer Mumbai pricing", 
  "website price India" — use once each naturally
- Word count: 1,300–1,500 words
- Internal links: /services/web-development, /services/shopify, /hire-me, /contact
- No keyword stuffing. Write for the reader first.
```

---

## PROMPT 7 — About & Contact Pages

**Purpose:** Trust-building and conversion pages

```
Read CLAUDE.md. Build app/about/page.tsx and app/contact/page.tsx.

---

BUILD: app/about/page.tsx
Title: "About Darshan Parmar — Full-Stack Developer, Mumbai | Simple Inc"
Description: "Darshan Parmar is a full-stack developer based in Mumbai with 4+ years 
building React, Node.js, Shopify and WordPress projects for clients across India."
H1: "About Simple Inc"
Canonical: https://www.simpleinc.in/about
Include Person JSON-LD schema.

Page structure:

Opening (2 paragraphs, 200 words total):
Write in first person. Professional, not self-congratulatory.
Cover: who you are, where you are based (Mumbai), what you build.
Mention: 4+ years, current full-time role + agency work.
Do NOT include: salary, employer name, honeymoon, personal life details.

H2: "What I Work With"
Two columns of technology lists:
Frontend: React, Next.js, Vue.js, Tailwind CSS, Framer Motion
Backend: Node.js, NestJS, Express, REST APIs, WebSockets
CMS & E-Commerce: WordPress, Shopify Liquid, Headless CMS, ACF
Database: PostgreSQL, MySQL, Prisma ORM, SQLite
DevOps: Docker, PM2, Nginx, Ubuntu VPS, Vercel, CI/CD
Tools: Git, GitHub, Figma (implementation), VS Code

H2: "What Simple Inc Builds"
4 clear capability statements with icon:
- Business websites that load fast and rank on Google
- Shopify stores designed to convert
- WordPress sites with real CMS functionality
- Custom web apps and SaaS products for startups

H2: "How I Work"
3 short paragraphs on working style:
1. Fixed-price proposals — no surprise invoices
2. Regular updates — not black-box development
3. Direct access — WhatsApp/Slack with the developer, not an account manager

CTA at bottom: "Let's work together →" to /contact

---

BUILD: app/contact/page.tsx
Title: "Contact Simple Inc | Hire a Web Developer in Mumbai"
Description: "Get in touch with Simple Inc for web development, Shopify, WordPress or 
custom app projects. Based in Mumbai. Fast response guaranteed."
H1: "Let's Work Together"
Canonical: https://www.simpleinc.in/contact

Layout: 2-column on desktop. Left: contact info + what to expect. Right: form.

Left column:
- darshan@simpleinc.in (mailto link)
- Mumbai, Maharashtra, India
- "I reply within 24 hours on weekdays."
- "Currently available for new projects." (update this manually when at capacity)

What happens next (numbered list):
1. You fill the form
2. I review your brief and reply within 24 hours
3. We schedule a 30-min call to align on scope
4. You receive a proposal within 48 hours

Right column — Contact form:
Fields:
- Name (required)
- Email (required)
- Phone (optional, placeholder: "+91 98XXXXXXXX")
- Project type (required, select): Web Development / Shopify / WordPress / 
  SaaS / Web App / Other
- Budget range (required, select): Under ₹25,000 / ₹25,000–₹75,000 / 
  ₹75,000–₹2,00,000 / ₹2,00,000+
- Message (required, min 30 chars, placeholder: "Tell me what you're building...")
- Submit: "Send Message"

On success: Show "Message sent. I'll be in touch within 24 hours." 
Replace form with this message, don't redirect.
On error: "Something went wrong. Email me directly at darshan@simpleinc.in"

Form connects to Formspree endpoint from NEXT_PUBLIC_FORMSPREE_ENDPOINT env var.
No page redirect on submit — keep user on page with success state.
```

---

## PROMPT 8 — Technical SEO Finalization

**Purpose:** All remaining technical SEO — sitemap, robots, 404, performance audit

```
Read CLAUDE.md. Complete all technical SEO tasks.

TASK 1 — Sitemap
Verify next-sitemap.config.js is correctly configured as per CLAUDE.md.
Run: npm run build && npm run postbuild
Verify /public/sitemap.xml is generated with all pages.
Verify /public/robots.txt is generated correctly.

TASK 2 — Robots.txt (manual override if next-sitemap output is insufficient)
Create public/robots.txt:
User-agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you
Sitemap: https://www.simpleinc.in/sitemap.xml

TASK 3 — 404 Page (app/not-found.tsx)
Custom 404 page.
H1: "Page Not Found"
Body: "The page you're looking for doesn't exist or has moved."
2 links: "Go Home" → / and "View Services" → /services
Keep it clean. No jokes. No elaborate design.
Meta: noindex, nofollow (404s should never be indexed).

TASK 4 — Security Headers (next.config.js)
Add these response headers for all routes:
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains

TASK 5 — Image optimisation audit
Find every <img> tag in the codebase.
Replace all with next/image <Image> component.
Ensure all images have: width, height (explicit), alt text, WebP format source.
Hero and above-fold images: add priority={true}.

TASK 6 — Font preloading audit
Verify fonts are loaded via next/font and not via <link> tags.
Verify no Google Fonts external requests appear in Network tab.

TASK 7 — Bundle analysis
Run: ANALYZE=true npm run build
Review bundle output. Flag any dependency over 50KB that can be replaced.

TASK 8 — Canonical verification
Write a script (scripts/check-canonicals.ts) that reads all pages and verifies 
each exports a canonical URL matching its route. Log any missing or mismatched canonicals.

TASK 9 — Schema validation
Output all JSON-LD schemas to console in development mode.
Manually validate at: https://validator.schema.org/
Fix any errors before launch.

After all tasks complete, run a full Lighthouse audit in Chrome DevTools:
Target: Performance > 90, Accessibility > 95, Best Practices > 95, SEO = 100.
Fix any failing items before launch.
```

---

## PROMPT 9 — Blog Post Generation Template

**Purpose:** Reusable prompt for writing each new blog post. Use this monthly.

```
Read CLAUDE.md. Write a new blog post for simpleinc.in/blog.

Target keyword: [INSERT KEYWORD]
Slug: [INSERT SLUG]
Target word count: 1,400–1,800 words

SEO rules for this post:
- Primary keyword in: H1/title, first 100 words, one H2, meta description
- Secondary keywords (2–3): use once each, naturally
- Internal links: link to at least 2 relevant service pages and /contact
- External links: link to 1–2 authoritative sources (Google, MDN, Shopify docs)
- Reading level: business owner, not developer
- No keyword stuffing
- Every paragraph should answer a real question a client might have

Structure:
---
title: "[TITLE — include primary keyword, 55–65 chars]"
description: "[META DESCRIPTION — 140–155 chars, include primary keyword + CTA verb]"
slug: [SLUG]
date: [DATE]
author: Darshan Parmar
---

H1 (from title)
Intro (100–150 words) — address the reader's problem directly
H2 — [First major section]
H2 — [Second major section]
H2 — [Third major section — include data, examples, or comparison table]
H2 — [Fourth major section]
H2 — [Actionable takeaway or "what to do next"]
Conclusion (100 words) — summarise, link to /hire-me or /contact

Author box (standard, always the same):
"Written by Darshan Parmar. Darshan is a full-stack developer based in Mumbai, 
building React, Next.js, Shopify and WordPress projects at Simple Inc."

After writing, output:
1. The full MDX post
2. Suggested meta title (under 60 chars)
3. Suggested meta description (under 155 chars)
4. 3 suggested internal links with anchor text
5. Tweet-length summary for social sharing
```

---

## PROMPT 10 — Testimonial + Social Proof Update

**Purpose:** Add real testimonials once collected. Run this after getting 3+ client reviews.

```
Read CLAUDE.md. Update the testimonials section on the homepage and add a 
/testimonials page if there are 5 or more reviews.

For each testimonial provided:
- Name (and first name only if client wants privacy)
- Company type (not necessarily company name)
- Project type
- Quote text

Rules:
- Do not fabricate or embellish any quote
- Display exactly as provided, with only punctuation/grammar corrections if needed
- Include person's first name and company type minimum
- Photos: use placeholder avatar if no photo provided
- Add Review JSON-LD schema for each testimonial (aggregateRating on homepage)

AggregateRating schema (add to LocalBusiness schema when 3+ reviews exist):
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "[NUMBER]"
}

If 5+ testimonials: create app/testimonials/page.tsx
Title: "Client Testimonials | Simple Inc Mumbai Web Development"
Description: "Read what clients say about working with Simple Inc — web development, 
Shopify and WordPress projects delivered across Mumbai and India."
H1: "What Clients Say"
```

---

## PROMPT 11 — Maintenance & Monthly SEO Tasks

**Purpose:** Run this prompt monthly to keep the site healthy

```
Read CLAUDE.md. Perform monthly SEO and maintenance tasks for simpleinc.in.

TASK 1 — Check for broken links
Run: npx broken-link-checker https://www.simpleinc.in --recursive
Fix any broken internal links found.

TASK 2 — Update copyright year
Check footer copyright year. Update if needed.

TASK 3 — Add new blog post
Use PROMPT 9 template with this month's target keyword: [INSERT KEYWORD]

TASK 4 — Check Google Search Console
Report any pages with:
- Coverage errors (fix crawl blocks)
- Pages with impressions but CTR < 2% (improve title/description)
- Pages with CTR > 5% and position > 10 (add internal links + improve content)

TASK 5 — Update "Currently available" status on /contact
If at capacity: change to "Currently fully booked. Join the waitlist."
If available: "Currently accepting new projects."

TASK 6 — Dependency updates
Run: npm outdated
Update non-breaking dependencies: npm update
Check for Next.js updates and review changelog before updating major version.

TASK 7 — Performance check
Run Lighthouse on: /, /hire-me, latest blog post
Flag any metric below: Performance 85, SEO 95.
Fix regressions.

TASK 8 — Add new work/case study if any projects completed this month
Use the case study structure from PROMPT 5.
```

---

## Quick Reference — All Target URLs

| Page | URL | Primary Keyword |
|------|-----|----------------|
| Homepage | / | freelance web developer Mumbai |
| Hire Me | /hire-me | hire web developer Mumbai |
| Services | /services | web development services Mumbai |
| Web Dev | /services/web-development | web development company Mumbai |
| Shopify | /services/shopify | Shopify developer Mumbai |
| WordPress | /services/wordpress | WordPress developer Mumbai |
| SaaS | /services/saas-development | SaaS development Mumbai |
| Work | /work | web developer portfolio Mumbai |
| Tailoring ERP | /work/tailoring-shop-erp | custom ERP development Mumbai |
| About | /about | full-stack developer Mumbai |
| Contact | /contact | hire web developer Mumbai |
| Blog index | /blog | web development blog India |
| Post 1 | /blog/website-cost-mumbai | how much does a website cost in Mumbai |
| Post 2 | /blog/wordpress-vs-shopify-india | WordPress vs Shopify India |
| Post 3 | /blog/hire-web-developer-mumbai | how to hire a web developer in Mumbai |
| Post 4 | /blog/headless-cms-vs-wordpress-india | headless CMS vs WordPress India |
| Post 5 | /blog/best-tech-stack-startups-india | best tech stack for startups India |
| Post 6 | /blog/shopify-store-cost-india | Shopify store cost India |

---

## Token Cost Estimates

| Prompt | Estimated tokens | Approx. cost (Sonnet 4) |
|--------|-----------------|------------------------|
| PROMPT 0 (scaffold) | ~3k in / 2k out | $0.04 |
| PROMPT 1 (layout) | ~4k in / 5k out | $0.09 |
| PROMPT 2 (homepage) | ~4k in / 6k out | $0.10 |
| PROMPT 3 (services) | ~5k in / 10k out | $0.16 |
| PROMPT 4 (hire-me) | ~4k in / 5k out | $0.09 |
| PROMPT 5 (portfolio) | ~4k in / 6k out | $0.10 |
| PROMPT 6 (blog) | ~4k in / 8k out | $0.13 |
| PROMPT 7 (about/contact) | ~4k in / 5k out | $0.09 |
| PROMPT 8 (tech SEO) | ~4k in / 4k out | $0.07 |
| **Total build** | — | **~₹70–₹90** |
| Per blog post (PROMPT 9) | ~3k in / 5k out | $0.09 (~₹7.50) |
