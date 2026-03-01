const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

/**
 * Fetch data from Strapi API
 * @param {string} endpoint - API endpoint (e.g., '/api/players')
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - Parsed JSON response
 */
export async function fetchAPI(endpoint, options = {}) {
  const url = `${STRAPI_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
    },
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  const res = await fetch(url, mergedOptions)
  
  if (!res.ok) {
    console.error(`Strapi API Error: ${res.status} ${res.statusText}`)
    throw new Error(`Failed to fetch: ${endpoint}`)
  }

  const data = await res.json()
  return data
}

/**
 * Get all players
 */
export async function getPlayers() {
  return fetchAPI('/api/players?populate=*')
}

/**
 * Get all games (Spielplan)
 */
export async function getGames() {
  return fetchAPI('/api/games?sort=date:desc&populate=*')
}

/**
 * Get upcoming games
 */
export async function getUpcomingGames() {
  const today = new Date().toISOString()
  return fetchAPI(`/api/games?filters[date][$gte]=${today}&sort=date:asc&populate=*`)
}

/**
 * Get all news
 */
export async function getNews() {
  return fetchAPI('/api/news?sort=publishedAt:desc&populate=*')
}

/**
 * Get all sponsors
 */
export async function getSponsors() {
  return fetchAPI('/api/sponsors?populate=*')
}

/**
 * Get all team members (Vorstand, Trainer)
 */
export async function getTeamMembers() {
  return fetchAPI('/api/team-members?populate=*')
}

export { STRAPI_URL }
