const User = require('../models/User');

// @desc    Créer un utilisateur
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un email.' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
    }

    const user = await User.create({
      username,
      email,
    });

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400).json({ message: 'Données utilisateur invalides.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer tous les utilisateurs
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('courses', 'title description');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer un utilisateur
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('courses', 'title description instructor');

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer les cours d'un utilisateur
// @route   GET /api/users/:userId/courses
// @access  Public
const getUserCourses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('courses');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json(user.courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserCourses,
};
