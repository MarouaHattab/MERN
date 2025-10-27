const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        required:[true,'Le nom est obligatoire'],
        minLength:[9,'Le nom doit contenir au moins 9 caractères'],
    },
    email: {
        type: String,
        required: true,
        required:[true,'L\'email est obligatoire'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Veuillez entrer un email valide"]
    },
   
    fieldOfStudy: {
        type: String,
        required:[true,'Le domaine d\'étude est obligatoire']
    },
    yearOfEnrollment: {
        type: Number,
        required:[true,'L\'année d\'inscription est obligatoire']
        //l'année doit etre un nombre entre 2000 et l'annee en cours
        ,min:[2011,'L\'année d\'inscription doit etre supérieure ou egale a 2011'],
        max:[new Date().getFullYear(),'L\'annee d\'inscription ne peut pas etre dans le futur']
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);