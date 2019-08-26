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
    return res
      .status(500)
      .json({ errors: ['Something went wrong. Please try again'] });
  }
});

// @route     POST api/auth
// @desc      Login user & assign token
// @access    Public
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
  ],
  async (req, res) => {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
      return res
        .status(400)
        .json({ errors: validationResults.errors.map(error => error.msg) });
    }

    let { username, password } = req.body;

    username = username.toLowerCase();

    try {
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ errors: ['Invalid Credentials'] });
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (!passwordsMatch) {
        return res.status(400).json({ errors: ['Invalid Credentials'] });
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
          expiresIn: 1800
        },
        (error, token) => {
          if (error) throw error;
          else return res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        errors: [
          'The server was unable to process your request due to an internal error'
        ]
      });
    }
  }
);

module.exports = router;
