import { useEffect, useState } from 'react'
import { CloudRain, Sun, CloudLightning, Wind, Droplets } from 'lucide-react'
import { motion } from 'framer-motion'

const iconFor = (code) => {
  switch (code) {
    case 'Thunderstorm':
      return CloudLightning
    case 'Drizzle':
    case 'Rain':
      return CloudRain
    case 'Snow':
      return Droplets
    case 'Clear':
      return Sun
    default:
      return Wind
  }
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState({loading: true})

  useEffect(() => {
    const api = 'https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover&current_weather=true&timezone=Asia%2FManila'
    fetch(api)
      .then(r => r.json())
      .then(d => {
        const cur = d.current_weather || {}
        setWeather({
          loading: false,
          temp: cur.temperature,
          wind: cur.windspeed,
          code: cur.weathercode,
          description: 'Live conditions',
          humidity: d.hourly?.relative_humidity_2m?.[0],
          precip: d.hourly?.precipitation_probability?.[0],
          cloud: d.hourly?.cloud_cover?.[0]
        })
      })
      .catch(() => setWeather({ loading: false, error: true }))
  }, [])

  const Icon = iconFor(weather.label || 'Clear')

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-violet-600/10 border border-white/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_80%_-10%,rgba(59,130,246,0.2),transparent)]" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-blue-200/70 text-sm">Manila Weather</p>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-bold text-white tracking-tight">{weather.loading ? '—' : `${Math.round(weather.temp)}°C`}</p>
            <span className="text-blue-200/70">now</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-blue-200/70 text-xs">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2">
              <p>Wind</p>
              <p className="text-white font-semibold">{weather.loading ? '—' : `${Math.round(weather.wind)} km/h`}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-2">
              <p>Humidity</p>
              <p className="text-white font-semibold">{weather.loading ? '—' : `${Math.round(weather.humidity)}%`}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-2">
              <p>Precip</p>
              <p className="text-white font-semibold">{weather.loading ? '—' : `${Math.round(weather.precip)}%`}</p>
            </div>
          </div>
        </div>
        <div className="w-24 h-24 rounded-2xl bg-white/5 grid place-items-center border border-white/10">
          <Sun className="w-10 h-10 text-yellow-300" />
        </div>
      </div>
    </motion.div>
  )
}
