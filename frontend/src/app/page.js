import Link from 'next/link'
import HeroSlider from '@/components/HeroSlider'
import { getUpcomingGames, getNews, getSponsors, getAttributes } from '@/lib/api'

export const revalidate = 60

// Helper to get aboutus data
async function getAboutUs() {
  try {
    const res = await fetch('http://localhost:1337/api/aboutus', { cache: 'no-store' })
    const data = await res.json()
    return data.data || null
  } catch (e) {
    console.error('Error fetching aboutus:', e)
    return null
  }
}

export default async function Home() {
  let games = { data: [] }
  let news = { data: [] }
  let sponsors = { data: [] }
  let aboutus = null

  try {
    const [gamesData, newsData, sponsorsData, aboutusData] = await Promise.all([
      getUpcomingGames(),
      getNews(),
      getSponsors(),
      getAboutUs()
    ])
    games = gamesData
    news = newsData
    sponsors = sponsorsData
    aboutus = aboutusData
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  const upcomingGames = games.data?.slice(0, 3) || []
  const latestNews = news.data?.slice(0, 2) || []
  const sponsorList = sponsors.data || []

  // Get aboutus content
  const aboutTitle = aboutus?.title || 'Über uns'
  const aboutDescription = aboutus?.description

  return (
    <div>
      <HeroSlider />

      {/* Über uns Section - from CMS */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-8">{aboutTitle}</h2>
          <div className="max-w-2xl mx-auto text-center">
            {aboutDescription && aboutDescription.map((block, index) => {
              if (block.type === 'paragraph') {
                return <p key={index} className="mb-4">{block.children?.[0]?.text}</p>
              }
              return null
            })}
          </div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-bold text-[#ff6600] mb-4">Nächstes Spiel</h3>
            {upcomingGames.length > 0 ? (
              <div>
                <p className="font-bold">{getAttributes(upcomingGames[0]).opponent}</p>
                <p className="text-gray-600">
                  {new Date(getAttributes(upcomingGames[0]).date).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-gray-500">{getAttributes(upcomingGames[0]).location}</p>
              </div>
            ) : (<p>Keine Spiele geplant</p>)}
            <Link href="/spielplan" className="text-[#ff6600] hover:underline mt-2 inline-block">Zum Spielplan →</Link>
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-bold text-[#ff6600] mb-4">Aktuelle News</h3>
            {latestNews.length > 0 ? (
              <div>
                <p className="font-bold">{getAttributes(latestNews[0]).title}</p>
                <Link href="/news" className="text-[#ff6600] hover:underline mt-2 inline-block">Alle News →</Link>
              </div>
            ) : (<p>Keine News vorhanden</p>)}
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-bold text-[#ff6600] mb-4">Sponsoren</h3>
            <p className="text-gray-600 mb-2">{sponsorList.length} Sponsoren</p>
            <Link href="/sponsoren" className="text-[#ff6600] hover:underline">Unsere Sponsoren →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
