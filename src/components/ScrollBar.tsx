import { motion, useScroll } from 'framer-motion'

export function ScrollBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fs-scroll-bar"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  )
}
