const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Accès non autorisé, token manquant' });

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expiré' });
    } else if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Token invalide' });
    } else {
      res.status(401).json({ message: 'Erreur d\'authentification' });
    }
  }
};

module.exports = authMiddleware;

