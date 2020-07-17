import React, { Component } from "react";
import {
  fetchQuestion,
  createResponse,
  createStep,
} from "../../../actions/questionActions";
import { connect } from "react-redux";
import ResponseCreate from "./Responses/ResponseCreate";
import StepCreate from "./Steps/StepCreate";
import { Link } from "react-router-dom";

class QuestionEdit extends Component {
  state = {
    showResponseCreate: false,
    showStepCreate: false,
  };
  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
  }

  addResponse = (formData) => {
    this.props.createResponse(this.props.match.params.id, formData);
  };

  addStep = (formData) => {
    this.props.createStep(this.props.match.params.id, formData);
  };

  showQuestionResponses = () => {
    if (this.props.question.responses) {
      return (
        <div className="card">
          <div className="card-header text-center">
            <strong>Réponses Actuelles</strong>
            <button
              style={{ float: "right" }}
              className="btn btn-info btn-sm"
              onClick={() =>
                this.setState({
                  showResponseCreate: true,
                  showStepCreate: false,
                  //showStepCreate: !this.state.showStepCreate,
                })
              }
            >
              Ajouter une réponse
            </button>
          </div>
          <div className="card-body">
            <ul class="list-group">
              {this.props.question.responses.map((response, i) => {
                return (
                  <div key={i}>
                    <li class="list-group-item">
                      {" "}
                      {response.texte}
                      <br />
                      <span className="badge badge-info">
                        Code: {response.code}
                      </span>{" "}
                      <span className="badge badge-secondary">
                        Points: {response.points}
                      </span>{" "}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  };
  showSteps = () => {
    if (this.props.question.steps) {
      return (
        <div className="card">
          <div className="card-header text-center">
            <strong>Etapes du dialogue</strong>
            <span style={{ float: "right" }}>
              {this.props.question.ques.type === false ? (
                <button
                  className="btn btn-warning btn-sm"
                  style={{ marginRight: 5 }}
                  onClick={() =>
                    this.setState({
                      showStepCreate: true,
                      showResponseCreate: false,
                      //showResponseCreate: !this.state.showResponseCreate,
                    })
                  }
                >
                  Ajouter une étape
                </button>
              ) : null}
            </span>
          </div>
          <div className="card-body">
            <ul class="list-group">
              {this.props.question.steps.map((step, i) => {
                return (
                  <div key={i}>
                    <li class="list-group-item">
                      {" "}
                      {step.titre}{" "}
                      <Link
                        className="btn btn-success btn-sm"
                        to={`/admin/questions/${this.props.match.params.id}/step/${step._id}`}
                        style={{ float: "right" }}
                      >
                        Ajouter dialogues
                      </Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  };

  render() {
    if (!this.props.question) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <br />
        <div className="row" style={{ marginBottom: 25 }}>
          <div className="col-md-7">
            <div className="jumbotron" style={{ padding: 20 }}>
              <strong>Question:</strong>
              <br />
              {this.props.question.ques.description}
            </div>
            {this.props.question.steps ? this.showSteps() : null}
            <br />
            {this.props.question.responses
              ? this.showQuestionResponses()
              : null}
          </div>
          <div className="col-md-5">
            {this.state.showResponseCreate ? (
              <ResponseCreate
                submitResponse={(response) => this.addResponse(response)}
                hideQuestion={() =>
                  this.setState({ showResponseCreate: false })
                }
              />
            ) : null}
            {this.state.showStepCreate &&
            this.props.question.ques.type === false ? (
              <StepCreate
                submitStep={(step) => this.addStep(step)}
                hideStep={() => this.setState({ showStepCreate: false })}
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
    question: state.questionData.question,
  };
};

export default connect(mapStateToProps, {
  fetchQuestion,
  createResponse,
  createStep,
})(QuestionEdit);
