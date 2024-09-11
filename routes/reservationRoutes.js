const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');

// Routes CRUD pour les réservations
router.post('/create', ReservationController.createReservation);
router.delete('/:id', ReservationController.deleteReservation);
router.get('/details/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).send('Réservation non trouvée');
        res.render('reservationdetails', { reservation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('reservations', { reservations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
