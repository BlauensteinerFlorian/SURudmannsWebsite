'use client'

import { useEffect, useState } from 'react'

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const res = await fetch('http://localhost:1337/api/sponsors?populate=logo')
        const data = await res.json()
        if (data.data) {
          setSponsors(data.data)
        }
      } catch (e) {
        console.error('Sponsors load error:', e)
      }
    }
    fetchSponsors()
  }, [])

  if (!sponsors.length) return null

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Unsere Sponsoren</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {sponsors.map((sponsor) => {
            const attrs = sponsor.attributes || sponsor
            const logo = attrs.logo?.data?.attributes || attrs.logo?.data
            const logoUrl = logo ? `http://localhost:1337${logo.url}` : null
            
            return (
              <div key={sponsor.id} className="flex items-center justify-center h-20">
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt={attrs.name || 'Sponsor'} 
                    className="max-h-16 max-w-32 object-contain"
                  />
                ) : (
                  <span className="text-lg font-bold text-gray-600">{attrs.name}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
