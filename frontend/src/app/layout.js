import Link from 'next/link'
import '@/styles/globals.css'
import SponsorsSection from '@/components/SponsorsSection'

export const metadata = {
  title: 'SU Rudmanns - Fußball unter Birken seit 1988',
  description: 'Offizielle Website von Sportunion Rudmanns',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col bg-white">
        {/* Header */}
        <header className="bg-[#da8d43] text-white sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">SU Rudmanns</Link>
            <ul className="flex gap-4 md:gap-6 text-sm md:text-base">
              <li><Link href="/" className="hover:text-black font-medium">Home</Link></li>
              <li><Link href="/mannschaft" className="hover:text-black font-medium">Mannschaft</Link></li>
              <li><Link href="/spielplan" className="hover:text-black font-medium">Spielplan</Link></li>
              <li><Link href="/pfingstturnier" className="hover:text-black font-medium">Pfingstturnier</Link></li>
              <li><Link href="/events" className="hover:text-black font-medium">Events</Link></li>
              <li><Link href="/news" className="hover:text-black font-medium">News</Link></li>
              <li><Link href="/fanshop" className="hover:text-black font-medium">Fanshop</Link></li>
            </ul>
          </nav>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Sponsors Section */}
        <SponsorsSection />
        
        {/* Footer */}
        <footer className="bg-[#da8d43] text-white py-8">
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
              
              {/* Map */}
              <div>
                <h3 className="font-bold mb-4">Standort</h3>
                <a 
                  href="https://www.openstreetmap.org/#map=15/48.5789/15.3521" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black underline"
                >
                  Birkenstadion Stift Zwettl
                </a>
              </div>
              
              {/* Impressum */}
              <div>
                <h3 className="font-bold mb-4">Rechtliches</h3>
                <Link href="/impressum" className="hover:text-black underline">
                  Impressum
                </Link>
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
