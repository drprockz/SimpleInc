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
