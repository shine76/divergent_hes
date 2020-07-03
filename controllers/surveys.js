const mongoose = require("mongoose");
const Survey = require("../models/Survey");
const Question = require("../models/Question");

// Get all surveys
const getSurveys = (req, res) => {
  Survey.find({}).then((surveys) => {
    res.json(surveys);
  });
};

// Create a new survey
const createSurvey = (req, res) => {
  // Creation d'un nouveau survey
  const newSurvey = new Survey({
    titre: req.body.titre,
    description: req.body.description,
  });

  newSurvey
    .save()
    .then((survey) => {
      res.json(survey);
    })
    .catch((error) => console.log(error));
};

const getSurveyById = (req, res) => {
  Survey.findById(req.params.surveyid).then((survey) => {
    Question.find({ survey: req.params.surveyid }).then((questions) => {
      res.json({
        surveyinfos: survey,
        questionsids: formatQuestionsId(questions),
        qlength: formatQuestionsId(questions).length,
      });
    });
  });
};

module.exports = {
  getSurveys,
  createSurvey,
  getSurveyById,
  // getSurveyQuestionsIds,
};

formatQuestionsId = (data) => {
  let questionsids = [];
  data.map((q) => {
    questionsids.push(q._id);
  });
  return questionsids;
};

/* const getSurveyQuestionsIds = (req, res) => {
  Survey.findById(req.params.surveyid).then((survey) => {
    Question.find({ survey: req.params.surveyid })
      .select("id")
      .then((questions) => {
        res.json(formatQuestionsId(questions));
      });
  });
}; */
