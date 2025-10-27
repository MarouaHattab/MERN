const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Créer un cours
// @route   POST /api/courses
// @access  Public
const createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;

    if (!title || !description || !instructor) {
      return res.status(400).json({ message: 'Veuillez fournir toutes les informations du cours.' });
    }

    const course = await Course.create({
      title,
      description,
      instructor,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer tous les cours
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate('students', 'username email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer un cours
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students', 'username email');

    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Cours non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Inscrire un utilisateur à un cours
// @route   POST /api/courses/:courseId/enroll
// @access  Public
const enrollUserInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.body; // On suppose que l'ID de l'utilisateur est dans le body

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({ message: 'Cours ou utilisateur non trouvé.' });
    }

    // Ajout de l'utilisateur au cours (si pas déjà inscrit)
    if (!course.students.includes(userId)) {
      course.students.push(userId);
      await course.save();
    }

    // Ajout du cours à l'utilisateur (si pas déjà ajouté)
    if (!user.courses.includes(courseId)) {
      user.courses.push(courseId);
      await user.save();
    }

    res.status(200).json({ message: 'Inscription réussie.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer les étudiants d'un cours
// @route   GET /api/courses/:courseId/students
// @access  Public
const getCourseStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('students', 'username email');
    // .populate('champ', 'champs_a_afficher')

    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé.' });
    }

    res.status(200).json(course.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  enrollUserInCourse,
  getCourseStudents,
};
