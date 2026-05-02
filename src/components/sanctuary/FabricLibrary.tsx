import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState, type ReactNode } from 'react'
import type { Fabric } from '../../data/fabrics'
import { fabrics as allFabrics } from '../../data/fabrics'
import { motionTokens } from '../../lib/motion'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from './primitives'

type FilterAxis = 'durability' | 'stain' | 'environment' | null

export function FabricLibrary({
  id = 'fabrics',
  title = 'Curated Collections',
  kicker = '03 / Fabric Sanctuary',
  intro = 'Each fabric is chosen for durability, beauty, and story. Tap any swatch to pin it.',
  fabricList,
  showEngineFilters = false,
}: {
  id?: string
  title?: ReactNode
  kicker?: string
  intro?: string
  fabricList?: Fabric[]
  showEngineFilters?: boolean
}) {
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [axis, setAxis] = useState<FilterAxis>(null)
  const reduced = useReducedMotion()

  const fabrics = fabricList ?? allFabrics
  const allTags = useMemo(() => [...new Set(fabrics.flatMap((f) => f.tags))], [fabrics])

  const filtered = useMemo(() => {
    let list = filterTag ? fabrics.filter((f) => f.tags.includes(filterTag)) : fabrics
    if (showEngineFilters && axis === 'durability') {
      list = [...list].sort((a, b) => b.durability - a.durability)
    }
    if (showEngineFilters && axis === 'stain') {
      list = [...list].sort((a, b) => b.stain - a.stain)
    }
    if (showEngineFilters && axis === 'environment') {
      list = list.filter((f) => f.environment === 'commercial' || f.environment === 'both')
    }
    return list
  }, [fabrics, filterTag, axis, showEngineFilters])

  return (
    <Section id={id}>
      <Container>
        <ScrollReveal>
          <p className="section-kicker">{kicker}</p>
          <TypographyHeadingLG>{title}</TypographyHeadingLG>
          <BodyText>{intro}</BodyText>
        </ScrollReveal>

        {showEngineFilters ? (
          <div className="chip-row" style={{ marginTop: '0.5rem' }}>
            <span className="section-kicker" style={{ width: '100%', marginBottom: 0 }}>
              Sort / filter
            </span>
            {(
              [
                [null, 'All specs'],
                ['durability' as const, 'Durability'],
                ['stain' as const, 'Stain resistance'],
                ['environment' as const, 'Commercial / high-traffic'],
              ] as const
            ).map(([key, label]) => (
              <motion.button
                key={label}
                type="button"
                className={`chip ${axis === key ? 'active' : ''}`}
                onClick={() => setAxis(key)}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                layout
              >
                {label}
              </motion.button>
            ))}
          </div>
        ) : null}

        <div className="chip-row">
          <motion.button
            type="button"
            className={`chip ${!filterTag ? 'active' : ''}`}
            onClick={() => setFilterTag(null)}
            whileTap={reduced ? undefined : { scale: 0.96 }}
            layout
          >
            all
          </motion.button>
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              type="button"
              className={`chip ${filterTag === tag ? 'active' : ''}`}
              onClick={() => setFilterTag(tag)}
              whileTap={reduced ? undefined : { scale: 0.96 }}
              layout
            >
              {tag}
            </motion.button>
          ))}
        </div>

        <motion.div className="swatch-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((fabric) => {
              const selected = selectedFabrics.includes(fabric.name)
              return (
                <motion.button
                  key={fabric.name}
                  layout
                  className={`swatch-card ${selected ? 'active' : ''}`}
                  onClick={() =>
                    setSelectedFabrics((prev) =>
                      prev.includes(fabric.name) ? prev.filter((name) => name !== fabric.name) : [...prev, fabric.name],
                    )
                  }
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.32, ease: motionTokens.ease }}
                  whileHover={reduced ? undefined : { y: -4 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                >
                  <motion.span
                    className="swatch-preview"
                    style={{
                      backgroundColor: fabric.swatch,
                      backgroundImage: `linear-gradient(145deg, rgba(var(--rgb-cream), 0.15), rgba(var(--rgb-primary), 0.12)), url(${fabric.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    aria-hidden
                    whileHover={reduced ? undefined : { scale: 1.06 }}
                  />
                  <span className="swatch-title">{fabric.name}</span>
                  <span className="swatch-type">{fabric.type}</span>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedFabrics.length > 0 ? (
            <motion.div
              className="selection-summary"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: motionTokens.ease }}
            >
              <strong>Your Vision:</strong> {selectedFabrics.join(', ')}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </Section>
  )
}
