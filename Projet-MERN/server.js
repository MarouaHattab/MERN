require('dotenv').config();
const express = require('express');
const app=express();
const port=process.env.PORT
const connectDB = require('./config/db');
const studentRoutes = require('./routes/StudentRoutes');
const courseRoutes = require('./routes/CourseRoutes');
// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
connectDB();
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});