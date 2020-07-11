import React, { Component } from "react";
import {
  fetchQuestion,
  createResponse,
} from "../../../actions/questionActions";
import { connect } from "react-redux";
import ResponseCreate from "./Responses/ResponseCreate";

class QuestionEdit extends Component {
  state = {
    showResponseCreate: true,
  };

  addResponse = (formData) => {
    this.props.createResponse(this.props.match.params.id, formData);
    console.log(formData);
  };

  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
  }
  showQuestionResponses = () => {};

  render() {
    if (!this.props.question) {
      return <div>Loading</div>;
    }

    console.log(this.props.question.ques);
    return (
      <div>
        {this.props.question.ques.description}
        <br /> <br />
        <button
          className="btn btn-info btn-sm"
          onClick={() =>
            this.setState({
              showResponseCreate: !this.state.showResponseCreate,
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.questionData.question,
  };
};

export default connect(mapStateToProps, { fetchQuestion, createResponse })(
  QuestionEdit
);
