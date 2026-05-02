import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Dual-layer cursor (dot + soft ring) — matches Glass Editorial cursor system. */
export function CursorGlow() {
  const reduced = useReducedMotion()
  const [coarsePointer, setCoarsePointer] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const sync = () => setCoarsePointer(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduced || coarsePointer) return
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, coarsePointer])

  if (reduced || coarsePointer) return null

  return (
    <div className="fs-cursor-glow-root" aria-hidden>
      <div
        className="fs-cursor-dot"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      />
      <div
        className="fs-cursor-ring"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      />
      <div
        className="fs-cursor-glow-blob"
        style={{ transform: `translate(${pos.x - 80}px, ${pos.y - 80}px)` }}
      />
    </div>
  )
}
