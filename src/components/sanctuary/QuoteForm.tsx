import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { motionTokens } from '../../lib/motion'
import { stepTransition } from '../../lib/journeyVariants'
import { tokens } from '../../lib/tokens'
import { BodyText, ButtonPrimary, Container, ScrollReveal, Section, TypographyHeadingLG } from './primitives'

export function QuoteForm({ id = 'consult' }: { id?: string }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    pieceDescription: '',
    selectedFabric: '',
    timeline: 'flexible',
    name: '',
    email: '',
  })
  const reduced = useReducedMotion()

  const canAdvanceFromStep1 = formData.pieceDescription.trim().length > 10
  const canAdvanceFromStep2 = formData.selectedFabric.length > 0
  const canSubmit = formData.name.trim().length > 1 && formData.email.includes('@')

  function update<K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit() {
    setSubmitted(true)
    window.setTimeout(() => {
      setStep(1)
      setSubmitted(false)
      setFormData({
        pieceDescription: '',
        selectedFabric: '',
        timeline: 'flexible',
        name: '',
        email: '',
      })
    }, 3000)
  }

  return (
    <Section id={id}>
      <Container>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: tokens.spacing.xxl }}>
            <p className="section-kicker">04 / Begin Your Restoration</p>
            <TypographyHeadingLG>Ready to Commit?</TypographyHeadingLG>
            <BodyText>Every piece deserves a future. Let&apos;s ensure yours is beautiful.</BodyText>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              className="quote-shell"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: motionTokens.ease }}
            >
              <div className="progress-row">
                {[1, 2, 3].map((stage) => (
                  <span key={stage} className="progress-segment">
                    <motion.span
                      className="progress-segment-fill"
                      initial={false}
                      animate={{ width: stage <= step ? '100%' : '0%' }}
                      transition={{ duration: reduced ? 0 : 0.38, ease: motionTokens.ease }}
                    />
                  </span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: reduced ? 0 : 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduced ? 0 : -24 }}
                    transition={stepTransition}
                  >
                    <h3 className="quote-step-title">Tell us about your piece</h3>
                    <textarea
                      className="quote-input"
                      placeholder="This was my grandmother's armchair..."
                      value={formData.pieceDescription}
                      onChange={(event) => update('pieceDescription', event.target.value)}
                    />
                    <ButtonPrimary onClick={() => setStep(2)} type="button" disabled={!canAdvanceFromStep1}>
                      Next
                    </ButtonPrimary>
                  </motion.div>
                ) : null}

                {step === 2 ? (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: reduced ? 0 : 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduced ? 0 : -24 }}
                    transition={stepTransition}
                  >
                    <h3 className="quote-step-title">Your Vision</h3>
                    <div className="radio-stack">
                      {['Italian Leather', 'Scottish Wool', 'Linen Blend', 'Silk Velvet'].map((fabricName) => (
                        <label key={fabricName} className="radio-row">
                          <input
                            type="radio"
                            name="fabric"
                            value={fabricName}
                            checked={formData.selectedFabric === fabricName}
                            onChange={(event) => update('selectedFabric', event.target.value)}
                          />
                          {fabricName}
                        </label>
                      ))}
                    </div>
                    <div className="button-row">
                      <motion.button
                        type="button"
                        className="plain-btn"
                        onClick={() => setStep(1)}
                        whileTap={reduced ? undefined : { scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      <ButtonPrimary onClick={() => setStep(3)} disabled={!canAdvanceFromStep2}>
                        Next
                      </ButtonPrimary>
                    </div>
                  </motion.div>
                ) : null}

                {step === 3 ? (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: reduced ? 0 : 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduced ? 0 : -24 }}
                    transition={stepTransition}
                  >
                    <h3 className="quote-step-title">Timeline & Contact</h3>
                    <select className="quote-input" value={formData.timeline} onChange={(event) => update('timeline', event.target.value)}>
                      <option value="flexible">Flexible</option>
                      <option value="3months">Within 3 months</option>
                      <option value="urgent">Urgent (2-4 weeks)</option>
                    </select>
                    <input className="quote-input" placeholder="Your Name" value={formData.name} onChange={(event) => update('name', event.target.value)} />
                    <input className="quote-input" placeholder="Email" value={formData.email} onChange={(event) => update('email', event.target.value)} />
                    <div className="button-row">
                      <motion.button
                        type="button"
                        className="plain-btn"
                        onClick={() => setStep(2)}
                        whileTap={reduced ? undefined : { scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      <ButtonPrimary onClick={handleSubmit} disabled={!canSubmit}>
                        Submit
                      </ButtonPrimary>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="success-card"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={stepTransition}
            >
              <p className="success-title">Your piece has entered the sanctuary.</p>
              <p>We will care for it as our own. A consultation specialist will reach out within 24 hours.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  )
}
