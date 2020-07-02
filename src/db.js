const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'paoiqnyxgyxljp',
  host: 'ec2-34-192-173-173.compute-1.amazonaws.com',
  port: 5432,
  database: 'd8j98acpvnf5oc',
});
module.exports = pool;
