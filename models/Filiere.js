const mongoose = require("mongoose");

const { Schema } = mongoose;

const filiereSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const Filiere = mongoose.model("Filiere", filiereSchema);

module.exports = Filiere;
