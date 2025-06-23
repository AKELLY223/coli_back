const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  trajet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trajet",
    required: true,
  },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  passager_nom: { type: String, required: true },
  passager_prenom: { type: String, required: true },
  numero_billet: { type: String, required: true, unique: true },
  siege: { type: String, required: true },
  date_reservation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
