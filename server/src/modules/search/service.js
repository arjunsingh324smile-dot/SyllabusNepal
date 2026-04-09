import { Program } from '../program/model.js'
import { Subject } from '../subject/model.js'
import { Chapter } from '../chapter/model.js'
import { Topic } from '../topic/model.js'

export const searchService = {
  async search(query, limit = 20) {
    if (!query || query.length < 2) return []

    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')

    const [programs, subjects, chapters, topics] = await Promise.all([
      Program.find({ name: regex, isActive: true }).limit(5).lean(),
      Subject.find({ name: regex, isActive: true }).limit(5).lean(),
      Chapter.find({ name: regex, isActive: true }).limit(5).lean(),
      Topic.find({ name: regex, isActive: true }).limit(limit).lean(),
    ])

    return [
      ...programs.map((p) => ({ type: 'program', id: p.programId, name: p.name, path: p.path })),
      ...subjects.map((s) => ({ type: 'subject', id: s.subjectId, name: s.name, path: s.path })),
      ...chapters.map((c) => ({ type: 'chapter', id: c.chapterId, name: c.name })),
      ...topics.map((t) => ({ type: 'topic', id: t.topicId, name: t.name })),
    ]
  },
}
