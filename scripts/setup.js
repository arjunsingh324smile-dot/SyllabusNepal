#!/usr/bin/env node

/**
 * Setup script for SyllabusNepal
 * Installs dependencies for both client and server,
 * then seeds the database.
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const serverDir = resolve(root, 'server')

function run(cmd, cwd = root) {
  console.log(`\n> ${cmd} (in ${cwd})`)
  execSync(cmd, { cwd, stdio: 'inherit' })
}

try {
  console.log('=== SyllabusNepal Setup ===\n')

  // Install root (frontend) dependencies
  console.log('1. Installing frontend dependencies...')
  run('npm install')

  // Install server dependencies
  if (existsSync(serverDir)) {
    console.log('\n2. Installing server dependencies...')
    run('npm install', serverDir)
  }

  // Seed database
  console.log('\n3. Seeding database...')
  console.log('   Make sure MongoDB is running on localhost:27017')
  run('node src/loaders/seedLoader.js', serverDir)

  console.log('\n=== Setup Complete! ===')
  console.log('Run "npm run dev:all" to start both frontend and backend.')
} catch (error) {
  console.error('\nSetup failed:', error.message)
  process.exit(1)
}
