// routes/reservation.routes.js
const express = require("express");
const router = express.Router();
const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservation.controller");

// import correct des middlewares :
const protect = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/role");

// Les clients peuvent créer et voir leurs réservations, admins peuvent tout gérer
router.post("/", protect, createReservation);
router.get("/", protect, getReservations);
router.get("/:id", protect, getReservationById);
router.put("/:id", protect, updateReservation);
router.delete("/:id", protect, deleteReservation);

module.exports = router;
