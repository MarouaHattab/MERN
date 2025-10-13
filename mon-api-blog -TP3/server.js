const express = require('express');
const app = express();
const PORT = 3000;
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
// --- Routes GET ---
app.get('/', (req, res) => {
    res.status(200).send('<h1>Page d\'accueil de notre API de Blog !</h1>');
});


app.use('/api/articles', articleRoutes);
// --- Lancement du serveur ---
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);  
});