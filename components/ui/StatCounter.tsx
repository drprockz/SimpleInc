'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type StatCounterProps = {
  target: number
  suffix?: string
  label: string
}

export function StatCounter({ target, suffix = '', label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 1500
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      start = Math.floor(eased * target)
      setCount(start)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-[#f5f5f5]">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-[#525252] mt-1">{label}</div>
    </div>
  )
}
