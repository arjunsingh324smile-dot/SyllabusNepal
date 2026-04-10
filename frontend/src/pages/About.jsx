import { Helmet } from 'react-helmet-async'
import { BookOpen, Users, Globe, Heart } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'

export default function About() {
  return (
    <PageWrapper>
      <Helmet>
        <title>About SyllabusNepal | Nepal's Complete Syllabus Platform</title>
        <meta name="description" content="SyllabusNepal is Nepal's comprehensive free educational syllabus platform — covering SEE, NEB, IOE, CEE, CSIT, bachelor programs, and competitive exams." />
      </Helmet>

      <Breadcrumb items={[{ label: 'About', color: '#6366F1' }]} />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-txt-primary mb-4">About SyllabusNepal</h1>

        <p className="text-txt-secondary mb-8 leading-relaxed">
          SyllabusNepal is Nepal&apos;s most comprehensive educational syllabus platform, providing
          detailed, chapter-wise syllabuses for every major exam and program — from SEE and NEB to
          IOE, CEE, CSIT entrance exams, bachelor programs, and competitive exams like Loksewa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-card rounded-xl border border-border-light p-5">
            <BookOpen size={24} className="text-accent mb-3" />
            <h3 className="font-display font-semibold text-txt-primary mb-1">Complete Coverage</h3>
            <p className="text-sm text-txt-muted">
              Every subject, chapter, and topic with weightage, difficulty ratings, exam tips, and formulas.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border-light p-5">
            <Users size={24} className="text-emerald-500 mb-3" />
            <h3 className="font-display font-semibold text-txt-primary mb-1">For Everyone</h3>
            <p className="text-sm text-txt-muted">
              Students, teachers, and parents — accessible tools for exam preparation and learning.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border-light p-5">
            <Globe size={24} className="text-blue-500 mb-3" />
            <h3 className="font-display font-semibold text-txt-primary mb-1">100% Free</h3>
            <p className="text-sm text-txt-muted">
              All content is free and accessible — no login, no paywall, no ads.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border-light p-5">
            <Heart size={24} className="text-red-500 mb-3" />
            <h3 className="font-display font-semibold text-txt-primary mb-1">Made in Nepal</h3>
            <p className="text-sm text-txt-muted">
              Built with love for Nepali students, by Nepali developers.
            </p>
          </div>
        </div>

        <h2 className="font-display text-xl font-semibold text-txt-primary mb-3">Contact</h2>
        <p className="text-txt-secondary text-sm">
          Have suggestions or found an error?{' '}
          <a
            href="mailto:contact@syllabusnepal.com"
            className="text-accent hover:underline"
          >
            contact@syllabusnepal.com
          </a>
        </p>
      </div>
    </PageWrapper>
  )
}
