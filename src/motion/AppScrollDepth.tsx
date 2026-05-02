/**
 * Global subtle background parallax (GSAP ScrollTrigger + Lenis).
 * Framer Motion remains the primary tool for UI; this layer adds slow depth only.
 */
import { useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AppScrollDepth() {
  const lenis = useLenis()
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lenis || !layerRef.current) return

    const layer = layerRef.current
    const tween = gsap.to(layer, {
      y: -110,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [lenis])

  return <div ref={layerRef} className="app-parallax-depth" aria-hidden />
}
