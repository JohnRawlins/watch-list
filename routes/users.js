const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const User = require('../models/User');

// @route     POST api/users
// @desc      Register a user & assign token
// @access    Public
router.post(
  '/',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check('password', 'Password must contain at least 6 characters').isLength({
      min: 6
    })
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
      if (user) {
        return res.status(400).json({ errors: ['Username is taken'] });
      }

      user = new User({
        username,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      user = await user.save();

      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      };

      jwt.sign(payload, jwtSecret, (error, userToken) => {
        if (error) throw error;
        else return res.status(200).json(userToken);
      });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ errors: ['Something went wrong. Please try again'] });
    }
  }
);

module.exports = router;
