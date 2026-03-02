'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function getAttributes(item) {
  return item.attributes || item
}

function getImageUrl(item) {
  const attrs = getAttributes(item)
  const img = attrs.image?.data?.attributes || attrs.image?.data
  return img ? `http://localhost:1337${img.url}` : null
}

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('http://localhost:1337/api/events?populate=image')
        const data = await res.json()
        if (data.data) {
          setEvents(data.data)
        }
      } catch (e) {
        console.error('Events load error:', e)
      }
    }
    fetchEvents()
  }, [])

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
      <section className="bg-[#1a1a18] text-white py-20">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h1 className="text-5xl font-bold text-[#ff6600] mb-4">Events</h1>
          <p className="text-xl">Veranstaltungen bei SU Rudmanns</p>
        </div>
      </section>

      {/* Events Liste */}
      <section className="py-12 container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-8">Kommende Veranstaltungen</h2>
        
        {events.length === 0 ? (
          <p className="text-center text-gray-600">Keine Events geplant.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const attrs = getAttributes(event)
              const imageUrl = getImageUrl(event)
              
              return (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                  {imageUrl && (
                    <img 
                      src={imageUrl} 
                      alt={attrs.title || 'Event'} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <p className="text-[#ff6600] font-bold mb-2">
                      {attrs.date ? formatDate(attrs.date) : 'Datum offen'}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{attrs.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {attrs.description?.substring(0, 100)}...
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
