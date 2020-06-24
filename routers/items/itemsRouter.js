const express = require('express');
const xss = require('xss');
const itemsService = require('./itemsService');

const itemsRouter = express.Router();
const jsonParser = express.json();

const beforeAllItemRoutes = (req, res, next) => {
  const requestedItem = req.params.id;
  const knexInstance = req.app.get('db');
  itemsService.getItemById(knexInstance, requestedItem).then((item) => {
    if (!item) {
      return res.status(400).json({
        error: {
          message: `Item with id: ${req.params.id} does not exist`,
        },
      });
    }
    res.item = item;
    next();
  });
};

const getItemInfoWithId = (req, res, next) => {
  const {
    id,
    itemsku,
    itemname,
    itemdesc,
    itemcost,
    itemprice,
    itemmodified,
    isactive,
  } = res.item;
  res.json({
    id,
    itemsku,
    itemname,
    itemdesc,
    itemcost,
    itemprice,
    itemmodified,
    isactive,
  });
};

const deleteUserById = (req, res, next) => {
  itemsService.deleteItem(req.app.get('db'), req.params.id).then(() => {
    res.status(204).end();
  });
};

const updateItemById = (req, res, next) => {
  const { email, firstName, lastName } = req.body;
  const infoToUpdate = { email, firstName, lastName };
  const numberOfValues = Object.values(infoToUpdate).filter(Boolean).length;
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message: 'Request body must contain ',
      },
    });
  }
  itemsService
    .updateItem(req.app.get('db'), req.params.id, infoToUpdate)
    .then((rowsaffected) => {
      res.status(204).end();
    })
    .catch(next);
};

itemsRouter.route('/').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  itemsService
    .getAllItems(knexInstance)
    .then((items) => {
      res.json(items);
    })
    .catch(next);
});

itemsRouter
  .route('/:id')
  .all(beforeAllItemRoutes)
  .get(getItemInfoWithId)
  .delete(deleteUserById)
  .patch(updateItemById);

module.exports = itemsRouter;
