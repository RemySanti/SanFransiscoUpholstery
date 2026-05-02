import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FireExperience from '../components/FireExperience'
import { CredibilityStrip } from '../components/home/CredibilityStrip'
import { IndustriesProof } from '../components/home/IndustriesProof'
import { SanctuaryEntryHero } from '../components/home/SanctuaryEntryHero'
import { motionTokens } from '../lib/motion'
import { FabricLibrary } from '../components/sanctuary/FabricLibrary'
import { ProjectGrid } from '../components/sanctuary/ProjectGrid'
import { QuoteForm } from '../components/sanctuary/QuoteForm'
import { RitualPath } from '../components/sanctuary/RitualPath'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

export function HomePage() {
  const reduced = useReducedMotion()
  return (
    <>
      <SanctuaryEntryHero />
      <FireExperience />
      <IndustriesProof />
      <CredibilityStrip />

      <Section id="home-ritual-teaser" className="section--muted">
        <Container>
          <ScrollReveal>
            <p className="section-kicker">Inside the sanctuary</p>
            <TypographyHeadingLG>
              The ritual, the archive, the <em>material library</em>
            </TypographyHeadingLG>
            <BodyText>
              This entry path mirrors how we actually work—story first, proof second, conversion last. Dive deeper on
              dedicated pages or continue the journey here.
            </BodyText>
            <div className="teaser-links">
              <Link to="/process" className="teaser-link">
                Process →
              </Link>
              <Link to="/projects" className="teaser-link">
                Projects →
              </Link>
              <Link to="/materials" className="teaser-link">
                Materials →
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <RitualPath id="process" />
      <ProjectGrid id="work" />
      <FabricLibrary id="fabrics" />
      <QuoteForm id="consult" />

      <Section id="home-final-cta" className="section--cta">
        <Container>
          <motion.div
            className="final-cta glass-panel"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: motionTokens.ease }}
          >
            <TypographyHeadingLG>Start Your Restoration</TypographyHeadingLG>
            <BodyText>Upload context, choose a timeline, and let our team respond with a thoughtful plan.</BodyText>
            <div className="button-row centered">
              <Link to="/contact" className="sanctuary-btn sanctuary-btn-primary cta-link">
                Book a consult
              </Link>
              <Link to="/quote" className="sanctuary-btn sanctuary-btn-ghost cta-link">
                Open quote builder
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
