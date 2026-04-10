import { useNotesStore } from '../store/notesStore'
import PageWrapper from '../../../components/layout/PageWrapper'

export default function NotesPage() {
  const { getAllNotes, removeNote, clearAll } = useNotesStore()
  const notes = getAllNotes()

  return (
    <PageWrapper title="My Study Notes" description="All your saved notes in one place">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-txt-primary">My Study Notes</h1>
          {notes.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 transition"
            >
              Clear All Notes
            </button>
          )}
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-16 text-txt-secondary">
            <p className="text-lg">No notes saved yet</p>
            <p className="text-sm mt-2">Add notes while studying topics to see them here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.topicId} className="border border-border rounded-lg p-4 bg-surface">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-txt-secondary mb-1">{note.topicId}</p>
                    <p className="text-sm text-txt-primary whitespace-pre-wrap">{note.content}</p>
                    <p className="text-xs text-txt-secondary mt-2">
                      Updated: {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeNote(note.topicId)}
                    className="text-red-500 hover:text-red-700 text-sm ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
