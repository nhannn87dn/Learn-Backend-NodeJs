const User = require('../models/userModel');

const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const getById = async (req, res) => {
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

const create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const update = async (req, res) => {
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

const remove = async (req, res) => {
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
  getAll,
  getById,
  create,
  update,
  remove,
};