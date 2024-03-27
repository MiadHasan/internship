import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(409).json(err);
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const id = req.params.id;
  if (user.hasOwnProperty("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  const startIndex = (page - 1) * size;
  try {
    const users = await User.find().limit(size).skip(startIndex);
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(404).json(err);
  }
};
