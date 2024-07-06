var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  age: {
    type: Number,
    default: "",
  },
  genre: {
    type: String,
    enum: ["Homme", "Femme"],
    default: "Homme",
  },
  phone: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["client", "admin"],
    default: "client",
  },
  gouvernerat: {
    type: String,
    default: "",
  },
  phone: String,
  validationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

schema.statics.getNumberOfUsersByGenre = function () {
  return this.aggregate([
    {
      $group: {
        _id: "$genre",
        count: { $sum: 1 },
      },
    },
  ]);
};

schema.statics.getNumberOfUsersByAge = function () {
  return this.aggregate([
    {
      $group: {
        _id: "$age",
        count: { $sum: 1 },
      },
    },
  ]);
};

schema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
var user = mongoose.model("User", schema);
module.exports = user;
