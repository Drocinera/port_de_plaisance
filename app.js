const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté...'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Page d'accueil
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Port de Plaisance',
    description: 'Bienvenue sur l\'application de gestion de port de plaisance.',
    apiDocumentationLink: '/documentation'
  });
});

// Route pour la documentation
app.get('/documentation', (req, res) => {
  res.render('documentation', {
    title: 'Documentation de l\'API',
    apiDetails: 'Voici la documentation de l\'API...'
  });
});

// Route pour le tableau de bord (protégée)
app.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard', {
    title: 'Tableau de Bord'
  });
});

// Routes protégées pour Catways et Réservations
app.use('/catways', authMiddleware, catwayRoutes);
app.use('/reservations', authMiddleware, reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
