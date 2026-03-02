import { getGames, getAttributes } from '@/lib/api'

export const revalidate = 60

export default async function Spielplan() {
  let games = { data: [] }
  
  try {
    games = await getGames()
  } catch (error) {
    console.error('Error:', error)
  }

  const allGames = games.data || []

  // Sort by date
  allGames.sort((a, b) => new Date(getAttributes(b).date) - new Date(getAttributes(a).date))

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-[#ff6600] mb-8">Spielplan</h1>
      
      {allGames.length === 0 ? (
        <p className="text-center text-gray-600">Keine Spiele vorhanden</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          {allGames.map((game) => {
            const attrs = getAttributes(game)
            const isPast = new Date(attrs.date) < new Date()
            return (
              <div 
                key={game.id} 
                className={`p-4 mb-4 rounded-lg border ${isPast ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="font-bold text-lg">
                      {attrs.location === 'Heim' ? '🏠' : '🏟️'} vs {attrs.opponent}
                    </p>
                    <p className="text-gray-600">
                      {new Date(attrs.date).toLocaleDateString('de-DE', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">{attrs.league}</p>
                    {attrs.result && (
                      <p className="font-bold text-xl text-[#ff6600]">
                        {attrs.result}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
