'use client'

import { useEffect, useState } from 'react'

const STRAPI_URL = 'http://localhost:1337'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/events?populate=image`)
        const data = await res.json()
        if (data.data) {
          setEvents(data.data)
        }
      } catch (e) {
        console.error('Events load error:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Helper for Strapi 5 format (flat, no attributes wrapper)
  const getAttr = (item) => item.attributes || item

  // Helper for image URL
  const getImageUrl = (item) => {
    const attrs = getAttr(item)
    const img = attrs.image?.data?.attributes || attrs.image?.data
    return img ? `${STRAPI_URL}${img.url}` : null
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('de-DE', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  // Separate upcoming and past events
  const now = new Date()
  const upcomingEvents = events
    .filter(e => new Date(getAttr(e).date) >= now)
    .sort((a, b) => new Date(getAttr(a).date) - new Date(getAttr(b).date))
  const pastEvents = events
    .filter(e => new Date(getAttr(e).date) < now)
    .sort((a, b) => new Date(getAttr(b).date) - new Date(getAttr(a).date))

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a1a18] text-white py-16">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-[#ff6600] mb-2">Events</h1>
          <p className="text-xl">Veranstaltungen bei SU Rudmanns</p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl font-bold text-[#ff6600] mb-8">Kommende Veranstaltungen</h2>
        
        {loading ? (
          <p className="text-center text-gray-600">Lädt...</p>
        ) : upcomingEvents.length === 0 ? (
          <p className="text-center text-gray-600">Keine Events geplant.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => {
              const attrs = getAttr(event)
              const imageUrl = getImageUrl(event)
              
              return (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#ff6600]">
                  {imageUrl && (
                    <img 
                      src={imageUrl} 
                      alt={attrs.title || 'Event'} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <p className="text-[#ff6600] font-bold mb-2 flex items-center gap-2">
                      📅 {attrs.date ? formatDate(attrs.date) : 'Datum offen'}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{attrs.title}</h3>
                    <p className="text-gray-600 mb-3">
                      {attrs.description?.substring(0, 100)}...
                    </p>
                    {attrs.location && (
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        📍 {attrs.location}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-2xl font-bold text-gray-400 mb-8">Vergangene Veranstaltungen</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => {
                const attrs = getAttr(event)
                const imageUrl = getImageUrl(event)
                
                return (
                  <div key={event.id} className="bg-gray-100 rounded-lg shadow-sm overflow-hidden opacity-70">
                    {imageUrl && (
                      <img 
                        src={imageUrl} 
                        alt={attrs.title || 'Event'} 
                        className="w-full h-40 object-cover grayscale"
                      />
                    )}
                    <div className="p-4">
                      <p className="text-gray-500 text-sm mb-1">
                        {attrs.date ? formatDate(attrs.date) : ''}
                      </p>
                      <h3 className="text-lg font-bold mb-2">{attrs.title}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
