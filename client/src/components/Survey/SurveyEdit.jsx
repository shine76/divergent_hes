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
    return (
      <div className="card">
        <div className="card-header">
          <strong>Questions actuelles de l'évaluation</strong>
        </div>
        <div className="card-body">
          {this.props.questions.map((question) => (
            <div style={{ textAlign: "justify" }}>
              {question.description} <br />
              {question.type ? (
                <span className="badge badge-success">Question</span>
              ) : (
                <span className="badge badge-warning">Dialogue</span>
              )}
              <Link
                className="btn btn-warning btn-sm"
                to={`/admin/questions/${question._id}`}
                style={{ float: "right" }}
              >
                Ajouter une réponse
              </Link>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  };

  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.id);
    this.props.fetchQuestions(this.props.match.params.id);
  }
  addQuestion = (formData) => {
    this.props.createQuestion(this.props.match.params.id, formData);
  };

  render() {
    if (!this.props.surv.survey) {
      return <div></div>;
    }

    return (
      <div style={{ marginBottom: 25 }}>
        <h4
          className="col-md-8 jumbotron"
          style={{ padding: 20, marginBottom: 0 }}
        >
          {" "}
          {this.props.surv.survey.surveyinfos.titre}
          <button
            style={{ float: "right" }}
            className="btn btn-info btn-sm"
            onClick={() =>
              this.setState({
                showQuestionCreate: !this.state.showQuestionCreate,
              })
            }
          >
            {this.state.showQuestionCreate ? "Annuler" : "Ajouter une question"}
          </button>
        </h4>
        <br />
        <div className="row">
          <div className="col-md-8">{this.showSurveyQuestions()} </div>
          <div className="col-md-4">
            {this.state.showQuestionCreate ? (
              <QuestionCreate
                submitQuestion={(question) => this.addQuestion(question)}
                hideQuestion={() =>
                  this.setState({ showQuestionCreate: false })
                }
              />
            ) : null}
          </div>
        </div>
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
