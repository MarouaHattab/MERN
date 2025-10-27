const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  enrollUserInCourse,
  getCourseStudents,
} = require('../controllers/courseController');
const {
  addReview,
  getCourseReviews,
} = require('../controllers/reviewController');

// Routes pour les cours
router.route('/').post(createCourse).get(getCourses);
router.route('/:id').get(getCourseById);

// Routes pour les inscriptions (Relation Many-to-Many)
router.route('/:courseId/enroll').post(enrollUserInCourse);
router.route('/:courseId/students').get(getCourseStudents);

// Routes pour les critiques (Relation 1-to-Many)
router.route('/:courseId/reviews')
  .post(addReview)
  .get(getCourseReviews);

module.exports = router;
