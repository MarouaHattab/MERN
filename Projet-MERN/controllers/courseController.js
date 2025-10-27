const course = require('../models/Course');

// Récupérer tous les cours
const getAllCourses = async (req, res) => {
    try {
        const courses = await course.find().populate('students', 'fullName email fieldOfStudy');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des cours', error: error.message });
    }
};

// Récupérer un cours par ID
const getCourseById = async (req, res) => {
    try {
        const foundCourse = await course.findById(req.params.id).populate('students', 'fullName email fieldOfStudy yearOfEnrollment');
        if (!foundCourse) {
            return res.status(404).json({ message: 'Cours non trouvé' });
        }
        res.status(200).json(foundCourse);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erreur lors de la récupération du cours avec l\'id ' + req.params.id, 
            error: error.message 
        });
    }
};

const createCourse = async (req, res) => {
    try {
        const newCourse = new course({
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            instructor: req.body.instructor,
        });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du cours', error: error.message });
    }
};
const deleteCourse = async (req, res) => {
    try {
        const Student = require('../models/Student');
        const deletedCourse = await course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Cours non trouvé' });
        }
        
        // Retirer ce cours de tous les étudiants inscrits
        await Student.updateMany(
            { courses: req.params.id },
            { $pull: { courses: req.params.id } }
        );
        
        res.status(200).json({ message: 'Cours supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du cours', error: error.message });
    }
};
const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await course.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Cours non trouvé' });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du cours', error: error.message });
    }
};

// Remplacer complètement un cours using PUT
const replaceCourse = async (req, res) => {
    try {
        const { title, description, duration, instructor } = req.body;
        
        if (!title || !description || !duration || !instructor) {
            return res.status(400).json({ 
                message: 'Tous les champs sont requis pour PUT (title, description, duration, instructor)' 
            });
        }

        const replacedCourse = await course.findByIdAndUpdate(
            req.params.id,
            { title, description, duration, instructor },
            { new: true, runValidators: true, overwrite: true }
        );
        
        if (!replacedCourse) {
            return res.status(404).json({ message: 'Cours non trouvé' });
        }
        res.status(200).json(replacedCourse);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erreur lors du remplacement du cours avec l\'id ' + req.params.id, 
            error: error.message 
        });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    deleteCourse,
    updateCourse,      // PATCH
    replaceCourse      // PUT
};