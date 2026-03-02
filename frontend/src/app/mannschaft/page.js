import { getPlayers, getAttributes, getImageUrl } from '@/lib/api'

export const revalidate = 60

export default async function Mannschaf() {
  let players = { data: [] }
  
  try {
    players = await getPlayers()
  } catch (error) {
    console.error('Error:', error)
  }

  const allPlayers = players.data || []

  // Sort by number
  allPlayers.sort((a, b) => {
    const attrsA = getAttributes(a)
    const attrsB = getAttributes(b)
    const numA = attrsA.number || 999
    const numB = attrsB.number || 999
    return numA - numB
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Der Kader</h1>
      <p className="text-center text-gray-600 mb-8">{allPlayers.length} Spieler</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {allPlayers.map((player) => {
          const attrs = getAttributes(player)
          const imgUrl = getImageUrl(player)
          return (
            <div key={player.id} className="text-center bg-white rounded-lg shadow-md border">
              {imgUrl ? (
                <img 
                  src={imgUrl}
                  alt={attrs.name}
                  className="w-full aspect-square object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-t-lg">
                  <span className="text-3xl">⚽</span>
                </div>
              )}
              <p className="font-bold text-lg">{attrs.name}</p>
              <p className="text-[#ff6600] font-bold text-xl">#{attrs.number || '-'}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
