import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProgramCard from '../../components/ui/ProgramCard'
import { programs } from '../../data/programs'

export default function EntranceHub() {
  const entrancePrograms = programs.find((c) => c.id === 'entrance')?.programs || []

  return (
    <PageWrapper>
      <Helmet>
        <title>Entrance Examinations | SyllabusNepal</title>
        <meta name="description" content="Complete entrance exam syllabi for IOE, CEE Medical, CSIT, and Pokhara University." />
      </Helmet>

      <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Entrance Examinations</h1>
          <p className="text-purple-200 max-w-2xl">
            Comprehensive preparation guides for Nepal's top entrance exams — IOE Engineering, CEE Medical, CSIT, and Pokhara University entrance.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'Entrance Exams', color: '#7C3AED' }]} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entrancePrograms.map((prog, i) => (
            <ProgramCard
              key={prog.id}
              program={{
                ...prog,
                path: prog.path || `/entrance/${prog.id}`,
                description: prog.conductingBody,
                count: prog.subjects
                  ? `${prog.subjects.length} Subjects`
                  : prog.subExams
                  ? `${prog.subExams.length} Sub-exams`
                  : '',
              }}
              index={i}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
