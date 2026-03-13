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
