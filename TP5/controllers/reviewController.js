const Review = require('../models/Review');
const Course = require('../models/Course');

// @desc    Créer une critique pour un cours
// @route   POST /api/courses/:courseId/reviews
// @access  Public
const addReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating, comment, userId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé.' });
    }

    const review = await Review.create({
      rating,
      comment,
      course: courseId, // Lier la critique au cours
      user: userId,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer toutes les critiques d'un cours
// @route   GET /api/courses/:courseId/reviews
// @access  Public
const getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ course: req.params.courseId })
      .populate('user', 'username email')
      .populate('course', 'title');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addReview,
  getCourseReviews,
};
