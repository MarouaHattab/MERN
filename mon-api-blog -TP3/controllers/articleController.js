const Article = require('../models/Article');

// @desc Test API endpoint
// @route GET /api/articles/test
const TestApi = (req, res) => {
  res.status(200).json({ message: "L'API fonctionne correctement !" });
};

// @desc Récupérer tous les articles
// @route GET /api/articles
const getAllArticles = async (req, res) => {
  try {
    // await met en pause la fonction jusqu’à ce que Article.find() retourne un résultat
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    // Si une erreur se produit, elle est capturée ici
    res.status(500).json({
      message: "Erreur lors de la récupération des articles.",
      error: err.message
    });
  }
};

// @desc Créer un nouvel article
// @route POST /api/articles
const createArticle = async (req, res) => {
  // Le bloc try...catch est essentiel pour gérer les erreurs potentielles
  // lors des opérations de base de données (ex: validation échouée).
  try {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });

    // await attend que la promesse de .save() soit résolue
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la création de l’article.",
      error: err.message
    });
  }
};

module.exports = {
  TestApi,
  getAllArticles,
  createArticle
};