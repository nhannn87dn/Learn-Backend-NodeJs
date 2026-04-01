
const companyLinks = [
  { label: "About", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Press", href: "#" },
]

const resourceLinks = [
  { label: "Docs", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Privacy", href: "#" },
]

const contactLinks = [
  { label: "support@brand.com", href: "mailto:support@brand.com" },
  { label: "+84 123 456 789", href: "tel:+84123456789" },
  { label: "Ho Chi Minh City", href: "#" },
]

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="text-xl font-black tracking-tight text-slate-900">
              Brand.
            </a>
            <p className="mt-2 text-sm leading-6 text-slate-600">Build simple and clean web experiences.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Company</h3>
            <nav className="mt-3 space-y-2" aria-label="Company links">
              {companyLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Resources</h3>
            <nav className="mt-3 space-y-2" aria-label="Resource links">
              {resourceLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Contact</h3>
            <nav className="mt-3 space-y-2" aria-label="Contact links">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4">
          <p className="text-sm text-slate-500">© Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer