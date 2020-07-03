import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { fetchFilieres } from "../actions/filiereActions";
import { renderInput, renderSelect } from "../common/formFields";

class Login extends Component {
  componentDidMount() {
    this.props.fetchFilieres();
  }
  renderInput = ({ input, label, type, placeholder, error }) => {
    return (
      <div>
        <div className="form-group">
          <label>{label}</label>
          <input
            type={type}
            {...input}
            autoComplete="new-password"
            className="form-control "
            placeholder={placeholder}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.loginUser(formValues);
  };

  render() {
    if (!this.props.filieres) {
      return <div></div>;
    }
    const data = this.props.filieres;
    return (
      <div className="container text-center" style={{ marginTop: 10 }}>
        <div className="container" style={{ marginTop: 55 }}>
          <div className="col-xs-6 col-md-6 offset-md-3">
            <div
              className="card text-center text-white mb-3"
              style={{ backgroundColor: "#3498db" }}
            >
              <div className="card-header">
                <h4>Veuillez choisir votre filière</h4>
              </div>
              <div className="card-body">
                <form
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                  noValidate
                >
                  <Field
                    name="pseudo"
                    component={renderInput}
                    label="Pseudo"
                    type="text"
                  />
                  <Field
                    name="filiere"
                    component={renderSelect}
                    label="Votre filière"
                    data={data}
                  />
                  <br />
                  <input
                    type="submit"
                    className="btn btn-warning"
                    value="Me lancer"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
    filieres: state.filiereData.filieres,
  };
};

const loginForm = reduxForm({ form: "authForm" })(Login);

export default connect(mapStateToProps, { loginUser, fetchFilieres })(
  loginForm
);
