import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  renderInput,
  renderTextArea,
  renderSelectForTypes,
} from "../../../../common/formFields";

class Student extends Component {
  state = {
    teacherTalking: [
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
                row="4"
              />
              <Field
                name="teacherNext"
                component={renderSelectForTypes}
                data={this.state.teacherTalking}
                label="Le prof parle?"
              />
              <Field
                name="askQuestion"
                component={renderSelectForTypes}
                data={this.state.teacherTalking}
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

const studentForm = reduxForm({ form: "studentForm" })(Student);

export default connect(null, {})(studentForm);
