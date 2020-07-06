const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');
    if (!jwtToken) {
      res.status(403).send('No no no, not authorized');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;
  } catch (error) {
    console.error(error.message);
    return res.status(403).send('You are not authed');
  }
  next();
};
