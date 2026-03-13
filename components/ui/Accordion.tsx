'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AccordionItem = {
  question: string
  answer: string
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-[#262626]">
      {items.map((item, index) => (
        <div key={index} className="bg-[#1a1a1a]">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-5 text-left"
          >
            <span className="text-base md:text-lg font-semibold text-[#f5f5f5] pr-4">
              {item.question}
            </span>
            <span className="text-sky-500 text-xl flex-shrink-0">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-[#a3a3a3] leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
