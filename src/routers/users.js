const express = require('express');

const User = require('../db/models/user');
const { sendWelcomeEmailTo, sendByeEmailTo } = require('../emails/accounts');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch(error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).send();

    res.send(user);
  } catch(error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.genAuthToken();
    console.log(token);

    res.send(user);
  } catch(error) {
    res.status(400).send(error);
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmailTo(user.email);

    res.status(201).send(user);
  } catch(error) {
    res.status(400).send(error);
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if(!user) return res.status(404).send();

    res.send(user);
  } catch(error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) return res.status(404).send();
    sendByeEmailTo(user.email);

    res.send(user);
  } catch(error) {
    res.status(400).send(error);
  }
});

module.exports = router;
