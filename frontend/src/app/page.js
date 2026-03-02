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

// Get home cards
async function getHomeCards() {
  try {
    const res = await fetch('http://localhost:1337/api/home-cards', { cache: 'no-store' })
    const data = await res.json()
    return data.data || []
  } catch (e) {
    console.error('Error fetching home cards:', e)
    return []
  }
}

export default async function Home() {
  let games = { data: [] }
  let news = { data: [] }
  let sponsors = { data: [] }
  let aboutus = null
  let homeCards = []

  try {
    const [gamesData, newsData, sponsorsData, aboutusData, hcData] = await Promise.all([
      getUpcomingGames(),
      getNews(),
      getSponsors(),
      getAboutUs(),
      getHomeCards()
    ])
    games = gamesData
    news = newsData
    sponsors = sponsorsData
    aboutus = aboutusData
    homeCards = hcData
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

      {/* About us Section */}
      <section className="pt-12 pb-0 bg-[#0a0a0a]">
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

      {/* Home Cards Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {homeCards.map((card) => {
            const attrs = card.attributes || card
            return (
              <div key={card.id} className="p-6 border rounded-lg bg-white shadow-sm text-center flex flex-col justify-center min-h-[150px]">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">{attrs.title}</h3>
                <p className="text-gray-600">{attrs.subtitle}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Aktuelle News Section */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-8">Aktuelle News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.data?.slice(0, 3).map((article) => {
            const attrs = getAttributes(article)
            
            // Get image URL - Strapi 5 format: image is an array or direct object
            let imgUrl = null
            if (attrs.image) {
              // Handle array of images
              const imgObj = Array.isArray(attrs.image) ? attrs.image[0] : attrs.image
              if (imgObj?.url) {
                imgUrl = `http://localhost:1337${imgObj.url}`
              }
            }
            
            // Get content preview
            let contentPreview = ''
            if (attrs.content && Array.isArray(attrs.content)) {
              const firstPara = attrs.content.find(b => b.type === 'paragraph')
              if (firstPara?.children?.[0]?.text) {
                contentPreview = firstPara.children[0].text.substring(0, 100) + '...'
              }
            }
            
            // Format date
            const dateStr = attrs.publishedAt ? new Date(attrs.publishedAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''
            
            return (
              <div key={article.id} className="border rounded-lg bg-white shadow-sm overflow-hidden flex flex-col">
                {imgUrl && (
                  <img src={imgUrl} alt={attrs.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6 flex flex-col flex-grow">
                  {dateStr && <p className="text-sm text-gray-500 mb-2">{dateStr}</p>}
                  <h3 className="text-xl font-bold text-[#ff6600] mb-2">{attrs.title}</h3>
                  {contentPreview && <p className="text-gray-600 mb-4">{contentPreview}</p>}
                  <div className="mt-auto">
                    <Link href="/news" className="inline-block bg-[#ff6600] text-white px-4 py-2 rounded font-bold hover:bg-white hover:text-[#ff6600] transition">
                      Weiterlesen
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Next Game Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <p className="text-center text-gray-500 uppercase tracking-wider mb-6">Nächstes Spiel</p>
          
          {/* Teams */}
          <div className="flex items-center justify-between text-center mb-6">
            <div className="flex-1">
              <p className="text-xl font-bold text-[#ff6600]">SU Rudmanns</p>
            </div>
            <div className="px-4">
              <p className="text-2xl font-bold text-gray-400">VS</p>
            </div>
            <div className="flex-1">
              <p className="text-xl font-bold">{upcomingGames.length > 0 ? getAttributes(upcomingGames[0]).opponent : 'Gegner (TBD)'}</p>
            </div>
          </div>
          
          {/* Date & Location */}
          <div className="text-center text-gray-600 mb-8">
            {upcomingGames.length > 0 && getAttributes(upcomingGames[0]).date ? (
              <p>
                {new Date(getAttributes(upcomingGames[0]).date).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                {getAttributes(upcomingGames[0]).location && ` | ${getAttributes(upcomingGames[0]).location}`}
              </p>
            ) : (
              <p>Datum und Spielort werden noch bekannt gegeben</p>
            )}
          </div>
          
          {/* Button */}
          <div className="text-center">
            <Link href="/spielplan" className="inline-block bg-[#ff6600] text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#ff6600] transition">
              Zum Spielplan
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
