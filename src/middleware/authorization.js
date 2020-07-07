const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    //Grabs the token from the header sent from user
    const jwtToken = req.header('token');

    //If there is none, return not authorized
    if (!jwtToken) {
      res.status(403).json('No token supplied, not authorized');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;
  } catch (error) {
    console.error(error.message);
    return res.status(403).json('You are not authed');
  }
  next();
};
