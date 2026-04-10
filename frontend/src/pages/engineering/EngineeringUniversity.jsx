import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ChevronRight, ArrowLeft, Clock, Hash } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { programs } from '../../data/programs'

export default function EngineeringUniversity() {
  const { universityId } = useParams()
  const engineering = programs.find((c) => c.id === 'engineering')
  const uni = engineering?.programs?.find((u) => u.id === universityId)

  if (!uni) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-txt-primary mb-2">University not found</h1>
          <Link to="/engineering" className="text-red-600 hover:underline">← Back to Engineering</Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>{uni.shortName} Engineering Courses | SyllabusNepal</title>
        <meta
          name="description"
          content={`${uni.name} engineering courses — Computer, Civil, Electrical, Mechanical, EEE. Semester-wise syllabus.`}
        />
      </Helmet>

      {/* Hero */}
      <div
        className="text-white py-12 px-4 md:px-8"
        style={{ background: `linear-gradient(135deg, ${uni.color}ee, ${uni.color}99)` }}
      >
        <div className="max-w-7xl mx-auto">
          <Link to="/engineering" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={15} /> Back to Universities
          </Link>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-black">
              {uni.shortName}
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">{uni.name}</h1>
              <p className="text-white/70 text-sm mt-0.5">{uni.location}</p>
            </div>
          </div>
          <p className="text-white/80 text-sm">
            {uni.courses?.length} Engineering Programs · 8 Semesters each · 4 Year BE Degree
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Engineering', path: '/engineering' },
          { label: uni.shortName, color: uni.color },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="font-display text-2xl font-bold text-txt-primary mb-2">
          Select Engineering Course
        </h2>
        <p className="text-txt-secondary text-sm mb-8">
          Choose a course to view semester-wise subjects.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {uni.courses?.map((course, i) => {
            const totalSubjects = course.semesters?.reduce((sum, sem) => sum + (sem.subjects?.length ?? 0), 0) ?? 0
            return (
              <Link
                key={course.id}
                to={`/engineering/${universityId}/${course.id}`}
                className="group block bg-card border border-border-light rounded-2xl p-5 hover:border-current hover:shadow-md transition-all duration-200"
                style={{ '--uni-color': uni.color }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: uni.color }}
                >
                  {i + 1}
                </div>

                <h3 className="font-display text-base font-semibold text-txt-primary mb-1 group-hover:text-current transition-colors"
                  style={{ color: undefined }}
                >
                  <span className="group-hover:text-red-600 transition-colors">{course.name}</span>
                </h3>
                <p className="text-txt-secondary text-xs mb-3">{course.code} · {course.duration}</p>

                <div className="flex items-center gap-3 text-xs text-txt-secondary mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {course.semesters?.length} Semesters
                  </span>
                  <span className="flex items-center gap-1">
                    <Hash size={12} />
                    {totalSubjects} Subjects total
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border-light">
                  <span className="text-xs font-semibold" style={{ color: uni.color }}>
                    View Semesters
                  </span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: uni.color }} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </PageWrapper>
  )
}
