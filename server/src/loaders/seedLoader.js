import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import mongoose from 'mongoose'
import { config } from '../config/env.js'
import { Program } from '../modules/program/model.js'
import { Subject } from '../modules/subject/model.js'
import { Chapter } from '../modules/chapter/model.js'
import { Topic } from '../modules/topic/model.js'
import { EntranceExam } from '../modules/entrance/model.js'
import { CompetitiveExam } from '../modules/competitive/model.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'data')

async function loadJSON(filename) {
  const raw = await readFile(join(dataDir, filename), 'utf-8')
  return JSON.parse(raw)
}

async function seed() {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('Connected to MongoDB for seeding')

    // Clear existing data
    await Promise.all([
      Program.deleteMany({}),
      Subject.deleteMany({}),
      Chapter.deleteMany({}),
      Topic.deleteMany({}),
      EntranceExam.deleteMany({}),
      CompetitiveExam.deleteMany({}),
    ])
    console.log('Cleared existing data')

    // Load and insert seed data
    const [programs, subjects, chapters, topics, entrance, competitive] = await Promise.all([
      loadJSON('programs.json'),
      loadJSON('subjects.json'),
      loadJSON('chapters.json'),
      loadJSON('topics.json'),
      loadJSON('entrance.json'),
      loadJSON('competitive.json'),
    ])

    const results = await Promise.all([
      Program.insertMany(programs),
      Subject.insertMany(subjects),
      Chapter.insertMany(chapters),
      Topic.insertMany(topics),
      EntranceExam.insertMany(entrance),
      CompetitiveExam.insertMany(competitive),
    ])

    console.log(`Seeded: ${results[0].length} programs`)
    console.log(`Seeded: ${results[1].length} subjects`)
    console.log(`Seeded: ${results[2].length} chapters`)
    console.log(`Seeded: ${results[3].length} topics`)
    console.log(`Seeded: ${results[4].length} entrance exams`)
    console.log(`Seeded: ${results[5].length} competitive exams`)
    console.log('Database seeding complete!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seed()
