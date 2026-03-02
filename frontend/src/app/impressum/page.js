export default function Impressum() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a1a18] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[#da8d43] mb-4">Impressum</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-[#da8d43]">Angaben gemäß § 5 ECG</h2>
          
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-2">Sportunion Rudmanns</h3>
            <p className="text-gray-700">Birkenstadion Stift Zwettl</p>
            <p className="text-gray-700">Stift Zwettl</p>
            <p className="text-gray-700">Österreich</p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-2">Ansprechpartner</h3>
            <p className="text-gray-700">Walter Blauensteiner (Obmann)</p>
            <p className="text-gray-700">E-Mail: obmann@surudmanns.at</p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-2">Vereinsregister</h3>
            <p className="text-gray-700">ZVR-Zahl: [Wird nachgetragen]</p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-2">Haftungsausschluss</h3>
            <p className="text-gray-700 mb-2">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <p className="text-gray-700">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-2">Datenschutz</h3>
            <p className="text-gray-700">
              Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
            </p>
          </div>

          <div className="text-sm text-gray-500 mt-12 pt-4 border-t">
            <p>Stand: März 2026</p>
          </div>
        </div>
      </section>
    </div>
  )
}
