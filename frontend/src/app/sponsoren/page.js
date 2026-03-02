import { getSponsors, getAttributes, getImageUrl } from '@/lib/api'

export const revalidate = 60

export default async function Sponsoren() {
  let sponsors = { data: [] }
  
  try {
    sponsors = await getSponsors()
  } catch (error) {
    console.error('Error:', error)
  }

  const allSponsors = sponsors.data || []

  const categoryOrder = ['Hauptsponsor', 'Premium', 'Standard', 'Sponsor']
  allSponsors.sort((a, b) => {
    const catA = categoryOrder.indexOf(getAttributes(a).category)
    const catB = categoryOrder.indexOf(getAttributes(b).category)
    return catA - catB
  })

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-[#ff6600] mb-8">Unsere Sponsoren</h1>
      
      {allSponsors.length === 0 ? (
        <p className="text-center text-gray-600">Keine Sponsoren vorhanden</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#ff6600]">Hauptsponsoren</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {allSponsors.filter(s => getAttributes(s).category === 'Hauptsponsor').map((sponsor) => {
              const attrs = getAttributes(sponsor)
              const imgUrl = getImageUrl(sponsor)
              return (
                <div key={sponsor.id} className="p-6 bg-white rounded-lg shadow-md border text-center">
                  {imgUrl && <img src={imgUrl} alt={attrs.name} className="h-24 mx-auto mb-4 object-contain" />}
                  <p className="font-bold text-lg">{attrs.name}</p>
                  {attrs.website && (
                    <a href={attrs.website} target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:underline">Website →</a>
                  )}
                </div>
              )
            })}
          </div>

          <h2 className="text-xl font-bold text-center mb-4">Premium Sponsoren</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {allSponsors.filter(s => getAttributes(s).category === 'Premium').map((sponsor) => {
              const attrs = getAttributes(sponsor)
              const imgUrl = getImageUrl(sponsor)
              return (
                <div key={sponsor.id} className="p-4 bg-white rounded-lg shadow-sm border text-center">
                  {imgUrl && <img src={imgUrl} alt={attrs.name} className="h-16 mx-auto mb-2 object-contain" />}
                  <p className="font-bold">{attrs.name}</p>
                </div>
              )
            })}
          </div>

          <h2 className="text-lg font-bold text-center mb-4">Sponsoren</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allSponsors.filter(s => !['Hauptsponsor', 'Premium'].includes(getAttributes(s).category)).map((sponsor) => (
              <div key={sponsor.id} className="p-3 bg-white rounded shadow-sm text-center">
                <p className="font-semibold">{getAttributes(sponsor).name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
