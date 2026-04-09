import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Clock, Hash, BookOpen } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { programs } from '../../data/programs'

const TYPE_COLORS = {
  core: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  elective: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  lab: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  project: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

export default function EngineeringSemester() {
  const { universityId, courseId, semesterNum } = useParams()
  const semNum = parseInt(semesterNum, 10)
  const engineering = programs.find((c) => c.id === 'engineering')
  const uni = engineering?.programs?.find((u) => u.id === universityId)
  const course = uni?.courses?.find((c) => c.id === courseId)
  const semester = course?.semesters?.find((s) => s.number === semNum)

  if (!uni || !course || !semester) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-txt-primary mb-2">Semester not found</h1>
          <Link to={`/engineering/${universityId}/${courseId}`} className="text-red-600 hover:underline">← Back</Link>
        </div>
      </PageWrapper>
    )
  }

  const totalCredits = semester.subjects?.reduce((s, subj) => s + (subj.creditHours ?? 0), 0) ?? 0
  const prevSem = semNum > 1 ? semNum - 1 : null
  const nextSem = semNum < (course.semesters?.length ?? 8) ? semNum + 1 : null

  return (
    <PageWrapper>
      <Helmet>
        <title>
          {course.name} Semester {semNum} — {uni.shortName} | SyllabusNepal
        </title>
        <meta
          name="description"
          content={`${course.name} Semester ${semNum} subjects at ${uni.name}. ${semester.subjects?.length} subjects with credit hours.`}
        />
      </Helmet>

      {/* Hero */}
      <div
        className="text-white py-12 px-4 md:px-8"
        style={{ background: `linear-gradient(135deg, ${uni.color}ee, ${uni.color}77)` }}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            to={`/engineering/${universityId}/${courseId}`}
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={15} /> {course.name}
          </Link>
          <p className="text-white/70 text-xs mb-1">{uni.name} · {course.code}</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">
            Semester {semNum}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mt-2">
            <span className="flex items-center gap-1"><BookOpen size={14} /> {semester.subjects?.length} Subjects</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {totalCredits} Credit Hours</span>
          </div>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Engineering', path: '/engineering' },
          { label: uni.shortName, path: `/engineering/${universityId}` },
          { label: course.name, path: `/engineering/${universityId}/${courseId}` },
          { label: `Semester ${semNum}`, color: uni.color },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        {/* Semester navigation */}
        <div className="flex items-center justify-between mb-8">
          {prevSem ? (
            <Link
              to={`/engineering/${universityId}/${courseId}/semester/${prevSem}`}
              className="flex items-center gap-1 text-sm font-medium hover:underline"
              style={{ color: uni.color }}
            >
              <ArrowLeft size={15} /> Semester {prevSem}
            </Link>
          ) : <div />}
          {nextSem && (
            <Link
              to={`/engineering/${universityId}/${courseId}/semester/${nextSem}`}
              className="flex items-center gap-1 text-sm font-medium hover:underline"
              style={{ color: uni.color }}
            >
              Semester {nextSem} →
            </Link>
          )}
        </div>

        {/* Subject list */}
        <div className="space-y-3">
          {semester.subjects?.map((subj, i) => (
            <div
              key={subj.id}
              className="flex items-center gap-4 bg-card border border-border-light rounded-xl p-4 hover:border-current hover:shadow-sm transition-all"
            >
              {/* Index */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: uni.color }}
              >
                {i + 1}
              </div>

              {/* Subject info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-txt-primary text-sm md:text-base leading-tight">
                  {subj.name}
                </h3>
                {subj.code && (
                  <p className="text-xs text-txt-secondary mt-0.5">{subj.code}</p>
                )}
              </div>

              {/* Type badge */}
              {subj.type && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium hidden sm:block ${
                    TYPE_COLORS[subj.type] ?? 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {subj.type}
                </span>
              )}

              {/* Credit hours */}
              {subj.creditHours != null && (
                <div className="flex items-center gap-1 text-sm text-txt-secondary flex-shrink-0">
                  <Hash size={13} />
                  <span className="font-medium">{subj.creditHours} Cr</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary card */}
        <div
          className="mt-8 rounded-2xl p-5 text-white"
          style={{ backgroundColor: uni.color }}
        >
          <h3 className="font-semibold mb-3">Semester {semNum} Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="opacity-70 text-xs mb-1">Total Subjects</p>
              <p className="font-bold text-lg">{semester.subjects?.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="opacity-70 text-xs mb-1">Total Credit Hours</p>
              <p className="font-bold text-lg">{totalCredits}</p>
            </div>
          </div>
        </div>

        {/* Quick jump to other semesters */}
        <div className="mt-8">
          <h3 className="font-display text-sm font-semibold text-txt-secondary mb-3 uppercase tracking-wider">
            Other Semesters
          </h3>
          <div className="flex flex-wrap gap-2">
            {course.semesters?.map((sem) => (
              <Link
                key={sem.number}
                to={`/engineering/${universityId}/${courseId}/semester/${sem.number}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  sem.number === semNum
                    ? 'text-white border-transparent'
                    : 'bg-card border-border-light text-txt-secondary hover:border-current'
                }`}
                style={sem.number === semNum ? { backgroundColor: uni.color, borderColor: uni.color } : {}}
              >
                Sem {sem.number}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
