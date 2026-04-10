import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

const placeholders = [
  'Search IOE Physics topics...',
  'Search CEE Nursing syllabus...',
  'Search NEB Grade 12 Chemistry...',
  'Search Loksewa preparation...',
  'Search BCA Data Structures...',
  'Search SEE Mathematics chapters...',
  'Search BBA Marketing Management...',
  'Search Engineering Computer Networks...',
]

export default function HeroSection({ onSearchOpen }) {
  const [placeholderIdx, setPlaceholderIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-txt-primary leading-tight mb-6"
        >
          Nepal's Most Complete{' '}
          <span className="text-accent-blue">Syllabus</span> Platform
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-txt-secondary mb-10 max-w-2xl mx-auto"
        >
          Everything from SEE to Engineering, Entrance to Competitive Exams — All in One Place
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto mb-12"
        >
          <button
            onClick={onSearchOpen}
            className="w-full flex items-center gap-3 px-6 py-4 bg-card rounded-2xl border border-border-light shadow-md hover:shadow-lg transition-shadow text-left group"
            aria-label="Open search"
          >
            <Search size={20} className="text-txt-muted group-hover:text-accent-blue transition-colors" />
            <span className="text-txt-muted text-base flex-1">
              {placeholders[placeholderIdx]}
            </span>
            <kbd className="hidden md:flex items-center gap-1 text-xs text-txt-disabled bg-surface px-2 py-1 rounded-md border border-border-light">
              Ctrl+K
            </kbd>
          </button>
        </motion.div>

        {/* Stats */}
        <StatsCounter />
      </div>
    </section>
  )
}

function StatsCounter() {
  const stats = [
    { label: 'Programs', target: 20 },
    { label: 'Subjects', target: 120 },
    { label: 'Chapters', target: 800 },
    { label: 'Topics', target: 4000 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
    >
      {stats.map((stat, i) => (
        <div key={stat.label} className="text-center">
          <CountUp target={stat.target} delay={i * 0.15} />
          <div className="text-xs text-txt-muted mt-1">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  )
}

function CountUp({ target, delay = 0 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1500
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOut
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [target, delay])

  return (
    <span className="text-2xl md:text-3xl font-display font-bold text-txt-primary">
      {count.toLocaleString()}+
    </span>
  )
}
