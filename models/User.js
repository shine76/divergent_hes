const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  nom: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  contact: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 2,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
