# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### Health Check

#### GET /api/health
Returns `{ status: "ok" }`.

---

### Programs Index

#### GET /api/meta/programs
Returns the master list of all 25 programs across all categories.

---

### Subject Listings

#### GET /api/:category/:programPath/subjects
Lists subjects for a program. Returns either `{ subjects: [...] }` (flat) or `{ groups: [...] }` (when grouped by semester/stream).

Examples:
- `GET /api/school/see/subjects` → flat list of SEE subjects
- `GET /api/bachelor/bca/subjects` → groups by semester
- `GET /api/school/neb-grade-11/science/subjects` → subjects in science stream

---

### Subject Detail (Full Chapter List)

#### GET /api/:category/:programPath/:subjectId
Returns full subject data including meta and all chapters with topics.

Examples:
- `GET /api/school/see/mathematics`
- `GET /api/bachelor/bca/sem-1/c-programming`
- `GET /api/entrance/ioe/mathematics`
- `GET /api/engineering/tu-ioe/civil/thermodynamics`

Response shape:
```json
{
  "meta": {
    "program": "SEE",
    "category": "school",
    "subject": "Mathematics",
    "subjectId": "mathematics",
    "color": "#2563EB",
    "totalChapters": 14
  },
  "chapters": [
    {
      "id": "ch-1",
      "number": 1,
      "title": "Sets",
      "shortIntro": "...",
      "introduction": { "overview": "...", "whyItMatters": "...", "prerequisites": [], "yearlyTrend": {} },
      "topics": [...]
    }
  ]
}
```

**Fallback**: If a direct path is not found, the server searches recursively in subdirectories. So `/api/bachelor/bca/c-programming` will find `bca/sem-1/c-programming.json`.

---

### Single Chapter

#### GET /api/:category/:programPath/:subjectId/:chapterId
Returns a single chapter with its full introduction and all topics, plus the subject meta.

The `chapterId` must start with `ch-` (e.g., `ch-1`, `ch-5`).

Examples:
- `GET /api/school/see/mathematics/ch-1`
- `GET /api/bachelor/bca/sem-1/c-programming/ch-3`

Response: the chapter object directly at top level, with `meta` field injected from the parent subject.

---

## Categories

| Category      | Base Path        | Examples                                            |
|---------------|------------------|-----------------------------------------------------|
| School        | `/api/school`    | see, ble, class-9, neb-grade-11/science             |
| Bachelor      | `/api/bachelor`  | bca/sem-1, bbs/year-1, bsc-csit/sem-1               |
| Engineering   | `/api/engineering`| tu-ioe/civil, kathmandu-university/computer          |
| Entrance      | `/api/entrance`  | ioe, csit, cmat, cee/medical                         |
| Competitive   | `/api/competitive`| loksewa, banking, tsc/primary                        |
