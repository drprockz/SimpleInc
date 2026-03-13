'use client'

import { motion } from 'framer-motion'
import { textRevealWord, textRevealLine } from '@/lib/animations'

interface TextRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  mode?: 'word' | 'line'
  highlightLastWords?: number
  highlightClassName?: string
}

export function TextReveal({
  text,
  as: Tag = 'h1',
  className = '',
  mode = 'line',
  highlightLastWords = 0,
  highlightClassName = 'text-sky-500',
}: TextRevealProps) {
  if (mode === 'word') {
    const words = text.split(' ')
    const highlightStart = words.length - highlightLastWords

    return (
      <Tag className={className}>
        <motion.span
          initial="hidden"
          animate="visible"
          className="inline-flex flex-wrap"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={textRevealWord}
              className={`inline-block mr-[0.3em] ${
                i >= highlightStart ? highlightClassName : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    )
  }

  // Line mode — simple whileInView fadeInUp
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={textRevealLine}
    >
      <Tag className={className}>{text}</Tag>
    </motion.div>
  )
}
