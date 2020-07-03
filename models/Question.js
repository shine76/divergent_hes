const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema({
  survey: {
    type: Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
  type: {
    type: Boolean,
    default: true,
  },
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  maxPoints: {
    type: Number,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
