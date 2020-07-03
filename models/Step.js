const mongoose = require("mongoose");

const { Schema } = mongoose;

const teacherSchema = new Schema({
  text: {
    type: String,
  },
  studentNext: {
    type: Boolean,
    default: false,
  },
  askQuestion: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const studentSchema = new Schema({
  text: {
    type: String,
  },
  teacherNext: {
    type: Boolean,
    default: false,
  },
  askQuestion: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const stepSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  titre: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  teacher: [teacherSchema],
  student: [studentSchema],
});

const Step = mongoose.model("Step", stepSchema);

module.exports = Step;
