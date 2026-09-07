import mongoose from 'mongoose';
import roles from '../constants/roles.js'; // Добавлено расширение .js

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: roles.USER,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
