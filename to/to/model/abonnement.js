const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Basic", "Premium", "Gold"],
    default: "Basic",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Abonnement", SubscriptionSchema);
