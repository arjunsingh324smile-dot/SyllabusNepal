/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        page: 'var(--bg-page)',
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
        hovr: 'var(--bg-hover)',
        active: 'var(--bg-active)',
        txt: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          disabled: 'var(--text-disabled)',
        },
        accent: {
          blue: 'var(--accent-blue)',
          purple: 'var(--accent-purple)',
          teal: 'var(--accent-teal)',
        },
        program: {
          see: '#059669',
          neb11: '#D97706',
          neb12: '#EA580C',
          bachelor: '#2563EB',
          pu: '#0891B2',
          ioe: '#DC2626',
          cee: '#7C3AED',
          ceeBds: '#9333EA',
          ceeNur: '#C026D3',
          csit: '#0D9488',
          loksewa: '#92400E',
          banking: '#1E40AF',
          tsc: '#065F46',
        },
        border: {
          light: 'var(--border-light)',
          medium: 'var(--border-medium)',
          strong: 'var(--border-strong)',
        },
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
