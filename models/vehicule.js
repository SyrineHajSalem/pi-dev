const mongoose = require("mongoose");
const vehiculeSchema = new mongoose.Schema(
  {
    id_vehicule: String,
    marque: String,
    modele: String,
    etats: Object,
    available: Boolean,
    prixparjour:Number,
    type: {
      type: String,
      enum: ['trottinet', 'scooter'], // Enum validation
    },
  },
  {
    timestamps: true,
  }
);
const vehicule = mongoose.model("vehicule", vehiculeSchema);
module.exports = vehicule;
