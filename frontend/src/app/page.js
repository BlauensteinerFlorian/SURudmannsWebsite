export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary text-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">SU Rudmanns</h1>
          <p className="text-xl mb-2">Stift Zwettl</p>
          <p className="text-lg text-gray-400">Gegründet 1988</p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-2">Nächstes Spiel</h3>
            <p>Datum wird geladen...</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-2">Aktuelle News</h3>
            <p>News wird geladen...</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-2">Pfingstturnier 2026</h3>
            <p>Details folgen</p>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Über uns</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="mb-4">
              Der Sportunion Rudmanns wurde 1988 gegründet und hat seine Heimat 
              im Birkenstadion in Stift Zwettl.
            </p>
            <p className="mb-4 font-bold text-primary">
              Pokalsieg 2024 - unser größter Erfolg!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
