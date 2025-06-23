// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// 1️⃣ Connexion à MongoDB
connectDB();

// 2️⃣ Middlewares globaux
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// 3️⃣ Routes Auth & Utilisateurs
app.use("/api/clients", require("./routes/client.routes"));

// 4️⃣ Routes Colis
app.use("/api/colis", require("./routes/colis.routes"));

// 5️⃣ Routes Admin
app.use("/api/admin/bus", require("./routes/bus.routes"));
app.use("/api/admin/chauffeurs", require("./routes/chauffeur.routes"));
app.use("/api/admin/trajets", require("./routes/trajet.routes"));
app.use("/api/admin/reservations", require("./routes/reservation.routes"));
app.use("/api/admin/villes", require("./routes/ville.routes"));
app.use("/api/admin/stats", require("./routes/stats.routes"));

// 6️⃣ Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
