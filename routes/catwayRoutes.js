const express = require('express');
const router = express.Router();
const CatwayController = require('../controllers/catwayController.js');

// Routes CRUD pour les catways
router.post('/create', CatwayController.createCatway);
router.put('/:id', CatwayController.updateCatway);
router.patch('/:id', CatwayController.partialUpdateCatway);
router.delete('/:id', CatwayController.deleteCatway);
router.get('/details/:id',CatwayController.getCatwayById)
router.get('/', CatwayController.getAllCatways)


module.exports = router;