import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  renderInput,
  renderTextArea,
  renderSelectForTypes,
} from "../../../../common/formFields";

class Teacher extends Component {
  state = {
    studentTalking: [
      { label: "Non", value: "F" },
      { label: "Oui", value: "T" },
    ],
  };

  onSubmit = (formData) => {
    this.props.submitText(formData);
  };

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field
                name="text"
                component={renderTextArea}
                label="Texte"
                type="text"
                row="2"
              />
              <Field
                name="studentNext"
                component={renderSelectForTypes}
                data={this.state.studentTalking}
                label="L'étudiant parle?"
              />
              <Field
                name="askQuestion"
                component={renderSelectForTypes}
                data={this.state.studentTalking}
                label="Pose de question"
              />

              <br />
              <button type="submit" className="btn btn-secondary btn-sm">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const teacherForm = reduxForm({ form: "teacherForm" })(Teacher);

export default connect(null, {})(teacherForm);
