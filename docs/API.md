# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

## Endpoints

### Programs

#### GET /api/programs
Query params: `category` (optional: school, bachelor, entrance, competitive)

#### GET /api/programs/:id
Returns a single program by its programId.

#### GET /api/programs/category/:category
Returns all programs in a category.

---

### Subjects

#### GET /api/subjects
Query params: `programId` (optional)

#### GET /api/subjects/:id
Returns a single subject by its subjectId.

#### GET /api/subjects/program/:programId
Returns all subjects for a program.

---

### Chapters

#### GET /api/chapters
Query params: `subjectId`, `programId` (optional)

#### GET /api/chapters/:id
Returns a single chapter by its chapterId.

#### GET /api/chapters/subject/:subjectId
Returns all chapters for a subject.

---

### Topics

#### GET /api/topics
Query params: `chapterId`, `subjectId` (optional)

#### GET /api/topics/:id
Returns a single topic by its topicId.

#### GET /api/topics/chapter/:chapterId
Returns all topics for a chapter.

---

### Search

#### GET /api/search
Query params: `q` (search query), `limit` (optional, default 20)

---

### Analytics

#### POST /api/analytics/track
Body: `{ event, resourceType, resourceId, metadata }`

#### GET /api/analytics/popular
Query params: `type`, `limit`

#### GET /api/analytics/stats
Returns aggregate stats.
