import { useFontStore } from '../../store/fontStore'

export default function FontSizeToggle() {
  const { fontSize, cycleFontSize } = useFontStore()
  return (
    <button
      onClick={cycleFontSize}
      className="p-2 rounded-lg hover:bg-hovr transition-colors text-txt-secondary text-sm font-bold"
      aria-label={`Font size: ${fontSize}`}
      title={`Font size: ${fontSize}`}
    >
      A<span className="text-xs">{fontSize === 'small' ? 's' : fontSize === 'large' ? 'L' : 'M'}</span>
    </button>
  )
}
