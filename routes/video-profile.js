const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiKey = process.env.OMDB_API_KEY;
const tmdbApiKey = process.env.TMDB_API_KEY;

// @route     GET api/video-profile
// @desc      Retrieve profile for video
// @access    Public

const getMovieCast = async (videoID) => {
  const movieCastLimit = 5;
  try {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${videoID}/credits?api_key=${tmdbApiKey}`
    );

    let movieCast = response.data.cast.filter((actor, index) => {
      return index < movieCastLimit && actor.profile_path ? true : false;
    });

    return movieCast;
  } catch (error) {
    console.error(error);
    return [];
  }
};

router.get("/:videoTitle/:imdbID", async (req, res) => {
  try {
    const videoImdbID = req.params.imdbID;

    let omdbResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${videoImdbID}`
    );

    if (omdbResponse.data.Error) {
      return res.status(400).json({ msg: "Error loading video profile" });
    } else {
      omdbResponse.data.Cast = await getMovieCast(videoImdbID);
      return res.status(200).json(omdbResponse.data);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        "The server was unable to process your request due to an internal error",
    });
  }
});

module.exports = router;
