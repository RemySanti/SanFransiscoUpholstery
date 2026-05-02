import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { STOCK } from '../../data/stockImages'
import { motionTokens } from '../../lib/motion'
import {
  ritualImmersiveContainer,
  ritualImmersiveItem,
  staggerContainer,
  staggerItem,
  processHeroContainer,
  processHeroItem,
} from '../../lib/journeyVariants'
import { tokens } from '../../lib/tokens'
import { useRitualImmersiveGsap } from '../../motion/useRitualImmersiveGsap'
import { BodyText, Container, ScrollReveal, Section, TypographyHeadingLG } from './primitives'

function RitualStep({
  number,
  title,
  description,
  imageSrc,
  isEven,
  immersive,
}: {
  number: number
  title: string
  description: string
  imageSrc: string
  isEven: boolean
  immersive?: boolean
}) {
  const reduced = useReducedMotion()
  const variants = immersive ? ritualImmersiveItem : staggerItem

  return (
    <motion.div
      custom={isEven}
      variants={variants}
      data-ritual-step={number}
      className={`ritual-step ${isEven ? 'ritual-step-even' : ''} ${immersive ? 'ritual-step--immersive' : ''}`}
    >
      <motion.div
        className="ritual-image"
        aria-hidden
        whileHover={reduced ? undefined : { scale: immersive ? 1.06 : 1.04, rotate: [0, -1.5, 1.5, 0] }}
        transition={{ duration: 0.45, ease: motionTokens.ease }}
      >
        <img src={imageSrc} alt="" loading="lazy" decoding="async" />
      </motion.div>
      <div className="ritual-step-copy">
        <motion.div
          className="ritual-number"
          initial={false}
          whileInView={reduced || !immersive ? undefined : { scale: [1, 1.06, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: motionTokens.ease }}
        >
          {number.toString().padStart(2, '0')}
        </motion.div>
        <TypographyHeadingLG>{title}</TypographyHeadingLG>
        <BodyText>{description}</BodyText>
      </div>
    </motion.div>
  )
}

export function RitualPath({ id = 'process', immersive = false }: { id?: string; immersive?: boolean }) {
  const reduced = useReducedMotion()
  const parentVariants = immersive ? ritualImmersiveContainer : staggerContainer
  const sectionRef = useRef<HTMLElement>(null)

  useRitualImmersiveGsap(Boolean(immersive && !reduced), sectionRef)

  return (
    <Section
      ref={sectionRef}
      id={id}
      className={immersive ? 'ritual-path-section--immersive' : undefined}
    >
      {immersive ? <div className="ritual-parallax-texture" aria-hidden /> : null}
      <Container className={immersive ? 'ritual-path-content' : undefined}>
        {immersive ? (
          <motion.div
            variants={processHeroContainer}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'show'}
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.p className="section-kicker" variants={processHeroItem}>
              01 / The Restoration Ritual
            </motion.p>
            <motion.div variants={processHeroItem}>
              <TypographyHeadingLG>
                Craft as <em>Philosophy</em>
              </TypographyHeadingLG>
            </motion.div>
            <motion.div variants={processHeroItem}>
              <BodyText>
                Each restoration follows the same sacred rhythm: listening, rebuilding, choosing, finishing. This is where
                time is reversed, not just applied.
              </BodyText>
            </motion.div>
          </motion.div>
        ) : (
          <ScrollReveal>
            <p className="section-kicker">01 / The Restoration Ritual</p>
            <TypographyHeadingLG>
              Craft as <em>Philosophy</em>
            </TypographyHeadingLG>
            <BodyText>
              Each restoration follows the same sacred rhythm: listening, rebuilding, choosing, finishing. This is where
              time is reversed, not just applied.
            </BodyText>
          </ScrollReveal>
        )}
        <motion.div
          className={`bento-ritual-stack${immersive ? '' : ' bento-ritual-stack--lite'}`}
          style={{ marginTop: tokens.spacing.xxl }}
          variants={parentVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: immersive ? 0.05 : 0.06 }}
        >
          <RitualStep
            number={1}
            title="Stripping Away the Past"
            description="We begin by listening to the piece and removing layers with precision and respect. This is not careless demolition; it is archaeology."
            imageSrc={STOCK.ritual[0]}
            isEven={false}
            immersive={immersive}
          />
          <RitualStep
            number={2}
            title="Structural Rebirth"
            description="Springs are hand-retied using methods passed down through generations. We rebuild the foundation that makes a chair beloved for decades."
            imageSrc={STOCK.ritual[1]}
            isEven
            immersive={immersive}
          />
          <RitualStep
            number={3}
            title="The Fabric Dialogue"
            description="Your vision meets curated materials: leather from Italy, linens from Scotland, and wools from heritage mills."
            imageSrc={STOCK.ritual[2]}
            isEven={false}
            immersive={immersive}
          />
          <RitualStep
            number={4}
            title="Finishing & Details"
            description="Welting, tufting, and buttoning rendered with obsessive precision. This is where intention becomes form."
            imageSrc={STOCK.ritual[3]}
            isEven
            immersive={immersive}
          />
        </motion.div>
      </Container>
    </Section>
  )
}
