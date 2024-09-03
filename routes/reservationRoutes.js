const express = require('express');
const router = express.Router({ mergeParams: true });
const reservationController = require('../controllers/reservationController');

// CRUD pour les réservations
router.get('/', reservationController.getAllReservations);
router.get('/:idReservation', reservationController.getReservationById);
router.post('/', reservationController.createReservation);
router.delete('/:idReservation', reservationController.deleteReservation);

module.exports = router;
