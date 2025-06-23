const express = require("express");
const router = express.Router();

const {
  creerColis,
  getAllColis,
  getColisById,
  getColisByCode,
  updateStatutColis,
  updateColis,
} = require("../controllers/colis.controller");

// Créer un nouveau colis
router.post("/", creerColis);

// Lister tous les colis
router.get("/", getAllColis);

// Récupérer un colis par ID
router.get("/:id", getColisById);

// --- Nouvelle route : récupérer un colis par code de suivi
router.get("/code/:code", getColisByCode);

// Mettre à jour le statut du colis (enregistré → encours → arrivé)
router.put("/:id/statut", updateStatutColis);

// Mettre à jour n'importe quel champ du colis
router.put("/:id", updateColis);

module.exports = router;
