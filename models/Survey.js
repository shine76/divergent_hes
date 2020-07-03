const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
