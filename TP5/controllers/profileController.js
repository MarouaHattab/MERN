const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Créer un profil pour un utilisateur
// @route   POST /api/users/:userId/profile
// @access  Public
const createProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, website } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifier si le profil existe déjà
    const profileExists = await Profile.findOne({ user: userId });
    if (profileExists) {
      return res.status(400).json({ message: 'Ce profil existe déjà pour cet utilisateur.' });
    }

    const profile = await Profile.create({
      user: userId,
      bio,
      website,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer le profil d'un utilisateur
// @route   GET /api/users/:userId/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', 'username email');

    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: 'Profil non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mettre à jour le profil d'un utilisateur
// @route   PUT /api/users/:userId/profile
// @access  Public
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (profile) {
      profile.bio = req.body.bio || profile.bio;
      profile.website = req.body.website || profile.website;

      const updatedProfile = await profile.save();
      res.status(200).json(updatedProfile);
    } else {
      res.status(404).json({ message: 'Profil non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};
