import bcrypt from 'bcrypt';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { generate } from '../helpers/token.js';
import ROLES from '../constants/roles.js';

async function register(name, login, password) {
  if (!password) {
    throw new Error('Password is empty');
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, login, password: passwordHash });

  const token = generate({ id: user.id });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Wrong password');
  }

  const token = generate({ id: user.id });

  return { token, user };
}

function getUsers() {
  return User.find();
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: 'Admin' },
    { id: ROLES.MODERATOR, name: 'Moderator' },
    { id: ROLES.USER, name: 'User' },
  ];
}

function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
}

export { register, login, getUsers, getRoles, deleteUser, updateUser };
