import { ExperienceJourney } from '../components/experience/ExperienceJourney'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'
import { tokens } from '../lib/tokens'

export function ExperiencePage() {
  return (
    <>
      <Section className="page-hero section--dark">
        <Container>
          <ScrollReveal>
            <p className="section-kicker">Digital Sanctuary / Experience</p>
            <TypographyHeadingLG invert>
              Apple-level scroll, <em style={{ color: tokens.colors.sageLight }}>craft-level patience</em>
            </TypographyHeadingLG>
            <BodyText style={{ color: 'rgba(var(--rgb-cream), 0.78)' }}>
              A single sticky timeline—neglect to finale—mirrors how a piece moves through our studio. Slow down. Let the
              transformation read.
            </BodyText>
          </ScrollReveal>
        </Container>
      </Section>
      <ExperienceJourney />
    </>
  )
}
