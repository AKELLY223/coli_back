const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema(
  {
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mot_de_passe: { type: String, required: true },
    role: { type: String, enum: ["client", "admin"], default: "client" },
  },
  { timestamps: true }
);

// Hachage du mot de passe avant enregistrement
clientSchema.pre("save", async function (next) {
  if (!this.isModified("mot_de_passe")) return next();
  const salt = await bcrypt.genSalt(10);
  this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
  next();
});

// Méthode de comparaison de mot de passe
clientSchema.methods.matchPassword = function (passwordInput) {
  return bcrypt.compare(passwordInput, this.mot_de_passe);
};

module.exports = mongoose.model("Client", clientSchema);
