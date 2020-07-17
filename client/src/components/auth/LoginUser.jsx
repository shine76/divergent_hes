import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { LoginU } from "../../actions/authActions";
import classnames from "classnames";
import { renderInput } from "../../common/formFields";

class LoginUser extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/clients");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
            className={classnames("form-control g-pswdf-input", {
              "is-invalid": error,
            })}
            placeholder={placeholder}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    );
  };
  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.LoginU(formValues);
  };
  render() {
    const { errors } = this.props;
    return (
      <div className="container" style={{ marginTop: 55 }}>
        <div className="col-xs-6 col-md-6 offset-md-3">
          <div
            className="card text-center text-white bg-info mb-3"
            style={{ backgroundColor: "#3498db" }}
          >
            <div className="card-header">Connexion</div>
            <div className="card-body">
              <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                noValidate
              >
                <Field
                  name="email"
                  component={renderInput}
                  label="E-mail"
                  type="email"
                 // error={errors.email}
                />
                <Field
                  name="password"
                  component={renderInput}
                  label="Mot de passe"
                  type="password"
                  //error={errors.password}
                />{" "}
                <br />
                <input
                  type="submit"
                  className="btn btn-warning"
                  value="Me Connecter"
                />
              </form>
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
  };
};

const loginForm = reduxForm({ form: "authForm" })(LoginUser);

export default connect(mapStateToProps, { LoginU })(loginForm);
