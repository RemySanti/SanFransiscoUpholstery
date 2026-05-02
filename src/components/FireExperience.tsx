import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { STOCK } from '../data/stockImages'
import './flameStopExperience.css'

function FireExperienceReduced() {
  return (
    <section id="flame-stop" className="fs-root" aria-labelledby="flame-stop-heading">
      <div className="fs-reduced-inner">
        <p className="fs-kicker">Flame Stop®</p>
        <h2 id="flame-stop-heading" className="fs-reduced-title">
          Intumescent protection, told without motion
        </h2>
        <div className="fs-reduced-grid">
          <div className="fs-reduced-card">
            <div className="fs-wood" role="img" aria-label="Untreated wood surface">
              <img className="fs-wood-img" src={STOCK.flame.untreated} alt="" />
            </div>
            <div className="fs-fire-layer" style={{ opacity: 0.85 }} />
            <span className="fs-wood-label">Untreated</span>
          </div>
          <div className="fs-reduced-card">
            <div className="fs-wood" role="img" aria-label="Flame Stop protected surface">
              <img className="fs-wood-img" src={STOCK.flame.protected} alt="" />
            </div>
            <div className="fs-fire-layer" style={{ opacity: 0.45 }} />
            <div className="fs-coating" style={{ opacity: 0.95, transform: 'scaleY(1.35)' }} />
            <span className="fs-wood-label">Flame Stop® protected</span>
          </div>
        </div>
        <div className="fs-reduced-copy">
          <p>Untreated material fails within seconds.</p>
          <p>Flame spread accelerates beyond control.</p>
          <p>Flame Stop® expands, insulating the surface.</p>
          <p>Fire is contained. Structure is preserved.</p>
        </div>
      </div>
    </section>
  )
}

function FireExperienceScroll() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const fireOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const fireScale = useTransform(scrollYProgress, [0.2, 0.6], [0.7, 1.4])
  const coatingOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])
  const expansion = useTransform(scrollYProgress, [0.65, 1], [1, 1.6])

  const text1 = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const text2 = useTransform(scrollYProgress, [0.22, 0.38, 0.52], [0, 1, 0])
  const text3 = useTransform(scrollYProgress, [0.48, 0.66, 0.8], [0, 1, 0])
  const text4 = useTransform(scrollYProgress, [0.82, 1], [0, 1])

  return (
    <section id="flame-stop" ref={ref} className="fs-root fs-section" aria-labelledby="flame-stop-live-heading">
      <div className="fs-sticky">
        <div className="fs-grain" aria-hidden />

        <div className="fs-split">
          <div className="fs-column">
            <div className="fs-wood" role="img" aria-label="Untreated wood surface">
              <img className="fs-wood-img" src={STOCK.flame.untreated} alt="" />
            </div>
            <motion.div className="fs-fire-layer" style={{ opacity: fireOpacity, scale: fireScale }} aria-hidden />
            <div className="fs-wood-label">Untreated</div>
          </div>

          <div className="fs-column">
            <div className="fs-wood" role="img" aria-label="Flame Stop protected surface">
              <img className="fs-wood-img" src={STOCK.flame.protected} alt="" />
            </div>
            <motion.div className="fs-fire-layer" style={{ opacity: fireOpacity }} aria-hidden />
            <motion.div className="fs-coating" style={{ opacity: coatingOpacity, scaleY: expansion }} aria-hidden />
            <div className="fs-wood-label">Flame Stop® protected</div>
          </div>
        </div>

        <div className="fs-copy">
          <p className="fs-kicker" id="flame-stop-live-heading">
            Flame Stop®
          </p>
          <div className="fs-copy-stack">
            <motion.h2 style={{ opacity: text1 }}>Untreated material fails within seconds.</motion.h2>
            <motion.h2 style={{ opacity: text2 }}>Flame spread accelerates beyond control.</motion.h2>
            <motion.h2 style={{ opacity: text3 }}>Flame Stop® expands, insulating the surface.</motion.h2>
            <motion.h2 style={{ opacity: text4 }}>Fire is contained. Structure is preserved.</motion.h2>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Scroll-driven before → fire → reaction → protection narrative.
 * Wood panels use stock photography under procedural fire / intumescent layers.
 */
export default function FireExperience() {
  const reduced = useReducedMotion()
  return reduced ? <FireExperienceReduced /> : <FireExperienceScroll />
}
