const mongoose = require("mongoose");
const Theme = require("../models/Theme");

// Create a new Theme
const createTheme = (req, res) => {
  // Creation d'un nouveau thème
  const newTheme = new Theme({
    nom: req.body.nom,
  });

  newTheme
    .save()
    .then((theme) => {
      res.json(theme);
    })
    .catch((error) => console.log(error));
};

// Get all thèmes
const getThemes = (req, res) => {
  Theme.find({}).then((themes) => {
    if (!themes) {
      console.log("pas de thèmes");
      res.status(404).json({ message: "themes non trouvés" });
    }
    res.status(200).json(themes);
  });
};

module.exports = {
  createTheme,
  getThemes,
};
