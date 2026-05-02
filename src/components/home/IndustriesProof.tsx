import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { industries } from '../../data/industries'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from '../sanctuary/primitives'

export function IndustriesProof() {
  const reduced = useReducedMotion()
  return (
    <Section id="industries">
      <Container>
        <ScrollReveal>
          <p className="section-kicker">Proof in the field</p>
          <TypographyHeadingLG>
            Built for hotels, dining, care, and <em>movement</em>
          </TypographyHeadingLG>
          <BodyText>
            Hover or focus a sector to preview the transformation story—each route opens a dedicated conversion page.
          </BodyText>
        </ScrollReveal>

        <div className="industries-grid">
          {industries.map((ind) => (
            <motion.div key={ind.slug} className="industry-card-wrap" whileHover={reduced ? undefined : { y: -4 }}>
              <Link to={`/industries/${ind.slug}`} className="industry-card glass-panel">
                <span className="industry-thumb" aria-hidden>
                  <img src={ind.coverImage} alt="" loading="lazy" decoding="async" />
                </span>
                <h3 className="industry-title">{ind.title}</h3>
                <p className="industry-tagline">{ind.tagline}</p>
                <span className="industry-cta">View sector story →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
