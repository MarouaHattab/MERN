const express = require('express');
const router = express.Router();
const { TestApi, createArticle } = require('../controllers/articleController');

router.get('/test', TestApi);
router.post('/', createArticle);

module.exports = router;