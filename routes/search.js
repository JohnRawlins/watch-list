const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

// @route     GET api/search
// @desc      Search for movie or show using 3rd party API
// @access    Public
router.get('/', async (req, res) => {
  try {
    const videoTitle = req.query.videoTitle;
    let pageNum = 1;
    if (req.query.page) {
      pageNum = req.query.page;
    }
    let omdbResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${videoTitle}&page=${pageNum}`
    );

    res.status(200).json(omdbResponse.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});

module.exports = router;
