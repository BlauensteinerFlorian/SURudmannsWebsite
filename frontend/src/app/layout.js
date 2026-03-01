import '../styles/globals.css'

export const metadata = {
  title: 'SU Rudmanns - Stift Zwettl',
  description: 'Offizielle Website von Sportunion Rudmanns',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <header className="bg-secondary text-accent">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">SU Rudmanns</h1>
            <ul className="flex gap-6">
              <li><a href="/" className="hover:text-primary">Startseite</a></li>
              <li><a href="/mannschaft" className="hover:text-primary">Mannschaft</a></li>
              <li><a href="/spielplan" className="hover:text-primary">Spielplan</a></li>
              <li><a href="/news" className="hover:text-primary">News</a></li>
              <li><a href="/sponsoren" className="hover:text-primary">Sponsoren</a></li>
              <li><a href="/kontakt" className="hover:text-primary">Kontakt</a></li>
            </ul>
          </nav>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-secondary text-accent py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 SU Rudmanns - Stift Zwettl</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
