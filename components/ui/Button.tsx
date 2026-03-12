import Link from 'next/link'

type ButtonProps = {
  href: string
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
}

export function Button({
  href,
  variant = 'primary',
  children,
  className = '',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200'
  const variants = {
    primary: 'bg-sky-500 hover:bg-sky-600 text-white',
    outline: 'border-2 border-slate-200 hover:border-slate-300 text-slate-900',
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
