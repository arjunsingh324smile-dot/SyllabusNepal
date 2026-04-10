import { Helmet } from 'react-helmet-async'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SubjectCard from '../../components/ui/SubjectCard'
import { programs } from '../../data/programs'

export default function BLEHome() {
  const ble = programs.find((c) => c.id === 'school')?.programs.find((p) => p.id === 'ble-8')

  return (
    <PageWrapper>
      <Helmet>
        <title>BLE — Basic Level Examination (Class 8) | SyllabusNepal</title>
        <meta name="description" content="Complete BLE (Class 8) syllabus — Nepali, English, Mathematics, Science, Social Studies and more." />
      </Helmet>

      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">BLE — Basic Level Examination</h1>
          <p className="text-teal-100">
            Board: {ble?.board} · {ble?.subjects.length} Subjects · Class 8
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'School', path: '/school' },
          { label: 'BLE (Class 8)', color: '#14B8A6' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ble?.subjects.map((subj, i) => (
            <SubjectCard
              key={subj.id}
              subject={subj}
              programColor="#14B8A6"
              basePath="/school/ble-8"
              index={i}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
