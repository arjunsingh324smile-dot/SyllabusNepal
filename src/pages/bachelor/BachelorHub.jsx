import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Building } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProgramCard from '../../components/ui/ProgramCard'
import { programs } from '../../data/programs'

export default function BachelorHub() {
  const bachelor = programs.find((c) => c.id === 'bachelor')

  return (
    <PageWrapper>
      <Helmet>
        <title>Bachelor Programs — Full Syllabuses | SyllabusNepal</title>
        <meta name="description" content="Browse syllabuses for BBS, BCA, BSc CSIT, BA, BSc, and Pokhara University bachelor programs in Nepal." />
      </Helmet>

      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap size={32} />
            <h1 className="font-display text-3xl md:text-4xl font-bold">Bachelor Programs</h1>
          </div>
          <p className="text-blue-200">
            TU, PU & affiliated university bachelor degree syllabuses — semester-wise subjects, chapters, and units.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'Bachelor Programs', color: '#4F46E5' }]} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* TU Programs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Building size={20} className="text-blue-600" />
            <h2 className="font-display text-xl font-semibold text-txt-primary">
              Tribhuvan University (TU)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bachelor?.programs
              ?.filter((p) => p.university === 'TU' || !p.university)
              .map((prog, i) => (
                <ProgramCard key={prog.id} program={prog} basePath="/bachelor" index={i} />
              ))}
          </div>
        </div>

        {/* PU Programs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Building size={20} className="text-purple-600" />
            <h2 className="font-display text-xl font-semibold text-txt-primary">
              Pokhara University (PU)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bachelor?.programs
              ?.filter((p) => p.university === 'PU')
              .map((prog, i) => (
                <ProgramCard key={prog.id} program={prog} basePath="/bachelor/pu" index={i} />
              ))}
          </div>
          {!bachelor?.programs?.some((p) => p.university === 'PU') && (
            <p className="text-txt-muted text-sm">Pokhara University programs coming soon.</p>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
