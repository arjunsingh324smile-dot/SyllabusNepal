import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import WeightageDonut from '../../components/charts/WeightageDonut'
import { programs } from '../../data/programs'

export default function CEEExamDetail() {
  const { examId } = useParams()
  const cee = programs.find((c) => c.id === 'entrance')?.programs.find((p) => p.id === 'cee')
  const exam = cee?.subExams?.find((e) => e.id === examId)

  return (
    <PageWrapper>
      <Helmet>
        <title>CEE {exam?.name || examId} Syllabus | SyllabusNepal</title>
        <meta name="description" content={`${exam?.name || examId} entrance exam syllabus — subjects, chapters, weightage, and preparation tips.`} />
      </Helmet>

      <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl font-bold mb-1">{exam?.name || examId}</h1>
          <p className="text-green-200">
            CEE · {exam?.totalMarks} Marks · {exam?.duration} · {exam?.questionType || 'MCQ'}
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'CEE', path: '/entrance/cee' },
          { label: exam?.name || examId, color: '#059669' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-card rounded-xl border border-border-light p-6 mb-8 flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-txt-primary mb-3">Exam Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-txt-muted">Total Marks:</span>
                <span className="ml-2 font-medium text-txt-primary">{exam?.totalMarks}</span>
              </div>
              <div>
                <span className="text-txt-muted">Duration:</span>
                <span className="ml-2 font-medium text-txt-primary">{exam?.duration}</span>
              </div>
              <div>
                <span className="text-txt-muted">Type:</span>
                <span className="ml-2 font-medium text-txt-primary">{exam?.questionType || 'MCQ'}</span>
              </div>
              <div>
                <span className="text-txt-muted">Neg. Marking:</span>
                <span className="ml-2 font-medium text-txt-primary">
                  {exam?.negativeMarking ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
          <WeightageDonut subjects={exam?.subjects} size={120} />
        </div>

        <h2 className="font-display text-xl font-semibold text-txt-primary mb-6">
          Subjects ({exam?.subjects?.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {exam?.subjects?.map((subj, i) => (
            <SubjectCard
              key={subj.id}
              subject={subj}
              programColor="#059669"
              basePath={`/entrance/cee/${examId}`}
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
