const express = require('express');
const router = express.Router();
const CatwayController = require('../controllers/catwayController.js');

// Routes CRUD pour les catways
router.post('/create', CatwayController.createCatway);
router.put('/:id', CatwayController.updateCatway);
router.patch('/:id', CatwayController.partialUpdateCatway);
router.delete('/:id', CatwayController.deleteCatway);
router.get('/details/:id', async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).send('Catway non trouvé');
        res.render('catwaydetails', { catway });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catway', { catways });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;