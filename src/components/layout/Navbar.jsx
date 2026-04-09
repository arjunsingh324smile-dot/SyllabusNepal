import { useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Bookmark, Moon, Sun, Menu, X,
  GraduationCap, ClipboardList, Award, BookOpen
} from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { useFontStore } from '../../store/fontStore'
import { useBookmarkStore } from '../../store/bookmarkStore'
import { useScrollPosition } from '../../hooks/useScrollPosition'

const navLinks = [
  {
    label: 'Programs',
    path: '/programs',
    icon: BookOpen,
    items: [
      { label: 'SEE', path: '/school/see', color: '#059669' },
      { label: 'NEB Grade 11', path: '/school/neb/grade-11', color: '#D97706' },
      { label: 'NEB Grade 12', path: '/school/neb/grade-12', color: '#EA580C' },
      { label: 'BBS', path: '/bachelor/tu/bbs', color: '#2563EB' },
      { label: 'BCA', path: '/bachelor/tu/bca', color: '#2563EB' },
      { label: 'BSc CSIT', path: '/bachelor/tu/bsc-csit', color: '#0D9488' },
    ],
  },
  {
    label: 'Entrance',
    path: '/entrance',
    icon: ClipboardList,
    items: [
      { label: 'IOE Entrance', path: '/entrance/ioe', color: '#DC2626' },
      { label: 'CEE Medical', path: '/entrance/cee', color: '#7C3AED' },
      { label: 'CSIT Entrance', path: '/entrance/csit', color: '#0D9488' },
      { label: 'PU Entrance', path: '/entrance/pu', color: '#0891B2' },
    ],
  },
  {
    label: 'Competitive',
    path: '/competitive',
    icon: Award,
    items: [
      { label: 'Loksewa — Kharidar', path: '/competitive/loksewa-kharidar', color: '#92400E' },
      { label: 'Banking Exam', path: '/competitive/banking', color: '#1E40AF' },
      { label: 'TSC Primary', path: '/competitive/tsc-primary', color: '#065F46' },
    ],
  },
  { label: 'Updates', path: '/updates', icon: GraduationCap },
]

export default function Navbar({ onSearchOpen }) {
  const { theme, toggleTheme } = useThemeStore()
  const { fontSize, cycleFontSize } = useFontStore()
  const { bookmarks } = useBookmarkStore()
  const { isScrolled } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'py-2 shadow-md backdrop-blur-md bg-card/90 border-b border-border-light'
            : 'py-4 bg-card'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="SyllabusNepal Home">
            <span className="text-xl md:text-2xl font-display font-bold text-txt-primary">
              Syllabus<span className="text-accent-blue">Nepal</span>
            </span>
            <span className="text-lg" role="img" aria-label="Nepal flag">🇳🇵</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => setHoveredNav(link.label)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    location.pathname.startsWith(link.path)
                      ? 'text-accent-blue bg-hovr'
                      : 'text-txt-secondary hover:text-txt-primary hover:bg-hovr'
                  }`}
                >
                  {link.label}
                  {location.pathname.startsWith(link.path) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-blue rounded-full"
                    />
                  )}
                </Link>

                {/* Mega menu dropdown */}
                <AnimatePresence>
                  {link.items && hoveredNav === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-card rounded-xl border border-border-light shadow-lg p-2 z-50"
                    >
                      {link.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-hovr transition-colors group"
                        >
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-txt-secondary group-hover:text-txt-primary">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search trigger */}
            <button
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface hover:bg-hovr border border-border-light text-txt-muted text-sm transition-colors"
              aria-label="Open search (Ctrl+K)"
            >
              <Search size={16} />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline text-xs bg-hovr px-1.5 py-0.5 rounded border border-border-light">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              className="relative p-2 rounded-lg hover:bg-hovr transition-colors"
              aria-label={`Bookmarks (${bookmarks.length} saved)`}
            >
              <Bookmark size={18} className="text-txt-secondary" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Font size */}
            <button
              onClick={cycleFontSize}
              className="p-2 rounded-lg hover:bg-hovr transition-colors text-txt-secondary"
              aria-label={`Font size: ${fontSize}. Click to change.`}
              title={`Font size: ${fontSize}`}
            >
              <span className="text-sm font-bold">
                A<span className="text-xs">{fontSize === 'small' ? 's' : fontSize === 'large' ? 'L' : 'M'}</span>
              </span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-hovr transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} className="text-txt-secondary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} className="text-yellow-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Last updated tag */}
            <span className="hidden xl:inline text-xs text-txt-muted bg-surface px-2 py-1 rounded-full border border-border-light">
              Updated 2025
            </span>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-hovr transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={closeMobile} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card shadow-lg overflow-y-auto"
            >
              <div className="p-6 pt-20">
                {navLinks.map((link) => (
                  <div key={link.path} className="mb-6">
                    <Link
                      to={link.path}
                      onClick={closeMobile}
                      className="text-lg font-semibold text-txt-primary block mb-2"
                    >
                      {link.label}
                    </Link>
                    {link.items && (
                      <div className="ml-4 space-y-1">
                        {link.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMobile}
                            className="flex items-center gap-2 py-2 text-sm text-txt-secondary hover:text-txt-primary"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <hr className="border-border-light my-4" />
                <div className="space-y-3">
                  <Link
                    to="/bookmarks"
                    onClick={closeMobile}
                    className="flex items-center gap-3 text-sm text-txt-secondary hover:text-txt-primary"
                  >
                    <Bookmark size={16} /> Bookmarks ({bookmarks.length})
                  </Link>
                  <Link
                    to="/progress"
                    onClick={closeMobile}
                    className="flex items-center gap-3 text-sm text-txt-secondary hover:text-txt-primary"
                  >
                    <GraduationCap size={16} /> My Progress
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className={`${isScrolled ? 'h-14' : 'h-[72px]'} transition-all duration-200`} />
    </>
  )
}
