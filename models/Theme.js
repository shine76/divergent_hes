const mongoose = require("mongoose");

const { Schema } = mongoose;

const themeSchema = new Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  nbEval: {
    type: Number,
    default: 0,
  },
});

const Theme = mongoose.model("Theme", themeSchema);

module.exports = Theme;
