import { motion } from 'framer-motion'

export default function ProgressBar({ percent = 0, color = '#2563EB', size = 'md', showLabel = true }) {
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-txt-muted">{percent}% complete</span>
        </div>
      )}
      <div className={`w-full bg-surface rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
