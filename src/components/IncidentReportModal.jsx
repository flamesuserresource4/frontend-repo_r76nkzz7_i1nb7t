import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Upload, X, Send } from 'lucide-react'

export default function IncidentReportModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    type: 'Medical',
    severity: 'Priority',
    location: '',
    description: '',
    reporter: '',
  })

  const handle = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl"
          >
            <div className="absolute -top-28 -right-24 w-[420px] h-[420px] bg-blue-500/20 rounded-full blur-3xl" />

            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 grid place-items-center">
                  <AlertTriangle className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Report Incident</h3>
                  <p className="text-xs text-blue-200/70">Create a new dispatch record</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-blue-100/80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submit} className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-blue-200/70">Type</label>
                <select name="type" value={form.type} onChange={handle} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-blue-100 focus:ring-2 focus:ring-blue-500/40">
                  <option>Medical</option>
                  <option>Fire</option>
                  <option>Police</option>
                  <option>Rescue</option>
                  <option>Flood</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-blue-200/70">Severity</label>
                <select name="severity" value={form.severity} onChange={handle} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-blue-100 focus:ring-2 focus:ring-blue-500/40">
                  <option>Priority</option>
                  <option>Standard</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-blue-200/70">Location</label>
                <input name="location" value={form.location} onChange={handle} placeholder="Street, barangay, landmark" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-blue-100 focus:ring-2 focus:ring-blue-500/40" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-blue-200/70">Description</label>
                <textarea name="description" value={form.description} onChange={handle} rows="3" placeholder="What happened?" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-blue-100 focus:ring-2 focus:ring-blue-500/40" />
              </div>
              <div>
                <label className="text-xs text-blue-200/70">Reporter Name</label>
                <input name="reporter" value={form.reporter} onChange={handle} placeholder="Optional" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-blue-100 focus:ring-2 focus:ring-blue-500/40" />
              </div>
              <div>
                <label className="text-xs text-blue-200/70">Attachments</label>
                <div className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-blue-100 flex items-center justify-between">
                  <span className="text-blue-200/60 text-sm">Drop files or browse</span>
                  <Upload className="w-4 h-4 text-blue-300" />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-blue-100 hover:bg-white/10">Cancel</button>
                <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold flex items-center gap-2">
                  <Send className="w-4 h-4" /> Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
