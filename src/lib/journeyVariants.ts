import { motionTokens } from './motion'

export const journeyEase = motionTokens.ease

/** Parent: stagger children as they enter the viewport */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
}

/** Child cards / steps */
export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: journeyEase },
  },
}

/** Quote steps & light dialogs */
export const stepTransition = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 30,
}

/** Process page — hero lines */
export const processHeroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
}

export const processHeroItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: journeyEase },
  },
}

/** Process page — phase cards (spring) */
export const processPhaseContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
}

export const processPhaseItem = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 260, damping: 28 },
  },
}

/** Ritual steps — immersive (directional) */
export const ritualImmersiveContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.12 },
  },
}

export const ritualImmersiveItem = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? 44 : -44,
  }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.68, ease: journeyEase },
  },
}
