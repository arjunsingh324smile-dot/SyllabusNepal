import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { api } from '../../utils/api'
import Breadcrumb from '../../components/layout/Breadcrumb'
import DifficultyBadge from '../../components/ui/DifficultyBadge'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
    </div>
  )
}

export default function ChapterPage({ category }) {
  const location = useLocation()
  const [chapter, setChapter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const segments = location.pathname.split('/').filter(Boolean)
  // segments: [category, ...programPath, subjectId, chapterId]
  const catSegments = segments.slice(1)
  const chapterId = catSegments[catSegments.length - 1]
  const subjectId = catSegments[catSegments.length - 2]
  const programPath = catSegments.slice(0, -2).join('/')

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.getChapter(category, programPath, subjectId, chapterId)
      .then(setChapter)
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }, [location.pathname])

  if (loading) return <LoadingSpinner />
  if (error) return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <p className="text-red-500">{error.message}</p>
    </div>
  )
  if (!chapter) return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <p className="text-txt-muted text-lg">Chapter not found</p>
    </div>
  )

  // Build breadcrumb
  const breadcrumbItems = []
  let pathAccum = ''
  segments.forEach((seg, i) => {
    pathAccum += '/' + seg
    if (i === segments.length - 1) {
      breadcrumbItems.push({ label: chapter.title, color: chapter.meta?.color })
    } else if (i === segments.length - 2) {
      breadcrumbItems.push({
        label: chapter.meta?.subject || seg.replace(/-/g, ' '),
        path: pathAccum
      })
    } else {
      breadcrumbItems.push({
        label: seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        path: pathAccum
      })
    }
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={breadcrumbItems} />

      {/* Chapter Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium px-2 py-1 rounded-full"
                style={{ background: (chapter.meta?.color || '#2563EB') + '20',
                         color: chapter.meta?.color || '#2563EB' }}>
            Chapter {chapter.number}
          </span>
          <span className="text-sm text-txt-muted">
            {chapter.topics.length} topics
          </span>
        </div>
        <h1 className="text-4xl font-bold leading-tight mb-2 text-txt-primary">
          {chapter.title}
        </h1>
      </div>

      {/* FULL INTRODUCTION */}
      <div className="mb-12">
        <div className="border-l-4 pl-6 py-2 mb-6"
             style={{ borderColor: chapter.meta?.color || '#2563EB' }}>
          <h2 className="text-xl font-semibold mb-4 text-txt-primary">
            Chapter Introduction
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {chapter.introduction.overview
              .split('\n\n')
              .filter(p => p.trim())
              .map((para, i) => (
                <p key={i} className="mb-5 text-txt-secondary leading-relaxed text-base">
                  {para.trim()}
                </p>
              ))}
          </div>
        </div>

        {/* Why it matters */}
        {chapter.introduction.whyItMatters && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200
                          dark:border-amber-800 rounded-xl p-4 mb-5">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">
              Why this chapter matters
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {chapter.introduction.whyItMatters}
            </p>
          </div>
        )}

        {/* Prerequisites */}
        {chapter.introduction.prerequisites?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-txt-muted self-center">
              Prerequisites:
            </span>
            {chapter.introduction.prerequisites.map(p => (
              <span key={p}
                    className="text-xs bg-gray-100 dark:bg-gray-700
                               text-txt-muted px-3 py-1 rounded-full">
                {p}
              </span>
            ))}
          </div>
        )}

        {/* Yearly Trend */}
        {chapter.introduction.yearlyTrend && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <p className="text-sm font-semibold text-txt-primary mb-2">Yearly Question Trend</p>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(chapter.introduction.yearlyTrend).map(([year, count]) => (
                <div key={year} className="text-center">
                  <div className="text-lg font-bold" style={{ color: chapter.meta?.color }}>
                    {count}
                  </div>
                  <div className="text-xs text-txt-muted">{year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TOPICS */}
      <div>
        <h2 className="text-2xl font-bold mb-5 text-txt-primary">
          Topics in this chapter
        </h2>
        <div className="space-y-3">
          {chapter.topics.map((topic, i) => (
            <TopicAccordion key={topic.id} topic={topic} number={i + 1}
                            color={chapter.meta?.color} />
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700
                      flex justify-between">
        <Link to={location.pathname.split('/').slice(0, -1).join('/')}
              className="text-sm text-blue-600 hover:underline">
          ← Back to chapters
        </Link>
      </div>
    </div>
  )
}

function TopicAccordion({ topic, number, color }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-4 py-3.5
                   text-left hover:bg-gray-50 dark:hover:bg-gray-800
                   transition-colors"
      >
        <span className="w-7 h-7 rounded-full flex items-center justify-center
                         text-xs font-bold text-white flex-shrink-0"
              style={{ backgroundColor: color || '#2563EB' }}>
          {number}
        </span>
        <span className="flex-1 font-medium text-txt-primary">
          {topic.name}
        </span>
        <DifficultyBadge difficulty={topic.difficulty} size="sm" />
        <svg className={`w-4 h-4 text-gray-400 transition-transform
                         ${open ? 'rotate-180' : ''}`}
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div className="px-6 pb-5 pt-2 border-t border-gray-100
                        dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          {topic.explanation && (
            <div className="mb-4">
              {topic.explanation.split('\n\n').filter(p => p.trim()).map((para, i) => (
                <p key={i} className="text-txt-secondary leading-relaxed mb-3">
                  {para.trim()}
                </p>
              ))}
            </div>
          )}
          {topic.keyPoints?.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {topic.keyPoints.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm text-txt-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}/>
                  {pt}
                </li>
              ))}
            </ul>
          )}
          {topic.formula && (
            <div className="bg-gray-900 dark:bg-black text-green-400
                            font-mono text-sm px-4 py-3 rounded-lg mb-4 whitespace-pre-wrap">
              {topic.formula}
            </div>
          )}
          {topic.examTip && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border
                            border-blue-200 dark:border-blue-800
                            rounded-lg p-3 text-sm text-blue-700
                            dark:text-blue-300">
              <span className="font-semibold">Exam tip: </span>
              {topic.examTip}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
