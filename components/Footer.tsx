import Link from 'next/link'

const columns = [
  {
    heading: 'Om oss',
    links: [
      { label: 'Om Batterikatalog', href: '/om-oss' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Personvern', href: '/personvern' },
    ],
  },
  {
    heading: 'For installatører',
    links: [
      { label: 'Registrer bedrift', href: '/registrer-bedrift' },
      { label: 'Finn installatør', href: '/installatorer' },
      { label: 'Bli partner', href: '/partner' },
    ],
  },
  {
    heading: 'Ressurser',
    links: [
      { label: 'Artikler', href: '/artikler' },
      { label: 'Kalkulatorer', href: '/kalkulatorer' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} Batterikatalog. Alle rettigheter forbeholdt.
          </p>
        </div>
      </div>
    </footer>
  )
}
