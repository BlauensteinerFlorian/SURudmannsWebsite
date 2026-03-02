'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import '@/styles/globals.css'
import SponsorsSection from '@/components/SponsorsSection'

// Fetch logo
async function getLogo() {
  try {
    const res = await fetch('http://localhost:1337/api/logo?populate=image', { cache: 'no-store' })
    const data = await res.json()
    if (data.data) {
      const img = data.data.image?.data?.attributes || data.data.image?.data
      if (img?.url) {
        return `http://localhost:1337${img.url}`
      }
    }
  } catch (e) {
    console.error('Logo fetch error:', e)
  }
  return null
}

export default function RootLayout({ children }) {
  const [logoUrl, setLogoUrl] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    getLogo().then(setLogoUrl)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/mannschaft', label: 'Mannschaft' },
    { href: '/spielplan', label: 'Spielplan' },
    { href: '/pfingstturnier', label: 'Pfingstturnier' },
    { href: '/events', label: 'Events' },
    { href: '/news', label: 'News' },
    { href: '/fanshop', label: 'Fanshop' },
  ]

  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col bg-[#0a0a0a]">
        {/* Header */}
        <header className="bg-[#ff6600] sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo + Brand */}
              <Link href="/" className="flex items-center gap-3">
                <span className="text-xl font-bold text-white">SU Rudmanns</span> (
                  <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
                )}
                <span className="text-xl font-bold text-white ">SU Rudmanns</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className="text-white font-medium hover:text-black transition text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className="md:hidden py-4 border-t border-orange-400">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className="block py-2 text-white font-medium hover:text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Sponsors Section */}
        <SponsorsSection />
        
        {/* Footer */}
        <footer className="bg-[#ff6600] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Social Media */}
              <div>
                <h3 className="font-bold mb-4">Folge uns</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                    Instagram
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                    Facebook
                  </a>
                </div>
              </div>
              
              {/* Impressum */}
              <div>
                <h3 className="font-bold mb-4">Rechtliches</h3>
                <Link href="/impressum" className="hover:text-black underline">
                  Impressum
                </Link>
              </div>
              
              {/* Map - Embedded (rechts) */}
              <div>
                <h3 className="font-bold mb-4">Standort</h3>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21106.571406185332!2d15.18345227368689!3d48.603690378866645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4772e95cb7e1e573%3A0xdd98646acf70beb9!2sFu%C3%9Fballplatz%20Sportunion%20Rudmanns%2FStift%20Zwettl!5e0!3m2!1sde!2sat!4v1772478274132!5m2!1sde!2sat" 
                  width="100%" 
                  height="150" 
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <a 
                  href="https://www.google.com/maps/place/Fu%C3%9Fballplatz+Sportunion+Rudmanns/@48.6036904,15.1834523,15z" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm hover:text-black underline block mt-2"
                >
                  Größere Karte ansehen
                </a>
              </div>
            </div>
            <div className="text-center mt-8 pt-8 border-t border-orange-400">
              <p>© 2026 SU Rudmanns / Stift Zwettl</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
