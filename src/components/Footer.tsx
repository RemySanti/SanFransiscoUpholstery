import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { motionTokens } from '../lib/motion'
import { Container } from './sanctuary/primitives'

export function Footer() {
  const reduced = useReducedMotion()
  return (
    <motion.footer
      className="sanctuary-footer"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: motionTokens.ease }}
    >
      <Container>
        <h2>∴ SF Upholstery Group</h2>
        <p>Craft Heritage Restored. Established 1994.</p>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/experience">Experience</Link>
          <Link to="/process">Process</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/materials">Materials</Link>
          <Link to="/quote">Quote</Link>
        </nav>
        <div className="footer-links">
          <motion.a href="tel:+18134934640" whileTap={reduced ? undefined : { scale: 0.98 }}>
            813-493-4640
          </motion.a>
          <motion.a href="mailto:info@sfug.pro" whileTap={reduced ? undefined : { scale: 0.98 }}>
            info@sfug.pro
          </motion.a>
        </div>
        <p className="copyright">© 2026 San Francisco Upholstery Group. All rights reserved.</p>
      </Container>
    </motion.footer>
  )
}
