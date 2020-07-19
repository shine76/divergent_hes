const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  code: {
    type: String,
  },
  texte: {
    type: String,
  },
  pointsMin: {
    type: Number,
    default: 0,
  },
  pointsMax: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
