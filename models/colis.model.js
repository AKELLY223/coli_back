// models/colis.model.js
const mongoose = require("mongoose");

// Générateur maison de code suivi
function generateCode(length = 8) {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Formule de calcul du prix :
 * base fixe + tarif_kg × poids + tarif_km × distance + assurance × valeur
 */
function calculPrix(poids, distance, valeur) {
  const BASE = 1000; // XOF
  const TARIF_KG = 200; // XOF par kg
  const TARIF_KM = 50; // XOF par km
  const ASSURANCE_RATE = 0.02; // 2% de la valeur
  return (
    BASE + poids * TARIF_KG + distance * TARIF_KM + valeur * ASSURANCE_RATE
  );
}

const colisSchema = new mongoose.Schema({
  description: { type: String, required: true },
  poids: { type: Number, required: true },
  distance: { type: Number, required: true },
  valeur: { type: Number, required: true },
  prix: { type: Number },
  statut: {
    type: String,
    enum: ["enregistré", "encours", "arrivé"],
    default: "enregistré",
  },
  code_suivi: { type: String, unique: true },
  expediteur_nom: { type: String, required: true },
  expediteur_telephone: { type: String, required: true },
  destinataire_nom: { type: String, required: true },
  destinataire_telephone: { type: String, required: true },
  date_enregistrement: { type: Date, default: Date.now },
});

// Avant enregistrement : générer code_suivi et calculer prix
colisSchema.pre("save", async function (next) {
  if (this.isNew) {
    let code;
    let exists = true;
    while (exists) {
      code = generateCode();
      exists = await this.constructor.exists({ code_suivi: code });
    }
    this.code_suivi = code;
  }
  this.prix = calculPrix(this.poids, this.distance, this.valeur);
  next();
});

module.exports = mongoose.model("Colis", colisSchema);
