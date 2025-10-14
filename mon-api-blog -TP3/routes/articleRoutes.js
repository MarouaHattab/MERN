const express = require('express');
const router = express.Router();
const { TestApi, createArticle, getAllArticles } = require('../controllers/articleController');

router.get('/test', TestApi);
router.get('/', getAllArticles);
router.post('/', createArticle);

module.exports = router;