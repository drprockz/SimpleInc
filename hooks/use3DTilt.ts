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
