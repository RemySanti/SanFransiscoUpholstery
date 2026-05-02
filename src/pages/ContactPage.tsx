import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { motionTokens } from '../lib/motion'
import { stepTransition } from '../lib/journeyVariants'
import { ButtonPrimary, Container, ScrollReveal, Section, TypographyHeadingLG } from '../components/sanctuary/primitives'

export function ContactPage() {
  const [step, setStep] = useState(1)
  const [photoName, setPhotoName] = useState<string | null>(null)
  const [service, setService] = useState('')
  const [timeline, setTimeline] = useState('flexible')
  const [email, setEmail] = useState('')
  const reduced = useReducedMotion()

  const can2 = photoName !== null
  const can3 = service.length > 0
  const canSubmit = email.includes('@')

  return (
    <Section className="page-hero">
      <Container>
        <ScrollReveal>
          <p className="section-kicker">Contact / Conversion</p>
          <TypographyHeadingLG>
            Guided intake, <em>studio speed</em>
          </TypographyHeadingLG>
          <p className="page-lede">
            Upload a photo, name the service, choose urgency, and we route your request to the right craft lead—mirroring
            how we already work over email.
          </p>
        </ScrollReveal>

        <div className="quote-shell contact-shell">
          <div className="progress-row">
            {[1, 2, 3, 4].map((s) => (
              <span key={s} className="progress-segment">
                <motion.span
                  className="progress-segment-fill"
                  initial={false}
                  animate={{ width: s <= step ? '100%' : '0%' }}
                  transition={{ duration: reduced ? 0 : 0.35, ease: motionTokens.ease }}
                />
              </span>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="c1"
                initial={{ opacity: 0, x: reduced ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : -16 }}
                transition={stepTransition}
              >
                <h3 className="quote-step-title">1. Furniture photo</h3>
                <label className="file-drop">
                  <input
                    type="file"
                    accept="image/*"
                    className="file-drop-input"
                    onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? null)}
                  />
                  <span>{photoName ? photoName : 'Tap to upload a reference photo'}</span>
                </label>
                <ButtonPrimary type="button" disabled={!can2} onClick={() => setStep(2)}>
                  Continue
                </ButtonPrimary>
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div
                key="c2"
                initial={{ opacity: 0, x: reduced ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : -16 }}
                transition={stepTransition}
              >
                <h3 className="quote-step-title">2. Service type</h3>
                <select className="quote-input" value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="">Select…</option>
                  <option value="restoration">Restoration</option>
                  <option value="custom">Custom upholstery</option>
                  <option value="commercial">Commercial program</option>
                  <option value="consult">Consultation only</option>
                </select>
                <div className="button-row">
                  <button type="button" className="plain-btn" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <ButtonPrimary type="button" disabled={!can3} onClick={() => setStep(3)}>
                    Next
                  </ButtonPrimary>
                </div>
              </motion.div>
            ) : null}

            {step === 3 ? (
              <motion.div
                key="c3"
                initial={{ opacity: 0, x: reduced ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : -16 }}
                transition={stepTransition}
              >
                <h3 className="quote-step-title">3. Timeline</h3>
                <select className="quote-input" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                  <option value="flexible">Flexible</option>
                  <option value="quarter">This quarter</option>
                  <option value="urgent">Urgent (2–4 weeks)</option>
                </select>
                <div className="button-row">
                  <button type="button" className="plain-btn" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <ButtonPrimary type="button" onClick={() => setStep(4)}>
                    Next
                  </ButtonPrimary>
                </div>
              </motion.div>
            ) : null}

            {step === 4 ? (
              <motion.div
                key="c4"
                initial={{ opacity: 0, x: reduced ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : -16 }}
                transition={stepTransition}
              >
                <h3 className="quote-step-title">4. Submit</h3>
                <input className="quote-input" placeholder="Email for follow-up" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="button-row">
                  <button type="button" className="plain-btn" onClick={() => setStep(3)}>
                    Back
                  </button>
                  <ButtonPrimary type="button" disabled={!canSubmit} onClick={() => setStep(1)}>
                    Send request
                  </ButtonPrimary>
                </div>
                <p className="form-hint">Demo flow — connect to your CRM or inbox when ready.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  )
}
