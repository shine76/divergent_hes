import React, { Component } from "react";
import {
  fetchQuestion,
  createResponse,
  createStep,
} from "../../../actions/questionActions";
import { connect } from "react-redux";
import ResponseCreate from "./Responses/ResponseCreate";
import StepCreate from "./StepCreate";

class QuestionEdit extends Component {
  state = {
    showResponseCreate: false,
    showStepCreate: true,
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

  showQuestionResponses = () => {};

  render() {
    if (!this.props.question) {
      return <div>Loading</div>;
    }
    return (
      <div>
        {this.props.question.ques.description}
        <br /> <br />
        {this.props.question.ques.type === false ? (
          <button
            className="btn btn-warning btn-sm"
            style={{ marginRight: 5 }}
            onClick={() =>
              this.setState({
                showStepCreate: !this.state.showStepCreate,
                showResponseCreate: !this.state.showResponseCreate,
              })
            }
          >
            Ajouter une étape
          </button>
        ) : null}
        <button
          className="btn btn-info btn-sm"
          onClick={() =>
            this.setState({
              showResponseCreate: !this.state.showResponseCreate,
              showStepCreate: !this.state.showStepCreate,
            })
          }
        >
          Ajouter une réponse
        </button>
        {this.state.showResponseCreate ? (
          <ResponseCreate
            submitResponse={(response) => this.addResponse(response)}
            hideQuestion={() => this.setState({ showResponseCreate: false })}
          />
        ) : null}
        {this.state.showStepCreate ? (
          <StepCreate
            submitStep={(step) => this.addStep(step)}
            hideStep={() => this.setState({ showStepCreate: false })}
          />
        ) : null}
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
