require('dotenv').config();

module.exports = {
  midgrationsDirectory: 'migrations',
  driver: 'pg',
  connectionString:
    process.env.NODE_ENV === 'test'
      ? preocess.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
  ssl: process.env.SSL,
};
