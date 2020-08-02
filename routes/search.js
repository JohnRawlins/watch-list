const express = require("express");
const router = express.Router();
const axios = require("axios");
const genres = require("../genres");
const apiKey = process.env.OMDB_API_KEY;
const tmdbApiKey = process.env.TMDB_API_KEY;
const PORT = process.env.PORT || 5000;

// @route     GET api/search
// @desc      Search for movie or show using 3rd party API
// @access    Public

router.get("/", async (req, res) => {
  try {
    const videoTitle = req.query.videoTitle;
    let pageNum = 1;
    if (req.query.page) {
      pageNum = req.query.page;
    }
    const omdbSearchResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${videoTitle}&page=${pageNum}`
    );

    if (omdbSearchResponse.data.Search) {
      let videoSearchResults = omdbSearchResponse.data.Search.map(
        async (video) => {
          const videoReviewResponse = await axios.get(
            `http://localhost:${PORT}/api/reviews/${video.imdbID}`
          );
          return {
            ...video,
            userReviewScore: videoReviewResponse.data.userReviewScore,
          };
        }
      );

      videoSearchResults = await Promise.all(videoSearchResults);

      res.status(200).json({
        Search: videoSearchResults,
        totalResults: omdbSearchResponse.data.totalResults,
        Response: omdbSearchResponse.data.Response,
      });
    } else {
      res.status(200).json(omdbSearchResponse.data);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        "The server was unable to process your request due to an internal error",
    });
  }
});

// @route     GET api/search
// @desc      Search for popular movies or shows using 3rd party API
// @access    Public

router.get("/popular", async (req, res) => {
  let popularVideosResponse = null;
  try {
    popularVideosResponse = await Promise.all(
      genres.map(async (genre) => {
        let genreVideosResponse = null;
        if (genre.id === 1) {
          genreVideosResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`
          );
        } else {
          genreVideosResponse = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genre.id}&release_date.gte=2019`
          );
        }
        return {
          genreName: genre.name,
          videos: genreVideosResponse.data.results,
        };
      })
    );
    return res.status(200).json(popularVideosResponse);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        "The server was unable to process your request due to an internal error"
      );
  }
});

module.exports = router;
