const mongoose = require("mongoose");
const Survey = require("../models/Survey");
const Question = require("../models/Question");
const Response = require("../models/Reponse");
const Step = require("../models/Step");

// Create one question for a survey
const createQuestion = (req, res) => {
  const surveyid = req.params.surveyid;
  console.log(req.body);
  console.log(req.body.type === "F" ? false : true);
  if (surveyid) {
    Survey.findById(surveyid).then((survey) => {
      const newQuestion = new Question({
        survey: survey,
        titre: req.body.titre,
        description: req.body.description,
        maxPoints: req.body.maxPoints,
        type: req.body.type === "F" ? false : true,
      });
      newQuestion.save().then((question) => {
        res.json(question);
      });
    });
  }
};

// Get questions of a survey
const getQuestions = (req, res) => {
  const surveyid = req.params.surveyid;
  if (surveyid) {
    Question.find({ survey: surveyid }).then((questions) => {
      res.json(questions);
    });
  }
};

// get One question from a survey
const getQuestion = (req, res) => {
  const questionid = req.params.questionid;
  Question.findById(questionid).then((question) => {
    if (question.type) {
      Response.find({ question: questionid }).then((responses) => {
        return res.json({ question, responses });
      });
    } else {
      Step.find({ question: questionid })
        .sort({ date: 1 })
        .then((steps) => {
          Response.find({ question: questionid }).then((responses) => {
            return res.json({ question, steps, responses });
          });
        });
    }
  });
};

const responsesCreate = (req, res) => {
  const questionid = req.params.questionid;
  if (questionid) {
    Question.findById(questionid).then((question) => {
      const newResponse = new Response({
        question: questionid,
        code: req.body.code,
        texte: req.body.texte,
        points: req.body.points,
        notes: req.body.notes,
      });
      newResponse.save().then((response) => {
        res.status(200).json(response);
      });
      //doAddResponses(req, res, question);
    });
  }
};

const supplementCreate = (req, res) => {
  const responseid = req.params.responseid;
  if (responseid) {
    Response.findById(responseid)
      .select(["supplement", "supplementResponses"])
      .then((response) => {
        console.log(response);
        if (response.supplement) {
          doAddSupplement(req, res, response);
        }
      });
  }
  //res.json("Create supplements");
};

module.exports = {
  createQuestion,
  getQuestions,
  responsesCreate,
  getQuestion,
  supplementCreate,
};

// Internal functions
const doAddSupplement = (req, res, response) => {
  const { code, texte, points, notes } = req.body;
  response.supplementResponses.push({
    code,
    texte,
    points,
    notes,
  });
  console.log(req.body);
  response.save().then((response) => {
    res.json(response);
  });
};

/* const doAddSupplement = (req, res, supplements) => {
  const {
    code,
    texte,
    points,
    notes,
    supplement,
  } = req.body.supplementQuestions;

  supplements.map((supplement) => {
    console.log(supplement);
  });
  console.log(this);
};
 */
