const mongoose = require("mongoose");
const Feedback = require("../models/Feedback");

// Create a new feedback
const createFeedback = (req, res) => {
  // Creation d'une nouvelle filière
  const newFeedBack = new Feedback({
    code: req.body.code,
    texte: req.body.texte,
    pointsMin: req.body.pointsMin,
    pointsMax: req.body.pointsMax,
    status: req.body.status,
  });

  newFeedBack
    .save()
    .then((feedback) => {
      res.json(feedback);
    })
    .catch((error) => console.log(error));
};

// Get Feedback by code
const getFeedbackByCode = (req, res) => {
  Feedback.findOne({ code: req.params.fcode }).then((feedback) => {
    if (!feedback) {
      res.status(404).json("Feedback non trouvé");
    }
    res.status(200).json(feedback);
  });
};

// Edit Feedback

const updateFeedback = (req, res) => {
  // TODO
};

module.exports = {
  createFeedback,
  getFeedbackByCode,
  updateFeedback,
};
