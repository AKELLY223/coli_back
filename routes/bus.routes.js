// routes/bus.routes.js
const express = require("express");
const router = express.Router();
const {
  createBus,
  getBuses,
  getBusById,
  updateBus,
  deleteBus,
} = require("../controllers/bus.controller");

// import correct des middlewares :
const protect = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/role");

// Toutes ces routes sont accessibles uniquement aux admins
router.use(protect, isAdmin);

// CRUD Bus
router.post("/", createBus);
router.get("/", getBuses);
router.get("/:id", getBusById);
router.put("/:id", updateBus);
router.delete("/:id", deleteBus);

module.exports = router;
