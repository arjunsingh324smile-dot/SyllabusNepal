import { useState } from 'react'
import { useNotesStore } from '../store/notesStore'

export default function NoteEditor({ topicId, topicName }) {
  const { getNote, addNote, removeNote } = useNotesStore()
  const existing = getNote(topicId)
  const [content, setContent] = useState(existing?.content || '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    if (content.trim()) {
      addNote(topicId, content.trim())
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  function handleDelete() {
    removeNote(topicId)
    setContent('')
  }

  return (
    <div className="mt-4 border border-border rounded-lg p-4 bg-surface">
      <h4 className="text-sm font-medium text-txt-secondary mb-2">
        Your Notes — {topicName}
      </h4>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your study notes here..."
        rows={4}
        className="w-full rounded-md border border-border bg-page p-3 text-sm text-txt-primary focus:outline-none focus:ring-2 focus:ring-accent resize-y"
      />
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={handleSave}
          className="px-4 py-1.5 text-sm rounded-md bg-accent text-white hover:bg-accent/90 transition"
        >
          {saved ? 'Saved!' : 'Save Note'}
        </button>
        {existing && (
          <button
            onClick={handleDelete}
            className="px-4 py-1.5 text-sm rounded-md border border-red-300 text-red-600 hover:bg-red-50 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
