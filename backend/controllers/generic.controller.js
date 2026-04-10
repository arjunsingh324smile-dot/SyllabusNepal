const path = require('path');
const fs = require('fs');

const DATA_ROOT = path.join(__dirname, '../data');

function readJSON(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function listDir(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath);
}

function collectJSONFiles(dirPath) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectJSONFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      results.push(fullPath);
    }
  }
  return results;
}

// GET /api/:category/:programPath/subjects
exports.getSubjectList = (req, res) => {
  try {
    const category = req.params.category || req.baseCategory;
    const programPath = req.params[0] || '';
    const dirPath = path.join(DATA_ROOT, category, programPath);

    if (!fs.existsSync(dirPath)) {
      return res.status(404).json({ error: 'Program not found' });
    }

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // Check if there are subdirectories (streams/semesters)
    const subDirs = entries.filter(e => e.isDirectory() && !e.name.startsWith('_'));
    if (subDirs.length > 0) {
      // Return list of subdirectories as groups
      const groups = subDirs.map(d => {
        const subDirPath = path.join(dirPath, d.name);
        const files = listDir(subDirPath).filter(f => f.endsWith('.json'));
        return {
          id: d.name,
          name: d.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          subjects: files.map(f => {
            const data = readJSON(path.join(subDirPath, f));
            return {
              id: f.replace('.json', ''),
              name: data?.meta?.subject || f.replace('.json', '').replace(/-/g, ' '),
              totalChapters: data?.chapters?.length || 0,
              color: data?.meta?.color || '#2563EB'
            };
          })
        };
      });
      return res.json({ groups });
    }

    // Flat subject list
    const files = entries
      .filter(e => !e.isDirectory() && e.name.endsWith('.json'))
      .map(e => {
        const data = readJSON(path.join(dirPath, e.name));
        return {
          id: e.name.replace('.json', ''),
          name: data?.meta?.subject || e.name.replace('.json', '').replace(/-/g, ' '),
          totalChapters: data?.chapters?.length || 0,
          shortIntro: data?.chapters?.[0]?.shortIntro || '',
          color: data?.meta?.color || '#2563EB'
        };
      });
    res.json({ subjects: files });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /api/:category/.../:subjectId
exports.getSubject = (req, res) => {
  try {
    const category = req.params.category || req.baseCategory;
    const subjectId = req.params.subjectId;
    const programPath = req.params[0] || '';
    const dirPath = path.join(DATA_ROOT, category, programPath);
    const filePath = path.join(dirPath, `${subjectId}.json`);
    let data = readJSON(filePath);
    // Fallback: search recursively in subdirectories (handles old-style URLs
    // like /bachelor/bca/c-programming where file is at bca/sem-1/c-programming.json)
    if (!data && fs.existsSync(dirPath)) {
      const allFiles = collectJSONFiles(dirPath);
      const match = allFiles.find(f => path.basename(f) === `${subjectId}.json`);
      if (match) data = readJSON(match);
    }
    if (!data) return res.status(404).json({ error: 'Subject not found' });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /api/:category/.../:subjectId/:chapterId
exports.getChapter = (req, res) => {
  try {
    const category = req.params.category || req.baseCategory;
    const subjectId = req.params.subjectId;
    const chapterId = req.params.chapterId;
    const programPath = req.params[0] || '';
    const dirPath = path.join(DATA_ROOT, category, programPath);
    const filePath = path.join(dirPath, `${subjectId}.json`);
    let data = readJSON(filePath);
    // Fallback: search recursively in subdirectories
    if (!data && fs.existsSync(dirPath)) {
      const allFiles = collectJSONFiles(dirPath);
      const match = allFiles.find(f => path.basename(f) === `${subjectId}.json`);
      if (match) data = readJSON(match);
    }
    if (!data) return res.status(404).json({ error: 'Subject not found' });
    const chapter = data.chapters.find(c => c.id === chapterId);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    res.json({ ...chapter, meta: data.meta });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /api/meta/programs
exports.getPrograms = (_req, res) => {
  try {
    const indexPath = path.join(DATA_ROOT, '_meta', 'programs-index.json');
    const data = readJSON(indexPath);
    if (!data) return res.status(404).json({ error: 'Programs index not found' });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
