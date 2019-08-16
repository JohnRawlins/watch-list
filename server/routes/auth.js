const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');

const User = require('../models/User');

// @route GET api/auth
// @desc  Get logged in user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('_id username');
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});

// @route     POST api/auth
// @desc      Login user & assign token
// @access    Public
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
        return res.status(400).json({ msg: 'Invalid Login Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
          username: user.username
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
      return res.status(500).json({
        msg:
          'The server was unable to process your request due to an internal error'
      });
    }
  }
);

module.exports = router;
