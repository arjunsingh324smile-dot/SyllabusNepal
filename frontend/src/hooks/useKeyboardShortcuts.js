import { useEffect } from 'react'

export function useKeyboardShortcuts(handlers = {}) {
  useEffect(() => {
    const handle = (e) => {
      // Content protection: block certain shortcuts
      if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return }
      if (e.ctrlKey && e.key === 's') { e.preventDefault(); return }
      if (e.key === 'F12') { e.preventDefault(); return }

      // App shortcuts
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); handlers.onSearch?.() }
      if (e.ctrlKey && e.key === 'b') { e.preventDefault(); handlers.onBookmarks?.() }
      if (e.ctrlKey && e.key === 'd') { e.preventDefault(); handlers.onToggleTheme?.() }
      if (e.ctrlKey && e.key === 'p') { e.preventDefault(); handlers.onPrint?.() }
      if (e.key === 'Escape') { handlers.onEscape?.() }
      if (e.key === '?') { handlers.onHelp?.() }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [handlers])
}
