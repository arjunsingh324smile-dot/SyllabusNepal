import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'

const shortcuts = [
  { keys: ['Ctrl', 'K'], description: 'Open search' },
  { keys: ['Ctrl', 'B'], description: 'Open bookmarks' },
  { keys: ['Ctrl', 'D'], description: 'Toggle dark mode' },
  { keys: ['Ctrl', 'P'], description: 'Open progress' },
  { keys: ['Esc'], description: 'Close modal / search' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
]

export default function KeyboardShortcuts() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Keyboard Shortcuts | SyllabusNepal</title>
      </Helmet>

      <Breadcrumb items={[{ label: 'Keyboard Shortcuts', color: '#6366F1' }]} />

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <h1 className="font-display text-2xl font-bold text-txt-primary mb-6">Keyboard Shortcuts</h1>

        <div className="space-y-3">
          {shortcuts.map((shortcut, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-card rounded-xl border border-border-light p-4"
            >
              <span className="text-txt-secondary">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded bg-surface border border-border-light text-xs font-mono font-medium text-txt-primary"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
