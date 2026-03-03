import Link from 'next/link'
import { fetchAPI, getAttributes } from '@/lib/api'

const STRAPI_URL = 'http://localhost:1337'

// Helper to extract full text from content blocks
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
function getArticleImageUrl(attrs) {
  const img = attrs.image?.[0]?.attributes || attrs.image?.[0]
  return img ? `${STRAPI_URL}${img.url}` : null
}

export default async function NewsDetail({ params }) {
  const { id } = params
  
  // Fetch article by ID
  let article = null
  try {
    const data = await fetchAPI(`/api/articles/${id}`)
    article = data.data
  } catch (error) {
    console.error('Error fetching article:', error)
  }

  if (!article) {
    return (
      <div className="container mx-auto px-6 max-w-7xl py-20 text-center">
        <h1 className="text-3xl font-bold text-[#ff6600] mb-4">Artikel nicht gefunden</h1>
        <Link href="/news" className="text-[#ff6600] hover:underline">
          ← Zurück zur News-Übersicht
        </Link>
      </div>
    )
  }

  const attrs = getAttributes(article)
  const imageUrl = getArticleImageUrl(attrs)
  const contentText = extractContentText(attrs.content)

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
      {/* Back Link */}
      <div className="container mx-auto px-6 max-w-7xl pt-6">
        <Link href="/news" className="text-[#ff6600] hover:underline flex items-center gap-2">
          ← Zurück zur News-Übersicht
        </Link>
      </div>

      {/* Article */}
      <article className="container mx-auto px-6 max-w-4xl py-8">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={attrs.title || 'News'} 
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
        )}
        
        <p className="text-[#ff6600] font-bold mb-4 flex items-center gap-2">
          📅 {attrs.publishedAt ? formatDate(attrs.publishedAt) : ''}
        </p>
        
        <h1 className="text-4xl font-bold mb-6">{attrs.title}</h1>
        
        <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
          {contentText.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  )
}
