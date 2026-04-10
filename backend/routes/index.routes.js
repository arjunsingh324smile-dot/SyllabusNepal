const router = require('express').Router();
const ctrl = require('../controllers/generic.controller');

// Meta routes
router.get('/meta/programs', ctrl.getPrograms);

// Category routes
router.use('/school', require('./school.routes'));
router.use('/bachelor', require('./bachelor.routes'));
router.use('/engineering', require('./engineering.routes'));
router.use('/entrance', require('./entrance.routes'));
router.use('/competitive', require('./competitive.routes'));

module.exports = router;
