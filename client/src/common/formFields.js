import React from "react";
import classnames from "classnames";

export const renderSelect = ({ data, input, label, error }) => {
  const selectOptions = data.map((option, i) => (
    <option key={i} value={option._id}>
      {option.nom}
    </option>
  ));
  return (
    <div className="row">
      <div className="col-sm-12  col-xs-10 mx-auto styl-input-group">
        <div className="form-group ">
          <label htmlFor="location" className="fw-4 c-ca fz-13">
            {label}
          </label>
          <select
            className={classnames("form-control g-ui-input", {
              "is-invalid": error,
            })}
            {...input}
          >
            <option>Veuillez faire un choix</option>
            {selectOptions}
          </select>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export const renderInput = ({
  input,
  label,
  type,
  error,
  disabled,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        className={classnames("form-control g-pswdf-input", {
          "is-invalid": error,
        })}
        {...input}
        autoComplete="new-password"
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const renderTextArea = ({
  input,
  label,
  error,
  disabled,
  placeholder,
  row,
}) => {
  return (
    <div>
      <label>{label}</label>
      <textarea
        rows={row}
        className={classnames("form-control g-pswdf-input", {
          "is-invalid": error,
        })}
        {...input}
        autoComplete="new-password"
        placeholder={placeholder}
        disabled={disabled}
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const renderSelectForTypes = ({ input, error, data, label }) => {
  const selectOptions = data.map((option, i) => (
    <option key={i} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="">
      <div className="form-group ">
        <label htmlFor="gender">{label}</label>
        <select
          className={classnames("form-control ", {
            "is-invalid": error,
          })}
          {...input}
        >
          {selectOptions}
        </select>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

/* export const renderRadioButton = ({ input, data, label }) => {
  return (
    <div>
      <div>
        <label>Sex</label>
        <div>
          <label><Field name="sex" component={input} type="radio" value="male" /> Male</label>
          <label><Field name="sex" component={input} type="radio" value="female" /> Female</label>
        </div>
      </div>
    </div>
  );
};
 */