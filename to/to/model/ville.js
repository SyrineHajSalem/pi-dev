var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  nb_point_urban_move: {
    type: Number,
    default: "",
  },
  gouvernement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gouvernement",
  },
});
var ville = new mongoose.model("Ville", schema);
module.exports = ville;
