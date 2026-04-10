import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import WeightageDonut from '../../components/charts/WeightageDonut'
import { programs } from '../../data/programs'

export default function CSITHome() {
  const csit = programs.find((c) => c.id === 'entrance')?.programs.find((p) => p.id === 'csit-entrance')

  return (
    <PageWrapper>
      <Helmet>
        <title>CSIT Entrance Exam — Full Syllabus | SyllabusNepal</title>
        <meta name="description" content="BSc CSIT Entrance Exam syllabus — Mathematics, Computer Science, English, Logic, General Knowledge." />
      </Helmet>

      <div className="bg-gradient-to-r from-cyan-700 to-cyan-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">CSIT Entrance Exam</h1>
          <p className="text-cyan-200">
            {csit?.conductingBody} · {csit?.examFormat?.totalMarks} Marks
            · {csit?.examFormat?.duration}
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'CSIT Entrance', color: '#0E7490' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-card rounded-xl border border-border-light p-6 mb-8 flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-txt-primary mb-3">Exam Format</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-txt-muted">Total Marks:</span>
                <span className="ml-2 font-medium text-txt-primary">{csit?.examFormat?.totalMarks}</span>
              </div>
              <div>
                <span className="text-txt-muted">Duration:</span>
                <span className="ml-2 font-medium text-txt-primary">{csit?.examFormat?.duration}</span>
              </div>
              <div>
                <span className="text-txt-muted">Type:</span>
                <span className="ml-2 font-medium text-txt-primary">{csit?.examFormat?.questionType}</span>
              </div>
              <div>
                <span className="text-txt-muted">Neg. Marking:</span>
                <span className="ml-2 font-medium text-txt-primary">
                  {csit?.examFormat?.negativeMarking ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
          <WeightageDonut subjects={csit?.subjects} size={120} />
        </div>

        <h2 className="font-display text-xl font-semibold text-txt-primary mb-6">
          Subjects ({csit?.subjects?.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {csit?.subjects?.map((subj, i) => (
            <SubjectCard
              key={subj.id}
              subject={subj}
              programColor="#0E7490"
              basePath="/entrance/csit"
              index={i}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
