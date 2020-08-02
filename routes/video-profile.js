const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiKey = process.env.OMDB_API_KEY;
const tmdbApiKey = process.env.TMDB_API_KEY;

const getMovieCast = async (videoID) => {
  const maxCastNumber = 5;
  try {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${videoID}/credits?api_key=${tmdbApiKey}`
    );

    let movieCast = response.data.cast.filter((actor) => {
      return actor.profile_path ? true : false;
    });

    return (movieCast = movieCast.slice(0, maxCastNumber));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getMovieBackdrop = async (videoID) => {
  try {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${videoID}?api_key=${tmdbApiKey}&language=en-US`
    );
    return `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${response.data.backdrop_path}`;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getMovieTrailer = async (videoID) => {
  try {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${videoID}/videos?api_key=${tmdbApiKey}`
    );

    let movieTrailers = response.data.results.filter((movie) => {
      return movie.site === "YouTube" &&
        movie.type === "Trailer" &&
        movie.size === 1080
        ? true
        : false;
    });

    if (movieTrailers.length >= 1) {
      return movieTrailers[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// @route     GET api/video-profile
// @desc      Retrieve profile for video
// @access    Public

router.get("/:videoTitle/:videoID", async (req, res) => {
  try {
    const videoID = req.params.videoID;

    let theMovieDbResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${videoID}?api_key=${tmdbApiKey}&language=en-US`
    );

    const imdbID = theMovieDbResponse.data.imdb_id;

    let omdbResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
    );

    if (omdbResponse.data.Error) {
      return res.status(400).json({ msg: "Error loading video profile" });
    } else {
      omdbResponse.data.Backdrop = await getMovieBackdrop(imdbID);
      omdbResponse.data.Cast = await getMovieCast(imdbID);
      omdbResponse.data.Trailer = await getMovieTrailer(imdbID);
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
