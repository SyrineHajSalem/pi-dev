var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phone: String,
  validationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
var user = new mongoose.model("User", schema);
module.exports = user;
