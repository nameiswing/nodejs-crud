const { adminLogin } = require('../controllers/project-queries');

const router = require('express').Router();

router.get('/', (request, response) =>  response.render('index', {message: "Test only: username: admin_1, password: admin"}));
router.post('/login', adminLogin);

module.exports = router;