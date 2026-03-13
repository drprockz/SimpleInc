# Dark Theme & Interactive Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Simple Inc website from a light theme into a bold, dark-themed experience with 8 interactive effects (cursor spotlight, magnetic buttons, 3D tilt cards, particle grid, text reveals, gradient orbs, scroll progress, section transitions) plus a loading screen — all using Framer Motion + CSS with zero new dependencies.

**Architecture:** New components in `components/effects/` (6 ambient effect components) and `components/interactive/` (3 user-interaction components), powered by 4 custom hooks in `hooks/`. All cursor-dependent effects are disabled on touch devices. Every existing component gets dark theme color swaps. SectionTransition divs are placed manually between sections in page files.

**Tech Stack:** Next.js 14 App Router, Framer Motion (existing), Tailwind CSS, pure CSS keyframes, custom React hooks

**Spec:** `docs/superpowers/specs/2026-03-13-dark-theme-interactive-redesign-design.md`

---

## Chunk 1: Foundation & Configuration

### Task 1: Move logo to public directory

**Files:**
- Move: `logo.png` → `public/logo.png`

- [ ] **Step 1: Move logo.png**

```bash
cp logo.png public/logo.png
```

- [ ] **Step 2: Verify**

```bash
ls -la public/logo.png
```
Expected: File exists with same size as original.

- [ ] **Step 3: Commit**

```bash
git add public/logo.png
git commit -m "chore: copy logo.png to public directory for next/image"
```

---

### Task 2: Update Tailwind config with dark color tokens and animation keyframes

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add dark color tokens and keyframe animations to tailwind config**

Add to `theme.extend`:

```typescript
colors: {
  dark: {
    base: '#0a0a0a',
    surface: '#111111',
    elevated: '#1a1a1a',
    border: '#262626',
  },
},
keyframes: {
  'drift-1': {
    '0%, 100%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(30px, -20px)' },
    '50%': { transform: 'translate(-20px, 15px)' },
    '75%': { transform: 'translate(15px, 25px)' },
  },
  'drift-2': {
    '0%, 100%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(-25px, 15px)' },
    '50%': { transform: 'translate(20px, -25px)' },
    '75%': { transform: 'translate(-15px, -10px)' },
  },
  'drift-3': {
    '0%, 100%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(20px, 20px)' },
    '50%': { transform: 'translate(-30px, -10px)' },
    '75%': { transform: 'translate(10px, -20px)' },
  },
},
animation: {
  'drift-1': 'drift-1 20s ease-in-out infinite',
  'drift-2': 'drift-2 25s ease-in-out infinite',
  'drift-3': 'drift-3 30s ease-in-out infinite',
},
```

- [ ] **Step 2: Verify build**

```bash
npx next build 2>&1 | tail -5
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add dark color tokens and drift keyframes to Tailwind config"
```

---

### Task 3: Update globals.css with dark base styles, keyframes, and reduced-motion rules

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update heading base styles from slate to neutral light**

Replace the existing `@layer base` heading styles:

```css
@layer base {
  h1, h2 {
    font-family: var(--font-playfair), serif;
  }
  h1 {
    @apply text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5f5f5] leading-tight;
  }
  h2 {
    @apply text-3xl md:text-4xl font-bold text-[#f5f5f5];
  }
  h3 {
    @apply text-xl md:text-2xl font-bold text-[#f5f5f5] font-sans;
  }
}
```

- [ ] **Step 2: Add dot grid utility and particle float keyframes**

Add after the `@layer base` block:

```css
@layer utilities {
  .bg-dot-grid {
    background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .section-label {
    @apply text-sky-500 text-[11px] tracking-[3px] uppercase font-semibold;
  }
}

@keyframes float-particle {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(var(--float-x, 10px), var(--float-y, -15px)); }
  66% { transform: translate(var(--float-x2, -8px), var(--float-y2, 12px)); }
}

/* Reduced motion: disable all custom CSS animations */
@media (prefers-reduced-motion: reduce) {
  .drift-orb,
  .float-particle {
    animation: none !important;
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npx next build 2>&1 | tail -5
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add dark heading styles, dot grid utility, and reduced-motion rules"
```

---

### Task 4: Add new Framer Motion variants to animations.ts

**Files:**
- Modify: `lib/animations.ts`

- [ ] **Step 1: Add text reveal, card glow, and enhanced stagger variants**

Add these exports to the file:

```typescript
export const textRevealWord = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

export const textRevealLine = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const subtitleFadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
  },
}

export const cardGlow = {
  rest: {
    borderColor: '#262626',
    boxShadow: '0 0 0 rgba(14,165,233,0)',
  },
  hover: {
    borderColor: '#0ea5e9',
    boxShadow: '0 0 20px rgba(14,165,233,0.15)',
    transition: { duration: 0.3 },
  },
}
```

- [ ] **Step 2: Verify build**

```bash
npx next build 2>&1 | tail -5
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add lib/animations.ts
git commit -m "feat: add text reveal, card glow, and subtitle animation variants"
```

---

## Chunk 2: Custom Hooks

### Task 5: Create useIsTouchDevice hook

**Files:**
- Create: `hooks/useIsTouchDevice.ts`

- [ ] **Step 1: Create the hook**

```typescript
'use client'

import { useState, useEffect } from 'react'

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    setIsTouch(mq.matches)

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isTouch
}
```

- [ ] **Step 2: Verify build**

```bash
npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add hooks/useIsTouchDevice.ts
git commit -m "feat: add useIsTouchDevice hook for touch device detection"
```

---

### Task 6: Create useCursorPosition hook

**Files:**
- Create: `hooks/useCursorPosition.ts`

- [ ] **Step 1: Create the hook**

```typescript
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface CursorPosition {
  x: number
  y: number
}

export function useCursorPosition(): CursorPosition {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const latestPos = useRef<CursorPosition>({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    latestPos.current = { x: e.clientX, y: e.clientY }
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setPosition(latestPos.current)
        rafRef.current = null
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleMouseMove])

  return position
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/useCursorPosition.ts
git commit -m "feat: add useCursorPosition hook with rAF throttling"
```

---

### Task 7: Create useMagneticEffect hook

**Files:**
- Create: `hooks/useMagneticEffect.ts`

- [ ] **Step 1: Create the hook**

```typescript
'use client'

import { useRef, useState, useCallback } from 'react'

interface MagneticOffset {
  x: number
  y: number
}

export function useMagneticEffect(strength: number = 8) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)
      const proximityZone = Math.max(rect.width, rect.height) / 2 + 80

      if (distance < proximityZone) {
        const factor = 1 - distance / proximityZone
        setOffset({
          x: Math.max(-strength, Math.min(strength, distX * factor * 0.3)),
          y: Math.max(-strength, Math.min(strength, distY * factor * 0.3)),
        })
      } else {
        setOffset({ x: 0, y: 0 })
      }
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  return { ref, offset, handleMouseMove, handleMouseLeave }
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/useMagneticEffect.ts
git commit -m "feat: add useMagneticEffect hook for magnetic button interactions"
```

---

### Task 8: Create use3DTilt hook

**Files:**
- Create: `hooks/use3DTilt.ts`

- [ ] **Step 1: Create the hook**

```typescript
'use client'

import { useRef, useState, useCallback } from 'react'

interface TiltValues {
  rotateX: number
  rotateY: number
  glareX: number
  glareY: number
}

export function use3DTilt(maxTilt: number = 12) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setTilt({
        rotateX: (0.5 - y) * maxTilt * 2,
        rotateY: (x - 0.5) * maxTilt * 2,
        glareX: x * 100,
        glareY: y * 100,
      })
    },
    [maxTilt]
  )

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 })
  }, [])

  return { ref, tilt, handleMouseMove, handleMouseLeave }
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/use3DTilt.ts
git commit -m "feat: add use3DTilt hook for 3D perspective card effects"
```

---

## Chunk 3: Effect Components

### Task 9: Create SectionTransition component

**Files:**
- Create: `components/effects/SectionTransition.tsx`

- [ ] **Step 1: Create the component**

```tsx
interface SectionTransitionProps {
  from?: string
  to?: string
}

export function SectionTransition({
  from = '#0a0a0a',
  to = '#111111',
}: SectionTransitionProps) {
  return (
    <div
      className="h-16"
      style={{ background: `linear-gradient(180deg, ${from}, ${to})` }}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/effects/SectionTransition.tsx
git commit -m "feat: add SectionTransition gradient fade component"
```

---

### Task 10: Create GradientOrbs component

**Files:**
- Create: `components/effects/GradientOrbs.tsx`

- [ ] **Step 1: Create the component with preset variants**

```tsx
type OrbVariant = 'hero' | 'services' | 'work' | 'whyus' | 'testimonials' | 'cta' | 'default'

interface OrbConfig {
  color: string
  opacity: number
  size: number
  left: string
  top: string
  blur: number
  animation: string
}

const presets: Record<OrbVariant, OrbConfig[]> = {
  hero: [
    { color: '14,165,233', opacity: 0.15, size: 350, left: '-5%', top: '10%', blur: 60, animation: 'animate-drift-1' },
    { color: '99,102,241', opacity: 0.12, size: 400, left: '60%', top: '70%', blur: 55, animation: 'animate-drift-2' },
    { color: '139,92,246', opacity: 0.08, size: 200, left: '55%', top: '30%', blur: 40, animation: 'animate-drift-3' },
  ],
  services: [
    { color: '99,102,241', opacity: 0.14, size: 300, left: '65%', top: '5%', blur: 50, animation: 'animate-drift-1' },
    { color: '139,92,246', opacity: 0.10, size: 250, left: '10%', top: '70%', blur: 45, animation: 'animate-drift-2' },
  ],
  work: [
    { color: '14,165,233', opacity: 0.12, size: 350, left: '5%', top: '10%', blur: 55, animation: 'animate-drift-2' },
    { color: '99,102,241', opacity: 0.10, size: 300, left: '60%', top: '65%', blur: 50, animation: 'animate-drift-3' },
  ],
  whyus: [
    { color: '139,92,246', opacity: 0.12, size: 280, left: '60%', top: '5%', blur: 45, animation: 'animate-drift-3' },
    { color: '14,165,233', opacity: 0.10, size: 320, left: '10%', top: '65%', blur: 50, animation: 'animate-drift-1' },
  ],
  testimonials: [
    { color: '99,102,241', opacity: 0.10, size: 300, left: '5%', top: '40%', blur: 50, animation: 'animate-drift-2' },
    { color: '14,165,233', opacity: 0.08, size: 250, left: '65%', top: '10%', blur: 40, animation: 'animate-drift-1' },
  ],
  cta: [
    { color: '14,165,233', opacity: 0.15, size: 350, left: '15%', top: '10%', blur: 55, animation: 'animate-drift-1' },
    { color: '99,102,241', opacity: 0.12, size: 300, left: '55%', top: '60%', blur: 50, animation: 'animate-drift-3' },
  ],
  default: [
    { color: '14,165,233', opacity: 0.10, size: 300, left: '10%', top: '15%', blur: 50, animation: 'animate-drift-1' },
    { color: '99,102,241', opacity: 0.08, size: 250, left: '60%', top: '60%', blur: 45, animation: 'animate-drift-2' },
  ],
}

interface GradientOrbsProps {
  variant?: OrbVariant
}

export function GradientOrbs({ variant = 'default' }: GradientOrbsProps) {
  const orbs = presets[variant]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`drift-orb absolute rounded-full will-change-transform ${orb.animation}`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background: `radial-gradient(circle, rgba(${orb.color},${orb.opacity}), transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
          }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/effects/GradientOrbs.tsx
git commit -m "feat: add GradientOrbs ambient background component with 7 presets"
```

---

### Task 11: Create ScrollProgress component

**Files:**
- Create: `components/effects/ScrollProgress.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-50 h-[3px] bg-[#1a1a1a]">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #0ea5e9, #6366f1)',
          boxShadow: '0 0 10px rgba(14,165,233,0.5)',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/effects/ScrollProgress.tsx
git commit -m "feat: add ScrollProgress glowing scroll indicator"
```

---

### Task 12: Create CursorSpotlight component

**Files:**
- Create: `components/effects/CursorSpotlight.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { useCursorPosition } from '@/hooks/useCursorPosition'

export function CursorSpotlight() {
  const isTouch = useIsTouchDevice()
  const { x, y } = useCursorPosition()

  if (isTouch) return null

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          transform: `translate(${x - 200}px, ${y - 200}px)`,
          background: 'radial-gradient(circle, rgba(14,165,233,0.07), transparent 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/effects/CursorSpotlight.tsx
git commit -m "feat: add CursorSpotlight cursor-following glow effect"
```

---

### Task 13: Create ParticleGrid component

**Files:**
- Create: `components/effects/ParticleGrid.tsx`

- [ ] **Step 1: Create the particle grid with SVG and direct DOM mutation**

```tsx
'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  color: string
  floatDuration: number
  floatOffsetX: number
  floatOffsetY: number
}

function generateParticles(width: number, height: number, count: number): Particle[] {
  const colors = ['14,165,233', '99,102,241']
  return Array.from({ length: count }, () => {
    const x = Math.random() * width
    const y = Math.random() * height
    return {
      x,
      y,
      baseX: x,
      baseY: y,
      size: 1.5 + Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
      floatDuration: 15 + Math.random() * 10,
      floatOffsetX: (Math.random() - 0.5) * 40,
      floatOffsetY: (Math.random() - 0.5) * 40,
    }
  })
}

export function ParticleGrid() {
  const isTouch = useIsTouchDevice()
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const particleCount = 50
  const maxLines = 80
  const connectionDistance = 120
  const mouseInfluenceRadius = 150

  // useMemo MUST be called before any conditional returns (Rules of Hooks)
  const initialParticles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        cx: Math.random() * 100 + '%',
        cy: Math.random() * 100 + '%',
        r: 1.5 + Math.random(),
        color: i % 2 === 0 ? '14,165,233' : '99,102,241',
      })),
    []
  )

  // Initialize particles on mount
  useEffect(() => {
    if (isTouch || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    particlesRef.current = generateParticles(rect.width, rect.height, particleCount)
  }, [isTouch])

  // Mouse tracking
  useEffect(() => {
    if (isTouch) return
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isTouch])

  // Animation loop — direct DOM mutation
  useEffect(() => {
    if (isTouch || !svgRef.current) return

    const svg = svgRef.current
    const circles = svg.querySelectorAll<SVGCircleElement>('circle')
    const linesGroup = svg.querySelector<SVGGElement>('#lines')

    const animate = () => {
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const time = Date.now() / 1000

      // Update particle positions based on float + mouse influence
      particles.forEach((p, i) => {
        const floatPhase = (time / p.floatDuration) * Math.PI * 2
        let x = p.baseX + Math.sin(floatPhase) * p.floatOffsetX
        let y = p.baseY + Math.cos(floatPhase) * p.floatOffsetY

        // Mouse influence
        const dx = mouse.x - x
        const dy = mouse.y - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        let opacity = 0.3 + Math.random() * 0.2

        if (dist < mouseInfluenceRadius) {
          const factor = 1 - dist / mouseInfluenceRadius
          x += dx * factor * 0.08
          y += dy * factor * 0.08
          opacity = 0.3 + factor * 0.5
        }

        p.x = x
        p.y = y

        // Direct DOM mutation
        const circle = circles[i]
        if (circle) {
          circle.setAttribute('cx', String(x))
          circle.setAttribute('cy', String(y))
          circle.setAttribute('opacity', String(opacity))
        }
      })

      // Draw lines between nearby particles
      if (linesGroup) {
        let lineHTML = ''
        let lineCount = 0

        for (let i = 0; i < particles.length && lineCount < maxLines; i++) {
          for (let j = i + 1; j < particles.length && lineCount < maxLines; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < connectionDistance) {
              const opacity = 0.08 * (1 - dist / connectionDistance)
              lineHTML += `<line x1="${particles[i].x}" y1="${particles[i].y}" x2="${particles[j].x}" y2="${particles[j].y}" stroke="rgba(14,165,233,${opacity})" stroke-width="1"/>`
              lineCount++
            }
          }
        }
        linesGroup.innerHTML = lineHTML
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg ref={svgRef} className="w-full h-full">
        <g id="lines" />
        {initialParticles.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill={`rgba(${p.color},0.4)`}
          />
        ))}
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/effects/ParticleGrid.tsx
git commit -m "feat: add ParticleGrid constellation effect with mouse interaction"
```

---

### Task 14: Create LoadingScreen component

**Files:**
- Create: `components/effects/LoadingScreen.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false)
  const [isDocumentReady, setIsDocumentReady] = useState(false)

  useEffect(() => {
    // Check sessionStorage — only show on first visit
    if (sessionStorage.getItem('simpleinc-loaded')) {
      setIsVisible(false)
      return
    }

    // Minimum display time
    const timer = setTimeout(() => setIsMinTimeElapsed(true), 800)

    // Document ready state
    const checkReady = () => {
      if (document.readyState === 'complete') {
        setIsDocumentReady(true)
      }
    }
    checkReady()
    document.addEventListener('readystatechange', checkReady)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('readystatechange', checkReady)
    }
  }, [])

  // Exit when both conditions met
  useEffect(() => {
    if (isMinTimeElapsed && isDocumentReady) {
      const exitTimer = setTimeout(() => {
        setIsVisible(false)
        sessionStorage.setItem('simpleinc-loaded', '1')
      }, 300) // exit animation duration
      return () => clearTimeout(exitTimer)
    }
  }, [isMinTimeElapsed, isDocumentReady])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* Ambient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute rounded-full"
              style={{
                width: 300,
                height: 300,
                top: '20%',
                left: '20%',
                background: 'radial-gradient(circle, rgba(14,165,233,0.08), transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 250,
                height: 250,
                bottom: '10%',
                right: '20%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: isMinTimeElapsed && isDocumentReady ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Simple Inc"
              width={160}
              height={48}
              className="brightness-0 invert"
              priority
            />
          </motion.div>

          {/* Progress bar */}
          <div className="mt-6 w-[120px] h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #0ea5e9, #6366f1)',
                boxShadow: '0 0 8px rgba(14,165,233,0.4)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/effects/LoadingScreen.tsx
git commit -m "feat: add LoadingScreen with logo animation and session persistence"
```

---

## Chunk 4: Interactive Components

### Task 15: Create TextReveal component

**Files:**
- Create: `components/interactive/TextReveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion } from 'framer-motion'
import { textRevealWord, textRevealLine } from '@/lib/animations'

interface TextRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  mode?: 'word' | 'line'
  highlightLastWords?: number
  highlightClassName?: string
}

export function TextReveal({
  text,
  as: Tag = 'h1',
  className = '',
  mode = 'line',
  highlightLastWords = 0,
  highlightClassName = 'text-sky-500',
}: TextRevealProps) {
  if (mode === 'word') {
    const words = text.split(' ')
    const highlightStart = words.length - highlightLastWords

    return (
      <Tag className={className}>
        <motion.span
          initial="hidden"
          animate="visible"
          className="inline-flex flex-wrap"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={textRevealWord}
              className={`inline-block mr-[0.3em] ${
                i >= highlightStart ? highlightClassName : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    )
  }

  // Line mode — simple whileInView fadeInUp
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={textRevealLine}
    >
      <Tag className={className}>{text}</Tag>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/interactive/TextReveal.tsx
git commit -m "feat: add TextReveal component with word and line reveal modes"
```

---

### Task 16: Create MagneticButton component

**Files:**
- Create: `components/interactive/MagneticButton.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion } from 'framer-motion'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  const isTouch = useIsTouchDevice()
  const { ref, offset, handleMouseMove, handleMouseLeave } = useMagneticEffect(8)

  if (isTouch) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/interactive/MagneticButton.tsx
git commit -m "feat: add MagneticButton cursor-magnetic wrapper component"
```

---

### Task 17: Create TiltCard component

**Files:**
- Create: `components/interactive/TiltCard.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion } from 'framer-motion'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { use3DTilt } from '@/hooks/use3DTilt'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const isTouch = useIsTouchDevice()
  const { ref, tilt, handleMouseMove, handleMouseLeave } = use3DTilt(12)

  if (isTouch) {
    return (
      <div
        className={`relative border border-sky-500/20 shadow-[0_0_10px_rgba(14,165,233,0.05)] ${className}`}
      >
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} style={{ perspective: 800 }} className="inline-block w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        whileHover={{
          borderColor: '#0ea5e9',
          boxShadow: '0 0 20px rgba(14,165,233,0.15)',
        }}
        className={`relative border border-[#262626] ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
        {/* Glare overlay */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: `linear-gradient(${135 + tilt.rotateY * 2}deg, rgba(255,255,255,0.03), transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/interactive/TiltCard.tsx
git commit -m "feat: add TiltCard 3D perspective card wrapper with glare overlay"
```

---

## Chunk 5: UI Component Dark Theme Updates

### Task 18: Update Button component for dark theme

**Files:**
- Modify: `components/ui/Button.tsx`

- [ ] **Step 1: Replace color classes**

Apply these class replacements:
- Primary: `bg-sky-500 hover:bg-sky-600 text-white` → `bg-sky-500 hover:bg-sky-600 text-white hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]`
- Outline: `border-2 border-slate-200 hover:border-slate-300 text-slate-900` → `border border-[#333] hover:border-[#555] text-[#e5e5e5] hover:text-[#f5f5f5]`

- [ ] **Step 2: Verify build**

```bash
npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: update Button component colors for dark theme"
```

---

### Task 19: Update Badge and StatCounter for dark theme

**Files:**
- Modify: `components/ui/Badge.tsx`
- Modify: `components/ui/StatCounter.tsx`

- [ ] **Step 1: Update Badge colors**

Replace:
- `bg-sky-100 text-sky-700` → `bg-sky-500/10 text-sky-400`

- [ ] **Step 2: Update StatCounter colors**

Replace:
- Number: `text-slate-900` → `text-[#f5f5f5]`
- Label: `text-slate-500` → `text-[#525252]`

- [ ] **Step 3: Commit**

```bash
git add components/ui/Badge.tsx components/ui/StatCounter.tsx
git commit -m "feat: update Badge and StatCounter for dark theme"
```

---

### Task 20: Update Accordion for dark theme

**Files:**
- Modify: `components/ui/Accordion.tsx`

- [ ] **Step 1: Replace color classes**

Apply these replacements:
- Accordion item background: add `bg-[#1a1a1a]` to each accordion item wrapper
- Dividers: `divide-slate-200` → `divide-[#262626]`
- Question text: `text-slate-900` → `text-[#f5f5f5]`
- Answer text: `text-slate-600` → `text-[#a3a3a3]`
- Toggle icon stays `text-sky-500` (no change)

- [ ] **Step 2: Commit**

```bash
git add components/ui/Accordion.tsx
git commit -m "feat: update Accordion for dark theme"
```

---

### Task 21: Update ContactForm for dark theme

**Files:**
- Modify: `components/ui/ContactForm.tsx`

- [ ] **Step 1: Replace all light theme colors**

Apply these replacements across the form:
- Input classes: `border-slate-200` → `border-[#262626] bg-[#1a1a1a] text-[#f5f5f5] placeholder:text-[#525252]`
- Focus ring: `focus:border-sky-500 focus:ring-sky-500` → keep as-is (sky-500 works on dark)
- Labels: `text-slate-700` or `text-slate-600` → `text-[#a3a3a3]`
- Select dropdown: same as input
- Error text: `text-red-600` → `text-red-400`
- Success background: `bg-sky-50 border-sky-200` → `bg-green-500/10 border-green-500/30`
- Success text: → `text-green-400`
- Submit button: keep `bg-sky-500 hover:bg-sky-600 text-white`, add `hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]`

- [ ] **Step 2: Wrap submit button in MagneticButton**

Import `MagneticButton` from `@/components/interactive/MagneticButton` and wrap the submit button.

- [ ] **Step 3: Commit**

```bash
git add components/ui/ContactForm.tsx
git commit -m "feat: update ContactForm for dark theme with magnetic submit"
```

---

## Chunk 6: Layout Components

### Task 22: Update Navbar for dark theme + logo.png

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Replace text logo with Image component**

Add import:
```tsx
import Image from 'next/image'
```

Replace both text logo instances (desktop and mobile) with:
```tsx
<Image
  src="/logo.png"
  alt="Simple Inc"
  width={120}
  height={36}
  className="brightness-0 invert"
/>
```
Mobile version uses `width={100}`.

- [ ] **Step 2: Update desktop navbar colors**

Apply these replacements:
- Scrolled background: `bg-white/90` → `bg-[#0a0a0a]/80 backdrop-blur-xl`
- Non-scrolled: remove `bg-white` if present, use `bg-transparent`
- Border: `border-slate-200` → `border-[#1a1a1a]`
- Nav links: `text-slate-600` → `text-[#a3a3a3]`
- Nav link hover: `hover:text-slate-900` → `hover:text-[#f5f5f5]`
- Active link: `text-sky-500` → keep (no change)
- Contact button: add `hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]`

- [ ] **Step 3: Update mobile menu colors**

Apply:
- Menu background: `bg-white` → `bg-[#111111]`
- Menu border: `border-slate-200` → `border-[#262626]`
- Hamburger bars: `bg-slate-900` → `bg-white`
- Mobile links: `text-slate-600` → `text-[#a3a3a3]`
- Mobile link active: keep `text-sky-500`

- [ ] **Step 4: Verify build and visual check**

```bash
npx next build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: update Navbar with dark theme, logo.png, and glassmorphic bg"
```

---

### Task 23: Update Footer for dark theme + logo.png

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Replace text logo with Image**

Add `import Image from 'next/image'` and replace text logo with:
```tsx
<Image
  src="/logo.png"
  alt="Simple Inc"
  width={120}
  height={36}
  className="brightness-0 invert"
/>
```

- [ ] **Step 2: Update colors**

The footer already uses `bg-slate-900`. Update:
- Background: `bg-slate-900` → `bg-[#0a0a0a]`
- Border: `border-slate-800` → `border-[#1a1a1a]`
- Heading text: `text-white` → keep (no change)
- Link text: `text-slate-400` → `text-[#737373]`
- Link hover: `hover:text-sky-500` → `hover:text-[#a3a3a3]`
- Secondary text: `text-slate-500` → `text-[#525252]`
- Brand text: `text-slate-300` → `text-[#a3a3a3]`

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: update Footer with dark theme colors and logo.png"
```

---

## Chunk 7: Section Components

### Task 24: Update Hero section

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Add imports for new components**

```tsx
import { GradientOrbs } from '@/components/effects/GradientOrbs'
import { TextReveal } from '@/components/interactive/TextReveal'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import dynamic from 'next/dynamic'

const ParticleGrid = dynamic(
  () => import('@/components/effects/ParticleGrid').then(mod => ({ default: mod.ParticleGrid })),
  { ssr: false }
)
```

- [ ] **Step 2: Update section background and add effects**

- Change section background: remove `bg-white` or `bg-slate-50`, add `bg-[#0a0a0a] bg-dot-grid relative`
- Add inside the section (before content): `<GradientOrbs variant="hero" />` and `<ParticleGrid />`
- Add `relative z-10` to the content container div to sit above effects
- Add hero logo above H1: `<Image src="/logo.png" alt="Simple Inc" width={180} height={54} className="brightness-0 invert mb-6" />`
- Replace the H1 with: `<TextReveal text="We Build Web Applications That Drive Growth" mode="word" highlightLastWords={2} className="..." />`
- Update text colors: `text-slate-600` → `text-[#a3a3a3]`
- Wrap primary CTA button in `<MagneticButton>`

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: update Hero with dark theme, particle grid, text reveal, and orbs"
```

---

### Task 25: Update Services section

**Files:**
- Modify: `components/sections/Services.tsx`

- [ ] **Step 1: Add imports and update**

Import `GradientOrbs` and `TiltCard`.

Apply:
- Section background: `bg-slate-50` → `bg-[#111111] bg-dot-grid relative`
- Add `<GradientOrbs variant="services" />` at section start
- Card background: `bg-white` → `bg-[#1a1a1a]`
- Card border: `border-slate-200` → `border-[#262626]`
- Icon background: `bg-sky-100` → `bg-sky-500/10`
- Hover border: `hover:border-l-sky-500` → remove (TiltCard handles hover)
- Wrap each card in `<TiltCard className="rounded-lg">`
- Text: `text-slate-600` → `text-[#a3a3a3]`
- Title: `text-slate-900` → `text-[#f5f5f5]`
- Link text: `text-sky-500` → keep

- [ ] **Step 2: Commit**

```bash
git add components/sections/Services.tsx
git commit -m "feat: update Services with dark theme, tilt cards, and gradient orbs"
```

---

### Task 26: Update Work section

**Files:**
- Modify: `components/sections/Work.tsx`

- [ ] **Step 1: Update colors and add TiltCard**

Import `GradientOrbs` and `TiltCard`.

Apply:
- Section background: add `bg-[#0a0a0a] bg-dot-grid relative`
- Add `<GradientOrbs variant="work" />`
- Card bg: `bg-white` → `bg-[#1a1a1a]`
- Card border: `border-slate-200` → `border-[#262626]`
- Wrap each card in `<TiltCard className="rounded-lg">`
- Gradient placeholders: `from-sky-100 to-sky-200` → `from-sky-500/15 to-indigo-500/10`
- Text: `text-slate-600` → `text-[#a3a3a3]`
- Title: `text-slate-900` → `text-[#f5f5f5]`

- [ ] **Step 2: Commit**

```bash
git add components/sections/Work.tsx
git commit -m "feat: update Work section with dark theme and tilt cards"
```

---

### Task 27: Update WhyUs section

**Files:**
- Modify: `components/sections/WhyUs.tsx`

- [ ] **Step 1: Update colors, add TiltCard and GradientOrbs**

Import `TiltCard` from `@/components/interactive/TiltCard` and `GradientOrbs` from `@/components/effects/GradientOrbs`.

Apply:
- Section background: `bg-slate-50` → `bg-[#111111] bg-dot-grid relative`
- Add `<GradientOrbs variant="whyus" />` at start of section
- Add `relative z-10` to content container
- Icon background: `bg-sky-100` → `bg-sky-500/10`
- Card: wrap in `<TiltCard className="rounded-lg bg-[#1a1a1a] p-6">`
- Title: `text-slate-900` → `text-[#f5f5f5]`
- Description: `text-slate-600` → `text-[#a3a3a3]`

- [ ] **Step 2: Commit**

```bash
git add components/sections/WhyUs.tsx
git commit -m "feat: update WhyUs with dark theme, tilt cards, and gradient orbs"
```

---

### Task 28: Update Testimonials section

**Files:**
- Modify: `components/sections/Testimonials.tsx`

- [ ] **Step 1: Update colors and add GradientOrbs**

Import `GradientOrbs` from `@/components/effects/GradientOrbs`.

Apply:
- Section background: remove `bg-white`, add `bg-[#0a0a0a] bg-dot-grid relative`
- Add `<GradientOrbs variant="testimonials" />` at start of section
- Add `relative z-10` to content container
- Card background: `bg-slate-50` → `bg-[#111111]`
- Card border: `border-slate-200` → `border-[#262626]`
- Left border: keep `border-l-4 border-sky-500`, alternate with `border-indigo-500` for even indices
- Quote text: `text-slate-700` → `text-[#a3a3a3]`
- Name: `text-slate-900` → `text-[#f5f5f5]`
- Company: `text-slate-500` → `text-[#525252]`

- [ ] **Step 2: Commit**

```bash
git add components/sections/Testimonials.tsx
git commit -m "feat: update Testimonials with dark theme and alternating accent borders"
```

---

### Task 29: Update Process section

**Files:**
- Modify: `components/sections/Process.tsx`

- [ ] **Step 1: Update colors, gradient line, and add GradientOrbs**

Import `GradientOrbs` from `@/components/effects/GradientOrbs`.

Apply:
- Section background: `bg-slate-50` → `bg-[#111111] bg-dot-grid relative`
- Add `<GradientOrbs variant="default" />` at start of section
- Add `relative z-10` to content container
- Timeline line: `bg-sky-200` → `bg-gradient-to-b from-sky-500 via-indigo-500 to-violet-500`
- Step circles: keep `bg-sky-500 text-white`, but alternate: step 1 sky-500, step 2 indigo-500, step 3 violet-500, step 4 sky-500
- Add glow to circles: `shadow-[0_0_15px_rgba(14,165,233,0.3)]` (matching circle color)
- Title: `text-slate-900` → `text-[#f5f5f5]`
- Description: `text-slate-600` → `text-[#a3a3a3]`

- [ ] **Step 2: Commit**

```bash
git add components/sections/Process.tsx
git commit -m "feat: update Process with dark theme and gradient timeline"
```

---

### Task 30: Update CTA section

**Files:**
- Modify: `components/sections/CTA.tsx`

- [ ] **Step 1: Update and add effects**

Import `GradientOrbs` and `MagneticButton`.

Apply:
- Background: `bg-slate-900` → `bg-[#0a0a0a] relative overflow-hidden`
- Add `<GradientOrbs variant="cta" />`
- H2: `text-white` → keep
- Paragraph: `text-slate-300` → `text-[#a3a3a3]`
- Wrap CTA button in `<MagneticButton>`
- Add `relative z-10` to content container

- [ ] **Step 2: Commit**

```bash
git add components/sections/CTA.tsx
git commit -m "feat: update CTA with dark theme, gradient orbs, and magnetic button"
```

---

### Task 31: Update ServicePageTemplate

**Files:**
- Modify: `components/sections/ServicePageTemplate.tsx`

- [ ] **Step 1: Update all colors throughout the template**

Apply across the entire template:
- Section backgrounds: alternating `bg-[#0a0a0a]` and `bg-[#111111]`, all with `bg-dot-grid`
- Card backgrounds: `bg-white` → `bg-[#1a1a1a]`
- Card borders: `border-slate-200` → `border-[#262626]`
- All `text-slate-900` → `text-[#f5f5f5]`
- All `text-slate-600` → `text-[#a3a3a3]`
- All `text-slate-500` → `text-[#525252]`
- Icon colors: `text-sky-500` → keep
- Pricing background: `bg-slate-50` → `bg-[#111111]`
- Step numbers: `bg-sky-500` → keep, add glow

Import `SectionTransition` and place between template sections.

- [ ] **Step 2: Commit**

```bash
git add components/sections/ServicePageTemplate.tsx
git commit -m "feat: update ServicePageTemplate with full dark theme"
```

---

## Chunk 8: Page Integration & Root Layout

### Task 32: Update root layout with LoadingScreen, CursorSpotlight, ScrollProgress

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add imports**

```tsx
import { LoadingScreen } from '@/components/effects/LoadingScreen'
import { CursorSpotlight } from '@/components/effects/CursorSpotlight'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
```

- [ ] **Step 2: Update body background**

Change `<body>` class from `text-slate-800 bg-white` to `text-[#a3a3a3] bg-[#0a0a0a]`.

- [ ] **Step 3: Add components inside body**

After `<MotionProvider>` opening and before `<Navbar>`, add:
```tsx
<LoadingScreen />
<CursorSpotlight />
<ScrollProgress />
```

- [ ] **Step 4: Verify build**

```bash
npx next build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add LoadingScreen, CursorSpotlight, ScrollProgress to root layout"
```

---

### Task 33: Update homepage with SectionTransitions

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add SectionTransition between all sections**

Import `SectionTransition` and place between each section component:

```tsx
import { SectionTransition } from '@/components/effects/SectionTransition'

// In JSX:
<Hero />
<SectionTransition from="#0a0a0a" to="#111111" />
<Services />
<SectionTransition from="#111111" to="#0a0a0a" />
<Work />
<SectionTransition from="#0a0a0a" to="#111111" />
<WhyUs />
<SectionTransition from="#111111" to="#0a0a0a" />
<Testimonials />
<SectionTransition from="#0a0a0a" to="#111111" />
<Process />
<SectionTransition from="#111111" to="#0a0a0a" />
<CTA />
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add SectionTransitions between homepage sections"
```

---

### Task 34: Update 404 page for dark theme

**Files:**
- Modify: `app/not-found.tsx`

- [ ] **Step 1: Update colors and add effects**

Import `GradientOrbs` and `MagneticButton`.

Apply:
- Section background: add `bg-[#0a0a0a] bg-dot-grid relative min-h-screen`
- Add `<GradientOrbs variant="default" />`
- Text: `text-slate-600` → `text-[#a3a3a3]`
- Heading: inherits dark from globals
- Wrap CTA button in `<MagneticButton>`

- [ ] **Step 2: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: update 404 page with dark theme and gradient orbs"
```

---

### Task 35: Update standalone pages (about, contact, hire-us)

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/hire-us/page.tsx`

- [ ] **Step 1: Update each page**

For each page:
1. Import `SectionTransition` from `@/components/effects/SectionTransition`
2. Update inline backgrounds: `bg-white` → `bg-[#0a0a0a]`, `bg-slate-50` → `bg-[#111111]`
3. Update inline text: `text-slate-900` → `text-[#f5f5f5]`, `text-slate-600` → `text-[#a3a3a3]`
4. Add `SectionTransition` between sections:
   - About: hero(#0a0a0a) → transition → content(#111111) → transition → CTA(#0a0a0a)
   - Contact: hero(#0a0a0a) → transition → form(#111111)
   - Hire-us: hero(#0a0a0a) → transition → offerings(#111111) → transition → process(#0a0a0a) → transition → FAQs(#111111) → transition → CTA(#0a0a0a)

- [ ] **Step 2: Commit**

```bash
git add app/about/ app/contact/ app/hire-us/
git commit -m "feat: add dark theme and SectionTransitions to about, contact, hire-us"
```

---

### Task 36: Update services and work pages

**Files:**
- Modify: `app/services/page.tsx`
- Modify: `app/services/web-app-development/page.tsx`
- Modify: `app/services/website-development/page.tsx`
- Modify: `app/services/ai-development/page.tsx`
- Modify: `app/services/cms-ecommerce/page.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Update services overview and subpages**

Services overview (`app/services/page.tsx`):
1. Import `SectionTransition`
2. Update backgrounds and text colors (same pattern as Task 35)
3. Add SectionTransitions: hero(#0a0a0a) → transition → services grid(#111111) → transition → CTA(#0a0a0a)

Service subpages use `ServicePageTemplate` (updated in Task 31). Each subpage just needs:
1. Background wrapper to be `bg-[#0a0a0a]` if any inline overrides exist
2. SectionTransitions are handled within ServicePageTemplate

Work pages:
1. `app/work/page.tsx`: backgrounds + text colors + SectionTransitions between hero and portfolio grid
2. `app/work/[slug]/page.tsx`: backgrounds + text colors for case study detail view

- [ ] **Step 2: Commit**

```bash
git add app/services/ app/work/
git commit -m "feat: add dark theme and SectionTransitions to services and work pages"
```

---

### Task 37: Update blog pages with dark theme and TiltCard

**Files:**
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Update blog index**

1. Import `SectionTransition` and `TiltCard` from `@/components/interactive/TiltCard`
2. Update backgrounds: `bg-white` → `bg-[#0a0a0a]`, `bg-slate-50` → `bg-[#111111]`
3. Update text: `text-slate-900` → `text-[#f5f5f5]`, `text-slate-600` → `text-[#a3a3a3]`
4. Wrap each blog post card in `<TiltCard className="rounded-lg bg-[#1a1a1a]">`
5. Add SectionTransitions between sections

- [ ] **Step 2: Update blog post page**

1. Update backgrounds and text colors
2. No TiltCard needed (no cards on blog post view)
3. Blog post content area: `bg-[#0a0a0a]`, prose text `text-[#a3a3a3]`

- [ ] **Step 3: Verify full build**

```bash
npx next build 2>&1 | tail -5
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add app/blog/
git commit -m "feat: add dark theme, TiltCards, and SectionTransitions to blog pages"
```

---

### Task 38: Final verification — dev server visual check

- [ ] **Step 1: Start dev server and visually verify**

```bash
npx next dev
```

Check in browser:
1. Loading screen appears on first visit with logo animation
2. Dark backgrounds throughout — no white/light sections visible
3. Gradient orbs drift slowly in backgrounds
4. Cursor spotlight follows mouse on desktop
5. Scroll progress bar fills as you scroll
6. Hero text reveals word by word on load
7. Service/Work cards tilt on mouse hover with glare
8. CTA buttons pull toward cursor (magnetic effect)
9. Section transitions are smooth gradients (no hard edges)
10. Mobile: cursor effects disabled, orbs and text reveals still work
11. Navbar is glassmorphic with logo.png
12. Footer has logo.png inverted
13. Contact form has dark inputs
14. 404 page is dark themed

- [ ] **Step 2: Check build output**

```bash
npx next build 2>&1
```

Verify:
- No TypeScript errors
- No build warnings related to new components
- Bundle size hasn't exploded (check JS first load)

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: final dark theme polish and visual fixes"
```
