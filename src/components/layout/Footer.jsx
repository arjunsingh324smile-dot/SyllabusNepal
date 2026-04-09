import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const footerLinks = [
  {
    title: 'Programs',
    links: [
      { label: 'SEE', path: '/school/see' },
      { label: 'NEB Grade 11', path: '/school/neb/grade-11' },
      { label: 'NEB Grade 12', path: '/school/neb/grade-12' },
      { label: 'Bachelor Programs', path: '/bachelor' },
    ],
  },
  {
    title: 'Entrance Exams',
    links: [
      { label: 'IOE Entrance', path: '/entrance/ioe' },
      { label: 'CEE Medical', path: '/entrance/cee' },
      { label: 'CSIT Entrance', path: '/entrance/csit' },
      { label: 'PU Entrance', path: '/entrance/pu' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Compare Exams', path: '/compare' },
      { label: 'Updates', path: '/updates' },
      { label: 'Suggest a Program', path: '/suggest-program' },
      { label: 'About', path: '/about' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border-light mt-16 pb-20 lg:pb-0" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-xl font-display font-bold text-txt-primary">
              Syllabus<span className="text-accent-blue">Nepal</span> 🇳🇵
            </Link>
            <p className="text-sm text-txt-muted mt-3 leading-relaxed">
              Nepal's most complete academic syllabus platform. From SEE to
              competitive exams — study smarter, not harder.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-body font-semibold text-txt-primary text-sm mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-txt-muted hover:text-txt-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-txt-muted">
            © {new Date().getFullYear()} SyllabusNepal. All rights reserved.
          </p>
          <p className="text-xs text-txt-muted flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> for Nepali students
          </p>
        </div>
      </div>
    </footer>
  )
}
