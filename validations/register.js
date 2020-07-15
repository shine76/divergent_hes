const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.nom = !isEmpty(data.nom) ? data.nom : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  // data.sexe = !isEmpty(data.sexe) ? data.sexe : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.nom, { min: 3, max: 30 })) {
    errors.nom = "Votre nom soit contenir au moins 3 caractères";
  }

  if (!Validator.isLength(data.contact, { min: 8, max: 12 })) {
    errors.contact =
      "Votre contact est invalid, il doit comporter au moins 8 caractères";
  }

  if (Validator.isEmpty(data.nom)) {
    errors.nom = "Veuillez entrer votre nom";
  }
  if (Validator.isEmpty(data.contact)) {
    errors.contact = "Veuillez entrer votre contact";
  }
  /* 
  if (Validator.isEmpty(data.sexe)) {
    errors.sexe = "sexe field is required";
  } */

  if (!Validator.isEmail(data.email)) {
    errors.email = "Votre email est invalide, veuillez réessayer";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Veuillez entrer un email";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Le mot de passe doit contenir au moins 8 caractères";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Entrez votre mot de passe";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Les mots de passes ne correspondent pas";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Veuillez confirmer votre mot de passe";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
