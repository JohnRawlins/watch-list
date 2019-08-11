const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route POST api/users
// @desc  Register a user
// @access Public
router.post(
  '/',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
      }

  }
);

module.exports = router;
