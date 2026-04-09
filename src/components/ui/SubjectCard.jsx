import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calculator, FlaskConical, Languages, BookOpen, Globe, Monitor,
  Atom, Heart, Briefcase, BarChart3, Users, Landmark, Brain,
  Cpu, Database, Network, FileCode, Binary, Banknote, Pill, Microscope, PenTool, Shield, Scale, Box
} from 'lucide-react'
import ProgressBar from './ProgressBar'

const iconMap = {
  Calculator, FlaskConical, Languages, BookOpen, Globe, Monitor,
  Atom, Heart, Briefcase, BarChart3, Users, Landmark, Brain,
  Cpu, Database, Network, FileCode, Binary, Banknote, Pill, Microscope, PenTool, Shield, Scale, Box
}

export default function SubjectCard({ subject, programColor, basePath, index = 0, progress }) {
  const Icon = iconMap[subject.icon] || BookOpen
  const color = programColor || '#2563EB'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`${basePath}/${subject.id}`}
        className="group block bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}12` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-txt-primary text-sm group-hover:underline decoration-1 underline-offset-4 mb-1">
              {subject.name}
            </h3>
            <div className="flex items-center gap-3 text-xs text-txt-muted">
              {subject.chapters && (
                <span>{subject.chapters} Chapters</span>
              )}
              {subject.topics && (
                <span>{subject.topics} Topics</span>
              )}
              {subject.marks && (
                <span className="font-medium" style={{ color }}>
                  {subject.marks} marks
                </span>
              )}
            </div>
          </div>
        </div>

        {progress !== undefined && progress > 0 && (
          <div className="mt-3">
            <ProgressBar percent={progress} color={color} size="sm" />
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          {subject.difficulty && (
            <span className="text-xs text-txt-muted capitalize">{subject.difficulty}</span>
          )}
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color }}>
            View →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
