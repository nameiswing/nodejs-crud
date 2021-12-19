const express = require('express');
const router = express.Router();
const { createNew } = require('../controllers/project-queries');

router.get('/', (request, response) => response.render('create-project'));
router.post('/new', createNew);

module.exports = router;