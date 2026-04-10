import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'
import ProgramCard from '../components/ui/ProgramCard'
import { programs } from '../data/programs'

export default function Programs() {
  return (
    <PageWrapper>
      <Helmet>
        <title>All Programs | SyllabusNepal</title>
        <meta name="description" content="Browse all academic programs — school, bachelor, entrance, and competitive exams in Nepal." />
      </Helmet>

      <Breadcrumb items={[{ label: 'All Programs' }]} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-txt-primary mb-2">
          All Programs
        </h1>
        <p className="text-txt-secondary mb-10">
          Browse every academic program and exam syllabus available on SyllabusNepal
        </p>

        {programs.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="font-display text-xl font-semibold text-txt-primary mb-1">
              {category.name}
            </h2>
            <p className="text-sm text-txt-muted mb-6">
              {category.programs.length} programs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.programs.map((prog, i) => (
                <ProgramCard
                  key={prog.id}
                  program={prog}
                  index={i}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  )
}
