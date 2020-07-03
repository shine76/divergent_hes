const express = require("express");
const router = express.Router();
const ctrlSurveys = require("../controllers/surveys");
const ctrlQuestions = require("../controllers/questions");
const ctrlFilieres = require("../controllers/filieres");
const ctrlSteps = require("../controllers/steps");

// surveys
router
  .route("/surveys")
  .get(ctrlSurveys.getSurveys)
  .post(ctrlSurveys.createSurvey);

// Get survey by id
router.route("/surveys/:surveyid").get(ctrlSurveys.getSurveyById);

// Get survey ids
//router.route("/surveys/:surveyid/ids").get(ctrlSurveys.getSurveyQuestionsIds);

// questions
router
  .route("/surveys/:surveyid/questions")
  .get(ctrlQuestions.getQuestions)
  .post(ctrlQuestions.createQuestion);

// Get one question
router.route("/questions/:questionid").get(ctrlQuestions.getQuestion);

// réponses

// Créer une nouvelle réponse
router
  .route("/questions/:questionid/reponses")
  .post(ctrlQuestions.responsesCreate);

// Create Steps
router.route("/questions/:questionid/steps").post(ctrlSteps.stepCreate);
router
  .route("/questions/:questionid/steps/:stepid/teacher")
  .post(ctrlSteps.teacherCreate);
router
  .route("/questions/:questionid/steps/:stepid/student")
  .post(ctrlSteps.studentCreate);

// Créer des réponses supplémentaires
router
  .route("/questions/:questionid/reponses/:responseid")
  .post(ctrlQuestions.supplementCreate);

// Filieres
router
  .route("/filieres")
  .get(ctrlFilieres.getFilieres)
  .post(ctrlFilieres.createFiliere);

router
  .route("/filieres/addscore/:filiereid")
  .patch(ctrlFilieres.addScoreToFiliere);

module.exports = router;
