/**
 * MOTION ARCHITECTURE (Digital Sanctuary)
 *
 * | Layer              | Tool              | Where |
 * |--------------------|-------------------|--------|
 * | UI micro-interactions | Framer Motion  | Buttons, cards, forms, hovers (`motion.*`, primitives) |
 * | Section reveals    | Framer Motion     | `ScrollReveal`, `whileInView`, hero staggers |
 * | Grid animations    | Framer Motion     | `staggerContainer` / `staggerItem`, fabric & project grids |
 * | Narrative scroll depth | GSAP ScrollTrigger | Immersive ritual: scrub on steps + texture (`useRitualImmersiveGsap`) |
 * | Smooth scroll + ST sync | Lenis         | `ReactLenis` + `LenisGsapBridge` (scrollerProxy, `scroll` → ST.update) |
 * | Background parallax | GSAP ScrollTrigger | Fixed gradient field `AppScrollDepth` (scrubbed, subtle) |
 *
 * Reduced motion: Lenis + GSAP depth layers off or inert; Framer respects `useReducedMotion`.
 */
export {}
