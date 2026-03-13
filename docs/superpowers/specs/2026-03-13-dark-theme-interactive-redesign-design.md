# Dark Theme & Interactive Redesign — Design Spec

**Date:** 2026-03-13
**Status:** Approved
**Approach:** Pure Framer Motion + CSS (zero new dependencies)

## Summary

Transform the Simple Inc website from a clean-but-plain light theme into a bold, energetic dark-themed experience with rich interactive effects. All animations and interactions are built using Framer Motion (already in the project), pure CSS animations, and custom React hooks. No new dependencies.

The site should feel like an Awwwards-worthy agency site — animated gradient orbs, particle grids, cursor-reactive elements, 3D tilt cards, magnetic buttons, and cinematic text reveals — while maintaining >90 mobile PageSpeed and full SEO compliance.

## 1. Dark Theme & Visual Foundation

### 1.1 Color System

**Backgrounds (darkest to lightest):**
| Token | Value | Usage |
|-------|-------|-------|
| Base | `#0a0a0a` | Primary page background |
| Surface | `#111111` | Alternating section background |
| Elevated | `#1a1a1a` | Cards, elevated elements |
| Border | `#262626` | Card borders, dividers |

**Accent colors:**
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `sky-500` (#0ea5e9) | Primary CTAs, links, highlights |
| Secondary | `indigo-500` (#6366f1) | Gradient endpoints, secondary accents |
| Tertiary | `violet-500` (#8b5cf6) | Tertiary gradient orbs, process steps |
| Gradient | sky-500 → indigo-500 | Progress bars, gradient borders |

**Text colors:**
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#f5f5f5` | Headings, primary text |
| Secondary | `#a3a3a3` | Body text, descriptions |
| Muted | `#525252` | Labels, captions, meta text |
| Accent | `sky-500` | Links, highlighted words |

### 1.2 Background Treatment

- **Entire site is dark.** No light sections. Sections alternate between `#0a0a0a` and `#111111`.
- **Dot grid texture:** Faint radial-gradient dot pattern on all dark sections. `background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 24px 24px;` Pure CSS, zero performance cost.
- **Section transitions:** 64px gradient `div` elements between sections. Smooth fade from one background shade to the next. No hard edges anywhere.
- **Cards:** Background `#1a1a1a`, border `#262626`, `rounded-lg`. On hover: border transitions to `sky-500` with `box-shadow: 0 0 20px rgba(14,165,233,0.15)` glow.

### 1.3 Logo Treatment

`logo.png` currently exists at the project root (`/logo.png`). **Prerequisite:** Move/copy it to `public/logo.png` before implementation so `next/image` can serve it as a static asset. It has black "Simple" text and sky-blue "inc" text on a transparent background.

- Replace all text-based logos (Navbar, Footer) with `logo.png` image.
- Use `logo.png` in: Navbar, Footer, Hero section (larger), Loading screen, OG image, favicon.
- **Dark background treatment:** Apply `filter: brightness(0) invert(1)` to make the logo white-on-dark. Note: this filter inverts ALL colors — the sky-blue "inc" will also become white/near-white on dark backgrounds. This is acceptable; the accent color is carried by the rest of the site's design system, not the logo alone.
- If a separate white+blue logo variant is created in the future, swap the filter for the new asset. Until then, the inverted logo is the approach.
- Use `next/image` with explicit width/height for all logo placements.

**Logo sizes per placement:**
| Placement | Width | Height |
|-----------|-------|--------|
| Navbar (desktop) | 120px | auto |
| Navbar (mobile) | 100px | auto |
| Footer | 120px | auto |
| Hero | 180px | auto |
| Loading screen | 160px | auto |

### 1.4 Navbar Updates

**Desktop:**
- Background: `rgba(10,10,10,0.8)` with `backdrop-filter: blur(12px)`.
- Border bottom: `1px solid #1a1a1a`.
- Nav links: `#a3a3a3` default, `#f5f5f5` on hover, `sky-500` when active.
- Contact CTA button in nav: `sky-500` background with `box-shadow: 0 0 20px rgba(14,165,233,0.2)` glow on hover.
- Logo: `logo.png` with `filter: brightness(0) invert(1)`.

**Mobile:**
- Hamburger bars: `bg-white` (was `bg-slate-900`).
- Mobile menu background: `#111111`.
- Mobile menu border: `border-color: #262626`.
- Mobile link text: `#a3a3a3` default, `#f5f5f5` on tap/active, `sky-500` for current page.
- Mobile contact CTA: same as desktop (sky-500 background).

### 1.5 Footer Updates

- Background: `#0a0a0a` with `border-top: 1px solid #1a1a1a`.
- Logo: `logo.png` with `filter: brightness(0) invert(1)`.
- Link colors: `#737373` default, `#a3a3a3` on hover.
- Social links same treatment.

### 1.6 Typography on Dark

- All existing font choices remain (Playfair Display, Inter, JetBrains Mono).
- H1/H2 headings: `#f5f5f5`.
- Body text: `#a3a3a3`.
- Section labels (above H2s): `sky-500`, `letter-spacing: 3px`, `text-transform: uppercase`, `font-size: 11px`.

## 2. Interactive Effects

All cursor-dependent effects (spotlight, magnetic, 3D tilt, particle mouse interaction) are **disabled on touch devices** via `useIsTouchDevice()` hook. Mobile gets gradient orbs, text reveals, scroll progress, section transitions, and scroll-triggered fadeInUp animations only.

**Touch detection:** `useIsTouchDevice()` returns `true` when `matchMedia('(hover: none) and (pointer: coarse)').matches` is true. This correctly identifies touch-primary devices while allowing laptops with touchscreens (which have `hover: hover`) to keep cursor effects.

### 2.1 Cursor Spotlight

**What:** A subtle radial glow that follows the cursor across all dark sections.

**Hook:** `useCursorPosition()` — tracks mouse via `mousemove` event listener, throttled to 60fps via `requestAnimationFrame`.

**Render:** A fixed-position `div` with `radial-gradient(circle, rgba(14,165,233,0.07), transparent 70%)` positioned at cursor coordinates via CSS `transform: translate()`.

**Specs:**
- Radius: 200px
- Opacity: 7% sky-500
- GPU-accelerated: uses `transform` only (no top/left)
- `pointer-events: none`
- `z-index: 40` (below navbar z-50, above page content)
- Disabled on touch devices

**Component:** `components/effects/CursorSpotlight.tsx`
**Where:** Rendered once in root layout, covers all dark sections.

### 2.2 Magnetic Buttons

**What:** CTA buttons that subtly pull toward the cursor when nearby, with intensified glow on hover.

**Hook:** `useMagneticEffect(strength: number)` — calculates X/Y offset from button center when mouse is within ~80px proximity zone.

**Render:** Framer Motion `motion.div` wrapper with `animate` prop receiving calculated offset. On mouse leave, springs back with `type: "spring", stiffness: 300, damping: 15`.

**Specs:**
- Proximity zone: 80px from button edge
- Max offset: 8px in any direction
- Glow on hover: `box-shadow: 0 0 30px rgba(14,165,233,0.3)`
- Spring-back on leave
- On touch devices: no magnetic effect, button renders normally with standard tap feedback

**Component:** `components/interactive/MagneticButton.tsx` (wraps existing `Button` component)
**Where:** All primary CTA buttons — "Start Your Project", "Get a Quote", "Book a Call", "Contact Us", nav contact button.

### 2.3 3D Tilt Cards

**What:** Cards that tilt in 3D based on mouse position, with a moving glare/spotlight overlay.

**Hook:** `use3DTilt(maxTilt: number)` — calculates `rotateX` and `rotateY` from mouse position relative to card center.

**Render:** CSS `transform: perspective(800px) rotateY(Xdeg) rotateX(Ydeg)` applied via Framer Motion. A `linear-gradient` overlay div repositions based on mouse to simulate light reflection.

**Specs:**
- Max tilt: 12 degrees
- Perspective: 800px
- Glare overlay: `linear-gradient(135deg, rgba(255,255,255,0.03), transparent 60%)` — repositions with mouse
- Border glow on hover: border color shifts to `sky-500`, `box-shadow: 0 0 20px rgba(14,165,233,0.15)`
- Spring transition on mouse leave: `type: "spring", stiffness: 200, damping: 20`
- **Touch fallback:** On touch devices, card renders with static glow border (`sky-500` border, `box-shadow: 0 0 15px rgba(14,165,233,0.1)`) always visible. No tilt, no glare. The border glow makes cards visually distinct without requiring hover.

**Component:** `components/interactive/TiltCard.tsx` (wraps card content)
**Where:** Service cards, work/portfolio cards, "Why Us" cards, blog index cards.

### 2.4 Particle Grid / Constellation

**What:** Floating dots with lines connecting nearby dots in the hero section background. Dots near the cursor glow brighter and pull toward it.

**Implementation:** Uses a single `<svg>` element for both dots (`<circle>`) and lines (`<line>`). Mouse interaction mutates SVG element attributes directly via refs (bypassing React re-renders) inside a `requestAnimationFrame` loop.

**Specs:**
- Dot count: 50 dots (fixed)
- Dot size: 1.5–2.5px (randomized on mount)
- Dot colors: `sky-500` and `indigo-500` at 30–50% opacity
- Line connections: drawn between dots within 120px of each other, max 80 lines total (sorted by distance, closest first), 6–8% opacity
- Float animation: CSS `@keyframes float` with random durations (15–25s) and random offsets per dot. No JS animation loop for floating.
- Mouse interaction: dots within 150px of cursor get opacity boost (to 80%) + subtle pull (5–10px offset toward cursor). Applied via direct DOM mutation on SVG attributes inside rAF callback — no React state updates.
- Lazy-loaded: component uses `next/dynamic` with `ssr: false`
- Disabled entirely on touch devices

**Component:** `components/effects/ParticleGrid.tsx`
**Where:** Hero section background only (homepage).

### 2.5 Text Reveal Animations

**What:** Hero headline reveals word-by-word with staggered fade+slide. Section headings get enhanced line-level reveals.

**Component:** `components/interactive/TextReveal.tsx` — splits text into words, wraps each in `motion.span`.

**Hero H1 specs:**
- Word-by-word reveal with 0.08s stagger between words
- Per word: `opacity: 0→1`, `y: 16→0`, `duration: 0.5s`, `ease: easeOut`
- Last 1–2 words colored `sky-500`
- Triggered on page load (not scroll)

**Section H2 specs:**
- Line-level fadeInUp (existing pattern, enhanced timing)
- `opacity: 0→1`, `y: 20→0`, `duration: 0.6s`
- Triggered via `whileInView`, `once: true`

**Subtitle specs:**
- Fades in 0.3s after heading animation completes
- `opacity: 0→1`, `y: 12→0`

**Where:** Hero H1 gets word-by-word. All section H2s get line-level. Subtitles everywhere.

### 2.6 Animated Gradient Orbs

**What:** Large, slowly drifting blurred gradient spheres as ambient background decoration.

**Component:** `GradientOrbs` — renders 2–3 absolute-positioned `div` elements per section with `radial-gradient` + `filter: blur()`.

**Specs:**
- Size: 200–400px diameter
- Blur: 40–60px
- Opacity: 8–18% depending on color
- Animation: Pure CSS `@keyframes drift` — each orb moves on a unique translate X/Y path over 20–30s, infinite loop. No JS.
- `will-change: transform` for GPU compositing
- Filter blur is applied statically (not animated)

**Presets (component accepts a `variant` prop):**

| Variant | Orb 1 | Orb 2 | Orb 3 |
|---------|-------|-------|-------|
| `hero` | sky-500 15%, 350px, top-left (-5%, 10%), blur 60px | indigo-500 12%, 400px, bottom-right (60%, 70%), blur 55px | violet-500 8%, 200px, center-right (55%, 30%), blur 40px |
| `services` | indigo-500 14%, 300px, top-right (65%, 5%), blur 50px | violet-500 10%, 250px, bottom-left (10%, 70%), blur 45px | — |
| `work` | sky-500 12%, 350px, top-left (5%, 10%), blur 55px | indigo-500 10%, 300px, bottom-right (60%, 65%), blur 50px | — |
| `whyus` | violet-500 12%, 280px, top-right (60%, 5%), blur 45px | sky-500 10%, 320px, bottom-left (10%, 65%), blur 50px | — |
| `testimonials` | indigo-500 10%, 300px, center-left (5%, 40%), blur 50px | sky-500 8%, 250px, top-right (65%, 10%), blur 40px | — |
| `cta` | sky-500 15%, 350px, top-left (15%, 10%), blur 55px | indigo-500 12%, 300px, bottom-right (55%, 60%), blur 50px | — |
| `default` | sky-500 10%, 300px, top-left (10%, 15%), blur 50px | indigo-500 8%, 250px, bottom-right (60%, 60%), blur 45px | — |

Positions are (left%, top%) within the section's relative container. "Default" variant used for pages without a specific preset.

**Component:** `components/effects/GradientOrbs.tsx`
**Where:** Every section on every page.

### 2.7 Scroll Progress Indicator

**What:** A thin glowing progress bar fixed to the top of the viewport that fills as you scroll.

**Specs:**
- Height: 3px
- Background track: `#1a1a1a`
- Fill: `linear-gradient(90deg, sky-500, indigo-500)`
- Glow: `box-shadow: 0 0 10px rgba(14,165,233,0.5)`
- Implementation: Framer Motion `useScroll()` + `motion.div` with `scaleX` transform (origin left)
- Zero layout cost (fixed position, transform only)
- `z-index: 50` (same as navbar, positioned directly below it)
- `top`: offset by actual navbar height — `top: 4rem` (64px) on mobile, `md:top: 5rem` (80px) on desktop. Matches navbar's `h-16 md:h-20`.

**Component:** `components/effects/ScrollProgress.tsx`
**Where:** Every page, rendered in root layout below the navbar.

### 2.8 Smooth Section Transitions

**What:** Gradient fade divs between sections instead of hard color edges.

**Specs:**
- Height: 64px (fixed, not responsive)
- Background: `linear-gradient(180deg, [from], [to])`
- Alternates between `#0a0a0a ↔ #111111`

**Component:** `components/effects/SectionTransition.tsx` — accepts `from` and `to` color props.
**Where:** `SectionTransition` components are placed manually in each page file between section components. They are NOT part of `SectionWrapper` — they exist outside of sections, in the page layout. This keeps `SectionWrapper` simple (it only handles animation) and gives page files explicit control over section ordering and color alternation.

## 3. Loading Screen

**What:** A logo-centered loading screen on initial page load.

**Sequence:**
1. Dark screen (`#0a0a0a`)
2. `logo.png` fades in — `scale: 0.9→1`, `opacity: 0→1`, `duration: 0.5s`
3. Thin progress bar animates below logo — purely cosmetic timed animation, `scaleX: 0→1` over 0.8s with `ease: easeInOut`
4. Once both the 0.8s minimum timer has elapsed AND `document.readyState === 'complete'` (whichever is later): logo scales up `1→1.05`, everything fades out `opacity: 1→0`, `duration: 0.3s`
5. Page content reveals

**State management:** The component uses two boolean states: `isMinTimeElapsed` (set after 0.8s timeout) and `isDocumentReady` (set when `document.readyState === 'complete'`, checked via `readystatechange` listener). The exit animation triggers when both are true.

**Specs:**
- Minimum duration: 0.8s (prevents flash)
- Maximum duration: tied to `document.readyState === 'complete'`
- Progress bar: purely cosmetic (not tied to actual load progress), 120px wide, 2px height, sky→indigo gradient
- Logo: `logo.png` with `filter: brightness(0) invert(1)`, centered
- Ambient gradient orbs in background (sky + indigo, very subtle)
- Initial page load only — not on client-side route changes (component checks a `sessionStorage` flag; sets it after first show)
- Background color `#0a0a0a` matches page background to prevent flash

**Component:** `components/effects/LoadingScreen.tsx`
**Where:** Rendered in root layout with `AnimatePresence`.

## 4. Effect Map by Page

| Page | Orbs | Particles | TextReveal | 3D Tilt | Magnetic | Spotlight | Progress |
|------|------|-----------|------------|---------|----------|-----------|----------|
| Homepage | Yes | Yes (hero) | Yes (word) | Yes | Yes | Yes | Yes |
| Service Pages | Yes | No | Yes (line) | Yes | Yes | Yes | Yes |
| Work / Portfolio | Yes | No | Yes (line) | Yes | Yes | Yes | Yes |
| Hire Us | Yes | No | Yes (line) | No | Yes | Yes | Yes |
| About | Yes | No | Yes (line) | No | Yes | Yes | Yes |
| Contact | Yes | No | Yes (line) | No | Yes | Yes | Yes |
| Blog Index | Yes | No | Yes (line) | Yes | No | Yes | Yes |
| Blog Post | Yes | No | Yes (line) | No | No | Yes | Yes |
| 404 Page | Yes | No | Yes (line) | No | Yes | Yes | No |

## 5. New File Structure

```
components/
├── effects/
│   ├── CursorSpotlight.tsx      → Global cursor radial glow
│   ├── GradientOrbs.tsx         → Ambient drifting gradient spheres
│   ├── ParticleGrid.tsx         → Hero particle constellation
│   ├── ScrollProgress.tsx       → Top scroll progress bar
│   ├── SectionTransition.tsx    → Gradient fade between sections
│   └── LoadingScreen.tsx        → Initial load logo screen
├── interactive/
│   ├── MagneticButton.tsx       → Cursor-magnetic CTA wrapper
│   ├── TiltCard.tsx             → 3D tilt card wrapper
│   └── TextReveal.tsx           → Word/line animated text reveal
hooks/
├── useCursorPosition.ts         → Mouse position tracking (rAF throttled)
├── useMagneticEffect.ts         → Magnetic pull calculation
├── use3DTilt.ts                 → 3D tilt rotation calculation
└── useIsTouchDevice.ts          → Touch device detection
```

**Note:** `hooks/` is a new top-level directory. The `@/` path alias in `tsconfig.json` maps to `./` (project root), so `@/hooks/useCursorPosition` will resolve correctly without additional config changes.

## 6. Files to Modify

All existing pages and components need updates for the dark theme:

**Layout & Global:**
- `app/layout.tsx` — Add LoadingScreen, CursorSpotlight, ScrollProgress. Update body background to `#0a0a0a`. Add `className="bg-[#0a0a0a]"` to `<body>`.
- `app/template.tsx` — No changes (page transitions remain).
- `tailwind.config.ts` — Add custom dark color tokens, extend with new animation keyframes (drift, float).
- `lib/animations.ts` — Add new motion variants for text reveal, enhanced stagger, card glow.
- `globals.css` — Add CSS keyframes for gradient orb drift, particle float, dot grid background utility class. Add `@media (prefers-reduced-motion: reduce)` rules to pause/disable all CSS keyframe animations (drift, float).

**Layout Components:**
- `components/layout/Navbar.tsx` — Dark theme colors (see 1.4 for both desktop and mobile specs), logo.png image, glassmorphic background, glowing contact button.
- `components/layout/Footer.tsx` — Dark theme colors, logo.png image.

**Section Components (all need dark theme colors):**
- `components/sections/Hero.tsx` — Add ParticleGrid, TextReveal for H1, GradientOrbs, update all colors.
- `components/sections/Services.tsx` — Wrap cards in TiltCard, add GradientOrbs, dark colors.
- `components/sections/Work.tsx` — Wrap cards in TiltCard, add GradientOrbs, dark colors.
- `components/sections/WhyUs.tsx` — Wrap cards in TiltCard, dark colors.
- `components/sections/Testimonials.tsx` — Dark colors, glowing left borders (sky-500 and indigo-500 alternating).
- `components/sections/Process.tsx` — Dark colors, gradient connecting lines (sky→indigo→violet), accent-colored step numbers with matching glow backgrounds.
- `components/sections/CTA.tsx` — GradientOrbs, MagneticButton for CTA, dark colors.
- `components/sections/ServicePageTemplate.tsx` — Dark theme throughout, TiltCard where appropriate.

**UI Components:**
- `components/ui/Button.tsx` — Update colors only (Button stays a server-compatible Link component, no hooks added). Dark-compatible colors:
  - Primary variant: `sky-500` bg, `white` text, `box-shadow: 0 0 20px rgba(14,165,233,0.2)` on hover.
  - Outline variant: `border: 1px solid #333`, `text: #e5e5e5`, hover: `border-color: #555`, `text: #f5f5f5`. Background transparent.
  - **Magnetic wrapping is applied externally:** Consuming code wraps `<MagneticButton><Button ... /></MagneticButton>` where magnetic effect is desired (CTA buttons in Hero, CTA section, Contact page, etc.). Button.tsx itself does not import or use MagneticButton. This keeps Button as a simple, server-compatible component.
- `components/ui/Badge.tsx` — Dark-compatible colors: `rgba(14,165,233,0.1)` background, `sky-400` text.
- `components/ui/StatCounter.tsx` — Number text: `#f5f5f5`. Label text: `#525252`.
- `components/ui/Accordion.tsx` — Border: `#262626`. Background: `#1a1a1a`. Question text: `#f5f5f5`. Answer text: `#a3a3a3`. Toggle icon: `#737373`.
- `components/ui/ContactForm.tsx` — Full dark spec:
  - Input background: `#1a1a1a`
  - Input border: `#262626`, focus: `sky-500` with `ring-1 ring-sky-500`
  - Input text: `#f5f5f5`
  - Placeholder text: `#525252`
  - Label text: `#a3a3a3`
  - Select dropdown: same as input
  - Submit button: MagneticButton with primary variant
  - Error state: `red-500` border, `red-400` text message
  - Success state: `green-500` border highlight, `green-400` success message text
  - Disabled state: `opacity: 0.5`, `cursor: not-allowed`
- `components/ui/SectionWrapper.tsx` — No changes to SectionWrapper. It remains purely an animation container. SectionTransitions are placed manually in page files (see 2.8).

**Pages (all need SectionTransition components placed between sections):**
- `app/page.tsx` — Add SectionTransitions between all homepage sections.
- `app/about/page.tsx` — Dark theme + SectionTransitions.
- `app/contact/page.tsx` — Dark theme + SectionTransitions.
- `app/hire-us/page.tsx` — Dark theme + SectionTransitions.
- `app/services/page.tsx` — Dark theme + SectionTransitions.
- `app/services/*/page.tsx` — Dark theme via ServicePageTemplate changes.
- `app/work/page.tsx` — Dark theme + SectionTransitions.
- `app/work/[slug]/page.tsx` — Dark theme + SectionTransitions.
- `app/blog/page.tsx` — Dark theme + SectionTransitions.
- `app/blog/[slug]/page.tsx` — Dark theme.
- `app/not-found.tsx` — Dark theme (background `#0a0a0a`, light text, GradientOrbs, MagneticButton for "Back to Home" CTA).

## 7. Performance Budget

| Metric | Current Target | With Redesign |
|--------|---------------|---------------|
| Bundle size delta | — | +0KB new deps |
| LCP | < 2.5s | < 2.5s (no change — CSS animations don't block) |
| INP | < 100ms | < 100ms (rAF-throttled hooks) |
| CLS | < 0.1 | < 0.1 (all effects are overlays with pointer-events:none) |
| Mobile PageSpeed | > 90 | > 90 (cursor effects disabled on mobile) |
| Desktop PageSpeed | > 95 | > 95 |

**Performance rules:**
- All animations use CSS `transform` and `opacity` only (GPU composited)
- `will-change: transform` on animated gradient orbs
- CSS `filter: blur()` applied once (not animated)
- Cursor tracking throttled to rAF (max 60fps)
- Particle grid lazy-loaded via `next/dynamic` with `ssr: false`
- Particle grid mouse interaction uses direct DOM mutation on SVG attributes (no React state/re-renders)
- Particle grid line count capped at 80 (prevents O(n^2) explosion)
- Particle grid + all cursor effects disabled on touch/mobile
- Loading screen minimum 0.8s, no artificial delay beyond actual load

## 8. SEO Compliance

No SEO changes. All existing structured data, meta tags, canonical URLs, heading hierarchy, and sitemap remain identical. The redesign is purely visual/interactive:

- All text content remains in the DOM (no canvas/WebGL rendering)
- Heading hierarchy unchanged
- All images still use `next/image` with alt text
- No new third-party scripts
- No layout shift from animations (all overlays with `position: absolute/fixed`)
- `prefers-reduced-motion` respected via:
  - Framer Motion: existing `MotionProvider` with `reducedMotion="user"` handles all Framer Motion animations
  - CSS animations: `@media (prefers-reduced-motion: reduce) { .drift-orb, .float-particle { animation: none !important; } }` in `globals.css` pauses all CSS keyframe animations

## 9. Mobile Behavior

Touch devices get a curated subset of effects:

**Enabled on mobile:**
- Gradient orbs (CSS keyframes only, no mouse interaction)
- Text reveal animations (scroll-triggered)
- Scroll progress indicator
- Section transitions (gradient fades)
- Enhanced scroll-triggered fadeInUp (existing pattern)
- Stat counter animations (existing)

**Disabled on mobile:**
- Cursor spotlight
- Magnetic buttons — falls back to standard button rendering (no wrapper div, no magnetic effect). Tap triggers normal button behavior.
- 3D tilt cards — falls back to static presentation: cards show a persistent subtle glow border (`border-color: rgba(14,165,233,0.2)`, `box-shadow: 0 0 10px rgba(14,165,233,0.05)`) always visible. No tilt, no glare overlay.
- Particle grid entirely disabled on mobile (not rendered)

**Detection:** `useIsTouchDevice()` hook returns `true` when `matchMedia('(hover: none) and (pointer: coarse)').matches` is true. This correctly identifies touch-primary devices (phones, tablets) while preserving cursor effects on touchscreen laptops that also have a trackpad/mouse.
