const mongoose = require("mongoose");
const Filiere = require("../models/Filiere");

// Create a new survey
const createFiliere = (req, res) => {
  // Creation d'une nouvelle filière
  const newFiliere = new Filiere({
    nom: req.body.nom,
  });

  newFiliere
    .save()
    .then((filiere) => {
      res.json(filiere);
    })
    .catch((error) => console.log(error));
};

// Get all filiere
const getFilieres = (req, res) => {
  Filiere.find({})
    .sort({ score: -1 })
    .then((filieres) => {
      if (!filieres) {
        console.log("pas fil");
        res.status(404).json({ message: "Filieres non trouvées" });
      }
      res.status(200).json(filieres);
    });
};

// Ajouter un score à une filière

const addScoreToFiliere = (req, res) => {
  const newscore = req.body.score;
  console.log(req.body);
  Filiere.findById(req.params.filiereid).then((filiere) => {
    if (!filiere) {
      res.status(404).json({ message: "Filière recherchée non trouvée" });
    }
    filiere.score += parseInt(newscore);
    filiere.save().then((filiere) => res.json(filiere));
  });
};

module.exports = {
  createFiliere,
  getFilieres,
  addScoreToFiliere,
};
