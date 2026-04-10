import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import { programs } from '../../data/programs'

const STREAM_COLORS = {
  science: '#2563EB',
  management: '#059669',
  humanities: '#7C3AED',
  law: '#92400E',
}

export default function NEBHome() {
  const { gradeId } = useParams() // 'neb-11' or 'neb-12'
  const school = programs.find((c) => c.id === 'school')

  // Support both /school/neb-11 and /school/neb-12 routes
  const normId = gradeId === 'neb-11' || gradeId === 'grade-11' ? 'neb-11'
    : gradeId === 'neb-12' || gradeId === 'grade-12' ? 'neb-12'
    : gradeId
  const neb = school?.programs?.find((p) => p.id === normId)

  const gradeNum = normId === 'neb-11' ? '11' : '12'
  const gradeLabel = `NEB Class ${gradeNum}`

  const streams = neb?.streams ?? []
  const [activeStream, setActiveStream] = useState(streams[0]?.id ?? '')
  const currentStream = streams.find((s) => s.id === activeStream) ?? streams[0]
  const streamColor = STREAM_COLORS[activeStream] ?? '#059669'

  return (
    <PageWrapper>
      <Helmet>
        <title>{gradeLabel} Syllabus | SyllabusNepal</title>
        <meta
          name="description"
          content={`${gradeLabel} complete syllabus — Science, Management, Humanities, Law streams. All subjects with chapters and topics.`}
        />
      </Helmet>

      {/* Hero */}
      <div
        className="text-white py-10 px-4 md:px-8"
        style={{ background: `linear-gradient(135deg, ${streamColor}dd, ${streamColor}99)` }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-medium opacity-80 mb-1">High School · NEB</p>
          <h1 className="font-display text-3xl font-bold mb-2">{gradeLabel}</h1>
          <p className="opacity-90 text-sm">
            {streams.length} Streams · Select your stream to see subjects
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'School', path: '/school' },
          { label: gradeLabel, color: '#D97706' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Grade Toggle (Class 11 / Class 12) */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-txt-secondary mr-2 font-medium">Grade:</span>
          <a
            href="/school/neb-11"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
              normId === 'neb-11'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'border-border-light text-txt-secondary hover:border-amber-500 hover:text-amber-600'
            }`}
          >
            Class 11
          </a>
          <a
            href="/school/neb-12"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
              normId === 'neb-12'
                ? 'bg-orange-600 text-white border-orange-600'
                : 'border-border-light text-txt-secondary hover:border-orange-500 hover:text-orange-600'
            }`}
          >
            Class 12
          </a>
        </div>

        {/* Stream Tabs */}
        {streams.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border-light pb-4">
            {streams.map((stream) => {
              const color = STREAM_COLORS[stream.id] ?? '#059669'
              const isActive = activeStream === stream.id
              return (
                <button
                  key={stream.id}
                  onClick={() => setActiveStream(stream.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'bg-card text-txt-secondary border-border-light hover:border-current'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: color, borderColor: color }
                      : { '--tw-border-opacity': 1 }
                  }
                >
                  {stream.name} Stream
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    {stream.subjects?.length}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Subjects Grid */}
        {currentStream && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: streamColor }}
              />
              <h2 className="font-display text-xl font-semibold text-txt-primary">
                {currentStream.name} Stream — Subjects
              </h2>
              <span className="text-sm text-txt-secondary">
                ({currentStream.subjects?.length} subjects)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentStream.subjects?.map((subj, i) => (
                <SubjectCard
                  key={subj.id}
                  subject={subj}
                  programColor={streamColor}
                  basePath={`/school/${normId}`}
                  index={i}
                />
              ))}
            </div>
          </>
        )}

        {/* Fallback for flat subjects */}
        {!streams.length && neb?.subjects && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {neb.subjects.map((subj, i) => (
              <SubjectCard
                key={subj.id}
                subject={subj}
                programColor="#059669"
                basePath={`/school/${normId}`}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

