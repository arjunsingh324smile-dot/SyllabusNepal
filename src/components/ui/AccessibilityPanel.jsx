import { usePreferencesStore } from '../../store/preferencesStore'

export default function AccessibilityPanel() {
  const { preferences, setPref } = usePreferencesStore()

  const toggles = [
    { key: 'highContrast', label: 'High Contrast', desc: 'Increase text contrast for better readability' },
    { key: 'dyslexiaFont', label: 'Dyslexia-Friendly Font', desc: 'Use OpenDyslexic font for easier reading' },
    { key: 'reduceMotion', label: 'Reduce Motion', desc: 'Minimize animations and transitions' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-txt-primary">Accessibility</h3>
      {toggles.map((t) => (
        <div key={t.key} className="flex items-center justify-between p-3 bg-surface rounded-lg">
          <div>
            <div className="text-sm font-medium text-txt-primary">{t.label}</div>
            <div className="text-xs text-txt-muted">{t.desc}</div>
          </div>
          <button
            role="switch"
            aria-checked={!!preferences[t.key]}
            onClick={() => setPref(t.key, !preferences[t.key])}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              preferences[t.key] ? 'bg-accent-blue' : 'bg-border-medium'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                preferences[t.key] ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  )
}
