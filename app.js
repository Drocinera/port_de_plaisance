const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté...'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Page d'accueil protégé
app.get('/', authMiddleware, (req, res) => {
  res.render('dashboard', {
    title: 'Port de Plaisance',
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

app.get('/login', (req, res) => {
  res.render('index', {
    title: 'Page d\'authentification',
    description: 'Bienvenue sur l\'application de gestion de port de plaisance. Une fois connecter, elle vous permettra de faire des réservation, de vérifier vos Catway et vos clients.',
  });
});

// Routes protégées pour Catways et Réservations
app.use('/catways', authMiddleware, catwayRoutes);
app.use('/reservations', authMiddleware, reservationRoutes);

const authRoutes = require('./routes/authRoutes'); 
app.use(authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});


/*my ip : 90.49.236.239/32*/