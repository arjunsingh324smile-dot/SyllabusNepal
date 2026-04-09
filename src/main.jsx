import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './styles/globals.css'
import { useThemeStore } from './store/themeStore'
import { useFontStore } from './store/fontStore'
import { usePreferencesStore } from './store/preferencesStore'

// Initialize theme, font, and preferences from stores
function ThemeInitializer({ children }) {
  const theme = useThemeStore((s) => s.theme)
  const fontSize = useFontStore((s) => s.fontSize)
  const { highContrast, dyslexiaFont, reduceMotion } = usePreferencesStore()

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  React.useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize)
  }, [fontSize])

  React.useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  React.useEffect(() => {
    document.documentElement.classList.toggle('dyslexia-font', dyslexiaFont)
  }, [dyslexiaFont])

  React.useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion)
  }, [reduceMotion])

  return children
}

// Content protection: block context menu and drag on images
function ContentProtection() {
  React.useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
      }
    }

    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('dragstart', handleDragStart)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeInitializer>
        <ContentProtection />
        <App />
      </ThemeInitializer>
    </HelmetProvider>
  </React.StrictMode>
)
