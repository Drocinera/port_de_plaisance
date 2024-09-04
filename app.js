const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté...'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
const catwayRoutes = require('./routes/catwayRoutes');
// Routes protégées
app.use('/catways', authMiddleware, catwayRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
