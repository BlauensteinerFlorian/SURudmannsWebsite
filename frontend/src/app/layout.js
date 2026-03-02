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
