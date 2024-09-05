const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');

// Routes CRUD pour les réservations
router.post('/create', ReservationController.createReservation);
router.post('/delete', ReservationController.deleteReservation);
router.get('/details', ReservationController.getReservationDetails);
router.get('/', ReservationController.getAllReservations);

module.exports = router;
