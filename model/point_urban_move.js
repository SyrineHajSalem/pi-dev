var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  adresse: {
    type: String,
    default: "",
  },
  ville: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ville",
  },
});
var point_urban_move = new mongoose.model("Point_urban_move", schema);
module.exports = point_urban_move;
