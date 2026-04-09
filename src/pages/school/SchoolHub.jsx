import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProgramCard from '../../components/ui/ProgramCard'
import { programs } from '../../data/programs'

export default function SchoolHub() {
  const schoolPrograms = programs.find((c) => c.id === 'school')?.programs || []

  return (
    <PageWrapper>
      <Helmet>
        <title>School Level — SEE & NEB | SyllabusNepal</title>
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">School Level</h1>
          <p className="text-emerald-100 max-w-xl">
            Complete syllabi for SEE, NEB Grade 11 and Grade 12 across all streams — Science, Management, Humanities, Education, and Law.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'School Level', color: '#059669' }]} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schoolPrograms.map((prog, i) => (
            <ProgramCard key={prog.id} program={prog} index={i} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
