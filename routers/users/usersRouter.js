const express = require('express');
const xss = require('xss');
const usersService = require('./usersService');

const usersRouter = express.Router();
const jsonParser = express.json();

const beforeAllUserRoutes = (req, res, next) => {
  const requestedUser = req.params.id;
  const knexInstance = req.app.get('db');
  usersService.getUserById(knexInstance, requestedUser).then((user) => {
    if (!user) {
      const error = new Error(`User ${req.params.id} does not exist`);
    }
  });
};

usersRouter.route('/').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  usersService
    .getAllUsers(knexInstance)
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

usersRouter.route('/:id').get((req, res, next) => {
  const knexInstance = req.app.get('db');
});

module.exports = usersRouter;
