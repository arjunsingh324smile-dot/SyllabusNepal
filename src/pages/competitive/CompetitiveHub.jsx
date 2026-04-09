import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Briefcase, Shield, GraduationCap } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProgramCard from '../../components/ui/ProgramCard'
import { programs } from '../../data/programs'

export default function CompetitiveHub() {
  const competitive = programs.find((c) => c.id === 'competitive')

  return (
    <PageWrapper>
      <Helmet>
        <title>Competitive Exams — Loksewa, Banking, TSC | SyllabusNepal</title>
        <meta name="description" content="Complete syllabuses for Nepal competitive exams — Loksewa Kharidar, Nayab Subba, Banking, TSC primary teacher exams." />
      </Helmet>

      <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Trophy size={32} />
            <h1 className="font-display text-3xl md:text-4xl font-bold">Competitive Exams</h1>
          </div>
          <p className="text-amber-200">
            Government service, banking, and teaching license exam syllabuses with subject-wise preparation.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'Competitive Exams', color: '#D97706' }]} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitive?.programs?.map((prog, i) => (
            <ProgramCard key={prog.id} program={prog} basePath="/competitive" index={i} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
