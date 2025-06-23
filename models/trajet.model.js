const mongoose = require("mongoose");

const trajetSchema = new mongoose.Schema(
  {
    ville_depart: { type: String, required: true },
    ville_arrivee: { type: String, required: true },
    prix: { type: Number, required: true },
    horaire: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trajet", trajetSchema);
