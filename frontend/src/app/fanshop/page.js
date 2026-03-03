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

      {/* Shop iframe */}
      <section className="py-8 container mx-auto px-6 max-w-7xl">
        <iframe 
          src="https://www.w4merch.at/shop/su-rudmanns"
          title="SU Rudmanns Fanshop"
          className="w-full h-screen min-h-[800px] border-2 border-[#ff6600] rounded-lg"
        />
      </section>
    </div>
  )
}
