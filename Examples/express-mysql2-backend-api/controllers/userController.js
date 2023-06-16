const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    await user.destroy();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};