import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import type { Project } from '../../data/projects'
import { projects as defaultProjects } from '../../data/projects'
import { stepTransition } from '../../lib/journeyVariants'
import { BodyText, ButtonPrimary, Container, ScrollReveal, Section, TypographyHeadingLG } from './primitives'

export function ProjectGrid({
  id = 'work',
  projects = defaultProjects,
  kicker = '02 / Specimens from Our Archive',
  heading = (
    <>
      Projects as <em>Artifacts</em>
    </>
  ),
  intro = 'Each piece in our archive represents a conversation, a commitment, and a transformation.',
  onSelectProject,
}: {
  id?: string
  projects?: Project[]
  kicker?: string
  heading?: ReactNode
  intro?: string
  onSelectProject?: (p: Project) => void
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const reduced = useReducedMotion()

  function open(p: Project) {
    setSelectedProject(p)
    onSelectProject?.(p)
  }

  return (
    <Section id={id}>
      <Container>
        <ScrollReveal>
          <p className="section-kicker">{kicker}</p>
          <TypographyHeadingLG>{heading}</TypographyHeadingLG>
          <BodyText>{intro}</BodyText>
        </ScrollReveal>
        <div className="project-grid">
          {projects.map((project) => (
            <motion.button
              key={project.title}
              type="button"
              className="project-card"
              onClick={() => open(project)}
              layout
              whileHover={reduced ? undefined : { y: -5 }}
              whileTap={reduced ? undefined : { scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              <motion.span className="project-image" aria-hidden whileHover={reduced ? undefined : { scale: 1.03 }}>
                <img src={project.image} alt="" loading="lazy" decoding="async" />
              </motion.span>
              <span className="project-year">{project.year}</span>
              <span className="project-title">{project.title}</span>
              <span className="project-description">{project.description}</span>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={stepTransition}
              onClick={(event) => event.stopPropagation()}
            >
              <h3 id="project-modal-title">{selectedProject.title}</h3>
              <p className="project-modal-meta">{selectedProject.year} | {selectedProject.industry}</p>
              <img
                className="project-modal-image"
                src={selectedProject.image}
                alt=""
                loading="eager"
                decoding="async"
              />
              <p>
                <strong>Problem:</strong> {selectedProject.problem}
              </p>
              <p>
                <strong>Process:</strong> {selectedProject.process}
              </p>
              <p>
                <strong>Result:</strong> {selectedProject.result}
              </p>
              <ButtonPrimary onClick={() => setSelectedProject(null)}>Close</ButtonPrimary>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  )
}
