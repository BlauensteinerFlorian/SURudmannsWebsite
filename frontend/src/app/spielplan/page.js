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
  const now = new Date()

  // Separate upcoming and past games
  const upcomingGames = allGames.filter(g => new Date(getAttributes(g).date) >= now).sort((a, b) => new Date(getAttributes(a).date) - new Date(getAttributes(b).date))
  const pastGames = allGames.filter(g => new Date(getAttributes(g).date) < now).sort((a, b) => new Date(getAttributes(b).date) - new Date(getAttributes(a).date))

  return (
    <div className="container mx-auto px-6 max-w-7xl py-8">
      <h1 className="text-4xl font-bold text-center text-[#ff6600] mb-8">Spielplan</h1>
      
      {/* Upcoming Games */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#ff6600] mb-4">Kommende Spiele</h2>
        {upcomingGames.length === 0 ? (
          <p className="text-gray-600">Keine kommenden Spiele</p>
        ) : (
          <div className="space-y-4">
            {upcomingGames.map((game) => {
              const attrs = getAttributes(game)
              return (
                <div 
                  key={game.id} 
                  className="bg-white rounded-lg border-2 border-[#ff6600] shadow-md overflow-hidden"
                >
                  <div className="flex">
                    {/* Date Box */}
                    <div className="bg-[#ff6600] text-white p-4 flex flex-col items-center justify-center min-w-[80px]">
                      <span className="text-2xl font-bold">{new Date(attrs.date).getDate()}</span>
                      <span className="text-sm">{new Date(attrs.date).toLocaleDateString('de-DE', { month: 'short' })}</span>
                    </div>
                    
                    {/* Game Info */}
                    <div className="flex-grow p-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg">
                          {attrs.location === 'Heim' ? 'SU Rudmanns ⚽' : 'SU Rudmanns ⚽'} vs {attrs.opponent} 👎}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(attrs.date).toLocaleDateString('de-DE', { weekday: 'long', hour: '2-digit', minute: '2-digit' })} • {attrs.league}
                        </p>
                      </div>
                      {attrs.location && (
                        <span className={`px-3 py-1 rounded text-sm ${attrs.location === 'Heim' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {attrs.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Past Games */}
      <div>
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Vergangene Spiele</h2>
        {pastGames.length === 0 ? (
          <p className="text-gray-600">Keine vergangenen Spiele</p>
        ) : (
          <div className="space-y-3">
            {pastGames.map((game) => {
              const attrs = getAttributes(game)
              return (
                <div 
                  key={game.id} 
                  className="bg-gray-100 rounded-lg border border-gray-200 p-4 opacity-70 hover:opacity-90 transition"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="font-medium text-gray-700">
                        {attrs.location === 'Heim' ? 'SU Rudmanns ⚽' : 'SU Rudmanns ⚽'} vs {attrs.opponent} 👎}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(attrs.date).toLocaleDateString('de-DE', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })} • {attrs.league}
                      </p>
                    </div>
                    <div className="text-right">
                      {attrs.result && (
                        <p className="font-bold text-lg text-gray-600">
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
    </div>
  )
}
