// controllers/reservation.controller.js
const Reservation = require("../models/reservation.model");

// Create reservation
exports.createReservation = async (req, res) => {
  try {
    const r = await Reservation.create(req.body);
    res.status(201).json(r);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const list = await Reservation.find().populate("trajet bus");
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const r = await Reservation.findById(req.params.id).populate("trajet bus");
    if (!r) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(r);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update reservation
exports.updateReservation = async (req, res) => {
  try {
    const r = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!r) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(r);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    const r = await Reservation.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: "Réservation supprimée" });
    res.json({ message: "Réservation supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
