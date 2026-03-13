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
