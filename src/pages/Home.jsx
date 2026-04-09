import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/layout/PageWrapper'
import HeroSection from '../components/sections/HeroSection'
import CategoryGrid from '../components/sections/CategoryGrid'
import RecentlyViewed from '../components/sections/RecentlyViewed'
import ExamCountdown from '../components/sections/ExamCountdown'

export default function Home({ onSearchOpen }) {
  return (
    <PageWrapper>
      <Helmet>
        <title>SyllabusNepal — Nepal's Complete Academic Syllabus Platform</title>
        <meta name="description" content="Nepal's most complete academic syllabus platform. SEE, NEB, Bachelor programs, Entrance exams, and Competitive exam syllabi — all in one place." />
      </Helmet>

      <HeroSection onSearchOpen={onSearchOpen} />
      <ExamCountdown />
      <CategoryGrid />
      <RecentlyViewed />

      {/* Quick access section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickCard
            title="School Level"
            desc="SEE, Class 9, BLE — Complete syllabus with chapter-wise topics"
            color="#059669"
            path="/school"
          />
          <QuickCard
            title="High School (NEB)"
            desc="Grade 11 & 12 — Science, Management, Humanities & Law streams"
            color="#D97706"
            path="/school"
          />
          <QuickCard
            title="Engineering Programs"
            desc="TU, KU, PU & Purbanchal — All semesters, all subjects"
            color="#DC2626"
            path="/engineering"
          />
          <QuickCard
            title="Entrance Exams"
            desc="IOE, CEE, CSIT, KUCAT, CMAT, PU — Exam formats and syllabi"
            color="#7C3AED"
            path="/entrance"
          />
          <QuickCard
            title="Bachelor Programs"
            desc="BBS, BBA, BCA, BSc CSIT, BSc — Semester-wise subjects"
            color="#2563EB"
            path="/bachelor"
          />
          <QuickCard
            title="Competitive Exams"
            desc="Loksewa, Banking, TSC — Complete preparation guides"
            color="#92400E"
            path="/competitive"
          />
        </div>
      </section>
    </PageWrapper>
  )
}

function QuickCard({ title, desc, color, path }) {
  return (
    <a
      href={path}
      className="block p-6 rounded-xl border border-border-light bg-card hover:shadow-md hover:-translate-y-1 transition-all duration-200"
      style={{ borderTopColor: color, borderTopWidth: '3px' }}
    >
      <h3 className="font-display text-lg font-semibold text-txt-primary mb-2">{title}</h3>
      <p className="text-sm text-txt-muted">{desc}</p>
    </a>
  )
}
