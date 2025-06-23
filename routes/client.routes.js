// routes/client.routes.js
const express = require("express");
const router = express.Router();

const {
  inscrireClient,
  connecterClient,
  profilClient,
  inscrireClientAdmin,
} = require("../controllers/client.controller");

const protect = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/role");

// ---------- Routes PUBLIQUES ----------
router.post("/register", inscrireClient); // POST /api/clients/register
router.post("/login", connecterClient); // POST /api/clients/login

// ---------- Routes PROTÉGÉES (token requis) ----------
router.get("/profile", protect, profilClient); // GET /api/clients/profile
router.get("/admin-only", protect, isAdmin, (req, res) => {
  res.json({ message: "Accès Admin OK" });
});
router.post("/register-admin", protect, isAdmin, inscrireClientAdmin);

module.exports = router;
