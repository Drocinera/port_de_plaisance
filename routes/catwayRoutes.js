const express = require('express');
const router = express.Router();
const CatwayController = require('../controllers/CatwayController');

// Routes CRUD pour les catways
router.post('/create', CatwayController.createCatway);
router.post('/update', CatwayController.updateCatway);
router.post('/delete', CatwayController.deleteCatway);
router.get('/details', CatwayController.getCatwayDetails);
router.get('/', CatwayController.getAllCatways);

module.exports = router;
