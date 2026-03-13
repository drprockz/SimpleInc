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
