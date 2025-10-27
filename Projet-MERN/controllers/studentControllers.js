const Student = require('../models/Student');

// Récupérer tous les étudiants
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('courses', 'title description duration');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erreur lors de la récupération des étudiants',
            error: error.message });
    }
};
// Recuperer un etudiant par ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('courses', 'title description duration instructor');
        if (!student) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l\'étudiant qui a l\'id ' + req.params.id,
            error: error.message
        });
    }
};
// Créer un nouvel étudiant
const createStudent = async (req, res) => {

    try{
        const newStudent = new Student({
            fullName: req.body.fullName,
            email: req.body.email,
            fieldOfStudy: req.body.fieldOfStudy,
            yearOfEnrollment: req.body.yearOfEnrollment
        });
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    }catch(error){
        res.status(500).json({
            message: 'Erreur lors de la création de l\'etudiant',
            error: error.message
        });
    }
}
// supprimer un étudiant
const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'etudiant non trouve' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la suppression de l\'etudiant qui a l\'id ' + req.params.id,
            error: error.message
        });
    }
};

// Mettre à jour partiellement un étudiant using PATCH
const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'etudiant non trouve' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la mise a jour de l\'etudiant qui a l\'id ' + req.params.id,
            error: error.message
        });
    }
};

// Remplacer complètement un étudiant using PUT
const replaceStudent = async (req, res) => {
    try {
        // Vérifier que tous les champs requis sont présents
        const { fullName, email, fieldOfStudy, yearOfEnrollment } = req.body;
        
        if (!fullName || !email || !fieldOfStudy || !yearOfEnrollment) {
            return res.status(400).json({ 
                message: 'Tous les champs sont requis pour PUT (fullName, email, fieldOfStudy, yearOfEnrollment)' 
            });
        }

        const replacedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { fullName, email, fieldOfStudy, yearOfEnrollment },
            { new: true, runValidators: true, overwrite: true }
        );
        
        if (!replacedStudent) {
            return res.status(404).json({ message: 'etudiant non trouve' });
        }
        res.status(200).json(replacedStudent);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors du remplacement de l\'etudiant qui a l\'id ' + req.params.id,
            error: error.message
        });
    }
};

// Inscrire un étudiant à un cours
const enrollStudentInCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.params;
        const Course = require('../models/Course');
        
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);
        
        if (!student) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        if (!course) {
            return res.status(404).json({ message: 'Cours non trouvé' });
        }
        
        // Vérifier si l'étudiant est déjà inscrit
        if (student.courses.includes(courseId)) {
            return res.status(400).json({ message: 'L\'étudiant est déjà inscrit à ce cours' });
        }
        
        // Ajouter le cours à l'étudiant et l'étudiant au cours
        student.courses.push(courseId);
        course.students.push(studentId);
        
        await student.save();
        await course.save();
        
        res.status(200).json({ 
            message: 'Étudiant inscrit au cours avec succès',
            student: await Student.findById(studentId).populate('courses')
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de l\'inscription de l\'étudiant au cours',
            error: error.message
        });
    }
};

// Désinscrire un étudiant d'un cours
const unenrollStudentFromCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.params;
        const Course = require('../models/Course');
        
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);
        
        if (!student) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        if (!course) {
            return res.status(404).json({ message: 'Cours non trouvé' });
        }
        
        // Retirer le cours de l'étudiant et l'étudiant du cours
        student.courses = student.courses.filter(id => id.toString() !== courseId);
        course.students = course.students.filter(id => id.toString() !== studentId);
        
        await student.save();
        await course.save();
        
        res.status(200).json({ 
            message: 'Étudiant désinscrit du cours avec succès',
            student: await Student.findById(studentId).populate('courses')
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la désinscription de l\'étudiant du cours',
            error: error.message
        });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudent,      // PATCH
    replaceStudent,     // PUT
    enrollStudentInCourse,
    unenrollStudentFromCourse
};