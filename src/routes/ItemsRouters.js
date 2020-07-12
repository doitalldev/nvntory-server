const express = require('express');
require('dotenv').config();
const ItemsService = require('./ItemsService');
const ItemsRouter = express.Router();
// const jsonParser = express.json();

const serializeItem = (item) => ({
  id: item.id,
  sku: item.sku,
  name: item.name,
  description: item.description,
  price: item.price,
  cost: item.cost,
  inventory: item.inventory,
});

//Get all Items
ItemsRouter.route('/')
  .get((req, res, next) => {
    ItemsService.getAllItems(req.app.get('db'))
      .then((items) => {
        res.json(items);
      })
      .catch(next);
  })
  //Create new item
  .post((req, res, next) => {
    const { sku, name, description, price, cost, inventory } = req.body;
    const newItem = { sku, name, description, price, cost, inventory };
    for (const [key, value] of Object.entries(newItem)) {
      if (!value) {
        return res.status(400).json({
          error: { message: `${key} is required` },
        });
      }
    }
    ItemsService.insertItem(req.app.get('db'), newItem)
      .then(() => {
        res.status(201);
      })

      .catch(next);
  });

ItemsRouter.route('/:id')
  //Run getItemById on all requests to this route
  .all((req, res, next) => {
    ItemsService.getItemById(req.app.get('db'), req.params.id)
      .then((item) => {
        if (!item) {
          return res.status(404).json({
            error: { message: `Item does not exist` },
          });
        }
        res.item = item;
        next();
      })
      .catch(next);
  })
  //Get the specific item
  .get((req, res, next) => {
    res.json(serializeItem(res.note));
  })
  //Delete the specific item
  .delete((req, res, next) => {
    ItemsService.deleteItem(req.app.get('db'), req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  //Update the specific item
  .patch((req, res, next) => {
    const { sku, name, description, price, cost, inventory } = req.body;
    const updatedItemInfo = { sku, name, description, price, cost, inventory };
    const numValuesToChange = Object.values(updatedItemInfo).filter(Boolean)
      .length;
    if (numValuesToChange === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain sku, name, description, price, cost, and inventory`,
        },
      });
    }
    ItemsService.updateItem(req.app.get('db'), req.params.id, updatedItemInfo)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = ItemsRouter;
