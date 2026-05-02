import { Navigate, useParams } from 'react-router-dom'
import { getIndustry } from '../data/industries'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

export function IndustryDetailPage() {
  const { slug } = useParams()
  const industry = slug ? getIndustry(slug) : undefined
  if (!industry) return <Navigate to="/industries" replace />

  return (
    <>
      <Section className="page-hero section--dark">
        <Container>
          <ScrollReveal>
            <p className="section-kicker">{industry.title}</p>
            <TypographyHeadingLG invert>{industry.tagline}</TypographyHeadingLG>
            <BodyText style={{ color: 'rgba(var(--rgb-cream), 0.78)' }}>{industry.proof}</BodyText>
          </ScrollReveal>
          <figure className="industry-hero-figure">
            <img src={industry.heroImage} alt="" loading="eager" decoding="async" />
          </figure>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="two-col">
            <div className="glass-panel">
              <h3 className="block-title">Problem</h3>
              <ul className="bullet-list">
                {industry.problemBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="glass-panel">
              <h3 className="block-title">Solution</h3>
              <ul className="bullet-list">
                {industry.solutionBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
