import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import { programs } from '../../data/programs'

export default function ProgramDetail() {
  const { programId } = useParams()
  const bachelor = programs.find((c) => c.id === 'bachelor')
  const program = bachelor?.programs?.find((p) => p.id === programId)

  const colorMap = {
    bbs: '#F59E0B',
    bca: '#8B5CF6',
    'bsc-csit': '#06B6D4',
    ba: '#EC4899',
    bsc: '#10B981',
  }
  const color = colorMap[programId] || '#4F46E5'

  return (
    <PageWrapper>
      <Helmet>
        <title>{program?.name || programId} Syllabus | SyllabusNepal</title>
        <meta name="description" content={`${program?.name || programId} complete semester-wise syllabus — subjects, chapters, and units.`} />
      </Helmet>

      <div className="text-white py-10 px-4 md:px-8" style={{ background: `linear-gradient(to right, ${color}, ${color}CC)` }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl font-bold mb-1">{program?.name || programId}</h1>
          <p className="opacity-80">
            {program?.fullName || ''} · {program?.subjects?.length} Subjects
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Bachelor', path: '/bachelor' },
          { label: program?.name || programId, color },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Group by semester if available */}
        {program?.semesters ? (
          program.semesters.map((sem) => (
            <div key={sem.semester} className="mb-10">
              <h2 className="font-display text-xl font-semibold text-txt-primary mb-4">
                Semester {sem.semester}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sem.subjects?.map((subj, i) => (
                  <SubjectCard
                    key={subj.id}
                    subject={subj}
                    programColor={color}
                    basePath={`/bachelor/${programId}`}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <>
            <h2 className="font-display text-xl font-semibold text-txt-primary mb-6">
              Subjects ({program?.subjects?.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {program?.subjects?.map((subj, i) => (
                <SubjectCard
                  key={subj.id}
                  subject={subj}
                  programColor={color}
                  basePath={`/bachelor/${programId}`}
                  index={i}
                />
              ))}
            </div>
          </>
        )}

        {!program && (
          <div className="text-center py-16 text-txt-muted">
            <p className="text-lg">Program not found.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
