const express = require('express');
const router = express.Router();
const {getAllCourses,
    getCourseById,
    createCourse,
    deleteCourse,
    updateCourse,
    replaceCourse} = require('../controllers/courseController');

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.delete('/:id', deleteCourse);
router.patch('/:id', updateCourse);
router.put('/:id', replaceCourse);

module.exports = router;