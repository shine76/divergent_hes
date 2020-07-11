import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurvey, clearSurvey } from "../../actions/surveyActions";
import QuestionCreate from "./Questions/QuestionCreate";
import { createQuestion } from "../../actions/questionActions";

class SurveyEdit extends Component {
  state = {
    showQuestionCreate: false,
  };

  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.id);
  }
  addQuestion = (formData) => {
    this.props.createQuestion(this.props.match.params.id, formData);
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-info btn-sm"
          onClick={() => this.setState({ showQuestionCreate: true })}
        >
          Ajouter une question
        </button>
        {this.state.showQuestionCreate ? (
          <QuestionCreate
            submitQuestion={(question) => this.addQuestion(question)}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surv: state.surveyData,
  };
};

export default connect(mapStateToProps, { fetchSurvey, createQuestion })(
  SurveyEdit
);
