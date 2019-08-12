const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route GET api/auth
// @desc  Get logged in user
// @access Private
router.get('/', (req, res) => res.send('Get logged in user'));

// @route POST api/auth
// @desc  Auth user & get token
// @access Public
router.post(
  '/',
  [
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Login Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ msg: 'Invalid Login Credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (error, token) => {
          if (error) throw error;
          else return res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: error.message });
    }
  }
);

module.exports = router;
