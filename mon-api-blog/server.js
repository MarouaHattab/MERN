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