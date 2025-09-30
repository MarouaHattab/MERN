const express = require('express');
const app = express();
const PORT = 3000;

// --- Middleware JSON ---
app.use(express.json());

// --- Routes GET ---
app.get('/', (req, res) => {
    res.status(200).send('<h1>Page d\'accueil de notre API de Blog !</h1>');
});

app.get('/api/test', (req, res) => {
    res.status(200).json({ 
        message: 'Le test a fonctionné !', 
        success: true  
    });
});

app.get('/about', (req, res) => {
    res.status(200).json({
        app: 'API de blog',
        version: '1.0.0',
        description: 'API simple pour Atelier MERN'
    });
});

// app.get('/api/users', (req, res) => {
//     res.status(200).json({
//         users: [
//             { id: 1, nom: "Maroua", email: "maroua@gmail.com" },
//             { id: 2, nom: "Sarra", email: "sarra@gmail.com" }
//         ]
//     });
// });


// ----- Version plus propre de /api/users plus ameliorée -----
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, nom: "Maroua", email: "maroua@gmail.com" },
        { id: 2, nom: "Sarra", email: "sarra@gmail.com" },
        { id: 3, nom: "Ahmed", email: "ahmed@gmail.com" }
    ];
    res.status(200).json({ 
        count: users.length,  // Nombre d'utilisateurs
        users: users 
    });
});

// Définition d'une route GET avec un paramètre dynamique ":id"
app.get('/api/users/:id', (req, res) => {
    
    // Tableau statique d'utilisateurs (id, nom, email)
    const users = [
        { id: 1, nom: "Maroua", email: "maroua@gmail.com" },
        { id: 2, nom: "Sarra", email: "sarra@gmail.com" },
        { id: 3, nom: "Ahmed", email: "ahmed@gmail.com" }
    ];
// Ancienne solution (moins précise car req.params.id est une string)
// const user = users.filter(u => u.id === req.params.id);

// Nouvelle solution correcte : on convertit l'ID en nombre et on utilise une comparaison stricte
// ✅ Cette approche est correcte car req.params.id est de type string par défaut
const user = users.filter(u => u.id === parseInt(req.params.id));


    // Verifie si un utilisateur a été trouvé
    if (user.length > 0) {
        // Si trouvé, retourne le premier utilisateur trouvé avec un statut HTTP 200 (OK)
        res.status(200).json({ user: user[0] });
    } else {
        // Sinon, retourne un message d'erreur avec un statut HTTP 404 (Not Found)
        res.status(404).json({ message: 'Utilisateur non trouve' });
    }
});
// id fournisseur , id ,nom , prix , get => tableau filtere un fouriceur donéé et prix ( a9el men prix donné )

// Définition d'une route GET avec deux paramètres dynamiques dans l'URL : fournisseurId et prixMax
app.get('/api/produits/:fournisseurId/:prixMax', (req, res) => {

    // Tableau statique de produits avec id, nom, fournisseurId et prix
    const produits = [
        { id: 1, nom: "Produit A", fournisseurId: 1, prix: 50 },
        { id: 2, nom: "Produit B", fournisseurId: 2, prix: 150 },
        { id: 3, nom: "Produit E", fournisseurId: 1, prix: 200 },
        { id: 4, nom: "Produit C", fournisseurId: 1, prix: 20 },
        { id: 5, nom: "Produit D", fournisseurId: 3, prix: 80 }
    ];

    // Récupération du fournisseurId depuis l'URL et conversion en nombre entier
    const fournisseurId = parseInt(req.params.fournisseurId);

    // Récupération du prixMax depuis l'URL et conversion en nombre flottant
    const prixMax = parseFloat(req.params.prixMax);

    // Filtrage des produits correspondant au fournisseurId et ayant un prix inférieur à prixMax
    const produitsFiltres = produits.filter(p => p.fournisseurId === fournisseurId && p.prix < prixMax);

    // Vérifie si au moins un produit correspond aux critères
    if (produitsFiltres.length > 0) {
        // Si oui, retourne la liste des produits filtrés avec un statut HTTP 200
        res.status(200).json({ produits: produitsFiltres });
    } else {
        // Sinon, retourne un message d'erreur avec un statut HTTP 404
        res.status(404).json({ message: 'Aucun produit ne correspond aux critères' });
    }
});


// --- Routes POST ---
app.post('/api/articles', (req, res) => {
    const articleData = req.body;
    console.log('Données reçues :', articleData);
    
    res.status(201).json({
        message: 'Article créé avec succès !',
        article: { id: Date.now(), ...articleData }
    });
});



// app.post('/contact', (req, res) => {
//     const contactData = req.body;
//     const email = contactData.email;  
//     const message = contactData.message;  
    
//     res.status(200).json({
//         message: `Message reçu de ${email} : ${message}`
//     });
// });
// ----- Version plus propre de /contact -----
app.post('/contact', (req, res) => {
    // Déstructuration : extraction directe des propriétés email et message
    const { email, message } = req.body;
    
    // Validation des données reçues
    if (!email || !message) {
        // Si email ou message est manquant, retourne une erreur 400 (Bad Request)
        return res.status(400).json({ 
            error: 'Email et message sont requis',
            success: false
        });
    }
    
    // Validation basique du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: 'Format d\'email invalide',
            success: false
        });
    }
    
    // Vérification de la longueur minimale du message
    if (message.length < 10) {
        return res.status(400).json({ 
            error: 'Le message doit contenir au moins 10 caractères',
            success: false
        });
    }
    
    // Si toutes les validations passent, envoi de la réponse de succès
    console.log(`Nouveau message de contact reçu de ${email}`);
    
    res.status(200).json({
        message: `Message reçu de ${email} : ${message}`,
        success: true,
        receivedAt: new Date().toISOString()  // Horodatage de la réception
    });
});


// --- Lancement du serveur ---
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);  
});