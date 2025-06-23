const Client = require("../models/client.model");
const jwt = require("jsonwebtoken");

// Génère un token JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Inscription (client par défaut)
exports.inscrireClient = async (req, res) => {
  try {
    const { prenom, nom, email, mot_de_passe } = req.body;
    const exists = await Client.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email déjà utilisé" });
    const client = await Client.create({ prenom, nom, email, mot_de_passe });
    return res.status(201).json({
      _id: client._id,
      prenom: client.prenom,
      nom: client.nom,
      email: client.email,
      role: client.role,
      token: generateToken(client._id),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Connexion
exports.connecterClient = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const client = await Client.findOne({ email });
    if (!client)
      return res.status(401).json({ message: "Identifiants invalides" });
    const isMatch = await client.matchPassword(mot_de_passe);
    if (!isMatch)
      return res.status(401).json({ message: "Identifiants invalides" });
    return res.json({
      _id: client._id,
      prenom: client.prenom,
      nom: client.nom,
      email: client.email,
      role: client.role,
      token: generateToken(client._id),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Profil protégé
exports.profilClient = async (req, res) => {
  const client = req.client;
  res.json({
    _id: client._id,
    prenom: client.prenom,
    nom: client.nom,
    email: client.email,
    role: client.role,
  });
};

exports.inscrireClientAdmin = async (req, res) => {
  const { prenom, nom, email, mot_de_passe } = req.body;
  try {
    if (await Client.findOne({ email })) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    // création avec role = 'admin'
    const admin = await Client.create({
      prenom,
      nom,
      email,
      mot_de_passe,
      role: "admin",
    });
    res.status(201).json({ _id: admin._id, prenom, nom, email, role: "admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
