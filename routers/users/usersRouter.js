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
      return res.status(400).json({
        error: {
          message: `User with id: ${req.params.id} does not exist`,
        },
      });
    }
    res.user = user;
    next();
  });
};

const getUserInfoWithId = (req, res, next) => {
  const { id, email, firstname, lastname } = res.user;
  res.json({
    id,
    email,
    firstname,
    lastname,
  });
};

const deleteUserById = (req, res, next) => {
  usersService.deleteUser(req.app.get('db'), req.params.id).then(() => {
    res.status(204).end();
  });
};

const updateUserById = (req, res, next) => {
  const { email, firstName, lastName } = req.body;
  const infoToUpdate = { email, firstName, lastName };
  const numberOfValues = Object.values(infoToUpdate).filter(Boolean).length;
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message: 'Request body must contain email/first name/last name',
      },
    });
  }
  usersService
    .updateUser(req.app.get('db'), req.params.id, infoToUpdate)
    .then((rowsaffected) => {
      res.status(204).end();
    })
    .catch(next);
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

usersRouter
  .route('/:id')
  .all(beforeAllUserRoutes)
  .get(getUserInfoWithId)
  .delete(deleteUserById)
  .patch(updateUserById);

module.exports = usersRouter;
