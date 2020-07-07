const router = require('express').Router();
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('./utils/jwtGenerator');
const validInfo = require('./middleware/validInfo');
const authorization = require('./middleware/authorization');

/* Create a JWT Authenitcation Token System */

//Register route

router.post('/register', validInfo, async (req, res) => {
  try {
    //Destructure req.body (firstname, lastname, email, pwd)
    const { firstname, lastname, email, pwd } = req.body;

    //Check if user exists (if they do, throw error)
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json('User already exists');
    }

    //Bcrypt users pwd

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(pwd, salt);

    //Enter new user inside db
    const newUser = await pool.query(
      'INSERT INTO users (firstname, lastname, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstname, lastname, email, bcryptPassword]
    );

    //Generate JWT Token
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

router.post('/login', validInfo, async (req, res) => {
  try {
    //destructure
    const { email, pwd } = req.body;
    //check if user doesn't exist, if not throw error
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length == 0) {
      return res.status(401).json('Given info is incorrect');
    }
    //check if incoming pwd is same as db pwd
    const validPwd = await bcrypt.compare(pwd, user.rows[0].pwd);

    if (!validPwd) {
      return res.status(401).json('Supplied info is incorrect');
    }

    //give user token if corrrect

    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Failure');
  }
});

//Checks if user has token
router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Failure');
  }
});

module.exports = router;
