import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'
import { programs as categoriesData } from '../data/programs'

export default function Compare() {
  const allPrograms = categoriesData.flatMap((cat) =>
    (cat.programs || []).map((p) => ({ ...p, category: cat.name }))
  )

  const [leftId, setLeftId] = useState('')
  const [rightId, setRightId] = useState('')

  const left = allPrograms.find((p) => p.id === leftId)
  const right = allPrograms.find((p) => p.id === rightId)

  return (
    <PageWrapper>
      <Helmet>
        <title>Compare Programs | SyllabusNepal</title>
      </Helmet>

      <Breadcrumb items={[{ label: 'Compare', color: '#8B5CF6' }]} />

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <h1 className="font-display text-2xl font-bold text-txt-primary mb-6 flex items-center gap-2">
          <ArrowLeftRight size={24} className="text-violet-500" />
          Compare Programs
        </h1>

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm text-txt-muted mb-1">Program A</label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border-light bg-card text-txt-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a program</option>
              {allPrograms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-txt-muted mb-1">Program B</label>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border-light bg-card text-txt-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a program</option>
              {allPrograms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison table */}
        {left && right ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border-light rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left px-4 py-3 font-semibold text-txt-primary">Attribute</th>
                  <th className="text-center px-4 py-3 font-semibold text-txt-primary">{left.name}</th>
                  <th className="text-center px-4 py-3 font-semibold text-txt-primary">{right.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border-light">
                  <td className="px-4 py-3 text-txt-muted">Category</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{left.category}</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{right.category}</td>
                </tr>
                <tr className="border-t border-border-light bg-surface/50">
                  <td className="px-4 py-3 text-txt-muted">Subjects</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{left.subjects?.length || '-'}</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{right.subjects?.length || '-'}</td>
                </tr>
                <tr className="border-t border-border-light">
                  <td className="px-4 py-3 text-txt-muted">Total Marks</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{left.examFormat?.totalMarks || left.totalMarks || '-'}</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{right.examFormat?.totalMarks || right.totalMarks || '-'}</td>
                </tr>
                <tr className="border-t border-border-light bg-surface/50">
                  <td className="px-4 py-3 text-txt-muted">Duration</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{left.examFormat?.duration || left.duration || '-'}</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{right.examFormat?.duration || right.duration || '-'}</td>
                </tr>
                <tr className="border-t border-border-light">
                  <td className="px-4 py-3 text-txt-muted">Conducting Body</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{left.conductingBody || '-'}</td>
                  <td className="text-center px-4 py-3 text-txt-primary">{right.conductingBody || '-'}</td>
                </tr>
                <tr className="border-t border-border-light bg-surface/50">
                  <td className="px-4 py-3 text-txt-muted">Subject List</td>
                  <td className="px-4 py-3 text-txt-secondary text-xs">
                    {left.subjects?.map((s) => s.name).join(', ') || '-'}
                  </td>
                  <td className="px-4 py-3 text-txt-secondary text-xs">
                    {right.subjects?.map((s) => s.name).join(', ') || '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-txt-muted">
            <ArrowLeftRight size={48} className="mx-auto mb-4 opacity-30" />
            <p>Select two programs to compare</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
