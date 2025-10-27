const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  getUserCourses,
} = require('../controllers/userController');
const {
  createProfile,
  getProfile,
  updateProfile,
} = require('../controllers/profileController');

// Routes pour les utilisateurs
router.route('/').post(createUser).get(getUsers);
router.route('/:id').get(getUserById);

// Routes pour les profils (Relation 1-to-1)
router.route('/:userId/profile')
  .post(createProfile)
  .get(getProfile)
  .put(updateProfile);

// Route pour récupérer les cours d'un utilisateur
router.route('/:userId/courses').get(getUserCourses);

module.exports = router;
