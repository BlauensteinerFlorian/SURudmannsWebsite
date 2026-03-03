export default function Fanshop() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a1a18] text-white py-16">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-[#ff6600] mb-2">Fanshop</h1>
          <p className="text-xl">Hol dir dein SU Rudmanns Merch!</p>
        </div>
      </section>

      {/* Shop Link */}
      <section className="py-12 container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-8">
            Der offizielle SU Rudmanns Fanshop befindet sich bei w4merch.
          </p>
          
          <a 
            href="https://www.w4merch.at/shop/su-rudmanns"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ff6600] text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-600 transition text-lg"
          >
            🛒 Zum Fanshop ↗
          </a>

          <p className="text-sm text-gray-500 mt-4">
            (Öffnet in einem neuen Tab)
          </p>
        </div>
      </section>
    </div>
  )
}
