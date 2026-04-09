import { difficultyConfig } from '../../utils/programHelpers'

export default function DifficultyBadge({ difficulty, size = 'md' }) {
  const config = difficultyConfig[difficulty] || difficultyConfig.intermediate
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'

  return (
    <div className="flex items-center gap-1" title={config.label} aria-label={`Difficulty: ${config.label}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${dotSize} rounded-full`}
          style={{
            backgroundColor: i <= config.dots ? config.color : 'var(--border-light)',
          }}
        />
      ))}
      {size !== 'sm' && (
        <span className="text-xs text-txt-muted ml-1">{config.label}</span>
      )}
    </div>
  )
}
