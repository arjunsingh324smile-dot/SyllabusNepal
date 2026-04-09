import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect, useRef } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Sidebar from '../../components/layout/Sidebar'
import TopicCard from '../../components/ui/TopicCard'
import YearTrendBar from '../../components/charts/YearTrendBar'
import DifficultyBadge from '../../components/ui/DifficultyBadge'
import { programs } from '../../data/programs'

const dataMap = {
  physics: () => import('../../data/entrance/ioe/physics.json'),
  mathematics: () => import('../../data/entrance/ioe/mathematics.json'),
  chemistry: () => import('../../data/entrance/ioe/chemistry.json'),
  english: () => import('../../data/entrance/ioe/english.json'),
}

export default function IOEChapter() {
  const { subjectId, chapterId } = useParams()
  const [data, setData] = useState(null)
  const contentRef = useRef(null)

  const ioe = programs.find((c) => c.id === 'entrance')?.programs.find((p) => p.id === 'ioe')
  const subjectMeta = ioe?.subjects?.find((s) => s.id === subjectId)

  useEffect(() => {
    if (dataMap[subjectId]) {
      dataMap[subjectId]().then((mod) => setData(mod.default || mod))
    }
  }, [subjectId])

  const allChapters = data?.units?.flatMap((u) => u.chapters) || []
  const chapter = allChapters.find((ch) => String(ch.chapterId) === chapterId)
  const unit = data?.units?.find((u) => u.chapters.some((ch) => String(ch.chapterId) === chapterId))

  const sidebarItems = allChapters.map((ch) => ({
    id: String(ch.chapterId),
    label: ch.title,
    path: `/entrance/ioe/${subjectId}/${ch.chapterId}`,
  }))

  return (
    <PageWrapper>
      <Helmet>
        <title>{chapter?.title || 'Chapter'} — IOE {subjectMeta?.name} | SyllabusNepal</title>
        <meta name="description" content={chapter?.introduction || `Chapter ${chapterId} of IOE ${subjectMeta?.name} entrance syllabus`} />
      </Helmet>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'IOE', path: '/entrance/ioe' },
          { label: subjectMeta?.name || subjectId, path: `/entrance/ioe/${subjectId}` },
          { label: chapter?.title || `Chapter ${chapterId}`, color: '#DC2626' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <Sidebar
            title={subjectMeta?.name || subjectId}
            items={sidebarItems}
            activeId={chapterId}
            programColor="#DC2626"
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0" ref={contentRef}>
          {chapter ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold text-sm">
                    {chapter.chapterId}
                  </span>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-txt-primary">
                    {chapter.title}
                  </h1>
                </div>
                {unit && (
                  <p className="text-sm text-txt-muted ml-11">
                    Unit {unit.unitId}: {unit.unitTitle}
                  </p>
                )}
              </div>

              {/* Intro */}
              {chapter.introduction && (
                <div className="prose prose-sm max-w-none text-txt-secondary mb-6">
                  <p>{chapter.introduction}</p>
                </div>
              )}

              {/* Why it matters */}
              {chapter.whyItMatters && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 mb-6 border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-1">Why This Matters</h3>
                  <p className="text-sm text-txt-secondary">{chapter.whyItMatters}</p>
                </div>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 mb-8 text-sm">
                {chapter.weightage && (
                  <span className="px-3 py-1 rounded-full bg-surface text-txt-secondary border border-border-light">
                    ⚖️ Weightage: {chapter.weightage}%
                  </span>
                )}
                {chapter.difficulty && <DifficultyBadge level={chapter.difficulty} />}
                <span className="px-3 py-1 rounded-full bg-surface text-txt-secondary border border-border-light">
                  📝 {chapter.topics?.length || 0} Topics
                </span>
              </div>

              {/* Year trend chart */}
              {chapter.yearlyTrend && chapter.yearlyTrend.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display text-lg font-semibold text-txt-primary mb-3">
                    Year-wise Question Trend
                  </h3>
                  <YearTrendBar data={chapter.yearlyTrend} color="#DC2626" />
                </div>
              )}

              {/* Topics */}
              <h3 className="font-display text-lg font-semibold text-txt-primary mb-4">
                Topics ({chapter.topics?.length || 0})
              </h3>
              <div className="space-y-3">
                {chapter.topics?.map((topic, i) => (
                  <TopicCard
                    key={topic.topicId}
                    topic={topic}
                    index={i}
                    programId="ioe"
                    subjectId={subjectId}
                    chapterId={chapterId}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-txt-muted">
              {data ? (
                <p className="text-lg">Chapter not found.</p>
              ) : (
                <p className="text-lg">Loading...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
