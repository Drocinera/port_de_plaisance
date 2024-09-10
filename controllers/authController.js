const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ name });
    if (existingUser) return res.status(400).json({ message: 'Nom d\'utilisateur déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Mot de passe haché:', hashedPassword);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  res.redirect('/login');
  
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: 'Identifiants incorrects' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Mot de passe en clair:', password);  // Mot de passe entré par l'utilisateur
console.log('Mot de passe haché depuis la DB:', user.password);  // Mot de passe haché de la DB

    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });
    console.log('Les mots de passe ne correspondent pas');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true });

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
