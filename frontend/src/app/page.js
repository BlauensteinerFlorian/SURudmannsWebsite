import Link from 'next/link'
import { getPlayers, getUpcomingGames, getNews, getSponsors, getAttributes, getImageUrl } from '@/lib/api'

export const revalidate = 60

export default async function Home() {
  let players = { data: [] }
  let games = { data: [] }
  let news = { data: [] }
  let sponsors = { data: [] }

  try {
    players = await getPlayers()
    games = await getUpcomingGames()
    news = await getNews()
    sponsors = await getSponsors()
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  const playerList = players.data || []
  const upcomingGames = games.data?.slice(0, 3) || []
  const latestNews = news.data?.slice(0, 2) || []
  const sponsorList = sponsors.data || []

  return (
    <div>
      <section className="bg-[#1a1a18] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-[#da8d43] mb-4">SU Rudmanns</h1>
          <p className="text-xl mb-2">Stift Zwettl</p>
          <p className="text-lg text-gray-400">Gegründet 1988</p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-bold text-[#da8d43] mb-4">Nächstes Spiel</h3>
            {upcomingGames.length > 0 ? (
              <div>
                <p className="font-bold">{getAttributes(upcomingGames[0]).opponent}</p>
                <p className="text-gray-600">
                  {new Date(getAttributes(upcomingGames[0]).date).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-gray-500">{getAttributes(upcomingGames[0]).location}</p>
              </div>
            ) : (<p>Keine Spiele geplant</p>)}
            <Link href="/spielplan" className="text-[#da8d43] hover:underline mt-2 inline-block">Zum Spielplan →</Link>
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-bold text-[#da8d43] mb-4">Aktuelle News</h3>
            {latestNews.length > 0 ? (
              <div>
                <p className="font-bold">{getAttributes(latestNews[0]).title}</p>
                <Link href="/news" className="text-[#da8d43] hover:underline mt-2 inline-block">Alle News →</Link>
              </div>
            ) : (<p>Keine News vorhanden</p>)}
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-bold text-[#da8d43] mb-4">Sponsoren</h3>
            <p className="text-gray-600 mb-2">{sponsorList.length} Sponsoren</p>
            <Link href="/sponsoren" className="text-[#da8d43] hover:underline">Unsere Sponsoren →</Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Der Kader</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {playerList.slice(0, 12).map((player) => {
              const attrs = getAttributes(player)
              const imgUrl = getImageUrl(player)
              return (
                <div key={player.id} className="text-center p-4 bg-white rounded-lg shadow-sm">
                  {imgUrl ? (
                    <img src={imgUrl} alt={attrs.name} className="w-20 h-20 rounded-full mx-auto mb-2 object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full mx-auto mb-2 bg-gray-200 flex items-center justify-center"><span className="text-2xl">⚽</span></div>
                  )}
                  <p className="font-bold text-sm">{attrs.name}</p>
                  <p className="text-[#da8d43] text-sm">#{attrs.number || '-'}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/mannschaft" className="bg-[#da8d43] text-white px-6 py-3 rounded-lg hover:bg-orange-600 inline-block">Ganzer Kader →</Link>
          </div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Über uns</h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-4">Der Sportunion Rudmanns wurde 1988 gegründet und hat seine Heimat im Birkenstadion in Stift Zwettl.</p>
          <p className="mb-4 font-bold text-[#da8d43]">Pokalsieg 2024 - unser größter Erfolg!</p>
        </div>
      </section>
    </div>
  )
}
