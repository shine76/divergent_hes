import React, { Component } from "react";
import { renderInput, renderTextArea } from "../common/formFields";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { createSurvey } from "../actions/surveyActions";

class SurveyForm extends Component {
  onSubmit = (formData) => {
    this.props.createSurvey(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="titre" component={renderInput} label="Titre" type="text" />
        <Field
          name="description"
          component={renderTextArea}
          label="Description"
          row="3"
        />
        <br />
        <button type="submit" className="btn btn-secondary btn-block">
          Créer
        </button>
      </form>
    );
  }
}

const mapStateToProps = () => {
  return;
};

const survForm = reduxForm({ form: "survForm" })(SurveyForm);

export default connect(mapStateToProps, { createSurvey })(survForm);
