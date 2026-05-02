import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { RitualPath } from '../components/sanctuary/RitualPath'
import { motionTokens } from '../lib/motion'
import {
  processHeroContainer,
  processHeroItem,
  processPhaseContainer,
  processPhaseItem,
} from '../lib/journeyVariants'
import { BodyText, Container, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

const phases = [
  {
    step: '01',
    title: 'Consultation',
    copy: 'We listen to the piece, the space, and the wear patterns you cannot fake.',
    icon: '◆',
  },
  {
    step: '02',
    title: 'Material selection',
    copy: 'Swatches become strategy—performance, hand, and story aligned to use.',
    icon: '◇',
  },
  {
    step: '03',
    title: 'Craftsmanship',
    copy: 'Hand-tied springs, rebuilt decks, and stitching that honors the original maker.',
    icon: '◆',
  },
  {
    step: '04',
    title: 'Delivery',
    copy: 'Installation-minded finishing, protective delivery, and care guidance.',
    icon: '◇',
  },
] as const

export function ProcessPage() {
  const reduced = useReducedMotion()
  const journeyRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ['start 0.75', 'end 0.35'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 35, mass: 0.4 })
  const progressWidth = useTransform(progress, [0, 1], ['8%', '100%'])

  return (
    <>
      <Section className="page-hero process-page-hero">
        <Container>
          <motion.div
            className="process-hero-inner"
            variants={processHeroContainer}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'show'}
            viewport={{ once: true, amount: 0.45 }}
          >
            <motion.p className="section-kicker process-hero-kicker" variants={processHeroItem}>
              The Ritual
            </motion.p>
            <motion.div variants={processHeroItem}>
              <TypographyHeadingLG>
                Ceremonial workflow, <em>real deliverables</em>
              </TypographyHeadingLG>
            </motion.div>
            <motion.div variants={processHeroItem}>
              <BodyText className="process-hero-lede">
                Consultation → fabric selection → execution → delivery. The same sequence we run in the studio—presented
                as a journey you can feel, not a bullet list you skim.
              </BodyText>
            </motion.div>
          </motion.div>

          <div ref={journeyRef} className="process-journey">
            <div className="process-journey-header">
              <motion.span
                className="process-journey-label"
                initial={reduced ? false : { opacity: 0, x: -12 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: motionTokens.ease }}
              >
                Your path through our studio
              </motion.span>
              <div className="process-progress-track" aria-hidden>
                <motion.div className="process-progress-fill" style={{ width: progressWidth }} />
              </div>
            </div>

            <motion.div
              className="process-phase-grid"
              variants={processPhaseContainer}
              initial={reduced ? false : 'hidden'}
              whileInView={reduced ? undefined : 'show'}
              viewport={{ once: true, amount: 0.08 }}
            >
              {phases.map((phase, index) => (
                <motion.article
                  key={phase.step}
                  variants={processPhaseItem}
                  className="process-phase-card glass-panel"
                  whileHover={reduced ? undefined : { y: -6, transition: { type: 'spring', stiffness: 400, damping: 24 } }}
                  whileTap={reduced ? undefined : { scale: 0.99 }}
                >
                  <div className="process-phase-top">
                    <motion.span
                      className="process-phase-icon"
                      aria-hidden
                      whileHover={reduced ? undefined : { scale: 1.12, rotate: index % 2 === 0 ? 10 : -10 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    >
                      {phase.icon}
                    </motion.span>
                    <span className="process-phase-step">{phase.step}</span>
                  </div>
                  <h3 className="process-phase-title">{phase.title}</h3>
                  <p className="process-phase-copy">{phase.copy}</p>
                  <div className="process-phase-shine" aria-hidden />
                </motion.article>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section className="section--muted process-bridge">
        <Container>
          <motion.div
            className="process-bridge-inner glass-panel"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: motionTokens.ease }}
          >
            <p className="section-kicker">Below: the deep chapters</p>
            <TypographyHeadingLG>
              From archaeology to <em>final polish</em>
            </TypographyHeadingLG>
            <BodyText>
              The four phases above are how we partner with you. The ritual below is how we partner with the piece—strip,
              rebuild, choose, finish.
            </BodyText>
            <motion.div
              className="process-bridge-actions"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={reduced ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <Link to="/materials" className="sanctuary-btn sanctuary-btn-ghost cta-link">
                Explore materials
              </Link>
              <Link to="/contact" className="sanctuary-btn sanctuary-btn-primary cta-link">
                Start a consultation
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <RitualPath id="ritual-detail" immersive />
    </>
  )
}
