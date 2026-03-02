import { getTeamMembers, getAttributes, getImageUrl } from '@/lib/api'

export const revalidate = 60

export default async function Vorstand() {
  let members = { data: [] }
  
  try {
    members = await getTeamMembers()
  } catch (error) {
    console.error('Error:', error)
  }

  const allMembers = members.data || []

  return (
    <div className="container mx-auto max-w-[80%] px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-[#ff6600] mb-8">Vorstand</h1>
      
      {allMembers.length === 0 ? (
        <p className="text-center text-gray-600">Keine Vorstandsmitglieder vorhanden</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {allMembers.map((member) => {
            const attrs = getAttributes(member)
            const imgUrl = getImageUrl(member)
            return (
              <div key={member.id} className="p-6 bg-white rounded-lg shadow-md border text-center">
                {imgUrl ? (
                  <img src={imgUrl} alt={attrs.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#ff6600]" />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                    <span className="text-4xl">👤</span>
                  </div>
                )}
                <p className="font-bold text-lg">{attrs.name}</p>
                <p className="text-[#ff6600] font-semibold">{attrs.function}</p>
                {attrs.email && (
                  <a href={`mailto:${attrs.email}`} className="text-sm text-gray-500 hover:text-[#ff6600] block mt-2">
                    {attrs.email}
                  </a>
                )}
                {attrs.phone && <p className="text-sm text-gray-500">{attrs.phone}</p>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
