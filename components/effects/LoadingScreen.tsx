'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false)
  const [isDocumentReady, setIsDocumentReady] = useState(false)

  useEffect(() => {
    // Check sessionStorage — only show on first visit
    if (sessionStorage.getItem('simpleinc-loaded')) {
      setIsVisible(false)
      return
    }

    // Minimum display time
    const timer = setTimeout(() => setIsMinTimeElapsed(true), 800)

    // Document ready state
    const checkReady = () => {
      if (document.readyState === 'complete') {
        setIsDocumentReady(true)
      }
    }
    checkReady()
    document.addEventListener('readystatechange', checkReady)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('readystatechange', checkReady)
    }
  }, [])

  // Exit when both conditions met
  useEffect(() => {
    if (isMinTimeElapsed && isDocumentReady) {
      const exitTimer = setTimeout(() => {
        setIsVisible(false)
        sessionStorage.setItem('simpleinc-loaded', '1')
      }, 300) // exit animation duration
      return () => clearTimeout(exitTimer)
    }
  }, [isMinTimeElapsed, isDocumentReady])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* Ambient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute rounded-full"
              style={{
                width: 300,
                height: 300,
                top: '20%',
                left: '20%',
                background: 'radial-gradient(circle, rgba(14,165,233,0.08), transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 250,
                height: 250,
                bottom: '10%',
                right: '20%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: isMinTimeElapsed && isDocumentReady ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Simple Inc"
              width={160}
              height={48}
              className="brightness-0 invert"
              priority
            />
          </motion.div>

          {/* Progress bar */}
          <div className="mt-6 w-[120px] h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #0ea5e9, #6366f1)',
                boxShadow: '0 0 8px rgba(14,165,233,0.4)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
