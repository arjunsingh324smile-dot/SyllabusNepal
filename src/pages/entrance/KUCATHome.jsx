import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Target, Calculator, Atom, FlaskConical, Languages } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { programs } from '../../data/programs'

const SUBJECT_ICONS = {
  mathematics: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  english: Languages,
}

const SUBJECT_COLORS = {
  mathematics: '#2563EB',
  physics: '#7C3AED',
  chemistry: '#059669',
  english: '#D97706',
}

const EXAM_INFO = [
  { label: 'Total Marks', value: '100' },
  { label: 'Duration', value: '2 Hours' },
  { label: 'Format', value: 'CBT (Computer-Based)' },
  { label: 'Question Type', value: 'MCQ' },
  { label: 'Negative Marking', value: 'No' },
  { label: 'Eligibility', value: 'NEB Grade 12 Science' },
]

const KUCAT_CHAPTERS = {
  mathematics: [
    { name: 'Sets, Logic & Real Numbers', weightage: '5-6 marks', topics: ['Sets and Venn Diagrams', 'Logic Statements', 'Real Number System'] },
    { name: 'Algebra', weightage: '8-10 marks', topics: ['Polynomials & Factoring', 'Quadratic Equations', 'Sequence & Series', 'Binomial Theorem'] },
    { name: 'Trigonometry', weightage: '6-8 marks', topics: ['Trigonometric Ratios', 'Multiple Angles', 'Inverse Trigonometry'] },
    { name: 'Coordinate Geometry', weightage: '6-8 marks', topics: ['Straight Lines', 'Circles', 'Parabola & Conics'] },
    { name: 'Calculus', weightage: '8-10 marks', topics: ['Limits & Continuity', 'Differentiation', 'Integration', 'Differential Equations'] },
    { name: 'Vectors & 3D Geometry', weightage: '4-6 marks', topics: ['Vectors', 'Dot & Cross Products', '3D Coordinates'] },
    { name: 'Statistics & Probability', weightage: '4-5 marks', topics: ['Probability', 'Binomial Distribution', 'Normal Distribution'] },
  ],
  physics: [
    { name: 'Mechanics', weightage: '6-8 marks', topics: ['Newton\'s Laws', 'Work, Energy & Power', 'Circular Motion', 'Gravitation'] },
    { name: 'Waves & Optics', weightage: '5-6 marks', topics: ['Wave Motion', 'Reflection & Refraction', 'Interference & Diffraction'] },
    { name: 'Heat & Thermodynamics', weightage: '4-5 marks', topics: ['Thermal Expansion', 'Gas Laws', 'Laws of Thermodynamics'] },
    { name: 'Electricity & Magnetism', weightage: '6-8 marks', topics: ['Coulomb\'s Law', 'Capacitance', 'Ohm\'s Law', 'Electromagnetic Induction'] },
    { name: 'Modern Physics', weightage: '5-6 marks', topics: ['Photoelectric Effect', 'Bohr\'s Model', 'Nuclear Physics'] },
  ],
  chemistry: [
    { name: 'Inorganic Chemistry', weightage: '6-8 marks', topics: ['Periodic Table', 'Chemical Bonding', 'Coordination Compounds', 'Metals & Non-metals'] },
    { name: 'Organic Chemistry', weightage: '8-10 marks', topics: ['Hydrocarbons', 'Alcohols & Ethers', 'Aldehydes & Ketones', 'Carboxylic Acids', 'Amines'] },
    { name: 'Physical Chemistry', weightage: '4-6 marks', topics: ['Chemical Equilibrium', 'Chemical Kinetics', 'Electrochemistry', 'Thermodynamics'] },
  ],
  english: [
    { name: 'Reading Comprehension', weightage: '3-4 marks', topics: ['Unseen Passage', 'Inference Questions', 'Vocabulary in Context'] },
    { name: 'Grammar', weightage: '3-4 marks', topics: ['Tenses', 'Active/Passive Voice', 'Articles & Prepositions'] },
    { name: 'Vocabulary', weightage: '2-3 marks', topics: ['Synonyms & Antonyms', 'Analogy', 'Word Usage'] },
  ],
}

export default function KUCATHome() {
  const entrance = programs.find((c) => c.id === 'entrance')
  const kucat = entrance?.programs?.find((p) => p.id === 'kucat')
  const [activeSubject, setActiveSubject] = useState('mathematics')

  const activeSubjectData = kucat?.subjects?.find((s) => s.id === activeSubject)
  const chapters = KUCAT_CHAPTERS[activeSubject] ?? []

  return (
    <PageWrapper>
      <Helmet>
        <title>KUCAT-CBT Entrance Exam Syllabus | SyllabusNepal</title>
        <meta
          name="description"
          content="KUCAT-CBT complete syllabus — Mathematics (40), Physics (30), Chemistry (20), English (10). Kathmandu University entrance exam preparation."
        />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/entrance" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={15} /> Entrance Exams
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-black text-lg flex-shrink-0">
              KU
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">KUCAT-CBT</h1>
              <p className="text-blue-200 text-sm">Kathmandu University Common Admission Test (Computer-Based)</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-5 text-sm">
            {EXAM_INFO.map((info) => (
              <div key={info.label} className="flex gap-1">
                <span className="text-blue-300">{info.label}:</span>
                <span className="font-semibold">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Entrance', path: '/entrance' },
          { label: 'KUCAT-CBT', color: '#1D4ED8' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Mark distribution */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {kucat?.subjects?.map((subj) => {
            const Icon = SUBJECT_ICONS[subj.id] ?? BookOpen
            const color = SUBJECT_COLORS[subj.id] ?? '#1D4ED8'
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

        {/* Subject tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border-light pb-4">
          {kucat?.subjects?.map((subj) => {
            const color = SUBJECT_COLORS[subj.id] ?? '#1D4ED8'
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

        {/* Chapters */}
        <div className="space-y-3">
          {chapters.map((ch, i) => {
            const color = SUBJECT_COLORS[activeSubject] ?? '#1D4ED8'
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

        {/* Preparation tips */}
        <div className="mt-10 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
            <Target size={18} /> KUCAT-CBT Preparation Strategy
          </h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
            <li>• <strong>Mathematics (40 marks):</strong> Highest weightage — focus on Calculus, Algebra, Coordinate Geometry. Practice 50+ problems per chapter.</li>
            <li>• <strong>Physics (30 marks):</strong> Mechanics and Electricity/Magnetism are most tested. Understand derivations, not just formulas.</li>
            <li>• <strong>Chemistry (20 marks):</strong> Organic Chemistry has highest marks — memorize reaction mechanisms and named reactions.</li>
            <li>• <strong>English (10 marks):</strong> Quick wins — grammar rules and vocabulary. Spend less time here, secure the 10 marks reliably.</li>
            <li>• Practice previous 5 years' KU entrance papers. CBT format means time management is critical.</li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  )
}
