import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import { programs } from '../../data/programs'

export default function Class9Home() {
  const class9 = programs.find((c) => c.id === 'school')?.programs.find((p) => p.id === 'class-9')

  return (
    <PageWrapper>
      <Helmet>
        <title>Class 9 — Grade 9 Syllabus | SyllabusNepal</title>
        <meta name="description" content="Complete Class 9 syllabus — Nepali, English, Mathematics, Science, Social Studies and optional subjects." />
      </Helmet>

      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Class 9</h1>
          <p className="text-cyan-100">
            Board: {class9?.board} · {class9?.subjects.length} Subjects
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'School', path: '/school' },
          { label: 'Class 9', color: '#0891B2' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {class9?.subjects.map((subj, i) => (
            <SubjectCard
              key={subj.id}
              subject={subj}
              programColor="#0891B2"
              basePath="/school/class-9"
              index={i}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
