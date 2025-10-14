const User = require('../models/User');

// @desc Récupérer tous les utilisateurs
// @route GET /api/users
const getAllUsers = async (req, res) => {
  try {
    // await met en pause la fonction jusqu'à ce que User.find() retourne un résultat
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    // Si une erreur se produit, elle est capturée ici
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs.",
      error: err.message
    });
  }
};

// @desc Créer un nouvel utilisateur
// @route POST /api/users
const createUser = async (req, res) => {
  // Le bloc try...catch est essentiel pour gérer les erreurs potentielles
  // lors des opérations de base de données (ex: validation échouée).
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // await attend que la promesse de .save() soit résolue
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la création de l'utilisateur.",
      error: err.message
    });
  }
};

module.exports = { getAllUsers, createUser };