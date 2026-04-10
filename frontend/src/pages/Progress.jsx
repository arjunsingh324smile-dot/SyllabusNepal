import { Helmet } from 'react-helmet-async'
import { BarChart3 } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'
import ProgressDonut from '../components/charts/ProgressDonut'
import { useProgressStore } from '../store/progressStore'
import { programs } from '../data/programs'

export default function Progress() {
  const { readTopics, getProgress, resetProgress } = useProgressStore()

  const totalReadCount = Object.keys(readTopics).filter((k) => readTopics[k]).length

  // Compute per-program stats
  const programStats = []
  const categories = programs
  categories.forEach((cat) => {
    cat.programs?.forEach((prog) => {
      const subjects = prog.subjects || []
      let total = 0
      let read = 0
      subjects.forEach((subj) => {
        const count = subj.chapters || subj.totalChapters || 0
        total += count
      })
      // For simplified tracking, count read topics that start with the prog id
      Object.keys(readTopics).forEach((key) => {
        if (readTopics[key] && key.startsWith(prog.id)) read++
      })

      if (total > 0 || read > 0) {
        programStats.push({
          id: prog.id,
          name: prog.name,
          category: cat.name,
          total: Math.max(total, 1),
          read,
        })
      }
    })
  })

  return (
    <PageWrapper>
      <Helmet>
        <title>My Progress | SyllabusNepal</title>
      </Helmet>

      <Breadcrumb items={[{ label: 'Progress', color: '#10B981' }]} />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-txt-primary flex items-center gap-2">
            <BarChart3 size={24} className="text-emerald-500" />
            My Progress
          </h1>
          {totalReadCount > 0 && (
            <button
              onClick={resetProgress}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Reset All
            </button>
          )}
        </div>

        {/* Overall stat */}
        <div className="bg-card rounded-xl border border-border-light p-6 mb-8 flex items-center gap-6">
          <ProgressDonut percent={Math.min(100, totalReadCount)} size={100} />
          <div>
            <p className="text-2xl font-bold text-txt-primary">{totalReadCount}</p>
            <p className="text-sm text-txt-muted">Topics marked as read</p>
          </div>
        </div>

        {/* Per-program breakdown */}
        {programStats.filter((p) => p.read > 0).length > 0 ? (
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-txt-primary">By Program</h2>
            {programStats
              .filter((p) => p.read > 0)
              .map((prog) => (
                <div
                  key={prog.id}
                  className="bg-card rounded-xl border border-border-light p-4 flex items-center gap-4"
                >
                  <ProgressDonut percent={Math.round((prog.read / prog.total) * 100)} size={56} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-txt-primary">{prog.name}</p>
                    <p className="text-sm text-txt-muted">
                      {prog.read} / {prog.total} topics · {prog.category}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12 text-txt-muted">
            <BarChart3 size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No progress tracked yet</p>
            <p className="text-sm mt-1">Mark topics as read to track your progress.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
