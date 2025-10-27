const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Le nom d'utilisateur est obligatoire"],
            unique: true,
            trim: true,
            minlength: [3, "Le nom d'utilisateur doit contenir au moins 3 caractères"],
            maxlength: [30, "Le nom d'utilisateur ne peut pas dépasser 30 caractères"]
        },
        email: {
            type: String,
            required: [true, "L'email est obligatoire"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Veuillez entrer un email valide"]
        },
        password: {
            type: String,
            required: [true, "Le mot de passe est obligatoire"],
            minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"]
        }
    },
    {
        timestamps: true // Ajoute automatiquement createdAt et updatedAt
    }
);

// Export du modèle
module.exports = mongoose.model('User', userSchema);