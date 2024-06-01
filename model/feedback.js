const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
