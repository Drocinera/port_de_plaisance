const express = require('express');
const router = express.Router();
const CatwayController = require('../controllers/catwayController.js');

router.post('/create', CatwayController.createCatway);
router.post('/update', CatwayController.updateCatway);
router.post('/delete', CatwayController.deleteCatway);
router.get('/details',CatwayController.getCatwayById)
router.get('/list', CatwayController.getAllCatways)


module.exports = router;