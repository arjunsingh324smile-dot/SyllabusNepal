import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  School, GraduationCap, ClipboardList, Award, BookOpen,
  Building2, Stethoscope, Briefcase, Monitor, Cpu, Landmark, Banknote
} from 'lucide-react'

const iconMap = {
  School, GraduationCap, ClipboardList, Award, BookOpen,
  Building2, Stethoscope, Briefcase, Monitor, Cpu, Landmark, Banknote
}

export default function ProgramCard({ program, index = 0 }) {
  const Icon = iconMap[program.icon] || BookOpen

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={program.path}
        className="group block bg-card rounded-xl border border-border-light p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
        style={{ borderTopColor: program.color, borderTopWidth: '3px' }}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${program.color}15` }}
          >
            <Icon size={24} style={{ color: program.color }} />
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${program.color}12`,
              color: program.color,
            }}
          >
            {program.count || `${program.subjects?.length || 0} Subjects`}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-txt-primary mb-2 group-hover:underline decoration-2 underline-offset-4"
            style={{ textDecorationColor: program.color }}>
          {program.name}
        </h3>

        <p className="text-sm text-txt-muted line-clamp-2">
          {program.description || program.board || program.conductingBody || program.university || ''}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-txt-muted">
          <span className="inline-flex items-center gap-1 group-hover:text-txt-primary transition-colors"
                style={{ color: program.color }}>
            Explore →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
