const express = require('express');
const router = express.Router();
const { getList, deleteItem, updateItem, routeToUpdate } = require('../controllers/project-queries');

router.get('/projects', getList);
router.get('/delete/:project_id', deleteItem);
router.get('/update/:project_id', routeToUpdate);
router.post('/updated', updateItem);

module.exports = router;