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
