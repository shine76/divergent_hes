import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  renderInput,
  renderSelectForTypes,
  renderTextArea,
} from "../../../common/formFields";

class StepCreate extends Component {
  onSubmit = (formData) => {
    this.props.submitStep(formData);
    this.props.hideStep();
  };
  render() {
    return (
      <React.Fragment>
        <div className="col-md-4" style={{ marginTop: 10 }}>
          <div class="card">
            <h5 class="card-header text-center">Ajouter une nouvelle étape</h5>
            <div class="card-body">
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                  name="titre"
                  component={renderInput}
                  label="Titre"
                  type="text"
                />
                <br />
                <button type="submit" className="btn btn-secondary btn-block">
                  Créer
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const stepForm = reduxForm({ form: "stepForm" })(StepCreate);

export default connect(null, {})(stepForm);
