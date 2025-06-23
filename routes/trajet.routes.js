// routes/trajet.routes.js
const express = require("express");
const router = express.Router();
const {
  createTrajet,
  getTrajets,
  getTrajetById,
  updateTrajet,
  deleteTrajet,
} = require("../controllers/trajet.controller");

// import correct des middlewares :
const protect = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/role");

router.use(protect, isAdmin);

router.post("/", createTrajet);
router.get("/", getTrajets);
router.get("/:id", getTrajetById);
router.put("/:id", updateTrajet);
router.delete("/:id", deleteTrajet);

module.exports = router;
