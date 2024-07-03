var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  nombre_ville: {
    type: Number,
    default: "",
  },
  villes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ville",
  }],
});
var gouvernement = new mongoose.model("Gouvernement", schema);
module.exports = gouvernement;
