export const programColors = {
  see: { primary: '#059669', light: '#ECFDF5', dark: '#064E3B' },
  neb11: { primary: '#D97706', light: '#FFFBEB', dark: '#78350F' },
  neb12: { primary: '#EA580C', light: '#FFF7ED', dark: '#7C2D12' },
  bachelor: { primary: '#2563EB', light: '#EFF6FF', dark: '#1E3A5F' },
  pu: { primary: '#0891B2', light: '#ECFEFF', dark: '#164E63' },
  ioe: { primary: '#DC2626', light: '#FEF2F2', dark: '#7F1D1D' },
  cee: { primary: '#7C3AED', light: '#F5F3FF', dark: '#4C1D95' },
  csit: { primary: '#0D9488', light: '#F0FDFA', dark: '#134E4A' },
  loksewa: { primary: '#92400E', light: '#FFFBEB', dark: '#451A03' },
  banking: { primary: '#1E40AF', light: '#EFF6FF', dark: '#1E3A5F' },
  tsc: { primary: '#065F46', light: '#ECFDF5', dark: '#064E3B' },
}

export const difficultyConfig = {
  beginner: { label: 'Beginner', color: '#22C55E', dots: 1 },
  easy: { label: 'Easy', color: '#EAB308', dots: 2 },
  intermediate: { label: 'Intermediate', color: '#F97316', dots: 3 },
  hard: { label: 'Hard', color: '#EF4444', dots: 4 },
  expert: { label: 'Expert', color: '#991B1B', dots: 5 },
}

export const getProgramColor = (programId) => programColors[programId] || programColors.bachelor
