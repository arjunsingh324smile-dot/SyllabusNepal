const express = require('express');
const corsMiddleware = require('./middleware/cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(corsMiddleware);
app.use(express.json());
app.use('/api', require('./routes/index.routes'));
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () =>
  console.log(`SyllabusNepal API running on port ${PORT}`)
);
