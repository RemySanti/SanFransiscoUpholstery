import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motionTokens } from '../../lib/motion'
import { Container } from '../sanctuary/primitives'

const dust = [12, 28, 44, 58, 72, 36, 64, 22, 81, 48]

const HERO_BG = '/hero-sanctuary-entry.png'

export function SanctuaryEntryHero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [curtainOpen, setCurtainOpen] = useState(reduced)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  /** Parallax: image drifts and eases scale while the hero scrolls off-screen. */
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 110])
  const bgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.12, 1.02])

  const glowY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const contentFade = useTransform(scrollYProgress, [0, 0.72], [1, 0.28])

  useEffect(() => {
    if (reduced) return
    const id = window.setTimeout(() => setCurtainOpen(true), 200)
    return () => clearTimeout(id)
  }, [reduced])

  const lineDelay = reduced ? 0 : 0.35

  return (
    <header ref={ref} className="hero hero--sanctuary-entry">
      <div className="hero-bg-parallax" aria-hidden>
        <motion.div className="hero-bg-parallax__motion" style={{ y: bgY, scale: bgScale }}>
          <img
            className="hero-bg-parallax__img"
            src={HERO_BG}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
        <div className="hero-bg-parallax__scrim" />
      </div>

      <motion.div
        className="hero-curtain"
        initial={false}
        animate={{ opacity: curtainOpen ? 0 : 1 }}
        transition={{ duration: reduced ? 0 : 1.15, ease: motionTokens.ease }}
        style={{ pointerEvents: curtainOpen ? 'none' : 'auto' }}
        aria-hidden
      />

      <div className="hero-dust" aria-hidden>
        {dust.map((left, i) => (
          <motion.span
            key={i}
            className="hero-dust-mote"
            style={{ left: `${left}%` }}
            animate={
              reduced
                ? undefined
                : {
                    y: [0, -18, 0],
                    opacity: [0.25, 0.55, 0.25],
                  }
            }
            transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          />
        ))}
      </div>

      <motion.div
        className="hero-glow"
        aria-hidden
        style={{
          y: reduced ? 0 : glowY,
          scale: reduced ? 1 : 1.08,
        }}
      />

      <Container className="hero-container">
        <motion.div
          className="hero-inner"
          style={{
            y: reduced ? 0 : contentY,
            opacity: reduced ? 1 : contentFade,
          }}
        >
          <h1 className="hero-headline">
            <motion.span
              className="hero-headline-line"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.75,
                ease: motionTokens.ease,
                delay: lineDelay,
              }}
            >
              We Restore What
            </motion.span>
            <br />
            <motion.span
              className="hero-headline-line hero-headline-line--emphasis"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.75,
                ease: motionTokens.ease,
                delay: lineDelay + 0.2,
              }}
            >
              <em>Time Forgets.</em>
            </motion.span>
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.65, ease: motionTokens.ease, delay: lineDelay + 0.55 }}
          >
            San Francisco Upholstery Group — 25+ years restoring and building upholstery for national commercial programs
            and private sanctuaries alike.
          </motion.p>

          <motion.div
            className="button-row centered"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: motionTokens.ease, delay: lineDelay + 0.75 }}
          >
            <motion.div whileHover={reduced ? undefined : { scale: 1.03, y: -2 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
              <Link to="/quote" className="sanctuary-btn sanctuary-btn-primary cta-link">
                Start Your Restoration
              </Link>
            </motion.div>
            <motion.div whileHover={reduced ? undefined : { scale: 1.03, y: -2 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
              <Link to="/experience" className="sanctuary-btn sanctuary-btn-ghost cta-link">
                Enter the Experience
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </header>
  )
}
