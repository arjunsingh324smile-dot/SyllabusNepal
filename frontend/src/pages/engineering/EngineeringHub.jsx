import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Building2, ChevronRight, BookOpen, GraduationCap } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { programs } from '../../data/programs'

export default function EngineeringHub() {
  const engineering = programs.find((c) => c.id === 'engineering')
  const universities = engineering?.programs ?? []

  return (
    <PageWrapper>
      <Helmet>
        <title>Engineering Programs Nepal | TU, KU, PU | SyllabusNepal</title>
        <meta
          name="description"
          content="Engineering programs for Tribhuvan University (TU/IOE), Kathmandu University (KU), and Pokhara University (PU). Computer, Civil, Electrical, Mechanical, EEE — semester-wise subjects."
        />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Building2 size={32} className="opacity-80" />
            <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Engineering Programs</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Engineering Colleges Nepal
          </h1>
          <p className="text-red-200 max-w-xl">
            TU (IOE), KU, and PU — select your university, then course, then semester to view subjects.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/80">
            <span>3 Universities</span>
            <span>·</span>
            <span>5 Engineering Courses each</span>
            <span>·</span>
            <span>8 Semesters</span>
          </div>
        </div>
      </div>

      <Breadcrumb
        items={[{ label: 'Engineering', color: '#DC2626' }]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="font-display text-2xl font-bold text-txt-primary mb-2">
          Select University
        </h2>
        <p className="text-txt-secondary text-sm mb-8">
          Choose a university to explore engineering courses and semester-wise subjects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <Link
              key={uni.id}
              to={`/engineering/${uni.id}`}
              className="group block bg-card border border-border-light rounded-2xl p-6 hover:border-red-400 hover:shadow-lg transition-all duration-200"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: uni.color }}
              >
                {uni.shortName}
              </div>
              <h3 className="font-display text-lg font-semibold text-txt-primary mb-1 group-hover:text-red-600 transition-colors">
                {uni.name}
              </h3>
              <p className="text-txt-secondary text-sm mb-3">{uni.location}</p>

              <div className="flex items-center gap-4 text-sm text-txt-secondary mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {uni.courses?.length} Courses
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} />
                  8 Semesters each
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {uni.courses?.map((c) => (
                  <span
                    key={c.id}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-txt-secondary"
                  >
                    {c.code}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-semibold"
                  style={{ color: uni.color }}
                >
                  Explore Courses
                </span>
                <ChevronRight
                  size={18}
                  className="text-txt-secondary group-hover:translate-x-1 transition-transform"
                  style={{ color: uni.color }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Info section */}
        <div className="mt-12 bg-card border border-border-light rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-txt-primary mb-3">How to Navigate Engineering Syllabus</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              { step: '1', label: 'Select University', desc: 'TU/IOE, KU, or PU' },
              { step: '2', label: 'Select Course', desc: 'Computer, Civil, Electrical, Mechanical, EEE' },
              { step: '3', label: 'Select Semester', desc: 'Semester 1 through 8' },
              { step: '4', label: 'View Subjects', desc: 'Subject name, code, credit hours' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center mb-2">
                  {item.step}
                </div>
                <p className="font-semibold text-txt-primary mb-1">{item.label}</p>
                <p className="text-txt-secondary text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
