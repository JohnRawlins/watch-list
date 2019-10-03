const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = process.env.OMDB_API_KEY;

// @route     GET api/video-profile
// @desc      Retrieve profile for video
// @access    Public

router.get('/', async (req, res) => {
  try {
    const videoImdbID = req.query.imdbID;

    let omdbResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${videoImdbID}`
    );

    if (omdbResponse.data.Error) {
      return res.status(400).json({ msg: 'Error loading video profile' });
    }

    return res.status(200).json(omdbResponse.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});

module.exports = router;
