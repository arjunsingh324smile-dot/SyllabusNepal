// Shared type definitions (JSDoc for vanilla JS projects)

/**
 * @typedef {Object} Program
 * @property {string} programId
 * @property {string} name
 * @property {string} [shortName]
 * @property {'school'|'bachelor'|'entrance'|'competitive'} category
 * @property {string} [description]
 * @property {string} [board]
 * @property {string} [color]
 * @property {string} [icon]
 * @property {string} [path]
 * @property {number} [subjectCount]
 */

/**
 * @typedef {Object} Subject
 * @property {string} subjectId
 * @property {string} name
 * @property {string} programId
 * @property {number} [totalMarks]
 * @property {number} [chapterCount]
 * @property {number} [topicCount]
 * @property {string} [icon]
 * @property {string} [path]
 */

/**
 * @typedef {Object} Chapter
 * @property {string} chapterId
 * @property {string} subjectId
 * @property {string} programId
 * @property {number} number
 * @property {string} name
 * @property {string} [unitName]
 * @property {string} [weightage]
 * @property {'beginner'|'intermediate'|'advanced'} [difficulty]
 * @property {string} [introduction]
 * @property {string} [whyItMatters]
 * @property {string[]} [prerequisites]
 * @property {Object<string, number>} [yearlyTrend]
 * @property {number} [topicCount]
 */

/**
 * @typedef {Object} Topic
 * @property {string} topicId
 * @property {string} chapterId
 * @property {string} subjectId
 * @property {string} programId
 * @property {string} name
 * @property {'beginner'|'intermediate'|'advanced'} [difficulty]
 * @property {string} [explanation]
 * @property {string[]} [keyPoints]
 * @property {string} [examTip]
 * @property {string} [formula]
 * @property {string[]} [relatedTopics]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {number} statusCode
 * @property {string} message
 * @property {*} data
 */

/**
 * @typedef {Object} SearchResult
 * @property {'program'|'subject'|'chapter'|'topic'} type
 * @property {string} id
 * @property {string} name
 * @property {string} [path]
 */

export default {}
