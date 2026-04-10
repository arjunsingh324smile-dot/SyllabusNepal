import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import WeightageDonut from '../../components/charts/WeightageDonut'
import { programs } from '../../data/programs'

export default function IOEHome() {
  const ioe = programs.find((c) => c.id === 'entrance')?.programs.find((p) => p.id === 'ioe')

  return (
    <PageWrapper>
      <Helmet>
        <title>IOE Entrance Exam — Full Syllabus | SyllabusNepal</title>
        <meta name="description" content="IOE Engineering Entrance Exam complete syllabus — Mathematics, Physics, Chemistry, English with chapter-wise weightage and exam tips." />
      </Helmet>

      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">IOE Entrance Exam</h1>
          <p className="text-red-200">
            {ioe?.conductingBody} · {ioe?.examFormat?.totalMarks} Marks
            · {ioe?.examFormat?.duration} · {ioe?.examFormat?.questionType}
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'IOE Entrance', color: '#DC2626' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Exam info card */}
        <div className="bg-card rounded-xl border border-border-light p-6 mb-8 flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-txt-primary mb-3">Exam Format</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-txt-muted">Total Marks:</span>
                <span className="ml-2 font-medium text-txt-primary">{ioe?.examFormat?.totalMarks}</span>
              </div>
              <div>
                <span className="text-txt-muted">Duration:</span>
                <span className="ml-2 font-medium text-txt-primary">{ioe?.examFormat?.duration}</span>
              </div>
              <div>
                <span className="text-txt-muted">Type:</span>
                <span className="ml-2 font-medium text-txt-primary">{ioe?.examFormat?.questionType}</span>
              </div>
              <div>
                <span className="text-txt-muted">Negative Marking:</span>
                <span className="ml-2 font-medium text-txt-primary">
                  {ioe?.examFormat?.negativeMarking ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
          <WeightageDonut subjects={ioe?.subjects} size={120} />
        </div>

        {/* Subjects */}
        <h2 className="font-display text-xl font-semibold text-txt-primary mb-6">
          Subjects ({ioe?.subjects?.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ioe?.subjects.map((subj, i) => (
            <SubjectCard
              key={subj.id}
              subject={subj}
              programColor="#DC2626"
              basePath="/entrance/ioe"
              index={i}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
