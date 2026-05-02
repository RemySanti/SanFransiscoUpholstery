import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../lib/journeyVariants'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

const milestones = [
  { year: '1994', title: 'Origin', copy: 'San Francisco Upholstery Group forms around obsessive craft and long timelines.' },
  { year: '2000s', title: 'National programs', copy: 'Commercial hospitality and transportation work scales with the same studio standards.' },
  { year: 'Today', title: 'Legacy story', copy: 'Lamar Dula’s leadership continues to pair heritage methods with modern performance materials.' },
] as const

export function AboutPage() {
  return (
    <>
      <Section className="page-hero">
        <Container>
          <ScrollReveal>
            <p className="section-kicker">Legacy Story</p>
            <TypographyHeadingLG>
              Founder-led craft, <em>studio discipline</em>
            </TypographyHeadingLG>
            <BodyText>
              We translate a founder’s eye for detail into systems that national clients can trust—without losing the soul
              of hand work.
            </BodyText>
          </ScrollReveal>
        </Container>
      </Section>

      <Section className="section--muted">
        <Container>
          <motion.div
            className="timeline"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {milestones.map((m) => (
              <motion.div key={m.year} variants={staggerItem} className="timeline-item glass-panel">
                <span className="timeline-year">{m.year}</span>
                <h3 className="timeline-title">{m.title}</h3>
                <p className="timeline-copy">{m.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
