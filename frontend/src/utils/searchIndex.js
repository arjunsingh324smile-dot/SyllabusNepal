import Fuse from 'fuse.js'
import { programs } from '../data/programs'

let searchItems = []

const flatten = () => {
  if (searchItems.length) return searchItems
  const items = []

  programs.forEach((cat) => {
    cat.programs.forEach((prog) => {
      items.push({
        type: 'program',
        name: prog.name,
        program: prog.name,
        path: prog.path,
        color: prog.color,
        icon: prog.icon,
        category: cat.name,
      })

      if (prog.subjects) {
        prog.subjects.forEach((subj) => {
          items.push({
            type: 'subject',
            name: subj.name,
            program: prog.name,
            path: subj.path || `${prog.path}/${subj.id}`,
            color: prog.color,
            category: cat.name,
          })
        })
      }
    })
  })

  searchItems = items
  return items
}

export const getSearchIndex = () => {
  const items = flatten()
  return new Fuse(items, {
    keys: [
      { name: 'name', weight: 0.5 },
      { name: 'program', weight: 0.3 },
      { name: 'category', weight: 0.2 },
    ],
    threshold: 0.35,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
  })
}

export const getSearchItems = () => flatten()
