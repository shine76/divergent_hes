const mongoose = require("mongoose");
const Step = require("../models/Step");
const Question = require("../models/Question");

// Create a new Step
const stepCreate = (req, res) => {
  const questionid = req.params.questionid;
  if (questionid) {
    Question.findById(questionid).then((question) => {
      if (question.type === false) {
        const newStep = new Step({
          question: questionid,
          titre: req.body.titre,
        });
        newStep.save().then((step) => {
          res.status(200).json(step);
        });
      } else {
        res.status(400).json({
          message: "Pas possible de créer un step pour cette question",
        });
      }
    });
  }
};

// Add teacher texts to step
const teacherCreate = (req, res) => {
  const stepid = req.params.stepid;
  if (stepid) {
    Step.findById(stepid)
      .select(["teacher"])
      .then((step) => {
        doAddTeacher(req, res, step);
      });
  }
};

// Add teacher texts to step
const studentCreate = (req, res) => {
  const stepid = req.params.stepid;
  if (stepid) {
    Step.findById(stepid)
      .select(["student"])
      .then((step) => {
        doAddStudent(req, res, step);
      });
  }
};

module.exports = {
  stepCreate,
  teacherCreate,
  studentCreate,
};

// Internal functions
const doAddTeacher = (req, res, step) => {
  console.log(req.body);

  const { text, studentNext, askQuestion } = req.body;

  step.teacher.push({
    text,
    studentNext: studentNext === "T" ? true : false,
    askQuestion: askQuestion === "T" ? true : false,
  });
  step.save().then((step) => {
    res.json(step);
  });
};

const doAddStudent = (req, res, step) => {
  const { text, teacherNext, askQuestion } = req.body;
  step.student.push({
    text,
    teacherNext: teacherNext === "T" ? true : false,
    askQuestion: askQuestion === "T" ? true : false,
  });
  step.save().then((step) => {
    res.json(step);
  });
};
