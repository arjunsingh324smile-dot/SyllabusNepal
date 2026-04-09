import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Calculator, Atom, FlaskConical, Languages, Brain, Globe, BookOpen, Clock, Target } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { programs } from '../../data/programs'

const SUBJECT_ICONS = {
  mathematics: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  english: Languages,
  'general-knowledge': Globe,
  'logical-reasoning': Brain,
}

const SUBJECT_COLORS = {
  mathematics: '#2563EB',
  physics: '#7C3AED',
  chemistry: '#059669',
  english: '#D97706',
  'general-knowledge': '#DC2626',
  'logical-reasoning': '#0D9488',
}

export default function PUEntranceHome() {
  const puEntrance = programs.find((c) => c.id === 'entrance')?.programs.find((p) => p.id === 'pu-entrance')
  const [activeStream, setActiveStream] = useState('pu-engineering')

  const currentStream = puEntrance?.streams?.find((s) => s.id === activeStream)

  return (
    <PageWrapper>
      <Helmet>
        <title>PU Entrance — Pokhara University | SyllabusNepal</title>
        <meta name="description" content="Pokhara University entrance exam preparation — Engineering and Management streams." />
      </Helmet>

      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{puEntrance?.name}</h1>
          <p className="text-emerald-100">Conducted by {puEntrance?.conductingBody}</p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'PU Entrance', color: '#059669' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Stream selector */}
        <div className="flex gap-3 mb-8">
          {puEntrance?.streams?.map((stream) => (
            <button
              key={stream.id}
              onClick={() => setActiveStream(stream.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeStream === stream.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-surface text-txt-secondary hover:bg-emerald-100 dark:hover:bg-emerald-900/20'
              }`}
            >
              {stream.name}
            </button>
          ))}
        </div>

        {/* Exam info */}
        {currentStream && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center gap-2 text-txt-secondary mb-1">
                <Target size={16} />
                <span className="text-sm">Total Marks</span>
              </div>
              <p className="text-xl font-bold text-txt-primary">{currentStream.totalMarks}</p>
            </div>
            <div className="bg-surface rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center gap-2 text-txt-secondary mb-1">
                <Clock size={16} />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-xl font-bold text-txt-primary">{currentStream.duration}</p>
            </div>
            <div className="bg-surface rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center gap-2 text-txt-secondary mb-1">
                <BookOpen size={16} />
                <span className="text-sm">Format</span>
              </div>
              <p className="text-xl font-bold text-txt-primary">MCQ</p>
            </div>
            <div className="bg-surface rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center gap-2 text-txt-secondary mb-1">
                <BookOpen size={16} />
                <span className="text-sm">Eligibility</span>
              </div>
              <p className="text-sm font-semibold text-txt-primary">{puEntrance?.eligibility}</p>
            </div>
          </div>
        )}

        {/* Subjects */}
        <h2 className="text-2xl font-bold text-txt-primary mb-6">Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentStream?.subjects?.map((subj) => {
            const IconComp = SUBJECT_ICONS[subj.id] || BookOpen
            const color = SUBJECT_COLORS[subj.id] || '#6B7280'
            return (
              <div
                key={subj.id}
                className="bg-surface rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                    <IconComp size={20} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-txt-primary">{subj.name}</h3>
                    <p className="text-sm text-txt-secondary">{subj.marks} Marks · {subj.chapters} Chapters</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PageWrapper>
  )
}
