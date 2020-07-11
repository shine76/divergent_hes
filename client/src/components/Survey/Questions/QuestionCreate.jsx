import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  renderInput,
  renderSelectForTypes,
  renderTextArea,
} from "../../../common/formFields";

class QuestionCreate extends Component {
  state = {
    typeOptions: [
      { label: "Faites un choix ", value: 0 },
      { label: "Réponses", value: "T" },
      { label: "Dialogues", value: "F" },
    ],
  };
  onSubmit = (formData) => {
    this.props.submitQuestion(formData);
  };
  render() {
    return (
      <div className="col-md-6">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="description"
            component={renderTextArea}
            label="Détail de la question"
            type="text"
          />
          <Field
            name="titre"
            component={renderInput}
            label="Interrogation"
            type="text"
          />
          <Field
            name="maxPoints"
            component={renderInput}
            label="Points maximums"
            type="number"
          />
          <Field
            name="type"
            component={renderSelectForTypes}
            label="Points maximums"
            data={this.state.typeOptions}
          />

          <br />
          <button type="submit" className="btn btn-secondary btn-block">
            Ajouter
          </button>
        </form>
      </div>
    );
  }
}

const questionForm = reduxForm({ form: "questionForm" })(QuestionCreate);

export default connect(null, {})(questionForm);
