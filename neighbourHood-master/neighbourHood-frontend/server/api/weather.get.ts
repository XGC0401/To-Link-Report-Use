interface OpenMeteoForecastResponse {
    timezone?: string
    current?: {
        time?: string
        temperature_2m?: number
        weather_code?: number
    }
    daily?: {
        time?: string[]
        weather_code?: number[]
        temperature_2m_max?: number[]
        temperature_2m_min?: number[]
    }
}

interface OpenMeteoReverseGeocodeResponse {
    results?: Array<{
        name?: string
        admin1?: string
        country?: string
    }>
}

interface IpApiResponse {
    latitude?: number
    longitude?: number
    city?: string
    country_name?: string
}

const DEFAULT_LAT = 43.3623
const DEFAULT_LON = -8.4115

const getNumericHeader = (event: Parameters<typeof getHeader>[0], name: string) => {
    const value = getHeader(event, name)
    if (!value) {
        return null
    }

    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : null
}

const getClientIp = (event: Parameters<typeof getHeader>[0]) => {
    const forwarded = getHeader(event, 'x-forwarded-for')
    if (forwarded) {
        return forwarded.split(',')[0]?.trim() || null
    }

    return getHeader(event, 'x-real-ip') || null
}

const resolveCoordinates = async (event: Parameters<typeof getHeader>[0], queryLat: number, queryLon: number) => {
    if (Number.isFinite(queryLat) && Number.isFinite(queryLon)) {
        return {
            latitude: queryLat,
            longitude: queryLon,
            cityHint: null as string | null,
            countryHint: null as string | null,
            source: 'query' as 'query' | 'header' | 'ip' | 'default'
        }
    }

    const headerLatitude =
        getNumericHeader(event, 'x-vercel-ip-latitude')
        ?? getNumericHeader(event, 'x-geo-latitude')
    const headerLongitude =
        getNumericHeader(event, 'x-vercel-ip-longitude')
        ?? getNumericHeader(event, 'x-geo-longitude')

    if (headerLatitude !== null && headerLongitude !== null) {
        return {
            latitude: headerLatitude,
            longitude: headerLongitude,
            cityHint: null as string | null,
            countryHint: null as string | null,
            source: 'header' as 'query' | 'header' | 'ip' | 'default'
        }
    }

    const clientIp = getClientIp(event)
    if (clientIp) {
        try {
            const ipGeo = await $fetch<IpApiResponse>(`https://ipapi.co/${clientIp}/json/`, {
                timeout: 2500
            })
            if (Number.isFinite(ipGeo.latitude) && Number.isFinite(ipGeo.longitude)) {
                return {
                    latitude: ipGeo.latitude as number,
                    longitude: ipGeo.longitude as number,
                    cityHint: ipGeo.city || null,
                    countryHint: ipGeo.country_name || null,
                    source: 'ip' as 'query' | 'header' | 'ip' | 'default'
                }
            }
        } catch {
            // ignore and fall back to defaults
        }
    }

    return {
        latitude: DEFAULT_LAT,
        longitude: DEFAULT_LON,
        cityHint: null as string | null,
        countryHint: null as string | null,
        source: 'default' as 'query' | 'header' | 'ip' | 'default'
    }
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const lat = Number.parseFloat(String(query.lat ?? ''))
    const lon = Number.parseFloat(String(query.lon ?? ''))
    const lang = String(query.lang ?? 'en') === 'zh' ? 'zh' : 'en'

    const resolved = await resolveCoordinates(event, lat, lon)
    const latitude = resolved.latitude
    const longitude = resolved.longitude

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`

    const weatherData = await $fetch<OpenMeteoForecastResponse>(weatherUrl)

    let city = resolved.cityHint || ''
    let country = resolved.countryHint || ''
    try {
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=${lang}&count=1`
        const geocodeData = await $fetch<OpenMeteoReverseGeocodeResponse>(geocodeUrl)
        const first = geocodeData.results?.[0]
        if (first?.name) {
            city = first.name
        }
        if (first?.country) {
            country = first.country
        }
    } catch {
        // keep best available hint
    }

    const dailyTimes = weatherData.daily?.time || []
    const dailyCodes = weatherData.daily?.weather_code || []
    const dailyMax = weatherData.daily?.temperature_2m_max || []
    const dailyMin = weatherData.daily?.temperature_2m_min || []

    const daily = dailyTimes.map((date, index) => ({
        date,
        weatherCode: dailyCodes[index] ?? 0,
        maxTemperature: dailyMax[index] ?? 0,
        minTemperature: dailyMin[index] ?? 0
    }))

    return {
        city,
        country,
        timezone: weatherData.timezone || 'UTC',
        coordinates: {
            latitude,
            longitude
        },
        locationSource: resolved.source,
        current: {
            time: weatherData.current?.time,
            temperature: weatherData.current?.temperature_2m,
            weatherCode: weatherData.current?.weather_code
        },
        daily
    }
})
