/**
 * MOTION ARCHITECTURE — integration layer
 * - Framer Motion: UI micro-interactions, section reveals, grid staggers (components).
 * - GSAP ScrollTrigger: narrative scrub / immersion (e.g. ritual), synced with Lenis.
 *
 * Call inside <ReactLenis> so useLenis() resolves. Skipped when smooth scroll is off (reduced motion path).
 */
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function LenisGsapBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.animatedScroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    const onRefresh = () => {
      lenis.resize()
    }
    ScrollTrigger.addEventListener('refresh', onRefresh)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      lenis.off('scroll', onScroll)
      ScrollTrigger.scrollerProxy(document.documentElement)
    }
  }, [lenis])

  return null
}
