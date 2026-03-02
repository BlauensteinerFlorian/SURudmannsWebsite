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
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
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
              <div className="p-5">
                <p className="text-white text-xl font-bold">{attrs.name}</p>
                <p className="text-gray-500 text-sm">{formatDate(attrs.birthdate)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
