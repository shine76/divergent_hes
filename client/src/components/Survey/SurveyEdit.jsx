import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurvey, clearSurvey } from "../../actions/surveyActions";
import QuestionCreate from "./Questions/QuestionCreate";
import { createQuestion, fetchQuestions } from "../../actions/questionActions";
import { Link } from "react-router-dom";

class SurveyEdit extends Component {
  state = {
    showQuestionCreate: false,
  };

  showSurveyQuestions = () => {
    if (!this.props.questions) {
      return;
    }
    return this.props.questions.map((question) => (
      <div>
        {question.description} <br />
        <Link
          className="btn btn-warning btn-sm"
          to={`/questions/${question._id}`}
        >
          Ajouter une réponse
        </Link>
        <hr />
      </div>
    ));
  };

  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.id);
    this.props.fetchQuestions(this.props.match.params.id);
  }
  addQuestion = (formData) => {
    this.props.createQuestion(this.props.match.params.id, formData);
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-info btn-sm"
          onClick={() =>
            this.setState({
              showQuestionCreate: !this.state.showQuestionCreate,
            })
          }
        >
          {this.state.showQuestionCreate ? "Annuler" : "Ajouter une question"}
        </button>
        {this.showSurveyQuestions()}
        {this.state.showQuestionCreate ? (
          <QuestionCreate
            submitQuestion={(question) => this.addQuestion(question)}
            hideQuestion={() => this.setState({ showQuestionCreate: false })}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surv: state.surveyData,
    questions: state.questionData.questions,
  };
};

export default connect(mapStateToProps, {
  fetchSurvey,
  createQuestion,
  fetchQuestions,
})(SurveyEdit);
