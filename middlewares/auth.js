const jwt = require("jsonwebtoken");
const Client = require("../models/client.model");

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.client = await Client.findById(decoded.id).select("-mot_de_passe");
      return next();
    } catch {
      return res.status(401).json({ message: "Token invalide" });
    }
  }
  res.status(401).json({ message: "Token manquant" });
};
