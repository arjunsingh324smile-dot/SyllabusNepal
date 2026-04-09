import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Bookmark, BookmarkCheck, Check, Share2, Lightbulb, Link2 } from 'lucide-react'
import DifficultyBadge from './DifficultyBadge'
import FormulaBlock from './FormulaBlock'
import BookmarkButton from './BookmarkButton'
import MarkReadButton from './MarkReadButton'
import ShareButton from './ShareButton'

export default function TopicCard({ topic, chapter, program, color, isRead, onToggleRead }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="topic-card bg-card rounded-xl border border-border-light overflow-hidden transition-shadow hover:shadow-sm">
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left"
        aria-expanded={expanded}
        aria-controls={`topic-${topic.id}`}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{ backgroundColor: `${color}12`, color }}
        >
          {topic.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-txt-primary truncate">
            {topic.name}
          </h4>
          {!expanded && topic.explanation && (
            <p className="text-xs text-txt-muted mt-0.5 line-clamp-1">
              {topic.explanation.substring(0, 100)}...
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <DifficultyBadge difficulty={topic.difficulty} size="sm" />
          {isRead && (
            <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <Check size={12} />
            </span>
          )}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} className="text-txt-muted" />
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            id={`topic-${topic.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border-light pt-4">
              {/* Explanation */}
              <div>
                <h5 className="text-xs font-semibold uppercase text-txt-muted tracking-wider mb-2">
                  Explanation
                </h5>
                <div className="text-sm text-txt-secondary leading-relaxed whitespace-pre-line">
                  {topic.explanation}
                </div>
              </div>

              {/* Key Points */}
              {topic.keyPoints && topic.keyPoints.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold uppercase text-txt-muted tracking-wider mb-2">
                    Key Points
                  </h5>
                  <ul className="space-y-1.5">
                    {topic.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-txt-secondary">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Formula */}
              {topic.formula && (
                <FormulaBlock formula={topic.formula} />
              )}

              {/* Exam Tip */}
              {topic.examTip && (
                <div className="flex gap-3 p-3 rounded-lg" style={{ backgroundColor: `${color}08` }}>
                  <Lightbulb size={18} className="flex-shrink-0 mt-0.5" style={{ color }} />
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color }}>
                      Exam Tip
                    </h5>
                    <p className="text-sm text-txt-secondary">{topic.examTip}</p>
                  </div>
                </div>
              )}

              {/* Related Topics */}
              {topic.relatedTopics && topic.relatedTopics.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Link2 size={14} className="text-txt-muted" />
                  <span className="text-xs text-txt-muted">Related:</span>
                  {topic.relatedTopics.map((rel, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full bg-surface text-txt-secondary"
                    >
                      {rel}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border-light">
                <MarkReadButton
                  isRead={isRead}
                  onToggle={() => onToggleRead?.(topic.id)}
                  color={color}
                />
                <BookmarkButton
                  item={{
                    id: topic.id,
                    type: 'topic',
                    name: topic.name,
                    program: program,
                    chapter: chapter,
                  }}
                  color={color}
                />
                <ShareButton title={topic.name} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
