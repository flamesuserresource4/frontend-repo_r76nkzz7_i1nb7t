import { useState } from 'react'
import { Home, AlertTriangle, CloudSun, Map, Settings, PhoneCall, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NavItem = ({ icon: Icon, label, active=false }) => (
  <button
    className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-blue-500/20 text-white' : 'text-blue-100/80 hover:text-white hover:bg-white/5'}`}
  >
    <span className={`grid place-items-center w-9 h-9 rounded-lg transition-all duration-300 ${active ? 'bg-blue-500/30' : 'bg-white/5 group-hover:bg-white/10'}`}>
      <Icon className="w-5 h-5" />
    </span>
    <span className="font-medium tracking-tight">{label}</span>
  </button>
)

export default function Sidebar({ onReport }) {
  const [open, setOpen] = useState(true)

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="relative z-10"
    >
      <div className="sticky top-0 h-screen">
        <div className="backdrop-blur-xl bg-slate-900/40 border-r border-white/10 h-full flex flex-col p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/30 grid place-items-center">
                <PhoneCall className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-200/70">DRRM</p>
                <h1 className="text-white font-bold leading-5">911 Command</h1>
              </div>
            </div>
            <button onClick={() => setOpen(!open)} className="text-blue-100/70 hover:text-white p-2 rounded-lg hover:bg-white/5">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 overflow-hidden"
              >
                <NavItem icon={Home} label="Dashboard" active />
                <NavItem icon={AlertTriangle} label="Incidents" />
                <NavItem icon={CloudSun} label="Weather" />
                <NavItem icon={Map} label="Live Map" />
                <NavItem icon={Settings} label="Settings" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -1 }}
              onClick={onReport}
              className="w-full relative overflow-hidden rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 shadow-lg shadow-rose-500/30"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <AlertTriangle className="w-5 h-5" /> Report Incident
              </span>
              <span className="absolute inset-0 bg-white/10 mix-blend-overlay" />
            </motion.button>
            <p className="text-[10px] mt-3 text-blue-200/60 text-center">For emergency dispatch and coordination</p>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
