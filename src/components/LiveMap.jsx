import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function LiveMap() {
  const ref = useRef(null)
  useEffect(() => {
    // Simple 3D-like grid background animation
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, raf

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (t=0) => {
      ctx.clearRect(0,0,w,h)
      ctx.fillStyle = 'rgba(2,6,23,0.9)'
      ctx.fillRect(0,0,w,h)

      const spacing = 60 * devicePixelRatio
      const offset = (t*0.04) % spacing
      ctx.strokeStyle = 'rgba(59,130,246,0.2)'
      ctx.lineWidth = 1

      for (let y = -spacing; y < h + spacing; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y + offset)
        ctx.lineTo(w, y + offset)
        ctx.stroke()
      }
      for (let x = -spacing; x < w + spacing; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, h)
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
      <canvas ref={ref} className="w-full h-[320px]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-slate-900/40" />
      <div className="absolute bottom-3 left-3 text-blue-200/70 text-xs bg-slate-900/50 px-2 py-1 rounded-lg border border-white/10">Live deployments grid</div>
    </motion.div>
  )
}
