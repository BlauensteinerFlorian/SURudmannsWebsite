import { getEvents, getAttributes } from '@/lib/api'

export const revalidate = 60

export default async function Events() {
  let events = { data: [] }
  
  try {
    events = await getEvents()
  } catch (error) {
    console.error('Error:', error)
  }

  const allEvents = events.data || []
  const now = new Date()

  const upcomingEvents = allEvents
    .filter(e => new Date(getAttributes(e).date) >= now)
    .sort((a, b) => new Date(getAttributes(a).date) - new Date(getAttributes(b).date))
  
  const pastEvents = allEvents
    .filter(e => new Date(getAttributes(e).date) < now)
    .sort((a, b) => new Date(getAttributes(b).date) - new Date(getAttributes(a).date))

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
          <h1 className="text-5xl font-bold text-[#ff6600] mb-2">Events</h1>
          <p className="text-xl">Veranstaltungen bei SU Rudmanns</p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl font-bold text-[#ff6600] mb-8">Kommende Veranstaltungen</h2>
        
        {upcomingEvents.length === 0 ? (
          <p className="text-center text-gray-600">Keine Events geplant.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => {
              const attrs = getAttributes(event)
              
              
              return (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#ff6600]">
                  
                  <div className="p-5">
                    <p className="text-[#ff6600] font-bold mb-2 flex items-center gap-2">
                      📅 {attrs.date ? formatDate(attrs.date) : 'Datum offen'}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{attrs.title}</h3>
                    <p className="text-gray-600 mb-3">
                      {attrs.description?.
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
                const attrs = getAttributes(event)
                
                
                return (
                  <div key={event.id} className="bg-gray-100 rounded-lg shadow-sm overflow-hidden opacity-70">
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
