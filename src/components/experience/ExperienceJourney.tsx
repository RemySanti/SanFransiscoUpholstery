import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { STOCK } from '../../data/stockImages'

/** Tuned to follow Lenis/smooth scroll closely while easing abrupt wheel steps. */
const SCROLL_SPRING = { stiffness: 210, damping: 36, mass: 0.28, restDelta: 0.0008 }

function ExperienceJourneyReduced() {
  const scenes = [
    { title: 'Neglect', copy: 'Finish fades. Dust settles into the weave.' },
    { title: 'Breakdown', copy: 'Threads surrender. The frame tells the truth.' },
    { title: 'Craft', copy: 'Hands re-tie, re-build, re-choose with intent.' },
    { title: 'Transformation', copy: 'Structure returns. Silhouette recovers its pride.' },
    { title: 'Final', copy: 'A luxury piece ready for its next lifetime.' },
  ]
  return (
    <section className="experience-root experience-root--reduced" aria-label="Restoration story">
      <div className="experience-inner">
        <h1 className="page-hero-title">The Scroll Story</h1>
        <p className="page-hero-lede">
          Five beats of a single restoration—neglect, breakdown, craft, transformation, and the finished sanctuary piece.
        </p>
        <ol className="experience-list">
          {scenes.map((s) => (
            <li key={s.title}>
              <strong>{s.title}</strong> — {s.copy}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ExperienceJourneyScroll() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const p = useSpring(scrollYProgress, SCROLL_SPRING)

  const bgTint = useTransform(p, (t) => {
    const x = Math.min(1, Math.max(0, t))
    const blackPct = Math.round((0.88 + x * 0.1) * 100)
    return `color-mix(in srgb, var(--black) ${blackPct}%, var(--sage) ${100 - blackPct}%)`
  })

  /* Overlapping crossfades: adjacent lines share opacity so swaps feel continuous. */
  const o1 = useTransform(p, [0, 0.055, 0.19, 0.31], [0, 1, 1, 0])
  const o2 = useTransform(p, [0.23, 0.31, 0.445, 0.555], [0, 1, 1, 0])
  const o3 = useTransform(p, [0.47, 0.555, 0.675, 0.775], [0, 1, 1, 0])
  const o4 = useTransform(p, [0.69, 0.775, 0.885, 0.965], [0, 1, 1, 0])
  const o5 = useTransform(p, [0.87, 0.945, 1], [0, 1, 1])

  const y1 = useTransform(p, [0, 0.055, 0.19, 0.31], [22, 0, 0, -14])
  const y2 = useTransform(p, [0.23, 0.31, 0.445, 0.555], [22, 0, 0, -14])
  const y3 = useTransform(p, [0.47, 0.555, 0.675, 0.775], [22, 0, 0, -14])
  const y4 = useTransform(p, [0.69, 0.775, 0.885, 0.965], [22, 0, 0, -14])
  const y5 = useTransform(p, [0.87, 0.945, 1], [18, 0, 0])

  const chairScale = useTransform(p, [0, 1], [0.9, 1.06])
  const chairRotate = useTransform(p, [0, 1], [-2.25, 0.65])
  const tear = useTransform(p, [0.18, 0.48], [0, 1])

  return (
    <section ref={ref} className="experience-root experience-scroll" aria-label="Cinematic restoration journey">
      <motion.div className="experience-bg" style={{ backgroundColor: bgTint }} />

      <div className="experience-sticky">
        <motion.div className="experience-visual" style={{ scale: chairScale, rotate: chairRotate }} aria-hidden>
          <div
            className="experience-chair"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(var(--rgb-primary),0.22), rgba(var(--rgb-primary),0.48)), url(${STOCK.experienceChair})`,
            }}
          >
            <motion.div className="experience-tear" style={{ opacity: tear }} />
          </div>
        </motion.div>

        <div className="experience-copy">
          <div className="experience-copy-stack">
            <motion.h2 className="experience-line" style={{ opacity: o1, y: y1 }}>
              Neglect — the chair goes quiet.
            </motion.h2>
            <motion.h2 className="experience-line" style={{ opacity: o2, y: y2 }}>
              Breakdown — fabric yields, frame speaks.
            </motion.h2>
            <motion.h2 className="experience-line" style={{ opacity: o3, y: y3 }}>
              Craft — materials chosen, stitches deliberate.
            </motion.h2>
            <motion.h2 className="experience-line" style={{ opacity: o4, y: y4 }}>
              Transformation — structure returns, line by line.
            </motion.h2>
            <motion.h2 className="experience-line experience-line--finale" style={{ opacity: o5, y: y5 }}>
              Final — luxury restored for daily life.
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ExperienceJourney() {
  const reduced = useReducedMotion()
  return reduced ? <ExperienceJourneyReduced /> : <ExperienceJourneyScroll />
}
