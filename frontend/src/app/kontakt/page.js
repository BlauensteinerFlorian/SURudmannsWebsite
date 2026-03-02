export default function Kontakt() {
  return (
    <div className="container mx-auto max-w-[80%] px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-[#ff6600] mb-8">Kontakt</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold mb-4 text-[#ff6600]">Kontaktieren Sie uns</h2>
          
          <div className="mb-6">
            <h3 className="font-bold mb-2"> Anschrift</h3>
            <p className="text-gray-600">Birkenstadion Stift Zwettl</p>
            <p className="text-gray-600">Stift Zwettl, Österreich</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-2"> E-Mail</h3>
            <a href="mailto:info@surudmanns.at" className="text-[#ff6600] hover:underline">
              info@surudmanns.at
            </a>
          </div>
          
          <div>
            <h3 className="font-bold mb-2"> Ansprechpartner</h3>
            <p className="text-gray-600">Walter Blauensteiner (Obmann)</p>
            <a href="mailto:obmann@surudmanns.at" className="text-[#ff6600] hover:underline">
              obmann@surudmanns.at
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
