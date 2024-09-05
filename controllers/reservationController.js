const Reservation = require('../models/Reservation');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReservationDetails = async (req, res) => {
  try {
    const reservationDetails = await Reservation.find(); 
    res.json(reservationDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation({ ...req.body, catwayNumber: req.params.id });
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!deletedReservation) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json({ message: "Réservation supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
