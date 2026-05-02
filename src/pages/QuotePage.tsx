import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motionTokens } from '../lib/motion'
import { Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

const furniture = [
  { id: 'chair', label: 'Chair / accent', base: 420 },
  { id: 'sofa', label: 'Sofa / sectional', base: 1800 },
  { id: 'banquette', label: 'Banquette / booth', base: 2400 },
  { id: 'headboard', label: 'Headboard / wall panel', base: 900 },
] as const

const materials = [
  { id: 'wool', label: 'Heritage wool', mult: 1.05 },
  { id: 'leather', label: 'Italian leather', mult: 1.25 },
  { id: 'performance', label: 'Crypton / contract', mult: 1.15 },
  { id: 'velvet', label: 'Silk velvet', mult: 1.2 },
] as const

const conditions = [
  { id: 'light', label: 'Light wear', mult: 1 },
  { id: 'moderate', label: 'Moderate rebuild', mult: 1.35 },
  { id: 'heavy', label: 'Heavy structural', mult: 1.75 },
] as const

export function QuotePage() {
  const [fId, setFId] = useState<string>(furniture[0].id)
  const [mId, setMId] = useState<string>(materials[0].id)
  const [cId, setCId] = useState<string>(conditions[0].id)
  const reduced = useReducedMotion()

  const estimate = useMemo(() => {
    const f = furniture.find((x) => x.id === fId)!
    const m = materials.find((x) => x.id === mId)!
    const c = conditions.find((x) => x.id === cId)!
    const low = Math.round(f.base * m.mult * c.mult * 0.92)
    const high = Math.round(f.base * m.mult * c.mult * 1.18)
    return { low, high }
  }, [fId, mId, cId])

  return (
    <Section className="page-hero">
      <Container>
        <ScrollReveal>
          <p className="section-kicker">Quote Builder</p>
          <TypographyHeadingLG>
            Interactive estimator, <em>transparent range</em>
          </TypographyHeadingLG>
          <p className="page-lede">
            Choose furniture type, material tier, and condition. The output is a planning band—not a final bid—so clients
            feel informed before the first conversation.
          </p>
        </ScrollReveal>

        <motion.div
          className="quote-builder glass-panel"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: motionTokens.ease }}
        >
          <div className="builder-grid">
            <fieldset className="builder-fieldset">
              <legend>Furniture</legend>
              {furniture.map((f) => (
                <label key={f.id} className="builder-option">
                  <input type="radio" name="furniture" checked={fId === f.id} onChange={() => setFId(f.id)} />
                  {f.label}
                </label>
              ))}
            </fieldset>
            <fieldset className="builder-fieldset">
              <legend>Material</legend>
              {materials.map((m) => (
                <label key={m.id} className="builder-option">
                  <input type="radio" name="material" checked={mId === m.id} onChange={() => setMId(m.id)} />
                  {m.label}
                </label>
              ))}
            </fieldset>
            <fieldset className="builder-fieldset">
              <legend>Condition</legend>
              {conditions.map((c) => (
                <label key={c.id} className="builder-option">
                  <input type="radio" name="condition" checked={cId === c.id} onChange={() => setCId(c.id)} />
                  {c.label}
                </label>
              ))}
            </fieldset>
          </div>

          <div className="estimate-card">
            <p className="estimate-label">Estimated investment band</p>
            <p className="estimate-value">
              ${estimate.low.toLocaleString()} — ${estimate.high.toLocaleString()}
            </p>
            <p className="estimate-note">Typical lead time: 4–10 weeks depending on material procurement.</p>
            <div className="button-row">
              <Link to="/contact" className="sanctuary-btn sanctuary-btn-primary cta-link">
                Send to studio
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
