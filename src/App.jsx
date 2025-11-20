import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatsCards from './components/StatsCards'
import WeatherWidget from './components/WeatherWidget'
import LiveMap from './components/LiveMap'
import IncidentReportModal from './components/IncidentReportModal'

function App() {
  const [reportOpen, setReportOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const handleReport = (data) => {
    setReportOpen(false)
    setToast({ title: 'Incident submitted', desc: `${data.type} • ${data.severity} at ${data.location}` })
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100 selection:bg-blue-500/30">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_400px_at_20%_-10%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_400px_at_80%_-10%,rgba(147,197,253,0.1),transparent)]" />
      <div className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <Sidebar onReport={() => setReportOpen(true)} />
        <main className="relative min-h-screen">
          <Topbar />
          <div className="p-6 space-y-6">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <LiveMap />
                <div className="relative overflow-hidden rounded-2xl p-5 bg-white/5 border border-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_10%_-20%,rgba(59,130,246,0.15),transparent)]" />
                  <div className="relative">
                    <h3 className="text-white font-semibold mb-2">Recent Incidents</h3>
                    <ul className="divide-y divide-white/10">
                      {[
                        { id: 'MED-28421', label: 'Medical - Difficulty breathing', place: 'Brgy. 123, Sampaloc', time: '2m ago', badge: 'Priority' },
                        { id: 'FIR-28418', label: 'Fire - Residential', place: 'Tondo, Manila', time: '8m ago', badge: 'Standard' },
                        { id: 'RES-28410', label: 'Flooding reported', place: 'Malate', time: '14m ago', badge: 'Priority' },
                      ].map((i) => (
                        <li key={i.id} className="py-3 flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{i.label}</p>
                            <p className="text-xs text-blue-200/70">{i.place}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-xs px-2 py-1 rounded-lg border ${i.badge==='Priority' ? 'bg-rose-500/20 border-rose-400/30 text-rose-200' : 'bg-white/5 border-white/10 text-blue-200/80'}`}>{i.badge}</span>
                            <span className="text-xs text-blue-200/70">{i.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <WeatherWidget />
                <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-teal-600/10 border border-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_80%_-10%,rgba(16,185,129,0.2),transparent)]" />
                  <div className="relative">
                    <h3 className="text-white font-semibold mb-3">Dispatch Overview</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <span className="text-blue-200/70">Nearest ALS Unit</span>
                        <span className="text-white font-semibold">3.2 km</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <span className="text-blue-200/70">Traffic Delay</span>
                        <span className="text-white font-semibold">+4 min</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <span className="text-blue-200/70">Hospitals Available</span>
                        <span className="text-white font-semibold">7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <IncidentReportModal open={reportOpen} onClose={() => setReportOpen(false)} onSubmit={handleReport} />

      {toast && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="fixed bottom-4 right-4 z-50">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white shadow-xl">
            <p className="font-semibold">{toast.title}</p>
            <p className="text-sm text-blue-200/80">{toast.desc}</p>
          </div>
        </motion.div>
      )}

    </div>
  )
}

export default App
