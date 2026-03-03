'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '@/styles/globals.css'
import SponsorsSection from '@/components/SponsorsSection'

// Fetch logo
async function getLogo() {
  try {
    const res = await fetch('http://localhost:1337/api/logo?populate=image')
    const data = await res.json()
    if (data.data && data.data.image) {
      const img = data.data.image.data?.attributes || data.data.image.data || data.data.image
      if (img && img.url) {
        return 'http://localhost:1337' + img.url
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
  const pathname = usePathname()

  useEffect(() => {
    getLogo().then(setLogoUrl)
  }, [])

  const navItems = [
    
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
        {/* Header - Enhanced */}
        <header className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex items-center justify-between h-20">
              {/* Logo + Brand */}
              <Link href="/" className="flex items-center gap-4 group">
                {logoUrl && (
                  <img 
                    src={logoUrl} 
                    alt="Logo" 
                    className="h-14 w-auto transition-transform group-hover:scale-105"
                  />
                )}
                <div className="hidden sm:block hover:scale-110 transition-transform transition">
                  <span className="text-2xl font-extrabold text-white tracking-wide">SU RUDMANNS</span>
                  <p className="text-xs text-white/80 -mt-1">Stift Zwettl</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className={`
                        px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-200
                        ${isActive 
                          ? 'bg-white text-[#ff6600] shadow-md' 
                          : 'text-white hover:bg-white/20 hover:shadow-md'
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden text-white p-3 rounded-lg hover:bg-white/20 transition"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className="lg:hidden py-4 border-t border-white/20">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      className={`
                        block py-3 px-6 rounded-lg font-bold uppercase tracking-wider text-base transition
                        ${isActive 
                          ? 'bg-white text-[#ff6600]' 
                          : 'text-white hover:bg-white/20'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
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
        <footer className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white py-12">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-10">
              {/* Column 1: SPORTUNION RUDMANNS */}
              <div>
                <h3 className="font-bold text-lg mb-4">SPORTUNION RUDMANNS</h3>
                <div className="text-white/90">
                  <p>Birkenstadion</p>
                  <p>Stift Zwettl</p>
                  <p>Österreich</p>
                </div>
              </div>
              
              {/* Column 2: FOLGE UNS */}
              <div>
                <h3 className="font-bold text-lg mb-4">FOLGE UNS</h3>
                <div className="flex flex-col gap-2">
                  <a href="https://instagram.com/surudmanns" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-white/20 hover:rounded-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    @surudmanns
                  </a>
                  <a href="https://facebook.com/SURudmanns" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-white/20 hover:rounded-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    /SURudmanns
                  </a>
                </div>
                
                {/* Weitere Links */}
                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-4">WEITERE LINKS</h3>
                  <a href="http://www.hobbyliga-zwettl.at/tabelle-2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-white/20 hover:rounded-lg">
                    Zur Serie H Tabelle
                  </a>
                </div>
              </div>
              
              {/* Column 3: Map */}
              <div>
                <h3 className="font-bold text-lg mb-4">HIER IST DAS BIRKENSTADION</h3>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21106.571406185332!2d15.18345227368689!3d48.603690378866645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4772e95cb7e1e573%3A0xdd98646acf70beb9!2sFu%C3%9Fballplatz%20Sportunion%20Rudmanns%2FStift%20Zwettl!5e0!3m2!1sde!2sat!4v1772478274132!5m2!1sde!2sat" 
                  width="100%" 
                  height="180" 
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            {/* Bottom */}
            <div className="mt-10 pt-6 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© 2026 SU Rudmanns / Stift Zwettl</p>
              <Link href="/impressum" className="hover:bg-white/20 hover:rounded-lg">
                Impressum
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
