import { Search, Bell, User, Wifi, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Topbar() {
  return (
    <div className="sticky top-0 z-20">
      <div className="backdrop-blur-xl bg-slate-900/40 border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative"
          >
            <input
              placeholder="Quick search: address, case ID, caller"
              className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-blue-100 placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <Search className="w-4 h-4 text-blue-200/60 absolute left-3 top-1/2 -translate-y-1/2" />
          </motion.div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-blue-200/70">
            <Wifi className="w-4 h-4" />
            <span className="text-xs">Live</span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          </div>
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-blue-100/80">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] grid place-items-center rounded-full bg-rose-500 text-white">3</span>
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-blue-100/90 hover:bg-white/10">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600" />
              <span className="text-sm">Dispatcher</span>
              <User className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
