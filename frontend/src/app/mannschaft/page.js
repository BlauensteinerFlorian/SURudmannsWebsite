import { getPlayers, getAttributes, getImageUrl } from '@/lib/api'

export const revalidate = 60

// Helper to format date to DD.MM.YYYY
function formatDate(dateStr) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

// Get team picture
async function getTeamPicture() {
  try {
    const res = await fetch('http://localhost:1337/api/teampicture?populate=image', { cache: 'no-store' })
    const data = await res.json()
    return data.data || null
  } catch (e) {
    console.error('Error fetching teampicture:', e)
    return null
  }
}

export default async function Mannschaf() {
  let players = { data: [] }
  let teampicture = null
  
  try {
    const [playersData, tp] = await Promise.all([
      getPlayers(),
      getTeamPicture()
    ])
    players = playersData
    teampicture = tp
  } catch (error) {
    console.error('Error:', error)
  }

  const allPlayers = players.data || []

  // Get team image URL - handle both Strapi v4 and v5 formats
  let teamImageUrl = null
  if (teampicture) {
    // Strapi 5: image.data.attributes.url
    let img = teampicture.image?.data?.attributes || teampicture.image?.data
    if (img?.url) {
      teamImageUrl = `http://localhost:1337${img.url}`
    }
    // Also try direct url (Strapi 5 flat)
    else if (teampicture.image?.url) {
      teamImageUrl = `http://localhost:1337${teampicture.image.url}`
    }
  }

  // Sort by number
  allPlayers.sort((a, b) => {
    const attrsA = getAttributes(a)
    const attrsB = getAttributes(b)
    const numA = attrsA.number || 999
    const numB = attrsB.number || 999
    return numA - numB
  })

  return (
    <div>
      {/* Überschrift */}
      <section className="py-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-4xl font-bold text-center text-[#ff6600]">Unsere Mannschaft</h1>
        </div>
      </section>

      {/* Team Bild */}
      {teamImageUrl && (
        <section className="py-4">
          <div className="container mx-auto px-6 max-w-6xl">
            <img 
              src={teamImageUrl} 
              alt="Mannschaftsbild" 
              className="w-full h-auto  rounded-lg"
            />
          </div>
        </section>
      )}

      {/* Spieler */}
      <section className="py-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-4xl font-bold text-center text-[#ff6600] mb-8">Unsere Spieler</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {allPlayers.map((player) => {
              const attrs = getAttributes(player)
              const imgUrl = getImageUrl(player)
              return (
                <div 
                  key={player.id} 
                  className="text-center bg-white rounded-lg shadow-md hover:shadow-orange-400"
                  style={{  }}
                >
                  {imgUrl ? (
                    <img 
                      src={imgUrl}
                      alt={attrs.name}
                      className="w-full aspect-square  rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-t-lg">
                      <span className="text-3xl">⚽</span>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-white text-xl font-bold">{attrs.name}</p>
                    <p className="text-gray-500 text-sm">{formatDate(attrs.birthdate)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
