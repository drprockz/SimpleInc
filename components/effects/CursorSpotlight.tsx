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
