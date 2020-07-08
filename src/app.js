require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config.js');
// const pool = require('./db');
const ItemsRouter = require('./routes/ItemsRouters');
const app = express();
/* Middleware */
app.use(morgan());
app.use(helmet());
app.use(cors());
app.use(express.json());

/* Routing */

app.use('/auth', require('./jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/api/items', ItemsRouter);

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
