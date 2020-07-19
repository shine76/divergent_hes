const express = require("express");
const router = express.Router();
const ctrlSurveys = require("../controllers/surveys");
const ctrlQuestions = require("../controllers/questions");
const ctrlFilieres = require("../controllers/filieres");
const ctrlSteps = require("../controllers/steps");
const ctrlUsers = require("../controllers/users");
const ctrlFeedbacks = require("../controllers/feedbacks");
const passport = require("passport");

// surveys
router
  .route("/surveys")
  .get(ctrlSurveys.getSurveys)
  .post(
    passport.authenticate("jwt", { session: false }),
    ctrlSurveys.createSurvey
  );

// Get survey by id
router.route("/surveys/:surveyid").get(ctrlSurveys.getSurveyById);

// Get survey ids
//router.route("/surveys/:surveyid/ids").get(ctrlSurveys.getSurveyQuestionsIds);

// questions
router
  .route("/surveys/:surveyid/questions")
  .get(ctrlQuestions.getQuestions)
  .post(
    passport.authenticate("jwt", { session: false }),
    ctrlQuestions.createQuestion
  );

// Get one question
router.route("/questions/:questionid").get(ctrlQuestions.getQuestion);

// réponses

// Créer une nouvelle réponse
router
  .route("/questions/:questionid/reponses")
  .post(
    passport.authenticate("jwt", { session: false }),
    ctrlQuestions.responsesCreate
  );

// Create Steps
router.route("/questions/:questionid/steps").post(ctrlSteps.stepCreate);

router
  .route("/questions/:questionid/steps/:stepid/teacher")
  .post(
    passport.authenticate("jwt", { session: false }),
    ctrlSteps.teacherCreate
  );

router
  .route("/questions/:questionid/steps/:stepid/student")
  .post(
    passport.authenticate("jwt", { session: false }),
    ctrlSteps.studentCreate
  );

// Créer des réponses supplémentaires
router
  .route("/questions/:questionid/reponses/:responseid")
  .post(
    passport.authenticate("jwt", { session: false }),
    ctrlQuestions.supplementCreate
  );

// Filieres
router
  .route("/filieres")
  .get(ctrlFilieres.getFilieres)
  .post(
    passport.authenticate("jwt", { session: false }),
    ctrlFilieres.createFiliere
  );

router
  .route("/filieres/addscore/:filiereid")
  .patch(ctrlFilieres.addScoreToFiliere);

// Register user
router.route("/users/register").post(ctrlUsers.registerUser);
// user login
router.route("/users/login").post(ctrlUsers.loginUser);

// Feedbacks
router
  .route("/feedbacks")
  .post(
    passport.authenticate("jwt", { session: false }),
    ctrlFeedbacks.createFeedback
  );

// Get Feedback by code
router.route("/feedback").get(ctrlFeedbacks.getFeedbackByCode);

module.exports = router;
