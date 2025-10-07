const users = [];
const getAllUsers = (req, res) => {
    res.status(200).json({ message: "Récupération de tous les utilisateurs", success: true, users });
}

const createUser = (req, res) => {
    const userData = req.body;
    console.log('Données reçues par le controller:', userData);
    users.push({ id: Date.now(), ...userData });
    res.status(201).json({
        message: 'Utilisateur créé avec succès via controller!',
        user: { id: Date.now(), ...userData }
    });
}

module.exports = { getAllUsers, createUser };