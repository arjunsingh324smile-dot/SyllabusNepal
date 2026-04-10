import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import { programs } from '../../data/programs'

export default function SEEHome() {
  const see = programs.find((c) => c.id === 'school')?.programs.find((p) => p.id === 'see')

  return (
    <PageWrapper>
      <Helmet>
        <title>SEE — Secondary Education Examination | SyllabusNepal</title>
        <meta name="description" content="Complete SEE syllabus — Mathematics, Science, English, Nepali, Social Studies and optional subjects." />
      </Helmet>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">SEE Examination</h1>
          <p className="text-emerald-100">
            Board: {see?.board} · {see?.subjects.length} Subjects
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'School', path: '/school' },
          { label: 'SEE', color: '#059669' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {see?.subjects.map((subj, i) => (
            <SubjectCard
              key={subj.id}
              subject={subj}
              programColor="#059669"
              basePath="/school/see"
              index={i}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
