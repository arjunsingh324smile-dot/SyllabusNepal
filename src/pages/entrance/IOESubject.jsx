import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ChapterRow from '../../components/ui/ChapterRow'
import WeightageDonut from '../../components/charts/WeightageDonut'
import { programs } from '../../data/programs'

const dataMap = {
  physics: () => import('../../data/entrance/ioe/physics.json'),
  mathematics: () => import('../../data/entrance/ioe/mathematics.json'),
  chemistry: () => import('../../data/entrance/ioe/chemistry.json'),
  english: () => import('../../data/entrance/ioe/english.json'),
}

import { useState, useEffect } from 'react'

export default function IOESubject() {
  const { subjectId } = useParams()
  const [data, setData] = useState(null)

  const ioe = programs.find((c) => c.id === 'entrance')?.programs.find((p) => p.id === 'ioe')
  const subjectMeta = ioe?.subjects?.find((s) => s.id === subjectId)

  useEffect(() => {
    if (dataMap[subjectId]) {
      dataMap[subjectId]().then((mod) => setData(mod.default || mod))
    }
  }, [subjectId])

  const allChapters = data?.units?.flatMap((u) => u.chapters) || []
  const totalTopics = allChapters.reduce((acc, ch) => acc + (ch.topics?.length || 0), 0)

  return (
    <PageWrapper>
      <Helmet>
        <title>IOE {subjectMeta?.name || subjectId} Syllabus | SyllabusNepal</title>
        <meta name="description" content={`${subjectMeta?.name || subjectId} syllabus for IOE Entrance — chapter-wise topics, weightage, formulas, and exam tips.`} />
      </Helmet>

      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl font-bold mb-1">{subjectMeta?.name || subjectId}</h1>
          <p className="text-red-200">
            IOE Entrance · {subjectMeta?.marks} Marks · {allChapters.length} Chapters · {totalTopics} Topics
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'IOE', path: '/entrance/ioe' },
          { label: subjectMeta?.name || subjectId, color: '#DC2626' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {data?.units?.map((unit) => (
          <div key={unit.unitId} className="mb-10">
            <h2 className="font-display text-xl font-semibold text-txt-primary mb-1">
              Unit {unit.unitId}: {unit.unitTitle}
            </h2>
            <p className="text-sm text-txt-muted mb-4">
              {unit.chapters.length} chapters · {unit.chapters.reduce((a, c) => a + (c.topics?.length || 0), 0)} topics
            </p>

            <div className="space-y-2">
              {unit.chapters.map((ch, i) => (
                <ChapterRow
                  key={ch.chapterId}
                  chapter={ch}
                  index={i}
                  basePath={`/entrance/ioe/${subjectId}`}
                  programColor="#DC2626"
                />
              ))}
            </div>
          </div>
        ))}

        {!data && (
          <div className="text-center py-16 text-txt-muted">
            <p className="text-lg">Loading syllabus data...</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
