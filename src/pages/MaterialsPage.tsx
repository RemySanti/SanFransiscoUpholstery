import { FabricLibrary } from '../components/sanctuary/FabricLibrary'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

export function MaterialsPage() {
  return (
    <>
      <Section className="page-hero">
        <Container>
          <ScrollReveal>
            <p className="section-kicker">Fabric Engine</p>
            <TypographyHeadingLG>
              Interactive materials <em>with intent</em>
            </TypographyHeadingLG>
            <BodyText>
              Filter by tag, sort by durability or stain resistance, and prioritize commercial-grade environments. Hover
              swatches to preview texture emphasis.
            </BodyText>
          </ScrollReveal>
        </Container>
      </Section>

      <FabricLibrary
        id="materials-grid"
        kicker="Library"
        title={
          <>
            Curated performance <em>palette</em>
          </>
        }
        intro="Pin fabrics to build a shortlist—our team translates selections into specifications."
        showEngineFilters
      />
    </>
  )
}
