const mongoose = require('mongoose');
const { create } = require('./Student');
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre du cours est obligatoire'],
        minLength: [5, 'Le titre doit contenir au moins 5 caractères'],
    },
    description: {
        type: String,
        required: [true, 'La description du cours est obligatoire'],
        minLength: [20, 'La description doit contenir au moins 20 caractères'],
    },
    duration: {
        type: Number,
        required: [true, 'La durée du cours est obligatoire'],
        min: [1, 'La durée doit être d\'au moins 1 minute'],
    },
    instructor: {
        type: String,
        required: [true, 'Le nom de l\'instructeur est obligatoire'],
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Course', courseSchema);