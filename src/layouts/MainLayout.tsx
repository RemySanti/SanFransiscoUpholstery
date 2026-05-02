import { useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { Outlet, useLocation } from 'react-router-dom'
import { CursorGlow } from '../components/CursorGlow'
import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation'
import { ScrollBar } from '../components/ScrollBar'
import { AppScrollDepth } from '../motion/AppScrollDepth'
import { LenisGsapBridge } from '../motion/lenisGsapBridge'

function RouteScrollBridge() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

export function MainLayout() {
  const reduced = useReducedMotion()

  const appInner = (
    <>
      <RouteScrollBridge />
      <ScrollBar />
      <CursorGlow />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )

  if (reduced) {
    return <div className="sanctuary-app">{appInner}</div>
  }

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.09, smoothWheel: true }}>
      <LenisGsapBridge />
      <div className="sanctuary-app">
        <AppScrollDepth />
        {appInner}
      </div>
    </ReactLenis>
  )
}
