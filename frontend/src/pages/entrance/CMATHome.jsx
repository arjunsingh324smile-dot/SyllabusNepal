import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Languages, Calculator, Brain, Globe, Target } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { programs } from '../../data/programs'

const SUBJECT_ICONS = {
  'verbal-ability': Languages,
  'quantitative-ability': Calculator,
  'logical-reasoning': Brain,
  'general-awareness': Globe,
}

const SUBJECT_COLORS = {
  'verbal-ability': '#059669',
  'quantitative-ability': '#2563EB',
  'logical-reasoning': '#7C3AED',
  'general-awareness': '#D97706',
}

const EXAM_INFO = [
  { label: 'Total Marks', value: '100' },
  { label: 'Duration', value: '3 Hours' },
  { label: 'Format', value: 'Written + MCQ' },
  { label: 'Negative Marking', value: 'No' },
  { label: 'Eligibility', value: "Bachelor's Degree (any)" },
  { label: 'For Programs', value: 'MBS / MBA' },
]

const CMAT_CHAPTERS = {
  'verbal-ability': [
    { name: 'Vocabulary', weightage: '8-10 marks', topics: ['Synonyms & Antonyms', 'Word Analogies', 'Fill in the Blanks', 'Idioms & Phrases'] },
    { name: 'Reading Comprehension', weightage: '8-10 marks', topics: ['Unseen Passage', 'Inference Questions', 'Author\'s Tone', 'Title Selection'] },
    { name: 'Grammar & Usage', weightage: '5-7 marks', topics: ['Sentence Correction', 'Error Spotting', 'Active/Passive Voice', 'Sentence Completion'] },
  ],
  'quantitative-ability': [
    { name: 'Arithmetic', weightage: '8-10 marks', topics: ['Percentages', 'Profit & Loss', 'Ratio & Proportion', 'Time-Speed-Distance', 'Work & Time'] },
    { name: 'Algebra', weightage: '5-6 marks', topics: ['Linear Equations', 'Quadratic Equations', 'Inequalities'] },
    { name: 'Data Interpretation', weightage: '6-8 marks', topics: ['Bar Graphs', 'Pie Charts', 'Line Graphs', 'Tables'] },
    { name: 'Geometry & Mensuration', weightage: '4-5 marks', topics: ['Areas & Perimeters', 'Volumes', 'Coordinate Geometry'] },
  ],
  'logical-reasoning': [
    { name: 'Verbal Reasoning', weightage: '8-10 marks', topics: ['Syllogisms', 'Blood Relations', 'Direction Sense', 'Coding-Decoding'] },
    { name: 'Non-Verbal Reasoning', weightage: '8-10 marks', topics: ['Pattern Completion', 'Series Completion', 'Mirror Images', 'Embedded Figures'] },
    { name: 'Analytical Reasoning', weightage: '5-7 marks', topics: ['Statement & Assumptions', 'Cause & Effect', 'Logical Deduction'] },
  ],
  'general-awareness': [
    { name: 'Nepal Current Affairs', weightage: '8-10 marks', topics: ['Government & Politics', 'Economic Indicators', 'Social Development', 'Awards & Recognition'] },
    { name: 'Business & Economy', weightage: '8-10 marks', topics: ['Banking & Finance', 'Business Concepts', 'Nepal Economy', 'International Trade'] },
    { name: 'General Knowledge', weightage: '5-7 marks', topics: ['History of Nepal', 'Geography', 'Constitution & Law', 'Science & Technology'] },
  ],
}

export default function CMATHome() {
  const entrance = programs.find((c) => c.id === 'entrance')
  const cmat = entrance?.programs?.find((p) => p.id === 'cmat')
  const [activeSubject, setActiveSubject] = useState('verbal-ability')

  const chapters = CMAT_CHAPTERS[activeSubject] ?? []

  return (
    <PageWrapper>
      <Helmet>
        <title>CMAT Entrance Exam Syllabus | SyllabusNepal</title>
        <meta
          name="description"
          content="CMAT (Common Management Admission Test) complete syllabus — Verbal Ability, Quantitative Ability, Logical Reasoning, General Awareness. For MBS/MBA in Nepal."
        />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/entrance" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={15} /> Entrance Exams
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-black text-lg flex-shrink-0">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">CMAT</h1>
              <p className="text-teal-200 text-sm">Common Management Admission Test — MBS / MBA Entrance</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-5 text-sm">
            {EXAM_INFO.map((info) => (
              <div key={info.label} className="flex gap-1">
                <span className="text-teal-300">{info.label}:</span>
                <span className="font-semibold">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'CMAT', color: '#0D9488' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Mark distribution */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {cmat?.subjects?.map((subj) => {
            const Icon = SUBJECT_ICONS[subj.id] ?? Brain
            const color = SUBJECT_COLORS[subj.id] ?? '#0D9488'
            return (
              <div
                key={subj.id}
                className="bg-card border border-border-light rounded-xl p-4 text-center"
              >
                <div
                  className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-white"
                  style={{ backgroundColor: color }}
                >
                  <Icon size={18} />
                </div>
                <p className="font-semibold text-txt-primary text-sm">{subj.name}</p>
                <p className="text-2xl font-black mt-1" style={{ color }}>{subj.marks}</p>
                <p className="text-xs text-txt-secondary">marks</p>
              </div>
            )
          })}
        </div>

        {/* Subject Tabs + Chapters */}
        <h2 className="font-display text-xl font-bold text-txt-primary mb-4">Chapter-wise Syllabus</h2>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-border-light pb-4">
          {cmat?.subjects?.map((subj) => {
            const color = SUBJECT_COLORS[subj.id] ?? '#0D9488'
            const isActive = activeSubject === subj.id
            return (
              <button
                key={subj.id}
                onClick={() => setActiveSubject(subj.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                  isActive ? 'text-white' : 'bg-card text-txt-secondary border-border-light'
                }`}
                style={isActive ? { backgroundColor: color, borderColor: color } : {}}
              >
                {subj.name}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  {subj.marks}m
                </span>
              </button>
            )
          })}
        </div>

        <div className="space-y-3">
          {chapters.map((ch, i) => {
            const color = SUBJECT_COLORS[activeSubject] ?? '#0D9488'
            return (
              <div key={i} className="bg-card border border-border-light rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-txt-primary text-sm">{ch.name}</h3>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {ch.weightage}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-10">
                  {ch.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-txt-secondary"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Score Interpretation & Prep tips */}
        <div className="mt-10 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
            <Target size={18} /> CMAT Preparation Strategy
          </h3>
          <ul className="space-y-2 text-sm text-teal-700 dark:text-teal-400">
            <li>• <strong>Verbal Ability (25):</strong> Read English newspapers daily. Focus on vocabulary building and comprehension speed.</li>
            <li>• <strong>Quantitative (25):</strong> Practice mental math. Data Interpretation requires chart-reading speed — practice 10 DI sets per day.</li>
            <li>• <strong>Logical Reasoning (25):</strong> Most trainable section. Solve 20 questions daily from syllogisms and pattern recognition.</li>
            <li>• <strong>General Awareness (25):</strong> Follow Nepal's major economic and political events. Read NRB reports and budget summaries.</li>
            <li>• Target 3 hours total — allocate ~45 minutes per section. Practice with timed mock tests.</li>
          </ul>
        </div>

        {/* Score interpretation */}
        <div className="mt-6 bg-card border border-border-light rounded-2xl p-6">
          <h3 className="font-semibold text-txt-primary mb-4">Score Interpretation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              { range: '80–100', label: 'Excellent', desc: 'Top tier — scholarship eligible', color: '#059669' },
              { range: '65–79', label: 'Good', desc: 'Strong candidate for MBS', color: '#2563EB' },
              { range: '50–64', label: 'Average', desc: 'Eligible for most programs', color: '#D97706' },
              { range: '< 50', label: 'Below Average', desc: 'Retake recommended', color: '#DC2626' },
            ].map((item) => (
              <div key={item.range} className="border border-border-light rounded-xl p-3 text-center">
                <p className="text-lg font-black mb-1" style={{ color: item.color }}>{item.range}</p>
                <p className="font-semibold text-txt-primary text-xs mb-0.5">{item.label}</p>
                <p className="text-txt-secondary text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
