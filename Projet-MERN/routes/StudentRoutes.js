const express = require('express');
const router = express.Router();
const {getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudent,      
    replaceStudent,
    enrollStudentInCourse,
    unenrollStudentFromCourse} = require('../controllers/studentControllers');

// Routes pour les étudiants
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', createStudent);
router.delete('/students/:id', deleteStudent);
router.patch('/students/:id', updateStudent);
router.put('/students/:id', replaceStudent);

// Routes pour l'inscription aux cours
router.post('/students/:studentId/courses/:courseId', enrollStudentInCourse);
router.delete('/students/:studentId/courses/:courseId', unenrollStudentFromCourse);

module.exports = router;