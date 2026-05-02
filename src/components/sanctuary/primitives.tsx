import { motion, useReducedMotion } from 'framer-motion'
import { forwardRef, type CSSProperties, type ReactNode } from 'react'
import { motionTokens } from '../../lib/motion'
import { tokens } from '../../lib/tokens'

export function Container({
  children,
  noBento,
  className,
}: {
  children: ReactNode
  /** Opt out of vertical bento stacking grid (rare layouts). */
  noBento?: boolean
  className?: string
}) {
  const bento = noBento ? '' : ' sanctuary-container--bento'
  const extra = className ? ` ${className}` : ''
  return <div className={`sanctuary-container${bento}${extra}`.trim()}>{children}</div>
}

export const Section = forwardRef<
  HTMLElement,
  { children: ReactNode; id?: string; className?: string; noBento?: boolean }
>(function Section({ children, id, className, noBento }, ref) {
  const bento = noBento ? '' : ' sanctuary-section--bento'
  const extra = className ? ` ${className}` : ''
  return (
    <section ref={ref} id={id} className={`sanctuary-section${bento}${extra}`.trim()}>
      {children}
    </section>
  )
})

export function TypographyHeadingXL({ children, emphasis }: { children: ReactNode; emphasis?: string }) {
  return (
    <h1
      style={{
        fontSize: tokens.typography.sizeXL,
        color: tokens.colors.foreground,
        fontFamily: 'var(--font-serif)',
        fontWeight: 400,
        letterSpacing: tokens.typography.letterSpacing,
        lineHeight: tokens.typography.lineHeightTight,
        marginBottom: '1.25rem',
      }}
    >
      {children}{' '}
      {emphasis ? (
        <em style={{ fontStyle: 'italic', color: tokens.colors.sageLight }}>{emphasis}</em>
      ) : null}
    </h1>
  )
}

export function TypographyHeadingLG({ children, invert }: { children: ReactNode; invert?: boolean }) {
  return (
    <h2
      style={{
        fontSize: tokens.typography.sizeLG,
        color: invert ? tokens.colors.cream : tokens.colors.foreground,
        fontFamily: 'var(--font-serif)',
        fontWeight: 400,
        letterSpacing: tokens.typography.letterSpacing,
        lineHeight: tokens.typography.lineHeightTight,
        marginBottom: '1.25rem',
      }}
    >
      {children}
    </h2>
  )
}

export function BodyText({
  children,
  style,
  className,
}: {
  children: ReactNode
  style?: CSSProperties
  className?: string
}) {
  return (
    <p
      className={className}
      style={{
        fontSize: tokens.typography.sizeSM,
        color: 'var(--color-text-muted)',
        lineHeight: tokens.typography.lineHeightRelaxed,
        ...style,
      }}
    >
      {children}
    </p>
  )
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: reduced ? 0 : 0.52,
        ease: motionTokens.ease,
        delay: reduced ? 0 : delay / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}

export function ButtonPrimary({
  children,
  onClick,
  type = 'button',
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  const reduced = useReducedMotion()
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="sanctuary-btn sanctuary-btn-primary"
      whileHover={disabled || reduced ? undefined : { scale: 1.02, y: -2 }}
      whileTap={disabled || reduced ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 440, damping: 28 }}
    >
      {children}
    </motion.button>
  )
}
