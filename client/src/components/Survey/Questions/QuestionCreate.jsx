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
      <div className="col-md-5">
        <div className="card">
          <div className="card-header text-center">
            <strong>Ajouter une nouvelle question</strong>
          </div>
          <div className="card-body">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field
                name="description"
                component={renderTextArea}
                label="Détail de la question"
                type="text"
                row="5"
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
                data={this.state.typeOptions}
                label="Veuillez choisir le type de Question"
              />

              <br />
              <button type="submit" className="btn btn-secondary btn-sm">
                Ajouter
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.props.hideQuestion()}
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const questionForm = reduxForm({ form: "questionForm" })(QuestionCreate);

export default connect(null, {})(questionForm);
