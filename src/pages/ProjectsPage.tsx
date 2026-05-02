import { BeforeAfterSlider } from '../components/projects/BeforeAfterSlider'
import { projects } from '../data/projects'
import { ProjectGrid } from '../components/sanctuary/ProjectGrid'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

export function ProjectsPage() {
  return (
    <>
      <Section className="page-hero">
        <Container>
          <ScrollReveal>
            <p className="section-kicker">Portfolio Engine</p>
            <TypographyHeadingLG>
              Case studies, not <em>just galleries</em>
            </TypographyHeadingLG>
            <BodyText>
              Every tile opens problem → process → result. Drag the slider to feel the before/after rhythm we chase in real
              projects.
            </BodyText>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <BeforeAfterSlider beforeLabel="Worn-in field use" afterLabel="Restored luxury" />
          </ScrollReveal>
        </Container>
      </Section>

      <ProjectGrid
        id="projects-archive"
        kicker="Archive"
        heading={
          <>
            Stories with <em>structure</em>
          </>
        }
        intro="Select a specimen to read the full arc—industry context included."
        projects={projects}
      />
    </>
  )
}
