const express = require('express');
const router = express.Router();
const axios = require('axios');
const defaultPopularVideos = require('../defaultPopularVideos');
const apiKey = process.env.OMDB_API_KEY;
const tmdbApiKey = process.env.TMDB_API_KEY;
const PORT = process.env.PORT || 5000;

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
    const omdbSearchResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${videoTitle}&page=${pageNum}`
    );

    if (omdbSearchResponse.data.Search) {
      let videoSearchResults = omdbSearchResponse.data.Search.map(
        async video => {
          const videoReviewResponse = await axios.get(
            `http://localhost:${PORT}/api/reviews/${video.imdbID}`
          );
          return {
            ...video,
            userReviewScore: videoReviewResponse.data.userReviewScore
          };
        }
      );

      videoSearchResults = await Promise.all(videoSearchResults);

      res.status(200).json({
        Search: videoSearchResults,
        totalResults: omdbSearchResponse.data.totalResults,
        Response: omdbSearchResponse.data.Response
      });
    } else {
      res.status(200).json(omdbSearchResponse.data);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});

router.get('/popular', async (req, res) => {
  try {
    const popularVideosResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`
    );

    const popularVideos = await Promise.all(
      popularVideosResponse.data.results.map(async video => {
        videoDetails = await axios.get(
          `https://api.themoviedb.org/3/movie/${video.id}?api_key=${tmdbApiKey}&language=en-US`
        );
        video.imdbID = videoDetails.data.imdb_id;
        return video;
      })
    );

    return res.status(200).json(popularVideos);
  } catch (error) {
    if (error.message.includes('429')) {
      res.status(200).json(defaultPopularVideos);
    }
    console.error(error);
  }
});

module.exports = router;
