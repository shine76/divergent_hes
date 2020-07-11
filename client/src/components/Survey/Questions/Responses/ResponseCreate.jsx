import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  renderInput,
  renderSelectForTypes,
  renderTextArea,
} from "../../../../common/formFields";

class ResponseCreate extends Component {
  state = {
    supplementOptions: [
      { label: "Faites un choix ", value: 0 },
      { label: "Non", value: "F" },
      { label: "Oui", value: "T" },
    ],
  };

  onSubmit = (formData) => {
    this.props.submitResponse(formData);
  };
  render() {
    return (
      <div className="col-md-6">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="texte"
            component={renderTextArea}
            label="Texte de la réponse"
            type="text"
            row="2"
          />
          <Field name="code" component={renderInput} label="Code" type="text" />
          <Field
            name="notes"
            component={renderInput}
            label="Notes"
            type="text"
          />
          <Field
            name="points"
            component={renderInput}
            label="Points"
            type="number"
          />
          <Field
            name="type"
            component={renderSelectForTypes}
            data={this.state.supplementOptions}
            label="Y a t-il des réponses supplémentaires?"
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
    );
  }
}

const responseForm = reduxForm({ form: "responseForm" })(ResponseCreate);

export default connect(null, {})(responseForm);
