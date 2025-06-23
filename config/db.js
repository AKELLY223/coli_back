// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("✅ MongoDB connecté !");
  } catch (err) {
    console.error("❌ Échec de la connexion MongoDB :", err);
    process.exit(1);
  }
};

module.exports = connectDB;
