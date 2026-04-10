import { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { api } from '../../utils/api'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProgramBadge from '../../components/ui/ProgramBadge'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
    </div>
  )
}

function ErrorMessage({ msg }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <p className="text-red-500 text-lg">{msg || 'Something went wrong'}</p>
    </div>
  )
}

export default function SubjectPage({ category }) {
  const params = useParams()
  const location = useLocation()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Build programPath and subjectId from URL segments
  const segments = location.pathname.split('/').filter(Boolean)
  // segments[0] = category, rest = programPath segments + subjectId
  const categorySegments = segments.slice(1) // remove category
  const subjectId = categorySegments[categorySegments.length - 1]
  const programPath = categorySegments.slice(0, -1).join('/')

  useEffect(() => {
    if (!subjectId) return
    setLoading(true)
    setError(null)
    api.getSubject(category, programPath, subjectId)
      .then(setData)
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }, [category, programPath, subjectId])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage msg={error.message} />
  if (!data) return <ErrorMessage msg="Subject not found" />

  // Build breadcrumb items
  const breadcrumbItems = []
  let pathAccum = ''
  segments.forEach((seg, i) => {
    pathAccum += '/' + seg
    if (i === segments.length - 1) {
      breadcrumbItems.push({ label: data?.meta?.subject || seg.replace(/-/g, ' '), color: data?.meta?.color })
    } else {
      breadcrumbItems.push({
        label: seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        path: pathAccum
      })
    }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      {/* Subject Header */}
      <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <ProgramBadge name={data.meta.program} color={data.meta.color} />
          <span className="text-sm text-txt-muted">
            {data.meta.totalChapters} chapters
          </span>
        </div>
        <h1 className="text-3xl font-bold text-txt-primary">{data.meta.subject}</h1>
      </div>

      {/* Chapter List */}
      <div className="space-y-3">
        {data.chapters.map((chapter) => (
          <Link
            key={chapter.id}
            to={`${location.pathname}/${chapter.id}`}
            className="group flex items-center gap-4 p-4 rounded-xl
                       border border-gray-200 dark:border-gray-700
                       hover:border-blue-400 hover:shadow-md
                       transition-all duration-200 bg-white dark:bg-gray-800"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center
                         text-sm font-bold text-white flex-shrink-0"
              style={{ backgroundColor: data.meta.color }}
            >
              {chapter.number}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-txt-primary
                            group-hover:text-blue-600 transition-colors">
                {chapter.title}
              </p>
              <p className="text-sm text-txt-muted mt-0.5 truncate">
                {chapter.shortIntro}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs bg-gray-100 dark:bg-gray-700
                               px-2 py-1 rounded-full text-txt-muted">
                {chapter.topics.length} topics
              </span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500
                              transition-colors"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
