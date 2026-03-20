'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Finn installatør', href: '/installatorer' },
  { label: 'Kalkulatorer', href: '/kalkulatorer' },
  { label: 'Artikler', href: '/artikler' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full border-b border-[var(--border)] bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-[var(--primary)]">
            Batterikatalog
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/registrer-bedrift"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white text-sm font-medium transition-colors"
            >
              Registrer bedrift
            </Link>

            <button
              className="md:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Meny"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-white px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/registrer-bedrift"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white text-sm font-medium transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Registrer bedrift
          </Link>
        </div>
      )}
    </header>
  )
}
