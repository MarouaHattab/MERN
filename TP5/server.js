require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Connexion à la base de données
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API MERN TP5 - Gestion de cours' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});