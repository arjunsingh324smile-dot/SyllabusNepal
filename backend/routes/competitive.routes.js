const router = require('express').Router();
const ctrl = require('../controllers/generic.controller');
const CATEGORY = 'competitive';

router.get(/^\/(.+)\/subjects$/, (req, res) => {
  req.baseCategory = CATEGORY;
  ctrl.getSubjectList(req, res);
});

router.get(/^\/(.+)\/([^/]+)\/(ch-[^/]+)$/, (req, res) => {
  req.baseCategory = CATEGORY;
  req.params.subjectId = req.params[1];
  req.params.chapterId = req.params[2];
  ctrl.getChapter(req, res);
});

router.get(/^\/(.+)\/([^/]+)$/, (req, res) => {
  req.baseCategory = CATEGORY;
  req.params.subjectId = req.params[1];
  ctrl.getSubject(req, res);
});

module.exports = router;
