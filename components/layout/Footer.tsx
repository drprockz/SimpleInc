import Link from 'next/link'
import Image from 'next/image'

const serviceLinks = [
  { href: '/services/web-app-development', label: 'Web Applications' },
  { href: '/services/website-development', label: 'Websites' },
  { href: '/services/ai-development', label: 'AI Development' },
  { href: '/services/cms-ecommerce', label: 'CMS & E-Commerce' },
]

const navLinks = [
  { href: '/work', label: 'Our Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/hire-us', label: 'Hire Us' },
]

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#a3a3a3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-baseline mb-4">
              <Image src="/logo.png" alt="Simple Inc" width={120} height={36} className="brightness-0 invert" />
            </Link>
            <p className="text-sm text-[#737373] leading-relaxed">
              Web development agency in Mumbai building web applications, SaaS products, and business websites.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/in/darshan-parmar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#737373] hover:text-[#a3a3a3] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/darshanparmar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[#737373] hover:text-[#a3a3a3] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#737373] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#737373] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-[#737373]">
              <li>
                <a
                  href="mailto:darshan@simpleinc.in"
                  className="hover:text-white transition-colors"
                >
                  darshan@simpleinc.in
                </a>
              </li>
              <li>Mumbai, Maharashtra, India</li>
              <li>Mon–Fri, 9 AM – 6 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] mt-12 pt-8 text-center text-sm text-[#525252]">
          © {new Date().getFullYear()} Simple Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
