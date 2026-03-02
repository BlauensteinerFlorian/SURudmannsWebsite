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
    <section className="py-8 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-16">
            {/* Double the sponsors for seamless loop */}
            {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => {
              const attrs = sponsor.attributes || sponsor
              const logo = attrs.logo?.data?.attributes || attrs.logo?.data
              const logoUrl = logo ? `http://localhost:1337${logo.url}` : null
              
              return (
                <div 
                  key={`${sponsor.id}-${index}`} 
                  className="flex-shrink-0 flex items-center justify-center h-20 w-40"
                >
                  {logoUrl ? (
                    <img 
                      src={logoUrl} 
                      alt={attrs.name || 'Sponsor'} 
                      className="max-h-16 max-w-36 object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-400">{attrs.name}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
