import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProgramCard from '../../components/ui/ProgramCard'
import { programs } from '../../data/programs'

export default function SchoolHub() {
  const schoolPrograms = programs.find((c) => c.id === 'school')?.programs || []

  const schoolLevel = schoolPrograms.filter((p) => ['see', 'class-9', 'ble-8'].includes(p.id))
  const highSchool = schoolPrograms.filter((p) => ['neb-11', 'neb-12'].includes(p.id))

  return (
    <PageWrapper>
      <Helmet>
        <title>School & High School — SEE, BLE, NEB | SyllabusNepal</title>
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">School & High School</h1>
          <p className="text-emerald-100 max-w-xl">
            Complete syllabi for SEE, BLE (Class 8), Class 9, NEB Grade 11 and Grade 12 across all streams — Science, Management, Humanities, and Law.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'School Level', color: '#059669' }]} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* School Level Section */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-txt-primary mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          School Level
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {schoolLevel.map((prog, i) => (
            <ProgramCard key={prog.id} program={prog} index={i} />
          ))}
        </div>

        {/* High School Section */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-txt-primary mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          High School (NEB)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highSchool.map((prog, i) => (
            <ProgramCard key={prog.id} program={prog} index={i} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
