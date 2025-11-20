import { Activity, Clock, Headset, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const Stat = ({ icon: Icon, label, value, sub }) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 120, damping: 16 }}
    className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
  >
    <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_var(--x,50%)_-20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-white/5 grid place-items-center">
        <Icon className="w-6 h-6 text-blue-300" />
      </div>
      <div>
        <p className="text-blue-200/70 text-sm">{label}</p>
        <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
    {sub && <p className="mt-3 text-xs text-blue-200/60">{sub}</p>}
  </motion.div>
)

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat icon={Activity} label="Active Incidents" value="12" sub="5 Priority • 7 Standard" />
      <Stat icon={Clock} label="Avg. Response" value="07:42" sub="Last 24h across districts" />
      <Stat icon={Headset} label="Calls in Queue" value="3" sub="2 Medical • 1 Fire" />
      <Stat icon={MapPin} label="Units Deployed" value="26" sub="Across 14 barangays" />
    </div>
  )
}
