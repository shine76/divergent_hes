const mongoose = require("mongoose");

const { Schema } = mongoose;

const supplementSchema = new Schema({
  code: {
    type: String,
  },
  texte: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
  },
});

const responsesSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  code: {
    type: String,
  },
  texte: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
  },
  supplement: {
    type: Boolean,
    default: false,
  },
  supplementResponses: [supplementSchema],
});

const Response = mongoose.model("Response", responsesSchema);

module.exports = Response;
