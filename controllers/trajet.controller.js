// controllers/trajet.controller.js
const Trajet = require("../models/trajet.model");

// Create trajet
exports.createTrajet = async (req, res) => {
  try {
    const t = await Trajet.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all trajets
exports.getTrajets = async (req, res) => {
  try {
    const list = await Trajet.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get trajet by ID
exports.getTrajetById = async (req, res) => {
  try {
    const t = await Trajet.findById(req.params.id);
    if (!t) return res.status(404).json({ message: "Trajet non trouvé" });
    res.json(t);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update trajet
exports.updateTrajet = async (req, res) => {
  try {
    const t = await Trajet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!t) return res.status(404).json({ message: "Trajet non trouvé" });
    res.json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete trajet
exports.deleteTrajet = async (req, res) => {
  try {
    const t = await Trajet.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ message: "Trajet supprimé" });
    res.json({ message: "Trajet supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
