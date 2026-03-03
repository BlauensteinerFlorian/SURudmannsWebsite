import { getNews, getAttributes } from '@/lib/api'

export const revalidate = 60

const STRAPI_URL = 'http://localhost:1337'

// Helper to extract text from content blocks
function extractContentText(content) {
  if (!content) return ''
  if (typeof content === 'string') return content
  
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.children) {
        return block.children.map(child => child.text || '').join('')
      }
      return block.text || ''
    }).join(' ')
  }
  
  return ''
}

// Helper for image URL
function getArticleImageUrl(item) {
  const attrs = getAttributes(item)
  const img = attrs.image?.[0]?.attributes || attrs.image?.[0]
  return img ? `${STRAPI_URL}${img.url}` : null
}

export default async function News() {
  let articles = { data: [] }
  
  try {
    articles = await getNews()
  } catch (error) {
    console.error('Error:', error)
  }

  const allArticles = articles.data || []
  
  // Sort by date (newest first)
  const sortedArticles = [...allArticles].sort((a, b) => 
    new Date(getAttributes(b).publishedAt) - new Date(getAttributes(a).publishedAt)
  )

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('de-DE', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a1a18] text-white py-16">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-[#ff6600] mb-2">News</h1>
          <p className="text-xl">Aktuelles von SU Rudmanns</p>
        </div>
      </section>

      {/* News List */}
      <section className="py-12 container mx-auto px-6 max-w-7xl">
        {sortedArticles.length === 0 ? (
          <p className="text-center text-gray-600">Keine News vorhanden.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => {
              const attrs = getAttributes(article)
              const imageUrl = getArticleImageUrl(article)
              const contentText = extractContentText(attrs.content)
              
              return (
                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#ff6600]">
                  {imageUrl && (
                    <img 
                      src={imageUrl} 
                      alt={attrs.title || 'News'} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <p className="text-[#ff6600] font-bold mb-2 flex items-center gap-2">
                      📅 {attrs.publishedAt ? formatDate(attrs.publishedAt) : ''}
                    </p>
                    <h3 className="text-xl font-bold mb-3">{attrs.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {contentText}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
