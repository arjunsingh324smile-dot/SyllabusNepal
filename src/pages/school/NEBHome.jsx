import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import { programs } from '../../data/programs'

export default function NEBHome() {
  const { gradeId } = useParams() // 'neb-11' or 'neb-12'
  const school = programs.find((c) => c.id === 'school')
  const neb = school?.programs?.find((p) => p.id === gradeId)

  const gradeLabel = gradeId === 'neb-11' ? 'NEB Class 11' : 'NEB Class 12'

  return (
    <PageWrapper>
      <Helmet>
        <title>{gradeLabel} Syllabus | SyllabusNepal</title>
        <meta name="description" content={`${gradeLabel} complete syllabus — all streams and subjects.`} />
      </Helmet>

      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl font-bold mb-1">{gradeLabel}</h1>
          <p className="text-emerald-200">
            {neb?.subjects?.length} Subjects across all streams
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'School', path: '/school' },
          { label: gradeLabel, color: '#059669' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Group by stream if subjects have a stream property */}
        {neb?.streams ? (
          neb.streams.map((stream) => (
            <div key={stream.id} className="mb-10">
              <h2 className="font-display text-xl font-semibold text-txt-primary mb-4">
                {stream.name} Stream
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stream.subjects?.map((subj, i) => (
                  <SubjectCard
                    key={subj.id}
                    subject={subj}
                    programColor="#059669"
                    basePath={`/school/${gradeId}`}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <>
            <h2 className="font-display text-xl font-semibold text-txt-primary mb-6">
              Subjects ({neb?.subjects?.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {neb?.subjects?.map((subj, i) => (
                <SubjectCard
                  key={subj.id}
                  subject={subj}
                  programColor="#059669"
                  basePath={`/school/${gradeId}`}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  )
}
