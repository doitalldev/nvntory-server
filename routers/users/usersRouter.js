const express = require('express');
const xss = require('xss');
const usersService = require('./usersService');

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.route('/').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  usersService
    .getAllUsers(knexInstance)
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

module.exports = usersRouter;
