# SyllabusNepal — Complete Academic Syllabus Platform

## Architecture

```
SyllabusNepal/
├── frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── components/     # Reusable UI, layout, common components
│   │   ├── features/       # Feature modules (syllabus, search, notes, planner)
│   │   ├── hooks/          # Shared custom hooks
│   │   ├── pages/          # Route pages (category hubs + Shared generic pages)
│   │   ├── services/       # API service layer
│   │   ├── store/          # Zustand global stores
│   │   ├── styles/         # CSS files
│   │   └── utils/          # Utility functions + api.js
│   ├── index.html
│   ├── vite.config.js      # Vite config with /api proxy to backend
│   └── package.json
├── backend/                # Express file-based JSON API
│   ├── server.js           # Express server (port 5000)
│   ├── controllers/        # generic.controller.js (handles all categories)
│   ├── routes/             # Category route files + index.routes.js
│   ├── middleware/          # CORS config
│   ├── data/               # 150+ JSON subject files
│   │   ├── _meta/          # programs-index.json, subjects-index.json
│   │   ├── school/         # ble, class-9, see, neb-grade-11, neb-grade-12
│   │   ├── bachelor/       # bbs, bba, bca, bsc, bsc-csit
│   │   ├── engineering/    # tu-ioe, kathmandu-university, pokhara, purvanchal
│   │   ├── entrance/       # ioe, csit, cmat, cee, kucat-cbt, pu-entrance
│   │   └── competitive/    # loksewa, banking, tsc, army-police
│   └── package.json
├── shared/                 # Shared constants and types
├── docs/                   # Documentation
├── scripts/                # generate-data.cjs (creates all JSON data files)
└── package.json            # Monorepo orchestrator (concurrently)
```

## Quick Start

### Prerequisites
- Node.js 18+

### Setup

```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend
npm run dev
```

Or run separately:
```bash
# Terminal 1 — Backend (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

### Regenerate Data

```bash
npm run generate-data
```

## API Endpoints

| Method | Endpoint                                    | Description                        |
|--------|---------------------------------------------|------------------------------------|
| GET    | /api/health                                 | Health check                       |
| GET    | /api/meta/programs                          | List all 25 programs               |
| GET    | /api/:category/:programPath/subjects        | List subjects for a program        |
| GET    | /api/:category/:programPath/:subjectId      | Get full subject with chapters     |
| GET    | /api/:category/:programPath/:subjectId/:chId| Get single chapter (ch-N prefix)   |

See [API.md](API.md) for full documentation.

## Data Format

Each subject JSON file follows this universal schema:
```json
{
  "meta": { "program", "category", "subject", "subjectId", "color", "totalChapters" },
  "chapters": [{
    "id": "ch-1",
    "title": "...",
    "introduction": { "overview", "whyItMatters", "prerequisites", "yearlyTrend" },
    "topics": [{ "id", "name", "difficulty", "explanation", "keyPoints", "formula", "examTip" }]
  }]
}
```

## Frontend Features

- **Syllabus Browser**: Navigate programs → subjects → chapters → topics
- **Generic Pages**: `SubjectPage` and `ChapterPage` in `pages/Shared/` render any subject/chapter from any category
- **Search**: Full-text search across all content
- **Bookmarks**: Save topics for later
- **Progress Tracking**: Mark topics as read
- **Study Notes**: Personal notes per topic
- **Study Planner**: Plan daily study tasks
- **Compare**: Compare programs side by side
