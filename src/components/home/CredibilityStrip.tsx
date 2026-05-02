import { motion, useReducedMotion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { motionTokens } from '../../lib/motion'
import { Container } from '../sanctuary/primitives'

function Stat({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const { ref, val } = useCountUp(value, 1600)
  const reduced = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      className="cred-stat glass-panel"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: motionTokens.ease }}
    >
      <span className="cred-value">
        {val}
        {suffix}
      </span>
      <span className="cred-label">{label}</span>
    </motion.div>
  )
}

export function CredibilityStrip() {
  const reduced = useReducedMotion()
  return (
    <section className="credibility-strip" aria-label="Firm credibility">
      <Container>
        <div className="cred-row">
          <Stat label="Years of craft authority" value={25} suffix="+" />
          <Stat label="Projects delivered" value={2000} suffix="+" />
          <motion.div
            className="cred-stat glass-panel cred-stat--static"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: motionTokens.ease }}
          >
            <span className="cred-value cred-value--word">Nationwide</span>
            <span className="cred-label">Commercial & residential programs</span>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
