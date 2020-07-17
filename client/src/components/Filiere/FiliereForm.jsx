import React, { Component } from "react";
import { renderInput, renderTextArea } from "../../common/formFields";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { createFiliere } from "../../actions/filiereActions";

class FiliereForm extends Component {
  onSubmit = (formData) => {
    const { reset } = this.props;
    this.props.createFiliere(formData);
    reset();
  };
  render() {
    console.log(this.props);
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="nom" component={renderInput} label="Nom" type="text" />
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

const filForm = reduxForm({ form: "filForm" })(FiliereForm);

export default connect(mapStateToProps, { createFiliere })(filForm);
