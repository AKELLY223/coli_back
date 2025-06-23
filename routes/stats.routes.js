const express = require("express");
const router = express.Router();

// import correct des middlewares :
const protect = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/role");

const { getRevenus } = require("../controllers/stats.controller");

// Toutes les routes stats sont réservées aux admins
router.get("/revenus", protect, isAdmin, getRevenus);

module.exports = router;
