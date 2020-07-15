const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

const registerUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json(errors);
      } else {
        const newUser = new User(req.body);

        // Crypter le mot de passe
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => res.json(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
};

const loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // REcherche de l'utilisateur par l'email
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "ce Email est non existant";
      return res.status(404).json(errors);
    } else {
      // Vérification email
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // Le MDP correspond, il faut créer un token
          // Le payload contiendra les informations qu'on voudrais reprendre du user après décryptage
          const payload = {
            id: user.id,
            nom: user.nom,
            email: user.email,
          };

          // Signer le token
          jwt.sign(
            payload,
            process.env.secretOrKey,
            { expiresIn: 86400 },
            (err, token) => {
              // On récupère le token crée
              res.json({ success: true, token: "Bearer " + token });
            }
          );
        } else {
          errors.password = "Mot de passe incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
};
