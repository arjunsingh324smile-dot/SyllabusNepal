import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export default function PageWrapper({ children, className = '' }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`min-h-screen ${className}`}
        role="main"
        id="main-content"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
