import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Users, Clock, AlertTriangle } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { programs } from '../../data/programs'

export default function CEEHub() {
  const cee = programs.find((c) => c.id === 'entrance')?.programs.find((p) => p.id === 'cee')

  const examColors = {
    'cee-mbbs': '#EF4444',
    'cee-bds': '#F97316',
    'cee-bsc-nursing': '#10B981',
    'cee-pharmacy': '#8B5CF6',
    'cee-bams': '#F59E0B',
    'cee-bns': '#06B6D4',
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>CEE Medical Entrance — All 6 Exams | SyllabusNepal</title>
        <meta name="description" content="Common Entrance Examination (CEE) hub — MBBS, BDS, BSc Nursing, Pharmacy, BAMS, BNS syllabuses with marks distribution and comparison." />
      </Helmet>

      <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">CEE Medical Entrance</h1>
          <p className="text-green-200">
            {cee?.conductingBody} · {cee?.subExams?.length || 6} Exams · Medical & Health Sciences
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'CEE Medical', color: '#059669' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Exam cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cee?.subExams?.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                to={`/entrance/cee/${exam.id}`}
                className="block bg-card rounded-xl border border-border-light hover:shadow-md transition-all p-6 group"
                style={{ borderTopColor: examColors[exam.id] || '#059669', borderTopWidth: '3px' }}
              >
                <h3 className="font-display text-lg font-semibold text-txt-primary mb-2 group-hover:text-accent transition-colors">
                  {exam.name}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm text-txt-muted mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} /> {exam.subjects?.length} Subjects
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {exam.totalMarks} Marks
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {exam.duration}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exam.subjects?.slice(0, 4).map((s) => (
                    <span key={s.id} className="text-xs px-2 py-1 rounded bg-surface text-txt-secondary">
                      {s.name}
                    </span>
                  ))}
                  {exam.subjects?.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded bg-surface text-txt-muted">
                      +{exam.subjects.length - 4} more
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <h2 className="font-display text-xl font-semibold text-txt-primary mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border-light rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-surface text-txt-primary">
                <th className="text-left px-4 py-3 font-semibold">Exam</th>
                <th className="text-center px-4 py-3 font-semibold">Subjects</th>
                <th className="text-center px-4 py-3 font-semibold">Total Marks</th>
                <th className="text-center px-4 py-3 font-semibold">Duration</th>
                <th className="text-center px-4 py-3 font-semibold">Type</th>
              </tr>
            </thead>
            <tbody>
              {cee?.subExams?.map((exam, i) => (
                <tr key={exam.id} className={i % 2 === 0 ? 'bg-card' : 'bg-surface/50'}>
                  <td className="px-4 py-3 font-medium text-txt-primary">
                    <Link to={`/entrance/cee/${exam.id}`} className="hover:text-accent transition-colors">
                      {exam.name}
                    </Link>
                  </td>
                  <td className="text-center px-4 py-3 text-txt-secondary">{exam.subjects?.length}</td>
                  <td className="text-center px-4 py-3 text-txt-secondary">{exam.totalMarks}</td>
                  <td className="text-center px-4 py-3 text-txt-secondary">{exam.duration}</td>
                  <td className="text-center px-4 py-3 text-txt-secondary">{exam.questionType || 'MCQ'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  )
}
