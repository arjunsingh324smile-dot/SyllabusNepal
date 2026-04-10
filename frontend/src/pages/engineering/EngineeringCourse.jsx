import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { programs } from '../../data/programs'

const SEMESTER_LABELS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth']

export default function EngineeringCourse() {
  const { universityId, courseId } = useParams()
  const engineering = programs.find((c) => c.id === 'engineering')
  const uni = engineering?.programs?.find((u) => u.id === universityId)
  const course = uni?.courses?.find((c) => c.id === courseId)

  if (!uni || !course) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-txt-primary mb-2">Course not found</h1>
          <Link to={`/engineering/${universityId}`} className="text-red-600 hover:underline">← Back</Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>{course.name} — {uni.shortName} | SyllabusNepal</title>
        <meta
          name="description"
          content={`${course.name} semester-wise subjects at ${uni.name}. All 8 semesters with subject names and credit hours.`}
        />
      </Helmet>

      {/* Hero */}
      <div
        className="text-white py-12 px-4 md:px-8"
        style={{ background: `linear-gradient(135deg, ${uni.color}ee, ${uni.color}88)` }}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            to={`/engineering/${universityId}`}
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={15} /> {uni.shortName} Courses
          </Link>
          <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{uni.name}</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">{course.name}</h1>
          <p className="text-white/80 text-sm">{course.code} · {course.duration}</p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Engineering', path: '/engineering' },
          { label: uni.shortName, path: `/engineering/${universityId}` },
          { label: course.name, color: uni.color },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="font-display text-2xl font-bold text-txt-primary mb-2">
          Select Semester
        </h2>
        <p className="text-txt-secondary text-sm mb-8">
          Click any semester to view the complete list of subjects.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {course.semesters?.map((sem) => (
            <Link
              key={sem.number}
              to={`/engineering/${universityId}/${courseId}/semester/${sem.number}`}
              className="group block bg-card border border-border-light rounded-2xl p-5 hover:shadow-md transition-all duration-200"
              style={{ borderColor: undefined }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = uni.color }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}
            >
              <div
                className="text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base mb-3 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: uni.color }}
              >
                {sem.number}
              </div>
              <p className="text-xs text-txt-secondary mb-0.5 uppercase tracking-wide">
                {SEMESTER_LABELS[sem.number - 1]} Semester
              </p>
              <h3 className="font-semibold text-txt-primary text-sm mb-2">
                Semester {sem.number}
              </h3>
              <div className="flex items-center gap-1 text-xs text-txt-secondary mb-3">
                <BookOpen size={12} />
                {sem.subjects?.length} subjects
              </div>
              <div className="flex flex-wrap gap-1">
                {sem.subjects?.slice(0, 3).map((subj) => (
                  <span
                    key={subj.id}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-txt-secondary truncate max-w-[100px]"
                    title={subj.name}
                  >
                    {subj.name.split(' ').slice(0, 2).join(' ')}
                  </span>
                ))}
                {(sem.subjects?.length ?? 0) > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-txt-secondary">
                    +{(sem.subjects?.length ?? 0) - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-end mt-3 pt-3 border-t border-border-light">
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: uni.color }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
