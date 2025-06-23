// routes/chauffeur.routes.js
const express = require("express");
const router = express.Router();
const {
  createChauffeur,
  getChauffeurs,
  getChauffeurById,
  updateChauffeur,
  deleteChauffeur,
} = require("../controllers/chauffeur.controller");

const protect = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/role");

// Ici, toutes les routes Chauffeurs sont réservées aux admins
router.use(protect, isAdmin);

router.post("/", createChauffeur);
router.get("/", getChauffeurs);
router.get("/:id", getChauffeurById);
router.put("/:id", updateChauffeur);
router.delete("/:id", deleteChauffeur);

module.exports = router;
