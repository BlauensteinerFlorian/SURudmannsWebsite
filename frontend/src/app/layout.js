import Link from 'next/link'
import '@/styles/globals.css'

export const metadata = {
  title: 'SU Rudmanns - Stift Zwettl',
  description: 'Offizielle Website von Sportunion Rudmanns',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col bg-white">
        <header className="bg-[#da8d43] text-white">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">SU Rudmanns</Link>
            <ul className="flex gap-6">
              <li><Link href="/" className="hover:text-black">Startseite</Link></li>
              <li><Link href="/mannschaft" className="hover:text-black">Mannschaft</Link></li>
              <li><Link href="/spielplan" className="hover:text-black">Spielplan</Link></li>
              <li><Link href="/news" className="hover:text-black">News</Link></li>
              <li><Link href="/sponsoren" className="hover:text-black">Sponsoren</Link></li>
              <li><Link href="/kontakt" className="hover:text-black">Kontakt</Link></li>
            </ul>
          </nav>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-[#da8d43] text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2026 SU Rudmanns - Stift Zwettl</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
