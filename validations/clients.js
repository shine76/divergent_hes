const Validator = require("validator");
const isEmpty = require("./is-empty.js");

const validateClientCreateInput = data => {
  let errors = {};
  data.account = !isEmpty(data.account) ? data.account : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.account, { min: 3, max: 30 })) {
    errors.account = "le nom d'utilisateur doit contenir au moins 3 caractères";
  }

  if (Validator.isEmpty(data.account)) {
    errors.account = "Veuillez entrer le nom d'utilisateur";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "Veuillez entrer le prénom du client";
  }

  if (!Validator.isLength(data.mobile, { min: 8, max: 14 })) {
    errors.mobile = "le numéro doit contenir 8 caractères";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Veuillez entrer le numéro";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit contenir au moins 6 caractères";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Entrez le mot de passe";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateRefillClient = data => {
  let errors = {};
  data.priceplan = !isEmpty(data.priceplan) ? data.priceplan : "";
  data.account = !isEmpty(data.account) ? data.account : "";

  if (Validator.isEmpty(data.priceplan)) {
    errors.priceplan = "Veuillez Choisir un type de temps";
  }
  if (Validator.isEmpty(data.account)) {
    errors.account = "Veuillez choisir l'utilisateur";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { validateClientCreateInput, validateRefillClient };
