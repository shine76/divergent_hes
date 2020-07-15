const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLoginInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Votre email est invalide, veuillez réessayer";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Veuillez entrer un email";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Entrez votre mot de passe";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
