import { Link } from 'react-router-dom'
import { industries } from '../data/industries'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

export function IndustriesIndexPage() {
  return (
    <Section className="page-hero">
      <Container>
        <ScrollReveal>
          <p className="section-kicker">Industries</p>
          <TypographyHeadingLG>
            Conversion routes for <em>every vertical</em>
          </TypographyHeadingLG>
          <BodyText>Pick a sector to see problems we solve, proof we bring, and language tailored to decision makers.</BodyText>
        </ScrollReveal>

        <ul className="industry-index-list">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link to={`/industries/${ind.slug}`} className="industry-index-link glass-panel">
                <img className="industry-index-thumb" src={ind.coverImage} alt="" loading="lazy" decoding="async" />
                <span className="industry-index-title">{ind.title}</span>
                <span className="industry-index-tagline">{ind.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
