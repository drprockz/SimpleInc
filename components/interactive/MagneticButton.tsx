'use client'

import { motion } from 'framer-motion'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  const isTouch = useIsTouchDevice()
  const { ref, offset, handleMouseMove, handleMouseLeave } = useMagneticEffect(8)

  if (isTouch) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
