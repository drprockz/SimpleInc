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
