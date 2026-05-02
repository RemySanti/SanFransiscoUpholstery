import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { STOCK } from '../../data/stockImages'

export function BeforeAfterSlider({
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeSrc = STOCK.beforeAfter.before,
  afterSrc = STOCK.beforeAfter.after,
}: {
  beforeLabel?: string
  afterLabel?: string
  beforeSrc?: string
  afterSrc?: string
}) {
  const [pct, setPct] = useState(48)
  const reduced = useReducedMotion()

  return (
    <div className="ba-slider glass-panel">
      <div className="ba-track" role="img" aria-label={`${beforeLabel} and ${afterLabel} comparison`}>
        <div
          className="ba-layer ba-before"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(var(--rgb-primary),0.12), rgba(var(--rgb-primary),0.22)), url(${beforeSrc})`,
          }}
        >
          <span className="ba-badge">{beforeLabel}</span>
        </div>
        <div
          className="ba-layer ba-after"
          style={{
            clipPath: `inset(0 ${100 - pct}% 0 0)`,
            backgroundImage: `linear-gradient(180deg, rgba(var(--rgb-primary),0.08), rgba(var(--rgb-primary),0.15)), url(${afterSrc})`,
          }}
        >
          <span className="ba-badge ba-badge--after">{afterLabel}</span>
        </div>
        <input
          className="ba-range"
          type="range"
          min={8}
          max={92}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-valuetext={`${pct} percent after revealed`}
        />
        <motion.div
          className="ba-knob"
          style={{ left: `${pct}%` }}
          animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
