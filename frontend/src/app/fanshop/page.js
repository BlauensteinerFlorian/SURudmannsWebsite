export default function Fanshop() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a1a18] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-[#ff6600] mb-4">Fanshop</h1>
          <p className="text-xl">Hol dir dein SU Rudmanns Merch!</p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Bald verfügbar!</h2>
          <p className="text-lg text-gray-700 mb-8">
            Der offizielle SU Rudmanns Fanshop ist in Vorbereitung.
            Bald kannst du hier Trikots, Schals und andere Fanartikel erwerben.
          </p>
          <div className="bg-gray-100 p-8 rounded-lg">
            <p className="text-gray-600">
              <strong>Interesse?</strong> Schreib uns eine E-Mail an{' '}
              <a href="mailto:info@surudmanns.at" className="text-[#ff6600] hover:underline">
                info@surudmanns.at
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
