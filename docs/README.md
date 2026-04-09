# SyllabusNepal — Complete Academic Syllabus Platform

## Architecture

```
SyllabusNepal/
├── src/                    # Frontend (React + Vite)
│   ├── components/         # Reusable UI, layout, common components
│   ├── features/           # Feature modules (syllabus, search, notes, planner)
│   ├── hooks/              # Shared custom hooks
│   ├── pages/              # Route pages
│   ├── services/           # API service layer (Axios)
│   ├── store/              # Zustand global stores
│   ├── styles/             # CSS files
│   └── utils/              # Utility functions
├── server/                 # Backend (Express + MongoDB)
│   └── src/
│       ├── config/         # DB connection, env config
│       ├── modules/        # Domain modules (program, subject, chapter, topic, etc.)
│       ├── middleware/      # Express middleware
│       ├── routes/         # Centralized route aggregator
│       ├── utils/          # ApiError, ApiResponse
│       ├── data/           # Seed JSON files
│       └── loaders/        # Database seeders
├── shared/                 # Shared constants and types
├── docs/                   # Documentation
└── scripts/                # Setup and utility scripts
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (or Atlas URI)

### Setup

```bash
# Install all dependencies
npm run install:all

# Seed the database
npm run seed

# Run both frontend and backend
npm run dev:all
```

Or run separately:
```bash
# Terminal 1 — Backend
npm run dev:server

# Terminal 2 — Frontend
npm run dev
```

## API Endpoints

| Method | Endpoint                       | Description                  |
|--------|--------------------------------|------------------------------|
| GET    | /api/programs                  | List all programs            |
| GET    | /api/programs/:id              | Get program by ID            |
| GET    | /api/programs/category/:cat    | Get programs by category     |
| GET    | /api/subjects                  | List all subjects            |
| GET    | /api/subjects/:id              | Get subject by ID            |
| GET    | /api/subjects/program/:pid     | Get subjects for program     |
| GET    | /api/chapters                  | List all chapters            |
| GET    | /api/chapters/:id              | Get chapter by ID            |
| GET    | /api/chapters/subject/:sid     | Get chapters for subject     |
| GET    | /api/topics                    | List all topics              |
| GET    | /api/topics/:id                | Get topic by ID              |
| GET    | /api/topics/chapter/:cid       | Get topics for chapter       |
| GET    | /api/entrance                  | List entrance exams          |
| GET    | /api/entrance/:id              | Get entrance exam by ID      |
| GET    | /api/competitive               | List competitive exams       |
| GET    | /api/competitive/:id           | Get competitive exam by ID   |
| GET    | /api/search?q=query            | Search across all content    |
| POST   | /api/analytics/track           | Track user event             |
| GET    | /api/analytics/popular         | Get popular resources        |
| GET    | /api/analytics/stats           | Get aggregate stats          |

## Data Model

Programs → Subjects → Chapters → Topics (hierarchical)

Each module in the backend follows:
```
module/
├── model.js       # Mongoose schema
├── service.js     # Business logic
├── controller.js  # HTTP request handling
└── routes.js      # Express routes
```

## Frontend Features

- **Syllabus Browser**: Navigate programs → subjects → chapters → topics
- **Search**: Full-text search across all content
- **Bookmarks**: Save topics for later
- **Progress Tracking**: Mark topics as read
- **Study Notes**: Personal notes per topic
- **Study Planner**: Plan daily study tasks
- **Compare**: Compare programs side by side
