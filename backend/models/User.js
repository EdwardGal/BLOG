const mongoose = require('mongoose');
const roles = require('../constants/roles');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    login: {
      type: String,
      requred: true,
      unique: true,
    },
    password: {
      type: String,
      requred: true,
    },
    role: {
      type: Number,
      default: roles.USER,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
