'use client'

import { useState, FormEvent } from 'react'

const projectTypes = [
  'Web Application',
  'SaaS',
  'Website',
  'AI Integration',
  'CMS & E-Commerce',
  'Other',
]

const budgetRanges = [
  'Under ₹25,000',
  '₹25,000–₹75,000',
  '₹75,000–₹2,00,000',
  '₹2,00,000+',
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    if (!endpoint) {
      setStatus('error')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Message sent</h3>
        <p className="text-slate-600">We will be in touch within 24 hours.</p>
      </div>
    )
  }

  const inputBase =
    'w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors duration-150'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input name="name" type="text" required placeholder="Your name" className={inputBase} />
      </div>
      <div>
        <input name="email" type="email" required placeholder="Email address" className={inputBase} />
      </div>
      <div>
        <input name="phone" type="tel" placeholder="+91 98XXXXXXXX (optional)" className={inputBase} />
      </div>
      <div>
        <select name="projectType" required defaultValue="" className={inputBase}>
          <option value="" disabled>Project type</option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <select name="budget" required defaultValue="" className={inputBase}>
          <option value="" disabled>Budget range</option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          name="message"
          required
          minLength={30}
          rows={4}
          placeholder="Tell us what you are building..."
          className={inputBase}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Email us directly at{' '}
          <a href="mailto:darshan@simpleinc.in" className="underline">
            darshan@simpleinc.in
          </a>
        </p>
      )}
    </form>
  )
}
