const express = require('express');
const router = express.Router();

router.get('/', ( request, response) => response.render('create-project'));

module.exports = router;