import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, type RefObject } from 'react'

/**
 * Narrative scroll depth for immersive ritual (GSAP ScrollTrigger scrub).
 * Pairs with Lenis via LenisGsapBridge. Framer Motion still handles step entrance variants.
 */
export function useRitualImmersiveGsap(enabled: boolean, sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!enabled || !sectionRef.current) return

    const section = sectionRef.current
    const texture = section.querySelector('.ritual-parallax-texture')
    const steps = section.querySelectorAll<HTMLElement>('[data-ritual-step]')

    const ctx = gsap.context(() => {
      if (texture) {
        gsap.fromTo(
          texture,
          { yPercent: 0, scale: 1 },
          {
            yPercent: -12,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )
      }

      steps.forEach((step) => {
        const media = step.querySelector('.ritual-image')
        const copy = step.querySelector('.ritual-step-copy')
        if (media) {
          gsap.fromTo(
            media,
            { y: 48, rotate: -0.75 },
            {
              y: -32,
              rotate: 0.75,
              ease: 'none',
              scrollTrigger: {
                trigger: step,
                start: 'top 90%',
                end: 'top 25%',
                scrub: 0.9,
              },
            },
          )
        }
        if (copy) {
          gsap.fromTo(
            copy,
            { y: 32, opacity: 0.82 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: step,
                start: 'top 92%',
                end: 'top 48%',
                scrub: 0.7,
              },
            },
          )
        }
      })
    }, section)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [enabled, sectionRef])
}
