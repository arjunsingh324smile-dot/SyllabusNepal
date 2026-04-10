import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import { programs } from '../../data/programs'

export default function CompetitiveExamDetail() {
  const { examId } = useParams()
  const competitive = programs.find((c) => c.id === 'competitive')
  const exam = competitive?.programs?.find((p) => p.id === examId)

  const colorMap = {
    'loksewa-kharidar': '#D97706',
    'loksewa-nayab-subba': '#B45309',
    banking: '#059669',
    'tsc-primary': '#7C3AED',
  }
  const color = colorMap[examId] || '#D97706'

  return (
    <PageWrapper>
      <Helmet>
        <title>{exam?.name || examId} Syllabus | SyllabusNepal</title>
        <meta name="description" content={`${exam?.name || examId} complete syllabus — subjects, topics, and preparation resources.`} />
      </Helmet>

      <div className="text-white py-10 px-4 md:px-8" style={{ background: `linear-gradient(to right, ${color}, ${color}CC)` }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl font-bold mb-1">{exam?.name || examId}</h1>
          <p className="opacity-80">
            {exam?.conductingBody || 'PSC'} · {exam?.subjects?.length} Subjects
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Competitive', path: '/competitive' },
          { label: exam?.name || examId, color },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h2 className="font-display text-xl font-semibold text-txt-primary mb-6">
          Subjects ({exam?.subjects?.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {exam?.subjects?.map((subj, i) => (
            <SubjectCard
              key={subj.id}
              subject={subj}
              programColor={color}
              basePath={`/competitive/${examId}`}
              index={i}
            />
          ))}
        </div>

        {!exam && (
          <div className="text-center py-16 text-txt-muted">
            <p className="text-lg">Exam not found.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
