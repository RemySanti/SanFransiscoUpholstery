import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motionTokens } from '../lib/motion'
import { Container } from './sanctuary/primitives'

type NavItem = { to: string; label: string; end?: boolean; highlight?: boolean }

const links: NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Experience' },
  { to: '/process', label: 'Process' },
  { to: '/projects', label: 'Projects' },
  { to: '/industries', label: 'Industries' },
  { to: '/materials', label: 'Materials' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/quote', label: 'Quote', highlight: true },
]

/** High-intent paths for the floating mobile dock */
const dockLinks: NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Explore' },
  { to: '/process', label: 'Process' },
  { to: '/quote', label: 'Quote', highlight: true },
]

export function Navigation() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  /** Bottom dock: hidden only while scroll position is actively changing (drag / momentum / smooth scroll). */
  const [dockHidden, setDockHidden] = useState(false)
  const dockIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduced = useReducedMotion()

  const DOCK_IDLE_MS = 220

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const close = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(
    () => () => {
      if (dockIdleTimer.current) clearTimeout(dockIdleTimer.current)
    },
    [],
  )

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24)
    if (reduced) {
      setDockHidden(false)
      return
    }
    setDockHidden(true)
    if (dockIdleTimer.current) clearTimeout(dockIdleTimer.current)
    dockIdleTimer.current = setTimeout(() => {
      setDockHidden(false)
      dockIdleTimer.current = null
    }, DOCK_IDLE_MS)
  })

  return (
    <>
      <motion.nav
        className={`sanctuary-nav${scrolled ? ' sanctuary-nav--scrolled' : ''}`}
        initial={false}
        transition={{ duration: 0.35, ease: motionTokens.ease }}
      >
        <Container>
          <div className="sanctuary-nav-row">
            <motion.div whileTap={reduced ? undefined : { scale: 0.97 }}>
              <Link className="sanctuary-brand" to="/">
                ∴ SF Upholstery
              </Link>
            </motion.div>
            <div className="sanctuary-links">
              {links.map(({ to, label, end, highlight }) => (
                <motion.span
                  key={to}
                  whileTap={reduced ? undefined : { scale: 0.96 }}
                  style={{ display: 'inline-flex' }}
                >
                  <NavLink
                    to={to}
                    end={end ?? false}
                    className={({ isActive }) =>
                      [highlight ? 'highlight' : '', isActive ? 'sanctuary-link-active' : '']
                        .filter(Boolean)
                        .join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                </motion.span>
              ))}
            </div>
            <div className="sanctuary-nav-mobile-toolbar">
              <motion.span whileTap={reduced ? undefined : { scale: 0.96 }}>
                <Link className="sanctuary-nav-quick sanctuary-nav-quick--primary" to="/quote">
                  Quote
                </Link>
              </motion.span>
              <motion.span whileTap={reduced ? undefined : { scale: 0.96 }}>
                <Link className="sanctuary-nav-quick" to="/contact">
                  Contact
                </Link>
              </motion.span>
              <button
                type="button"
                className={`sanctuary-nav-burger${menuOpen ? ' sanctuary-nav-burger--open' : ''}`}
                aria-expanded={menuOpen}
                aria-controls="sanctuary-mobile-nav-sheet"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className="sanctuary-nav-burger-line" aria-hidden />
                <span className="sanctuary-nav-burger-line" aria-hidden />
                <span className="sanctuary-nav-burger-line" aria-hidden />
              </button>
            </div>
          </div>
        </Container>
      </motion.nav>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              key="sanctuary-nav-backdrop"
              type="button"
              className="sanctuary-nav-backdrop"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="sanctuary-nav-sheet"
              id="sanctuary-mobile-nav-sheet"
              className="sanctuary-nav-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 16 }}
              transition={{ duration: reduced ? 0 : 0.28, ease: motionTokens.ease }}
            >
              <div className="sanctuary-nav-sheet-head">
                <span className="sanctuary-nav-sheet-title">Navigate</span>
                <button
                  type="button"
                  className="sanctuary-nav-sheet-close"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  ×
                </button>
              </div>
              <nav className="sanctuary-nav-sheet-links" aria-label="Primary">
                {links.map(({ to, label, end, highlight }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end ?? false}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        'sanctuary-nav-sheet-link',
                        highlight ? 'sanctuary-nav-sheet-link--highlight' : '',
                        isActive ? 'sanctuary-nav-sheet-link--active' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <div className="sanctuary-nav-sheet-actions">
                <Link className="sanctuary-nav-sheet-cta" to="/quote" onClick={() => setMenuOpen(false)}>
                  Start a quote
                </Link>
                <Link className="sanctuary-nav-sheet-cta sanctuary-nav-sheet-cta--ghost" to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact us
                </Link>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="sanctuary-mobile-dock-wrap"
        aria-hidden={menuOpen}
        initial={false}
        animate={{ y: dockHidden ? 120 : 0, opacity: dockHidden ? 0 : 1 }}
        transition={{
          duration: reduced ? 0 : 0.38,
          ease: motionTokens.ease,
        }}
        style={{ pointerEvents: menuOpen || dockHidden ? 'none' : 'auto' }}
      >
        <nav className="sanctuary-mobile-dock" aria-label="Quick navigation">
          {dockLinks.map(({ to, label, end, highlight }) => (
            <NavLink
              key={to}
              to={to}
              end={end ?? false}
              className={({ isActive }) =>
                [
                  'sanctuary-mobile-dock-item',
                  highlight ? 'sanctuary-mobile-dock-item--highlight' : '',
                  isActive ? 'is-active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <span className="sanctuary-mobile-dock-label">{label}</span>
            </NavLink>
          ))}
          <button
            type="button"
            className="sanctuary-mobile-dock-item sanctuary-mobile-dock-item--menu"
            aria-label="Open full menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="sanctuary-mobile-dock-label">Menu</span>
          </button>
        </nav>
      </motion.div>
    </>
  )
}
