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
    primary: 'bg-sky-500 hover:bg-sky-600 text-white hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]',
    outline: 'border border-[#333] hover:border-[#555] text-[#e5e5e5] hover:text-[#f5f5f5]',
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
