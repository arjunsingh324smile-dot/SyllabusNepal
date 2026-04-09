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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickCard
            title="Entrance Exams"
            desc="IOE, CEE, CSIT — Complete syllabus with year-wise trends and exam tips"
            color="#7C3AED"
            path="/entrance"
          />
          <QuickCard
            title="Compare Exams"
            desc="Side-by-side comparison of subjects, marks, and preparation strategies"
            color="#0D9488"
            path="/compare"
          />
          <QuickCard
            title="Syllabus Updates"
            desc="Track year-by-year changes across all programs from 2019 to 2025"
            color="#DC2626"
            path="/updates"
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
