const jwt = require('jsonwebtoken');

require('dotenv').config();

function jwtGenerator(user) {
  const payload = {
    user: user,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
}
module.exports = jwtGenerator;
