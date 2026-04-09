import { Link } from 'react-router-dom'
import DifficultyBadge from './DifficultyBadge'

export default function ChapterRow({ chapter, basePath, color, index }) {
  return (
    <Link
      to={`${basePath}/${chapter.id}`}
      className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
        style={{ backgroundColor: `${color}12`, color }}
      >
        {chapter.number}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-txt-primary group-hover:underline decoration-1 underline-offset-4 truncate">
          {chapter.name}
        </h3>
        {chapter.introduction && (
          <p className="text-xs text-txt-muted mt-0.5 line-clamp-1">
            {chapter.introduction}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {chapter.topics && (
          <span className="text-xs text-txt-muted">
            {chapter.topics.length} topics
          </span>
        )}
        {chapter.weightage && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${color}12`, color }}>
            {chapter.weightage}
          </span>
        )}
        <DifficultyBadge difficulty={chapter.difficulty} />
        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color }}>
          →
        </span>
      </div>
    </Link>
  )
}
