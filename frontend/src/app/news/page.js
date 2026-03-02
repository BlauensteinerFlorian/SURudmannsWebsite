import { getNews, getAttributes, getImageUrl } from '@/lib/api'

export const revalidate = 60

export default async function News() {
  let news = { data: [] }
  
  try {
    news = await getNews()
  } catch (error) {
    console.error('Error:', error)
  }

  const allNews = news.data || []

  return (
    <div className="container mx-auto max-w-[80%] px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-[#ff6600] mb-8">News</h1>
      
      {allNews.length === 0 ? (
        <p className="text-center text-gray-600">Keine News vorhanden</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          {allNews.map((article) => {
            const attrs = getAttributes(article)
            const imgUrl = getImageUrl(article)
            return (
              <div key={article.id} className="mb-8 p-6 bg-white rounded-lg shadow-md border">
                {imgUrl && (
                  <img src={imgUrl} alt={attrs.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h2 className="text-2xl font-bold mb-2">{attrs.title}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {new Date(attrs.publishedAt).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <div className="text-gray-700">{attrs.content}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
