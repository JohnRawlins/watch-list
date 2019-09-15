const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Review = require('../models/Review');

// @route     GET api/reviews
// @desc      Retrieve user's video reviews
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userID: req.user.id }).select('-__v');
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});

// @route     GET api/reviews
// @desc      Retrieve reviews for video
// @access    Public
router.get('/:videoID', async (req, res) => {
  try {
    const videoReviews = await Review.find({
      imdbID: req.params.videoID
    }).select('-__v');

    if (videoReviews.length === 0) {
      return res.status(200).json({
        userReviews: videoReviews,
        totalUserReviews: 0,
        userReviewScore: 0
      });
    }

    let totalScore = videoReviews.reduce(
      (scoreSum, currentValue) => scoreSum + currentValue.stars,
      0
    );

    userReviewScore = Number((totalScore / videoReviews.length).toFixed(1));

    return res.status(200).json({
      userReviews: videoReviews,
      totalUserReviews: videoReviews.length,
      userReviewScore
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});

// @route     POST api/reviews
// @desc      Create video review
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('imdbID', 'Video ID not found')
        .not()
        .isEmpty(),
      check('videoTitle', 'Video title not found')
        .not()
        .isEmpty(),
      check('stars', 'No rating found')
        .not()
        .isEmpty(),
      check('body', 'No text found in review')
        .not()
        .isEmpty(),
      check('stars', 'A number is required for rating').isInt(),
      check('username', 'A username is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { imdbID, videoTitle, stars, body } = req.body;

      const reviewToAdd = new Review({
        imdbID,
        videoTitle,
        stars,
        userID: req.user.id,
        username: req.user.username,
        body
      });

      const duplicateReview = await Review.findOne({
        imdbID,
        userID: req.user.id
      });

      if (duplicateReview) {
        return res
          .status(400)
          .json({ msg: `You already reviewed ${videoTitle}` });
      }

      const review = await reviewToAdd.save();
      return res.status(201).json({
        msg: `Your review for ${review.videoTitle} has been submitted`
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        msg:
          'The server was unable to process your request due to an internal error'
      });
    }
  }
);

// @route     PUT api/reviews
// @desc      Edit video review
// @access    Private
router.put(
  '/:reviewID',
  [
    auth,
    [
      check('text', 'No text found in review')
        .not()
        .isEmpty(),
      check('stars', 'No rating found')
        .not()
        .isEmpty(),
      check('stars', 'A number is required for rating').isInt()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { stars, text } = req.body;

    try {
      const reviewToUpdate = await Review.findById(req.params.reviewID);

      if (!reviewToUpdate) {
        return res.status(404).json({ msg: 'Review not found' });
      }

      if (reviewToUpdate.userID.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
      const updatedReview = await Review.findByIdAndUpdate(
        { _id: req.params.reviewID },
        {
          $set: {
            stars,
            body:text
          }
        }
      );

      return res.status(200).json({
        msg: `Your review for ${updatedReview.videoTitle} has been updated`
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        msg:
          'The server was unable to process your request due to an internal error'
      });
    }
  }
);

// @route     DELETE api/reviews
// @desc      Remove video review
// @access    Private
router.delete('/:reviewID', auth, async (req, res) => {
  try {
    const reviewToRemove = await Review.findById(req.params.reviewID);

    if (!reviewToRemove) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    if (reviewToRemove.userID.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'unauthorized' });
    }

    const removedReview = await Review.findByIdAndRemove(reviewToRemove._id);

    return res.status(200).json({
      msg: `Your ${removedReview.videoTitle} review has been removed`
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});

module.exports = router;
