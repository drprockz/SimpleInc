import Link from 'next/link'

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
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-baseline mb-4">
              <span className="text-xl font-black text-white">Simple</span>
              <span className="text-xl font-semibold text-sky-500">inc</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Web development agency in Mumbai building web applications, SaaS products, and business websites.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/in/darshan-parmar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-sky-500 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/darshanparmar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-400 hover:text-sky-500 transition-colors"
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
                    className="text-sm text-slate-400 hover:text-white transition-colors"
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
                    className="text-sm text-slate-400 hover:text-white transition-colors"
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
            <ul className="space-y-3 text-sm text-slate-400">
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

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Simple Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
