const users = [];
const getAllUsers = (req, res) => {
    res.status(200).json({ message: "Recuperation de tous les utilisateurs", success: true, users });
}

const createUser = (req, res) => {
    const userData = req.body;
    console.log('Donnees reçues par le controller:', userData);
    users.push({ id: Date.now(), ...userData });
    res.status(201).json({
        message: 'Utilisateur cree avec succes via controller!',
        user: { id: Date.now(), ...userData }
    });
}

module.exports = { getAllUsers, createUser };