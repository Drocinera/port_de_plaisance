const express = require('express');
const router = express.Router();
const CatwayController = require('../controllers/catwayController.js');

// Routes CRUD pour les catways
router.get('/', CatwayController.getAllCatways);
router.get('/:id', CatwayController.getCatwayById);
router.post('/', CatwayController.createCatway);
router.put('/:id', CatwayController.updateCatway);
router.patch('/:id', CatwayController.partialUpdateCatway);
router.delete('/:id', CatwayController.deleteCatway);

module.exports = router;