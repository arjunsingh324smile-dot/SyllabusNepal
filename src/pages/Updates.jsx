import { Helmet } from 'react-helmet-async'
import { Bell, Calendar, BookOpen, AlertCircle, Star } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'
import updatesData from '../data/updates.json'

const iconMap = {
  syllabus: BookOpen,
  exam: Calendar,
  notice: AlertCircle,
  feature: Star,
  default: Bell,
}

export default function Updates() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Syllabus Updates | SyllabusNepal</title>
        <meta name="description" content="Latest syllabus updates and exam notifications for Nepal education — SEE, NEB, IOE, CEE, CSIT, and more." />
      </Helmet>

      <Breadcrumb items={[{ label: 'Updates', color: '#6366F1' }]} />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <h1 className="font-display text-2xl font-bold text-txt-primary mb-8 flex items-center gap-2">
          <Bell size={24} className="text-indigo-500" />
          Syllabus Updates
        </h1>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border-light" />

          {updatesData.map((update, i) => {
            const Icon = iconMap[update.type] || iconMap.default
            return (
              <div key={i} className="relative pl-14 pb-8 last:pb-0">
                <div
                  className="absolute left-3 top-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: update.color || '#6366F1' }}
                >
                  <Icon size={12} className="text-white" />
                </div>
                <div className="bg-card rounded-xl border border-border-light p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-surface text-txt-muted">
                      {update.year}
                    </span>
                    {update.program && (
                      <span className="text-xs px-2 py-0.5 rounded bg-surface text-txt-muted">
                        {update.program}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-txt-primary">{update.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PageWrapper>
  )
}
