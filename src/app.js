require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config.js');
const pool = require('./db');
const app = express();
/* Middleware */
app.use(morgan());
app.use(helmet());
app.use(cors());
app.use(express.json());

/* Routing */

app.use('/auth', require('./jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));

// Create an item
app.post('/api/items', async (req, res) => {
  try {
    const { sku, name, description, cost, price, inventory } = req.body;
    const newItem = await pool.query(
      'INSERT INTO items (sku, name, description, cost, price, inventory) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [sku, name, description, cost, price, inventory]
    );
    res.json(newItem.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const allItems = await pool.query('SELECT * FROM items');
    res.json(allItems.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get specific item
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    res.json(item.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update an item
app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, name, description, cost, price, inventory } = req.body;
    const updateItem = await pool.query(
      'UPDATE items SET sku = $1, name = $2, description = $3, price = $4, cost = $5, inventory = $6 WHERE id = $7',
      [sku, name, description, cost, price, inventory, id]
    );
    res.json('item was updated');
  } catch (error) {
    console.error(error.message);
  }
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await pool.query('DELETE FROM items WHERE id = $1', [
      id,
    ]);
    res.json(`Item was deleted`);
  } catch (error) {
    console.error(error.message);
  }
});

/* Error Handling */
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
