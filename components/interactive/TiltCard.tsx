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
