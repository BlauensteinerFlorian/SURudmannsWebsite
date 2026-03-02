'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function getAttributes(item) {
  return item.attributes || item
}

export default function HeroSlider() {
  const [slides, setSlides] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch('http://localhost:1337/api/home-sliders?sort=order:asc&populate=image')
        const data = await res.json()
        if (data.data && data.data.length > 0) {
          setSlides(data.data)
        } else {
          setSlides([
            {
              id: 1,
              attributes: {
                title: "SU Rudmanns",
                subtitle: "Stift Zwettl",
                description: "Football unter Birken seit 1988",
                cta: "Mannschaft ansehen",
                ctaLink: "/mannschaft",
                bgColor: "#1a1a18"
              }
            },
            {
              id: 2,
              attributes: {
                title: "Pfingstturnier 2026",
                subtitle: "31. Mai 2026",
                description: "Das größte Turnier der Region",
                cta: "Jetzt anmelden",
                ctaLink: "/pfingstturnier",
                bgColor: "#ff6600"
              }
            }
          ])
        }
      } catch (e) {
        console.error('Error fetching slides:', e)
        setSlides([
          {
            id: 1,
            attributes: {
              title: "SU Rudmanns",
              subtitle: "Stift Zwettl",
              description: "Football unter Birken seit 1988",
              cta: "Mannschaft ansehen",
              ctaLink: "/mannschaft",
              bgColor: "#1a1a18"
            }
          }
        ])
      }
      setLoading(false)
    }
    fetchSlides()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (loading || slides.length === 0) {
    return (
      <section className="bg-[#1a1a18] text-white h-[600px] flex items-center justify-center">
        <p>Lädt...</p>
      </section>
    )
  }

  const getSlideImage = (slide) => {
    const attrs = getAttributes(slide)
    if (attrs.image?.url) {
      return `http://localhost:1337${attrs.image.url}`
    }
    const img = attrs.image?.data?.attributes || attrs.image?.data
    return img?.url ? `http://localhost:1337${img.url}` : null
  }

  return (
    <section className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => {
        const attrs = getAttributes(slide)
        const bgImage = getSlideImage(slide)
        
        return (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundColor: bgImage ? '#1a1a18' : (attrs.bgColor || '#1a1a18'),
              opacity: index === currentSlide ? 1 : 0
            }}
          >
            {bgImage && (
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
              />
            )}
            {bgImage && (
              <div className="absolute inset-0 bg-black/50" />
            )}
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-4">{attrs.title}</h1>
                {attrs.subtitle && <p className="text-2xl mb-2">{attrs.subtitle}</p>}
                {attrs.description && <p className="text-lg text-gray-300 mb-8">{attrs.description}</p>}
                {attrs.cta && (
                  <Link
                    href={attrs.ctaLink || '/'}
                    className="inline-block bg-[#ff6600] text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#ff6600] transition"
                  >
                    {attrs.cta}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )
      })}
      
      {/* Left Arrow */}
      {slides.length > 1 && (
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#ff6600] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:text-[#ff6600] transition"
        >
          ←
        </button>
      )}

      {/* Right Arrow */}
      {slides.length > 1 && (
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#ff6600] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:text-[#ff6600] transition"
        >
          →
        </button>
      )}
      
      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-[#ff6600]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
