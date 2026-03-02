'use client'

import { useState, useEffect } from 'react'

export default function Pfingstturnier() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [formData, setFormData] = useState({ teamname: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  // Pfingstsonntag 2026 berechnen (31. Mai 2026)
  useEffect(() => {
    const targetDate = new Date('2026-05-31T14:00:00')
    
    const updateCountdown = () => {
      const now = new Date()
      const diff = targetDate - now
      
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        })
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Anmeldung:', formData)
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero Section with Countdown */}
      <section className="bg-[#1a1a18] text-white py-12">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-[#ff6600] mb-2">Pfingstturnier 2026</h1>
          <p className="text-xl mb-8">Sportunion Rudmanns</p>
          
          {/* Countdown inline */}
          <div className="flex justify-center gap-4 md:gap-6 mt-8">
            <div className="bg-[#ff6600] p-4 rounded-lg min-w-[70px]">
              <p className="text-3xl font-bold">{countdown.days}</p>
              <p className="text-sm">Tage</p>
            </div>
            <div className="bg-[#ff6600] p-4 rounded-lg min-w-[70px]">
              <p className="text-3xl font-bold">{countdown.hours}</p>
              <p className="text-sm">Stunden</p>
            </div>
            <div className="bg-[#ff6600] p-4 rounded-lg min-w-[70px]">
              <p className="text-3xl font-bold">{countdown.minutes}</p>
              <p className="text-sm">Min</p>
            </div>
            <div className="bg-[#ff6600] p-4 rounded-lg min-w-[70px]">
              <p className="text-3xl font-bold">{countdown.seconds}</p>
              <p className="text-sm">Sek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Turnier Info */}
      <section className="py-12 container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-8">Über das Turnier</h2>
          <div className="prose mx-auto">
            <p className="text-lg text-gray-700 mb-4">
              Das traditionelle Pfingstturnier der SU Rudmanns findet jährlich am Pfingstsonntag statt.
              Teams aus der ganzen Region treffen sich im Birkenstadion Stift Zwettl.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Beginn: 14:00 Uhr</li>
              <li>Modus: Joker-Turnier</li>
              <li>Startgeld: €50,- pro Team</li>
              <li>Für Speis und Trank ist bestgesorgt!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Anmeldung */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-8">Anmeldung</h2>
          
          {submitted ? (
            <div className="max-w-md mx-auto bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded">
              <p className="font-bold">Danke für deine Anmeldung!</p>
              <p>Wir melden uns in Kürze bei dir.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Teamname *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                  value={formData.teamname}
                  onChange={(e) => setFormData({...formData, teamname: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">E-Mail *</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Telefon</label>
                <input 
                  type="tel"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Nachricht</label>
                <textarea 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#ff6600] text-white font-bold py-3 rounded-lg hover:bg-orange-600"
              >
                Anmeldung absenden
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
