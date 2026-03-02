'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "SU Rudmanns",
      subtitle: "Stift Zwettl",
      description: "Football unter Birken seit 1988",
      cta: "Mannschaft ansehen",
      ctaLink: "/mannschaft",
      bgColor: "bg-[#1a1a18]"
    },
    {
      title: "Pfingstturnier 2026",
      subtitle: "31. Mai 2026",
      description: "Das größte Turnier der Region",
      cta: "Jetzt anmelden",
      ctaLink: "/pfingstturnier",
      bgColor: "bg-[#da8d43]"
    },
    {
      title: "Pokalsieger 2024",
      subtitle: "Unser größter Erfolg",
      description: "Wir sind stolz auf unser Team!",
      cta: "Mehr erfahren",
      ctaLink: "/news",
      bgColor: "bg-[#1a1a18]"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${slide.bgColor} transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">{slide.title}</h1>
              <p className="text-2xl mb-2">{slide.subtitle}</p>
              <p className="text-lg text-gray-300 mb-8">{slide.description}</p>
              <Link
                href={slide.ctaLink}
                className="inline-block bg-white text-[#1a1a18] px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
